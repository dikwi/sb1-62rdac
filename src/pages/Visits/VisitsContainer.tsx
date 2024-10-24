import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchVisits, updateVisit } from '../../services/api';
import VisitsHeader from './components/VisitsHeader';
import VisitsTable from './components/VisitsTable';
import VisitDetailsModal from './components/VisitDetailsModal';
import WaitingQueueModal from './components/WaitingQueueModal';
import VisitRegistrationModal from './components/VisitRegistrationModal';
import { Visit } from './types';

const VisitsContainer: React.FC = () => {
  const [selectedVisits, setSelectedVisits] = useState<string[]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isWaitingQueueModalOpen, setIsWaitingQueueModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const queryClient = useQueryClient();
  const { data: visits = [], isLoading, error } = useQuery('visits', fetchVisits);

  const updateVisitMutation = useMutation(updateVisit, {
    onSuccess: () => {
      queryClient.invalidateQueries('visits');
      setIsDetailsModalOpen(false);
    },
  });

  const handleSelectVisit = (id: string, checked: boolean) => {
    setSelectedVisits(prev => 
      checked ? [...prev, id] : prev.filter(visitId => visitId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedVisits(checked ? visits.map(visit => visit.id) : []);
  };

  const handleFavorite = (id: string) => {
    const visit = visits.find(v => v.id === id);
    if (visit) {
      updateVisitMutation.mutate({
        ...visit,
        favorite: !visit.favorite,
      });
    }
  };

  const handleViewVisit = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDetailsModalOpen(true);
  };

  const handleAddVisit = () => {
    setIsRegistrationModalOpen(true);
  };

  const waitingVisits = visits.filter(visit => visit.status === 'Waiting');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading visits</div>;

  const modals = [
    isDetailsModalOpen && (
      <VisitDetailsModal
        key="details"
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedVisit(null);
        }}
        visit={selectedVisit}
        onUpdate={(visitData) => updateVisitMutation.mutate(visitData)}
      />
    ),
    isWaitingQueueModalOpen && (
      <WaitingQueueModal
        key="queue"
        isOpen={isWaitingQueueModalOpen}
        onClose={() => setIsWaitingQueueModalOpen(false)}
        visits={waitingVisits}
      />
    ),
    isRegistrationModalOpen && (
      <VisitRegistrationModal
        key="registration"
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    ),
  ].filter(Boolean);

  return (
    <div>
      <VisitsHeader 
        onAddVisit={handleAddVisit}
        onViewWaitingQueue={() => setIsWaitingQueueModalOpen(true)}
      />

      <VisitsTable
        visits={visits}
        selectedVisits={selectedVisits}
        onSelectVisit={handleSelectVisit}
        onSelectAll={handleSelectAll}
        onFavorite={handleFavorite}
        onViewVisit={handleViewVisit}
      />

      {modals}
    </div>
  );
};

export default VisitsContainer;
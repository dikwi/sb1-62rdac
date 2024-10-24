import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchHealthFacilities } from '../../services/api';
import HealthFacilityHeader from './components/HealthFacilityHeader';
import FacilityList from './components/FacilityList';
import InpatientManagement from './components/InpatientManagement';
import BedManagement from './components/BedManagement';
import WardManagement from './components/WardManagement';
import ErrorMessage from '../../components/ErrorMessage';

const HealthFacilityContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facilities' | 'inpatients' | 'beds' | 'wards'>('facilities');
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const { data: facilities, isLoading, error } = useQuery('healthFacilities', fetchHealthFacilities);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message="Error loading health facilities" />;

  return (
    <div>
      <HealthFacilityHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        facilities={facilities}
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
      />

      {activeTab === 'facilities' && (
        <FacilityList 
          facilities={facilities}
          onSelectFacility={setSelectedFacility}
          selectedFacility={selectedFacility}
        />
      )}

      {activeTab === 'inpatients' && selectedFacility && (
        <InpatientManagement facilityId={selectedFacility} />
      )}

      {activeTab === 'beds' && selectedFacility && (
        <BedManagement facilityId={selectedFacility} />
      )}

      {activeTab === 'wards' && selectedFacility && (
        <WardManagement facilityId={selectedFacility} />
      )}

      {!selectedFacility && activeTab !== 'facilities' && (
        <div className="text-center py-8 text-gray-500">
          Please select a facility to manage {activeTab}
        </div>
      )}
    </div>
  );
};

export default HealthFacilityContainer;
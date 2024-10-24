import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchLabTests, addLabTest, updateLabTest, updateLabTestBatch } from '../services/api';
import { Plus, Filter, Search, RefreshCw } from 'lucide-react';
import LabTestModal from '../components/LabTestModal';
import LabTestWorkflow from '../components/LabTestWorkflow';
import LabTestTable from '../components/LabTestTable';
import LabTestFilters from '../components/LabTestFilters';
import LabTestSearch from '../components/LabTestSearch';

const LabTests: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [filters, setFilters] = useState({ status: '', dateRange: '', testType: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const { data: labTests, isLoading, error } = useQuery('labTests', fetchLabTests);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addLabTest, {
    onSuccess: () => {
      queryClient.invalidateQueries('labTests');
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateLabTest, {
    onSuccess: () => {
      queryClient.invalidateQueries('labTests');
      setIsModalOpen(false);
      setActiveStage(null);
    },
  });

  const batchUpdateMutation = useMutation(updateLabTestBatch, {
    onSuccess: () => {
      queryClient.invalidateQueries('labTests');
      setSelectedTests([]);
    },
  });

  const handleAddTest = () => {
    setSelectedTest(null);
    setIsModalOpen(true);
  };

  const handleEditTest = (test: any) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const handleStageAction = (test: any, stage: string) => {
    setSelectedTest(test);
    setActiveStage(stage);
  };

  const handleSort = (key: string) => {
    setSortConfig(prevConfig => {
      if (!prevConfig || prevConfig.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prevConfig.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const handleBatchAction = (action: string) => {
    if (selectedTests.length > 0) {
      const updatedTests = labTests?.filter(test => selectedTests.includes(test.id)) || [];
      const nextStage = getNextStage(action);
      
      const batchUpdateData = updatedTests.map(test => ({
        ...test,
        status: nextStage,
      }));

      batchUpdateMutation.mutate({ tests: batchUpdateData, action });
    }
  };

  const getNextStage = (currentStage: string) => {
    const stages = [
      'Requested',
      'Sample Collected',
      'Processed',
      'Reviewed',
      'Communicated',
      'Doctor Reviewed',
      'Consultation Completed'
    ];
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : currentStage;
  };

  const filteredAndSortedTests = useMemo(() => {
    let result = labTests || [];

    // Apply filters
    if (filters.status) {
      result = result.filter(test => test.status === filters.status);
    }
    if (filters.dateRange) {
      // Implement date range filtering logic here
    }
    if (filters.testType) {
      result = result.filter(test => test.testType === filters.testType);
    }

    // Apply search
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(test =>
        test.patientName.toLowerCase().includes(lowercasedTerm) ||
        test.testType.toLowerCase().includes(lowercasedTerm) ||
        test.requestedBy.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [labTests, filters, searchTerm, sortConfig]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching lab tests</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lab Tests</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddTest}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Request Lab Test
          </button>
          <select
            onChange={(e) => handleBatchAction(e.target.value)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            disabled={selectedTests.length === 0}
          >
            <option value="">Batch Actions</option>
            <option value="Sample Collected">Mark as Sample Collected</option>
            <option value="Processed">Mark as Processed</option>
            <option value="Reviewed">Mark as Reviewed</option>
            <option value="Communicated">Mark as Communicated</option>
            <option value="Doctor Reviewed">Mark as Doctor Reviewed</option>
            <option value="Consultation Completed">Mark as Consultation Completed</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <LabTestFilters filters={filters} setFilters={setFilters} />
        <LabTestSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <LabTestTable
        labTests={filteredAndSortedTests}
        onEditTest={handleEditTest}
        onStageAction={handleStageAction}
        onSort={handleSort}
        sortConfig={sortConfig}
        selectedTests={selectedTests}
        setSelectedTests={setSelectedTests}
      />

      {isModalOpen && (
        <LabTestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(test) => selectedTest ? updateMutation.mutate(test) : addMutation.mutate(test)}
          test={selectedTest}
        />
      )}

      <LabTestWorkflow
        activeStage={activeStage}
        onClose={() => setActiveStage(null)}
        onSubmit={(data) => updateMutation.mutate({ ...selectedTest, ...data })}
        test={selectedTest}
      />
    </div>
  );
};

export default LabTests;
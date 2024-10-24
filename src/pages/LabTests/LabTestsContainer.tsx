import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchLabTests, addLabTest, updateLabTest, updateLabTestBatch } from '../../services/api';
import LabTestsHeader from './components/LabTestsHeader';
import LabTestsFilters from './components/LabTestsFilters';
import LabTestsTable from './components/LabTestsTable';
import LabTestModal from './components/LabTestModal';
import LabTestWorkflow from './components/LabTestWorkflow';
import { useLabTestsSort } from './hooks/useLabTestsSort';
import { useLabTestsFilter } from './hooks/useLabTestsFilter';
import ErrorMessage from '../../components/ErrorMessage'; // Assume we have this component

const LabTestsContainer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const { data: labTests, isLoading, error } = useQuery('labTests', fetchLabTests);
  const queryClient = useQueryClient();

  const { sortConfig, handleSort, sortedTests } = useLabTestsSort(labTests || []);
  const { filters, setFilters, filteredTests } = useLabTestsFilter(sortedTests);

  const addMutation = useMutation(addLabTest, {
    onSuccess: () => {
      queryClient.invalidateQueries('labTests');
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Error adding lab test:', error);
      // Handle error (e.g., show error message to user)
    },
  });

  const updateMutation = useMutation(updateLabTest, {
    onSuccess: () => {
      queryClient.invalidateQueries('labTests');
      setIsModalOpen(false);
      setActiveStage(null);
    },
    onError: (error) => {
      console.error('Error updating lab test:', error);
      // Handle error (e.g., show error message to user)
    },
  });

  const batchUpdateMutation = useMutation(updateLabTestBatch, {
    onSuccess: () => {
      queryClient.invalidateQueries('labTests');
      setSelectedTests([]);
    },
    onError: (error) => {
      console.error('Error batch updating lab tests:', error);
      // Handle error (e.g., show error message to user)
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

  const handleBatchAction = (action: string) => {
    if (selectedTests.length > 0) {
      batchUpdateMutation.mutate({ ids: selectedTests, action });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message="Error fetching lab tests. Please try again later." />;

  return (
    <div>
      <LabTestsHeader onAddTest={handleAddTest} onBatchAction={handleBatchAction} selectedTests={selectedTests} />
      <LabTestsFilters filters={filters} setFilters={setFilters} />
      <LabTestsTable
        labTests={filteredTests}
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

export default LabTestsContainer;
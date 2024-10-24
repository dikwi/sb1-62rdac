import React from 'react';
import { Plus } from 'lucide-react';

interface LabTestsHeaderProps {
  onAddTest: () => void;
  onBatchAction: (action: string) => void;
  selectedTests: string[];
}

const LabTestsHeader: React.FC<LabTestsHeaderProps> = ({ onAddTest, onBatchAction, selectedTests }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Lab Tests</h1>
      <div className="flex space-x-2">
        <button
          onClick={onAddTest}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Request Lab Test
        </button>
        <select
          onChange={(e) => onBatchAction(e.target.value)}
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
  );
};

export default LabTestsHeader;
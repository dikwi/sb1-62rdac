import React from 'react';
import { Plus, List } from 'lucide-react';

interface VisitsHeaderProps {
  onAddVisit: () => void;
  onViewWaitingQueue: () => void;
}

const VisitsHeader: React.FC<VisitsHeaderProps> = ({ onAddVisit, onViewWaitingQueue }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Patient Visits</h1>
      <div className="space-x-2">
        <button
          onClick={onAddVisit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          New Visit
        </button>
        <button
          onClick={onViewWaitingQueue}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <List className="mr-2" size={20} />
          Waiting Queue
        </button>
      </div>
    </div>
  );
};

export default VisitsHeader;
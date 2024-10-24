import React from 'react';
import { ChevronRight } from 'lucide-react';

interface LabTestStatusProps {
  status: string;
  onAction: (stage: string) => void;
}

const LabTestStatus: React.FC<LabTestStatusProps> = ({ status, onAction }) => {
  const stages = [
    { name: 'Requested', key: 'request' },
    { name: 'Sample Collected', key: 'sampleCollection' },
    { name: 'Processed', key: 'labProcessing' },
    { name: 'Reviewed', key: 'resultsReview' },
    { name: 'Communicated', key: 'resultsCommunication' },
    { name: 'Doctor Reviewed', key: 'doctorReview' },
    { name: 'Consultation Completed', key: 'patientConsultation' },
  ];

  const currentStageIndex = stages.findIndex(stage => stage.name === status);
  const nextStage = stages[currentStageIndex + 1];

  const getStatusColor = (index: number) => {
    if (index < currentStageIndex) return 'bg-green-500 text-white';
    if (index === currentStageIndex) return 'bg-blue-500 text-white';
    return 'bg-gray-200 text-gray-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {stages.map((stage, index) => (
          <div
            key={stage.key}
            className={`w-2 h-2 rounded-full ${getStatusColor(index)}`}
            title={stage.name}
          />
        ))}
      </div>
      <span className="font-medium text-sm">{status}</span>
      {nextStage && (
        <button
          onClick={() => onAction(nextStage.key)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {nextStage.name}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default LabTestStatus;
import React, { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

interface BatchStage {
  name: string;
  status: 'pending' | 'inProgress' | 'completed';
}

const MonthlyClaimsBatchProcess: React.FC = () => {
  const [stages, setStages] = useState<BatchStage[]>([
    { name: 'Draft', status: 'completed' },
    { name: 'Submitted', status: 'inProgress' },
    { name: 'Verification and Adjudication', status: 'pending' },
    { name: 'Payment Processing', status: 'pending' },
    { name: 'Paid', status: 'pending' },
  ]);

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'inProgress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Monthly Claims Batch Process</h2>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.name}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStageColor(stage.status)} text-white`}>
                {stage.status === 'completed' ? (
                  <CheckCircle size={24} />
                ) : (
                  <span className="text-lg font-semibold">{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">{stage.name}</span>
            </div>
            {index < stages.length - 1 && (
              <ChevronRight className="text-gray-400" size={24} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MonthlyClaimsBatchProcess;
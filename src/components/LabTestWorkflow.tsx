import React from 'react';
import LabTestRequestModal from './LabTestRequestModal';
import SampleCollectionModal from './SampleCollectionModal';
import LabProcessingModal from './LabProcessingModal';
import ResultsReviewModal from './ResultsReviewModal';
import ResultsCommunicationModal from './ResultsCommunicationModal';
import DoctorReviewModal from './DoctorReviewModal';
import PatientConsultationModal from './PatientConsultationModal';

interface LabTestWorkflowProps {
  activeStage: string | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test: any;
}

const LabTestWorkflow: React.FC<LabTestWorkflowProps> = ({ activeStage, onClose, onSubmit, test }) => {
  const renderStageModal = () => {
    switch (activeStage) {
      case 'request':
        return <LabTestRequestModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      case 'sampleCollection':
        return <SampleCollectionModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      case 'labProcessing':
        return <LabProcessingModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      case 'resultsReview':
        return <ResultsReviewModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      case 'resultsCommunication':
        return <ResultsCommunicationModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      case 'doctorReview':
        return <DoctorReviewModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      case 'patientConsultation':
        return <PatientConsultationModal isOpen={true} onClose={onClose} onSubmit={onSubmit} test={test} />;
      default:
        return null;
    }
  };

  return renderStageModal();
};

export default LabTestWorkflow;
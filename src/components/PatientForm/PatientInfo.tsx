import React from 'react';
import PersonalInfo from './PersonalInfo';
import MedicalInfo from './MedicalInfo';
import InsuranceInfo from './InsuranceInfo';

interface PatientInfoProps {
  patient: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, onChange }) => {
  const [activeInfoTab, setActiveInfoTab] = React.useState<'personal' | 'medical' | 'insurance'>('personal');

  return (
    <div>
      <div className="mb-4">
        <div className="flex space-x-4">
          <button
            type="button"
            className={`py-1 px-2 ${activeInfoTab === 'personal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} rounded`}
            onClick={() => setActiveInfoTab('personal')}
          >
            Personal
          </button>
          <button
            type="button"
            className={`py-1 px-2 ${activeInfoTab === 'medical' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} rounded`}
            onClick={() => setActiveInfoTab('medical')}
          >
            Medical
          </button>
          <button
            type="button"
            className={`py-1 px-2 ${activeInfoTab === 'insurance' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} rounded`}
            onClick={() => setActiveInfoTab('insurance')}
          >
            Insurance
          </button>
        </div>
      </div>
      {activeInfoTab === 'personal' && <PersonalInfo patient={patient} onChange={onChange} />}
      {activeInfoTab === 'medical' && <MedicalInfo patient={patient} onChange={onChange} />}
      {activeInfoTab === 'insurance' && <InsuranceInfo patient={patient} onChange={onChange} />}
    </div>
  );
};

export default PatientInfo;
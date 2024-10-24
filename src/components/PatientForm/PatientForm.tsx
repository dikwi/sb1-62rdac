import React, { useState, useRef } from 'react';
import { X, Printer, Trash, AlertCircle, Save } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { addPatient, updatePatient, deletePatient } from '../../services/api';
import PatientInfo from './PatientInfo';
import Visits from './Visits';
import Prescriptions from './Prescriptions';
import PrintablePatientForm from './PrintablePatientForm';

interface PatientFormProps {
  patient: any;
  onClose: () => void;
  onSubmit: (patientData: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'visits' | 'prescriptions'>('info');
  const [patientData, setPatientData] = useState(patient || {});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const printableFormRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
      onClose();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleVisitsChange = (visits: any[]) => {
    setPatientData(prev => ({ ...prev, visits }));
  };

  const handlePrescriptionsChange = (prescriptions: any[]) => {
    setPatientData(prev => ({ ...prev, prescriptions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(patientData);
  };

  const handleDelete = () => {
    if (patient?.id) {
      deleteMutation.mutate(patient.id);
    }
  };

  const handlePrintPatientForm = () => {
    const printContent = printableFormRef.current;
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {patient ? `${patientData.name}` : 'New Patient'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('info')}
            >
              Patient Info
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'visits' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('visits')}
            >
              Visits
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'prescriptions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('prescriptions')}
            >
              Prescriptions
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          {activeTab === 'info' && (
            <PatientInfo patient={patientData} onChange={handleChange} />
          )}
          {activeTab === 'visits' && (
            <Visits visits={patientData.visits || []} onChange={handleVisitsChange} />
          )}
          {activeTab === 'prescriptions' && (
            <Prescriptions prescriptions={patientData.prescriptions || []} onChange={handlePrescriptionsChange} />
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              <Trash size={16} />
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handlePrintPatientForm}
                className="bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300"
              >
                <Printer size={16} />
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                <Save size={16} />
              </button>
            </div>
          </div>
        </form>

        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4 text-red-500">
                <AlertCircle size={24} className="mr-2" />
                <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              </div>
              <p className="mb-4">Are you sure you want to delete this patient? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'none' }}>
        <div ref={printableFormRef}>
          <PrintablePatientForm patient={patientData} />
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchPatients, fetchUsers } from '../services/api';

interface LabTestRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test?: any;
}

const LabTestRequestModal: React.FC<LabTestRequestModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    testType: '',
    priority: 'Routine',
    requestedBy: '',
    clinicalInfo: '',
    specialInstructions: '',
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: users } = useQuery('users', fetchUsers);

  useEffect(() => {
    if (test) {
      setFormData({
        patientId: test.patientId,
        testType: test.testType,
        priority: test.priority,
        requestedBy: test.requestedBy,
        clinicalInfo: test.clinicalInfo || '',
        specialInstructions: test.specialInstructions || '',
      });
    }
  }, [test]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Lab Test Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Patient</option>
              {patients?.map((patient: any) => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="testType" className="block text-sm font-medium text-gray-700">Test Type</label>
            <input
              type="text"
              id="testType"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="Routine">Routine</option>
              <option value="Urgent">Urgent</option>
              <option value="STAT">STAT</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700">Requested By</label>
            <select
              id="requestedBy"
              name="requestedBy"
              value={formData.requestedBy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Doctor</option>
              {users?.filter((user: any) => user.role === 'Doctor').map((doctor: any) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="clinicalInfo" className="block text-sm font-medium text-gray-700">Clinical Information</label>
            <textarea
              id="clinicalInfo"
              name="clinicalInfo"
              value={formData.clinicalInfo}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">Special Instructions</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabTestRequestModal;
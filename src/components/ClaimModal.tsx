import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchPatients, fetchInsurers } from '../services/api';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: any) => void;
}

const ClaimModal: React.FC<ClaimModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    insurerId: '',
    services: [{ description: '', amount: '' }],
    totalAmount: 0,
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: insurers } = useQuery('insurers', fetchInsurers);

  useEffect(() => {
    const total = formData.services.reduce((sum, service) => sum + parseFloat(service.amount || '0'), 0);
    setFormData(prev => ({ ...prev, totalAmount: total }));
  }, [formData.services]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index: number, field: 'description' | 'amount', value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { description: '', amount: '' }],
    }));
  };

  const removeService = (index: number) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Submit New Claim</h2>
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
            <label htmlFor="insurerId" className="block text-sm font-medium text-gray-700">Insurer</label>
            <select
              id="insurerId"
              name="insurerId"
              value={formData.insurerId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Insurer</option>
              {insurers?.map((insurer: any) => (
                <option key={insurer.id} value={insurer.id}>{insurer.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Services</label>
            {formData.services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  placeholder="Service description"
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
                <input
                  type="number"
                  value={service.amount}
                  onChange={(e) => handleServiceChange(index, 'amount', e.target.value)}
                  placeholder="Amount"
                  className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
                <button type="button" onClick={() => removeService(index)} className="text-red-500">
                  <X size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addService} className="mt-2 text-blue-500">
              + Add Service
            </button>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold">Total Amount: ${formData.totalAmount.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimModal;
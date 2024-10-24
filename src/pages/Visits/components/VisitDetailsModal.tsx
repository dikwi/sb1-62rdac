import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { addInvoice, updateVisit } from '../../../services/api';
import { Visit, VisitDetails } from '../types';

interface VisitDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
  onUpdate?: (visitData: VisitDetails) => void;
}

const VisitDetailsModal: React.FC<VisitDetailsModalProps> = ({
  isOpen,
  onClose,
  visit,
  onUpdate
}) => {
  const [formData, setFormData] = useState<VisitDetails>({
    id: '',
    patientId: '',
    patientName: '',
    category: '',
    dateIn: new Date().toISOString(),
    doctor: '',
    diagnosis: '',
    department: '',
    room: '',
    step: 1,
    status: 'Pending',
    timeElapsed: '',
    dateOut: '',
    allergy: '',
    chiefComplaint: '',
    historyPresentIllness: '',
    socialHistory: {
      smoking: '',
      alcohol: ''
    },
    pastMedicalHistory: {
      htn: '',
      t2dm: '',
      antiTB: ''
    },
    specialist: '',
    newOld: 'NEW',
    description: '',
    services: {
      labo: false,
      echo: false,
      xray: false,
      endo: false,
      scan: false,
      ecg: false,
      kine: false,
      vaccin: false
    }
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateVisit, {
    onSuccess: () => {
      queryClient.invalidateQueries('visits');
      onClose();
    }
  });

  const addInvoiceMutation = useMutation(addInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
      onClose();
    }
  });

  useEffect(() => {
    if (visit) {
      setFormData(prev => ({
        ...prev,
        ...visit
      }));
    }
  }, [visit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedData = { ...prev };
      if (name.includes('.')) {
        const [section, field] = name.split('.');
        if (section === 'socialHistory' || section === 'pastMedicalHistory') {
          updatedData[section] = {
            ...updatedData[section],
            [field]: value
          };
        }
      } else if (name === 'services') {
        updatedData.services = {
          ...updatedData.services,
          [value]: e.target.checked
        };
      } else {
        updatedData[name as keyof VisitDetails] = value;
      }
      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData);
    } else {
      updateMutation.mutate(formData);
    }
  };

  const handleCreateInvoice = () => {
    if (!visit) return;
    
    const invoiceData = {
      patientId: visit.patientId,
      patientName: visit.patientName,
      date: new Date().toISOString(),
      items: [
        { description: 'Consultation', quantity: 1, unitPrice: 100 }
      ],
      status: 'Unpaid'
    };
    addInvoiceMutation.mutate(invoiceData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Visit Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Department</option>
                <option value="ER">Emergency Room</option>
                <option value="IPD">Inpatient Department</option>
                <option value="OPD">Outpatient Department</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specialist</label>
              <input
                type="text"
                name="specialist"
                value={formData.specialist}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chief Complaint</label>
            <textarea
              name="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">History of Present Illness</label>
            <textarea
              name="historyPresentIllness"
              value={formData.historyPresentIllness}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Social History</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Smoking</label>
                  <input
                    type="text"
                    name="socialHistory.smoking"
                    value={formData.socialHistory?.smoking}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alcohol</label>
                  <input
                    type="text"
                    name="socialHistory.alcohol"
                    value={formData.socialHistory?.alcohol}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Past Medical History</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">HTN</label>
                  <input
                    type="text"
                    name="pastMedicalHistory.htn"
                    value={formData.pastMedicalHistory?.htn}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">T2DM</label>
                  <input
                    type="text"
                    name="pastMedicalHistory.t2dm"
                    value={formData.pastMedicalHistory?.t2dm}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Anti TB</label>
                  <input
                    type="text"
                    name="pastMedicalHistory.antiTB"
                    value={formData.pastMedicalHistory?.antiTB}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Services</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(formData.services || {}).map(([service, checked]) => (
                <label key={service} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={checked}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleCreateInvoice}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Create Invoice
            </button>
            <div className="space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitDetailsModal;
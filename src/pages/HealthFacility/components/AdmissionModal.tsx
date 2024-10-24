import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchPatients, fetchUsers } from '../../../services/api';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilityId: string;
}

const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose, facilityId }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    wardId: '',
    bedNumber: '',
    admissionDate: new Date().toISOString().split('T')[0],
    admissionTime: new Date().toTimeString().slice(0, 5),
    admissionType: 'regular',
    diagnosis: '',
    notes: '',
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: doctors } = useQuery('users', () => fetchUsers().then(users => 
    users.filter(user => user.role === 'Doctor')
  ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement admission logic
    console.log('Admission data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Patient Admission</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient</label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Patient</option>
                {patients?.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attending Doctor</label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Doctor</option>
                {doctors?.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ward</label>
              <select
                value={formData.wardId}
                onChange={(e) => setFormData(prev => ({ ...prev, wardId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Ward</option>
                <option value="general">General Ward</option>
                <option value="icu">ICU</option>
                <option value="pediatric">Pediatric Ward</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bed Number</label>
              <select
                value={formData.bedNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, bedNumber: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Bed</option>
                <option value="101A">101-A</option>
                <option value="101B">101-B</option>
                <option value="102A">102-A</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Admission Date</label>
              <input
                type="date"
                value={formData.admissionDate}
                onChange={(e) => setFormData(prev => ({ ...prev, admissionDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Admission Time</label>
              <input
                type="time"
                value={formData.admissionTime}
                onChange={(e) => setFormData(prev => ({ ...prev, admissionTime: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Admission Type</label>
              <select
                value={formData.admissionType}
                onChange={(e) => setFormData(prev => ({ ...prev, admissionType: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="regular">Regular</option>
                <option value="emergency">Emergency</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initial Diagnosis</label>
            <textarea
              value={formData.diagnosis}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Admit Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionModal;
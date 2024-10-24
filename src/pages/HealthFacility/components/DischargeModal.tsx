import React, { useState } from 'react';
import { X } from 'lucide-react';

interface DischargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
}

const DischargeModal: React.FC<DischargeModalProps> = ({ isOpen, onClose, patient }) => {
  const [formData, setFormData] = useState({
    dischargeDate: new Date().toISOString().split('T')[0],
    dischargeTime: new Date().toTimeString().slice(0, 5),
    dischargeType: 'regular',
    dischargeSummary: '',
    followUpDate: '',
    medications: '',
    instructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement discharge logic
    console.log('Discharge data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Discharge Patient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Discharge Date</label>
              <input
                type="date"
                value={formData.dischargeDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dischargeDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Discharge Time</label>
              <input
                type="time"
                value={formData.dischargeTime}
                onChange={(e) => setFormData(prev => ({ ...prev, dischargeTime: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Discharge Type</label>
              <select
                value={formData.dischargeType}
                onChange={(e) => setFormData(prev => ({ ...prev, dischargeType: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="regular">Regular</option>
                <option value="transfer">Transfer to Another Facility</option>
                <option value="against-advice">Against Medical Advice</option>
                <option value="deceased">Deceased</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData(prev => ({ ...prev, followUpDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discharge Summary</label>
            <textarea
              value={formData.dischargeSummary}
              onChange={(e) => setFormData(prev => ({ ...prev, dischargeSummary: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discharge Medications</label>
            <textarea
              value={formData.medications}
              onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="List medications with dosage and duration..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Post-Discharge Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Special instructions for patient care after discharge..."
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
              Discharge Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DischargeModal;
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  facilityId: string;
}

const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, patient, facilityId }) => {
  const [formData, setFormData] = useState({
    transferDate: new Date().toISOString().split('T')[0],
    transferTime: new Date().toTimeString().slice(0, 5),
    targetWard: '',
    targetBed: '',
    reason: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement transfer logic
    console.log('Transfer data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Transfer Patient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Transfer Date</label>
              <input
                type="date"
                value={formData.transferDate}
                onChange={(e) => setFormData(prev => ({ ...prev, transferDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Transfer Time</label>
              <input
                type="time"
                value={formData.transferTime}
                onChange={(e) => setFormData(prev => ({ ...prev, transferTime: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Ward</label>
              <select
                value={formData.targetWard}
                onChange={(e) => setFormData(prev => ({ ...prev, targetWard: e.target.value }))}
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
              <label className="block text-sm font-medium text-gray-700">Target Bed</label>
              <select
                value={formData.targetBed}
                onChange={(e) => setFormData(prev => ({ ...prev, targetBed: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Bed</option>
                <option value="101A">101-A</option>
                <option value="101B">101-B</option>
                <option value="102A">102-A</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Transfer</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
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
              Transfer Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
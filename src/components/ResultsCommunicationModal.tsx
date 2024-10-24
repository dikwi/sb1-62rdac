import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ResultsCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test?: any;
}

const ResultsCommunicationModal: React.FC<ResultsCommunicationModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [formData, setFormData] = useState({
    communicationDate: '',
    communicationTime: '',
    communicatedBy: '',
    communicationMethod: '',
    recipientName: '',
    recipientRole: '',
    notes: '',
  });

  useEffect(() => {
    if (test) {
      setFormData({
        communicationDate: test.communicationDate || '',
        communicationTime: test.communicationTime || '',
        communicatedBy: test.communicatedBy || '',
        communicationMethod: test.communicationMethod || '',
        recipientName: test.recipientName || '',
        recipientRole: test.recipientRole || '',
        notes: test.notes || '',
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
          <h2 className="text-2xl font-bold">Results Communication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="communicationDate" className="block text-sm font-medium text-gray-700">Communication Date</label>
            <input
              type="date"
              id="communicationDate"
              name="communicationDate"
              value={formData.communicationDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="communicationTime" className="block text-sm font-medium text-gray-700">Communication Time</label>
            <input
              type="time"
              id="communicationTime"
              name="communicationTime"
              value={formData.communicationTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="communicatedBy" className="block text-sm font-medium text-gray-700">Communicated By</label>
            <input
              type="text"
              id="communicatedBy"
              name="communicatedBy"
              value={formData.communicatedBy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="communicationMethod" className="block text-sm font-medium text-gray-700">Communication Method</label>
            <select
              id="communicationMethod"
              name="communicationMethod"
              value={formData.communicationMethod}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Method</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
              <option value="In Person">In Person</option>
              <option value="Patient Portal">Patient Portal</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">Recipient Name</label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="recipientRole" className="block text-sm font-medium text-gray-700">Recipient Role</label>
            <input
              type="text"
              id="recipientRole"
              name="recipientRole"
              value={formData.recipientRole}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
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
              Submit Results Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultsCommunicationModal;
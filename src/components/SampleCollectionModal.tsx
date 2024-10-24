import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SampleCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test?: any;
}

const SampleCollectionModal: React.FC<SampleCollectionModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [formData, setFormData] = useState({
    collectionDate: '',
    collectionTime: '',
    collectedBy: '',
    sampleType: '',
    sampleCondition: '',
    notes: '',
  });

  useEffect(() => {
    if (test) {
      setFormData({
        collectionDate: test.collectionDate || '',
        collectionTime: test.collectionTime || '',
        collectedBy: test.collectedBy || '',
        sampleType: test.sampleType || '',
        sampleCondition: test.sampleCondition || '',
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
          <h2 className="text-2xl font-bold">Sample Collection</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-700">Collection Date</label>
            <input
              type="date"
              id="collectionDate"
              name="collectionDate"
              value={formData.collectionDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="collectionTime" className="block text-sm font-medium text-gray-700">Collection Time</label>
            <input
              type="time"
              id="collectionTime"
              name="collectionTime"
              value={formData.collectionTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="collectedBy" className="block text-sm font-medium text-gray-700">Collected By</label>
            <input
              type="text"
              id="collectedBy"
              name="collectedBy"
              value={formData.collectedBy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sampleType" className="block text-sm font-medium text-gray-700">Sample Type</label>
            <input
              type="text"
              id="sampleType"
              name="sampleType"
              value={formData.sampleType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sampleCondition" className="block text-sm font-medium text-gray-700">Sample Condition</label>
            <select
              id="sampleCondition"
              name="sampleCondition"
              value={formData.sampleCondition}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Condition</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
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
              Submit Sample Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SampleCollectionModal;
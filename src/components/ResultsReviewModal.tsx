import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ResultsReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test?: any;
}

const ResultsReviewModal: React.FC<ResultsReviewModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [formData, setFormData] = useState({
    reviewDate: '',
    reviewTime: '',
    reviewedBy: '',
    interpretation: '',
    comments: '',
    status: '',
  });

  useEffect(() => {
    if (test) {
      setFormData({
        reviewDate: test.reviewDate || '',
        reviewTime: test.reviewTime || '',
        reviewedBy: test.reviewedBy || '',
        interpretation: test.interpretation || '',
        comments: test.comments || '',
        status: test.status || '',
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
          <h2 className="text-2xl font-bold">Results Review</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reviewDate" className="block text-sm font-medium text-gray-700">Review Date</label>
            <input
              type="date"
              id="reviewDate"
              name="reviewDate"
              value={formData.reviewDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reviewTime" className="block text-sm font-medium text-gray-700">Review Time</label>
            <input
              type="time"
              id="reviewTime"
              name="reviewTime"
              value={formData.reviewTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reviewedBy" className="block text-sm font-medium text-gray-700">Reviewed By</label>
            <input
              type="text"
              id="reviewedBy"
              name="reviewedBy"
              value={formData.reviewedBy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="interpretation" className="block text-sm font-medium text-gray-700">Interpretation</label>
            <textarea
              id="interpretation"
              name="interpretation"
              value={formData.interpretation}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Needs Further Review">Needs Further Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Results Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultsReviewModal;
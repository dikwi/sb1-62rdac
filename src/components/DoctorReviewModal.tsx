import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DoctorReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test?: any;
}

const DoctorReviewModal: React.FC<DoctorReviewModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [formData, setFormData] = useState({
    reviewDate: '',
    reviewTime: '',
    reviewedBy: '',
    clinicalInterpretation: '',
    recommendations: '',
    followUpRequired: false,
    followUpDetails: '',
  });

  useEffect(() => {
    if (test) {
      setFormData({
        reviewDate: test.reviewDate || '',
        reviewTime: test.reviewTime || '',
        reviewedBy: test.reviewedBy || '',
        clinicalInterpretation: test.clinicalInterpretation || '',
        recommendations: test.recommendations || '',
        followUpRequired: test.followUpRequired || false,
        followUpDetails: test.followUpDetails || '',
      });
    }
  }, [test]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
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
          <h2 className="text-2xl font-bold">Doctor Review</h2>
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
            <label htmlFor="clinicalInterpretation" className="block text-sm font-medium text-gray-700">Clinical Interpretation</label>
            <textarea
              id="clinicalInterpretation"
              name="clinicalInterpretation"
              value={formData.clinicalInterpretation}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="recommendations" className="block text-sm font-medium text-gray-700">Recommendations</label>
            <textarea
              id="recommendations"
              name="recommendations"
              value={formData.recommendations}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="followUpRequired"
                checked={formData.followUpRequired}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Follow-up Required</span>
            </label>
          </div>
          {formData.followUpRequired && (
            <div className="mb-4">
              <label htmlFor="followUpDetails" className="block text-sm font-medium text-gray-700">Follow-up Details</label>
              <textarea
                id="followUpDetails"
                name="followUpDetails"
                value={formData.followUpDetails}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Doctor Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorReviewModal;
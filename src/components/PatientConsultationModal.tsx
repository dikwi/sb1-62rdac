import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PatientConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  test?: any;
}

const PatientConsultationModal: React.FC<PatientConsultationModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [formData, setFormData] = useState({
    consultationDate: '',
    consultationTime: '',
    consultedBy: '',
    patientUnderstanding: '',
    patientQuestions: '',
    additionalInformation: '',
    nextSteps: '',
  });

  useEffect(() => {
    if (test) {
      setFormData({
        consultationDate: test.consultationDate || '',
        consultationTime: test.consultationTime || '',
        consultedBy: test.consultedBy || '',
        patientUnderstanding: test.patientUnderstanding || '',
        patientQuestions: test.patientQuestions || '',
        additionalInformation: test.additionalInformation || '',
        nextSteps: test.nextSteps || '',
      });
    }
  }, [test]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <h2 className="text-2xl font-bold">Patient Consultation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="consultationDate" className="block text-sm font-medium text-gray-700">Consultation Date</label>
            <input
              type="date"
              id="consultationDate"
              name="consultationDate"
              value={formData.consultationDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="consultationTime" className="block text-sm font-medium text-gray-700">Consultation Time</label>
            <input
              type="time"
              id="consultationTime"
              name="consultationTime"
              value={formData.consultationTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="consultedBy" className="block text-sm font-medium text-gray-700">Consulted By</label>
            <input
              type="text"
              id="consultedBy"
              name="consultedBy"
              value={formData.consultedBy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="patientUnderstanding" className="block text-sm font-medium text-gray-700">Patient Understanding</label>
            <textarea
              id="patientUnderstanding"
              name="patientUnderstanding"
              value={formData.patientUnderstanding}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="patientQuestions" className="block text-sm font-medium text-gray-700">Patient Questions</label>
            <textarea
              id="patientQuestions"
              name="patientQuestions"
              value={formData.patientQuestions}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="additionalInformation" className="block text-sm font-medium text-gray-700">Additional Information</label>
            <textarea
              id="additionalInformation"
              name="additionalInformation"
              value={formData.additionalInformation}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="nextSteps" className="block text-sm font-medium text-gray-700">Next Steps</label>
            <textarea
              id="nextSteps"
              name="nextSteps"
              value={formData.nextSteps}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Patient Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientConsultationModal;
import React, { useState, useEffect } from 'react';
import { X, Paperclip } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchPatients, fetchUsers, fetchLaboItems } from '../services/api';

interface LabTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (test: any) => void;
  test?: any;
}

const LabTestModal: React.FC<LabTestModalProps> = ({ isOpen, onClose, onSubmit, test }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'tests' | 'results'>('general');
  const [formData, setFormData] = useState({
    patientId: '',
    testType: '',
    priority: 'Routine',
    status: 'Pending',
    requestedBy: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    checkedItems: [],
    pdfResults: {
      labReport: null,
      otherAttachments: null,
    },
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: users } = useQuery('users', fetchUsers);
  const { data: laboItems } = useQuery('laboItems', fetchLaboItems);

  useEffect(() => {
    if (test) {
      setFormData({
        ...test,
        date: test.date || new Date().toISOString().split('T')[0],
        checkedItems: test.checkedItems || [],
        pdfResults: test.pdfResults || { labReport: null, otherAttachments: null },
      });
    }
  }, [test]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (item: string) => {
    setFormData(prev => ({
      ...prev,
      checkedItems: prev.checkedItems.includes(item)
        ? prev.checkedItems.filter(i => i !== item)
        : [...prev.checkedItems, item],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'labReport' | 'otherAttachments') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        pdfResults: {
          ...prev.pdfResults,
          [field]: file,
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const groupedLaboItems = laboItems?.reduce((acc: any, item: any) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push(item);
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-6xl my-8">
        <div className="sticky top-0 bg-white z-10 rounded-t-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">{test ? 'Edit Lab Test' : 'Request Lab Test'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="flex space-x-4 p-4 border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
              onClick={() => setActiveTab('general')}
            >
              General Information
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'tests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
              onClick={() => setActiveTab('tests')}
            >
              Lab Tests
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'results' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
              onClick={() => setActiveTab('results')}
            >
              Results
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <form onSubmit={handleSubmit}>
            {activeTab === 'general' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* ... (general information fields remain unchanged) ... */}
              </div>
            )}
            {activeTab === 'tests' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Lab Test Items</h3>
                {groupedLaboItems && Object.entries(groupedLaboItems).map(([group, items]: [string, any]) => (
                  <div key={group} className="mb-4">
                    <h4 className="text-md font-medium mb-2">{group}</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {items.map((item: any) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={item.id.toString()}
                            checked={formData.checkedItems.includes(item.name)}
                            onChange={() => handleCheckboxChange(item.name)}
                            className="mr-2"
                          />
                          <label htmlFor={item.id.toString()}>{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'results' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">PDF Results</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* ... (file upload fields remain unchanged) ... */}
                </div>
              </div>
            )}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {test ? 'Update Lab Test' : 'Request Lab Test'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabTestModal;
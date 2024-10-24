import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (staff: any) => void;
  staff?: any;
}

const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose, onSubmit, staff }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contact: '',
    email: '',
    employmentType: '',
    baseSalary: '',
    caseBasedEarnings: '',
    bonuses: '',
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        role: staff.role || '',
        contact: staff.contact || '',
        email: staff.email || '',
        employmentType: staff.employmentType || '',
        baseSalary: staff.baseSalary ? staff.baseSalary.toString() : '',
        caseBasedEarnings: staff.caseBasedEarnings ? staff.caseBasedEarnings.toString() : '',
        bonuses: staff.bonuses ? staff.bonuses.toString() : '',
      });
    }
  }, [staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      baseSalary: parseFloat(formData.baseSalary),
      caseBasedEarnings: parseFloat(formData.caseBasedEarnings),
      bonuses: parseFloat(formData.bonuses),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{staff ? 'Edit Staff' : 'Add New Staff'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Role</option>
              <option value="Doctor">Doctor</option>
              <option value="Midwife">Midwife</option>
              <option value="Nurse">Nurse</option>
              <option value="labtech">LabTech</option>
              <option value="Cashier">Cashier</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Employment Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">Base Salary</label>
            <input
              type="number"
              id="baseSalary"
              name="baseSalary"
              value={formData.baseSalary}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="caseBasedEarnings" className="block text-sm font-medium text-gray-700">Case-Based Earnings</label>
            <input
              type="number"
              id="caseBasedEarnings"
              name="caseBasedEarnings"
              value={formData.caseBasedEarnings}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bonuses" className="block text-sm font-medium text-gray-700">Bonuses</label>
            <input
              type="number"
              id="bonuses"
              name="bonuses"
              value={formData.bonuses}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {staff ? 'Update Staff' : 'Add Staff'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;

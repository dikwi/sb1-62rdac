import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchStaff } from '../services/api';

interface PayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payrollData: any) => void;
}

const PayrollModal: React.FC<PayrollModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    payPeriod: '',
    staffId: '',
    baseSalary: 0,
    caseBasePay: 0,
    incentives: 0,
    deductions: 0,
    totalPay: 0,
  });

  const { data: staff } = useQuery('staff', fetchStaff);

  useEffect(() => {
    const total = formData.baseSalary + formData.caseBasePay + formData.incentives - formData.deductions;
    setFormData(prev => ({ ...prev, totalPay: total }));
  }, [formData.baseSalary, formData.caseBasePay, formData.incentives, formData.deductions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'staffId' ? value : parseFloat(value) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Process Payroll</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="payPeriod" className="block text-sm font-medium text-gray-700">Pay Period</label>
              <input
                type="text"
                id="payPeriod"
                name="payPeriod"
                value={formData.payPeriod}
                onChange={handleChange}
                placeholder="e.g., January 2024"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">Staff</label>
              <select
                id="staffId"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Staff</option>
                {staff?.map((member: any) => (
                  <option key={member.id} value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
            <div>
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
            <div>
              <label htmlFor="caseBasePay" className="block text-sm font-medium text-gray-700">Case-base Pay</label>
              <input
                type="number"
                id="caseBasePay"
                name="caseBasePay"
                value={formData.caseBasePay}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="incentives" className="block text-sm font-medium text-gray-700">Incentives</label>
              <input
                type="number"
                id="incentives"
                name="incentives"
                value={formData.incentives}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">Deductions</label>
              <input
                type="number"
                id="deductions"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="totalPay" className="block text-sm font-medium text-gray-700">Total Pay</label>
            <input
              type="number"
              id="totalPay"
              name="totalPay"
              value={formData.totalPay}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Process Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollModal;
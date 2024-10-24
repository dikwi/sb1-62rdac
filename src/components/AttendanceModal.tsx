import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchStaff } from '../services/api';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (attendanceData: any) => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    staffId: '',
    date: '',
    clockIn: '',
    clockOut: '',
  });

  const { data: staff } = useQuery('staff', fetchStaff);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const staffMember = staff?.find((s: any) => s.id === formData.staffId);
    const totalHours = calculateTotalHours(formData.clockIn, formData.clockOut);
    onSubmit({
      ...formData,
      staffName: staffMember?.name,
      totalHours,
    });
  };

  const calculateTotalHours = (clockIn: string, clockOut: string) => {
    const start = new Date(`2000-01-01T${clockIn}`);
    const end = new Date(`2000-01-01T${clockOut}`);
    const diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
    return Math.round(diff * 100) / 100;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Attendance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">Staff Member</label>
            <select
              id="staffId"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Staff Member</option>
              {staff?.map((member: any) => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clockIn" className="block text-sm font-medium text-gray-700">Clock In</label>
            <input
              type="time"
              id="clockIn"
              name="clockIn"
              value={formData.clockIn}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="clockOut" className="block text-sm font-medium text-gray-700">Clock Out</label>
            <input
              type="time"
              id="clockOut"
              name="clockOut"
              value={formData.clockOut}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
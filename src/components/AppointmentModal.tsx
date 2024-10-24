import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { addAppointment, updateAppointment, fetchPatients, fetchDoctors } from '../services/api';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: any;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, appointment }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    status: 'Scheduled',
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: doctors } = useQuery('doctors', fetchDoctors);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (appointment) {
      const appointmentDate = new Date(appointment.date);
      setFormData({
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        date: appointmentDate.toISOString().split('T')[0],
        time: appointmentDate.toTimeString().split(' ')[0].slice(0, 5),
        status: appointment.status,
      });
    }
  }, [appointment]);

  const addMutation = useMutation(addAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
      onClose();
    },
  });

  const updateMutation = useMutation(updateAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = {
      ...formData,
      date: new Date(`${formData.date}T${formData.time}`).toISOString(),
    };
    if (appointment) {
      updateMutation.mutate({ id: appointment.id, ...appointmentData });
    } else {
      addMutation.mutate(appointmentData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{appointment ? 'Edit Appointment' : 'Add New Appointment'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Patient</option>
              {patients?.map((patient) => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select Doctor</option>
              {doctors?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
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
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
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
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {appointment ? 'Update Appointment' : 'Add Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
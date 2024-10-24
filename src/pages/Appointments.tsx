import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Calendar, Clock, User, Plus, Edit, Trash, RefreshCw, Send, Filter } from 'lucide-react';
import { fetchAppointments, deleteAppointment, syncGoogleCalendar } from '../services/api';
import AppointmentModal from '../components/AppointmentModal';

const Appointments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'tomorrow' | 'byDoctor'>('all');
  const { data: appointments, isLoading, error } = useQuery('appointments', fetchAppointments);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  const syncMutation = useMutation(syncGoogleCalendar, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSyncGoogleCalendar = () => {
    syncMutation.mutate();
  };

  const handleSendToTelegram = () => {
    console.log('Sending appointments to Telegram...');
  };

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];

    switch (filter) {
      case 'tomorrow':
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        return appointments.filter((appointment: any) => appointment.date.startsWith(tomorrowString));
      case 'byDoctor':
        return [...appointments].sort((a: any, b: any) => a.doctorName.localeCompare(b.doctorName));
      default:
        return [...appointments].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [appointments, filter]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching appointments</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddAppointment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Add Appointment
          </button>
          <button
            onClick={handleSyncGoogleCalendar}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <RefreshCw className="mr-2" size={20} />
            Sync with Google Calendar
          </button>
          <button
            onClick={handleSendToTelegram}
            className="bg-blue-400 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Send className="mr-2" size={20} />
            Send to Telegram
          </button>
        </div>
      </div>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('tomorrow')}
          className={`px-4 py-2 rounded-md ${filter === 'tomorrow' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Tomorrow
        </button>
        <button
          onClick={() => setFilter('byDoctor')}
          className={`px-4 py-2 rounded-md ${filter === 'byDoctor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          By Doctor
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment: any) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(appointment.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    appointment.status === 'Canceled' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditAppointment(appointment)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default Appointments;
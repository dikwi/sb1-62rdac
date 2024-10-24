import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPatients, fetchDoctors, addVisit } from '../../../services/api';

interface VisitRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisitRegistrationModal: React.FC<VisitRegistrationModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: '',
    nationalId: '',
    dateOfBirth: '',
    yearOfBirth: '',
    address: '',
    district: '',
    province: '',
    category: 'Resident',
    source: '',
    paymentType: '',
    dateIn: new Date().toISOString().split('T')[0],
    timeIn: new Date().toTimeString().slice(0, 5),
    dateOut: '',
    doctorId: '',
    department: 'IPD',
    specialist: '',
    appointmentType: 'NEW',
    allergy: 'unknown',
    chiefComplaint: '',
    historyPresentIllness: '',
    socialHistory: {
      smoking: '',
      alcohol: '',
    },
    pastMedicalHistory: {
      pmh: '',
      htn: '',
      t2dm: '',
      tb: '',
    },
    diagnosis: {
      primary: '',
      secondary: '',
    },
    services: {
      labo: false,
      echo: false,
      xray: false,
      endo: false,
      scan: false,
      ecg: false,
      kine: false,
      vaccin: false,
    },
    room: '',
    step: 1,
    status: 'Pending',
    timeElapsed: '0m',
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: doctors } = useQuery('doctors', fetchDoctors);

  const addVisitMutation = useMutation(addVisit, {
    onSuccess: () => {
      queryClient.invalidateQueries('visits');
      onClose();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedData = { ...prev };
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        (updatedData[parent as keyof typeof updatedData] as any)[child] = value;
      } else {
        (updatedData as any)[name] = value;
      }
      return updatedData;
    });
  };

  const handleServiceChange = (service: keyof typeof formData.services) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitData = {
      ...formData,
      id: Date.now().toString(),
      dateIn: `${formData.dateIn}T${formData.timeIn}`,
    };
    addVisitMutation.mutate(visitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Visit Registration</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Additional Patient Details */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="Resident">Resident</option>
                <option value="Expat">Expat</option>
                <option value="Tourist">Tourist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Province</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Visit Details */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Doctor</option>
                {doctors?.map((doctor: any) => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="IPD">IPD</option>
                <option value="OPD">OPD</option>
                <option value="ER">ER</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Room</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Chief Complaint</label>
              <textarea
                name="chiefComplaint"
                value={formData.chiefComplaint}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">History of Present Illness</label>
              <textarea
                name="historyPresentIllness"
                value={formData.historyPresentIllness}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Services Required</label>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(formData.services).map(([service, checked]) => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleServiceChange(service as keyof typeof formData.services)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="text-sm text-gray-700 capitalize">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Register Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitRegistrationModal;
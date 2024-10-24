import React, { useState } from 'react';
import { Edit, Trash, Copy, Save, Printer } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchDrugsAndServices, fetchUsers } from '../../services/api';
import PrintablePrescriptions from './PrintablePrescriptions';

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  duration: number;
  date: string;
  quantity: number;
  doctor: string;
  note?: string;
}

interface PrescriptionsProps {
  prescriptions: Prescription[];
  onChange: (prescriptions: Prescription[]) => void;
}

const Prescriptions: React.FC<PrescriptionsProps> = ({ prescriptions, onChange }) => {
  const [editingPrescription, setEditingPrescription] = useState<Prescription | null>(null);
  const [newPrescription, setNewPrescription] = useState<Prescription>({
    id: 0,
    medication: '',
    dosage: '',
    frequency: '',
    duration: 1,
    date: new Date().toISOString().slice(0, 10),
    quantity: 0,
    doctor: '',
    note: '',
  });

  const { data: drugsAndServices } = useQuery('drugsAndServices', fetchDrugsAndServices);
  const { data: users } = useQuery('users', fetchUsers);

  const doctors = users?.filter(user => user.role === 'Doctor') || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, prescription: Prescription) => {
    const { name, value } = e.target;
    if (prescription.id === 0) {
      setNewPrescription({ ...newPrescription, [name]: value });
    } else {
      setEditingPrescription({ ...editingPrescription!, [name]: value });
    }
  };

  const handleAddPrescription = () => {
    if (newPrescription.medication && newPrescription.dosage) {
      const updatedPrescriptions = [...prescriptions, { ...newPrescription, id: Date.now() }];
      onChange(updatedPrescriptions);
      setNewPrescription({
        id: 0,
        medication: '',
        dosage: '',
        frequency: '',
        duration: 1,
        date: new Date().toISOString().slice(0, 10),
        quantity: 0,
        doctor: '',
        note: '',
      });
    }
  };

  const handleEditPrescription = (prescription: Prescription) => {
    setEditingPrescription(prescription);
  };

  const handleSaveEdit = () => {
    if (editingPrescription) {
      const updatedPrescriptions = prescriptions.map(p =>
        p.id === editingPrescription.id ? editingPrescription : p
      );
      onChange(updatedPrescriptions);
      setEditingPrescription(null);
    } else if (newPrescription.medication && newPrescription.dosage) {
      // Save new prescription
      const updatedPrescriptions = [...prescriptions, { ...newPrescription, id: Date.now() }];
      onChange(updatedPrescriptions);
      setNewPrescription({
        id: 0,
        medication: '',
        dosage: '',
        frequency: '',
        duration: 1,
        date: new Date().toISOString().slice(0, 10),
        quantity: 0,
        doctor: '',
        note: '',
      });
    }
  };

  const handleDeletePrescription = (id: number) => {
    const updatedPrescriptions = prescriptions.filter(p => p.id !== id);
    onChange(updatedPrescriptions);
  };

  const handleCopyPrescription = (prescription: Prescription) => {
    const newPrescription = {
      ...prescription,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    const updatedPrescriptions = [...prescriptions, newPrescription];
    onChange(updatedPrescriptions);
  };

  const renderPrescriptionRow = (prescription: Prescription, isEditing: boolean) => (
    <tr key={prescription.id} className="text-sm">
      <td className="w-1/5">
        <select
          name="medication"
          value={prescription.medication}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="">Select Medication</option>
          {drugsAndServices?.drugs.map(drug => (
            <option key={drug.id} value={drug.name}>{drug.name}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          name="dosage"
          value={prescription.dosage}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <input
          type="text"
          name="frequency"
          value={prescription.frequency}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <select
          name="duration"
          value={prescription.duration}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        >
          {[...Array(60)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} day{i !== 0 ? 's' : ''}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          name="quantity"
          value={prescription.quantity}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <input
          type="date"
          name="date"
          value={prescription.date}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <select
          name="doctor"
          value={prescription.doctor}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
          ))}
        </select>
      </td>
      <td>
        <textarea
          name="note"
          value={prescription.note}
          onChange={(e) => handleInputChange(e, prescription)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSaveEdit} className="text-green-500 hover:text-green-700 mr-2">
            <Save size={16} />
          </button>
        ) : (
          <>
            <button onClick={() => handleEditPrescription(prescription)} className="text-blue-500 hover:text-blue-700 mr-2">
              <Edit size={16} />
            </button>
            <button onClick={() => handleDeletePrescription(prescription.id)} className="text-red-500 hover:text-red-700 mr-2">
              <Trash size={16} />
            </button>
            <button onClick={() => handleCopyPrescription(prescription)} className="text-gray-500 hover:text-gray-700">
              <Copy size={16} />
            </button>
          </>
        )}
      </td>
    </tr>
  );

  return (
    <div className="mb-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {/* Implement print functionality */}}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Printer className="mr-2" size={16} />
          Print Prescriptions
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border p-1 w-1/5">Medication</th>
            <th className="border p-1">Dosage</th>
            <th className="border p-1">Frequency</th>
            <th className="border p-1">Duration</th>
            <th className="border p-1">Quantity</th>
            <th className="border p-1">Date</th>
            <th className="border p-1">Doctor</th>
            <th className="border p-1">Note</th>
            <th className="border p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderPrescriptionRow(newPrescription, true)}
          {prescriptions.map(prescription => 
            renderPrescriptionRow(prescription, editingPrescription?.id === prescription.id)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Prescriptions;
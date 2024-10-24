import React, { useState } from 'react';
import { X, Printer, Trash, Plus, Edit, Copy, AlertCircle, Save, Info, Pill, FileText } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addPatient, updatePatient, deletePatient, fetchDrugsAndServices, fetchUsers } from '../services/api';

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  date: string;
  quantity: number;
  doctor: string;
  note?: string;
  isNew?: boolean;
}

interface PatientFormProps {
  patient: any;
  onClose: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'prescriptions'>('info');
  const [activeInfoTab, setActiveInfoTab] = useState<'personal' | 'medical' | 'insurance'>('personal');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(patient?.prescriptions || []);
  const [newPrescriptions, setNewPrescriptions] = useState<Prescription[]>([]);
  const [editingPrescription, setEditingPrescription] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    dateOfBirth: patient?.dateOfBirth || '',
    sex: patient?.sex || '',
    allergies: patient?.allergies || '',
    medicalHistory: patient?.medicalHistory || '',
    previousVisit: patient?.previousVisit || '',
    insurance: patient?.insurance || '',
    group: patient?.group || '',
  });

  const { data: drugsAndServices } = useQuery('drugsAndServices', fetchDrugsAndServices);
  const { data: users } = useQuery('users', fetchUsers);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
      onClose();
    },
  });

  const handleDeletePatient = () => {
    if (patient?.id) {
      deleteMutation.mutate(patient.id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePatientInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyPrescription = (prescription: Prescription) => {
    const newPrescription: Prescription = {
      ...prescription,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 16),
      doctor: '',
      isNew: true,
    };
    setNewPrescriptions([...newPrescriptions, newPrescription]);
    setEditingPrescription(newPrescription.id);
  };

  const handleAddPrescription = () => {
    const newPrescription: Prescription = {
      id: Date.now(),
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      date: new Date().toISOString().slice(0, 16),
      quantity: 0,
      doctor: '',
      note: '',
      isNew: true,
    };
    setNewPrescriptions([...newPrescriptions, newPrescription]);
    setEditingPrescription(newPrescription.id);
  };

  const handleDeletePrescription = (id: number) => {
    setNewPrescriptions(newPrescriptions.filter(p => p.id !== id));
  };

  const handlePrescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number) => {
    const { name, value } = e.target;
    setNewPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(p =>
        p.id === id ? { ...p, [name]: value } : p
      )
    );
  };

  const renderPrescriptionFields = (prescription: Prescription, isEditing: boolean, isCurrent: boolean) => (
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div>
        <label htmlFor={`medication-${prescription.id}`} className="block text-xs font-medium text-gray-500">Medication</label>
        {isEditing ? (
          <select
            id={`medication-${prescription.id}`}
            name="medication"
            value={prescription.medication}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select</option>
            {drugsAndServices?.drugs.map(drug => (
              <option key={drug.id} value={drug.name}>{drug.name}</option>
            ))}
          </select>
        ) : (
          <p className="mt-1 text-sm">{prescription.medication}</p>
        )}
      </div>
      <div>
        <label htmlFor={`dosage-${prescription.id}`} className="block text-xs font-medium text-gray-500">Dosage</label>
        {isEditing ? (
          <input
            type="text"
            id={`dosage-${prescription.id}`}
            name="dosage"
            value={prescription.dosage}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1 text-sm">{prescription.dosage}</p>
        )}
      </div>
      <div>
        <label htmlFor={`frequency-${prescription.id}`} className="block text-xs font-medium text-gray-500">Frequency</label>
        {isEditing ? (
          <input
            type="text"
            id={`frequency-${prescription.id}`}
            name="frequency"
            value={prescription.frequency}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1 text-sm">{prescription.frequency}</p>
        )}
      </div>
      <div>
        <label htmlFor={`duration-${prescription.id}`} className="block text-xs font-medium text-gray-500">Duration</label>
        {isEditing ? (
          <input
            type="text"
            id={`duration-${prescription.id}`}
            name="duration"
            value={prescription.duration}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1 text-sm">{prescription.duration}</p>
        )}
      </div>
      <div>
        <label htmlFor={`quantity-${prescription.id}`} className="block text-xs font-medium text-gray-500">Quantity</label>
        {isEditing ? (
          <input
            type="number"
            id={`quantity-${prescription.id}`}
            name="quantity"
            value={prescription.quantity}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1 text-sm">{prescription.quantity}</p>
        )}
      </div>
      <div>
        <label htmlFor={`date-${prescription.id}`} className="block text-xs font-medium text-gray-500">Date</label>
        {isEditing ? (
          <input
            type="datetime-local"
            id={`date-${prescription.id}`}
            name="date"
            value={prescription.date}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        ) : (
          <p className="mt-1 text-sm">{new Date(prescription.date).toLocaleString()}</p>
        )}
      </div>
      <div>
        <label htmlFor={`doctor-${prescription.id}`} className="block text-xs font-medium text-gray-500">Doctor</label>
        {isEditing ? (
          <select
            id={`doctor-${prescription.id}`}
            name="doctor"
            value={prescription.doctor}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select</option>
            {users?.filter(user => user.role === 'Doctor').map(doctor => (
              <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
            ))}
          </select>
        ) : (
          <p className="mt-1 text-sm">{prescription.doctor}</p>
        )}
      </div>
      <div className="col-span-2">
        <label htmlFor={`note-${prescription.id}`} className="block text-xs font-medium text-gray-500">Note</label>
        {isEditing ? (
          <textarea
            id={`note-${prescription.id}`}
            name="note"
            value={prescription.note || ''}
            onChange={(e) => handlePrescriptionChange(e, prescription.id)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={2}
          />
        ) : (
          <p className="mt-1 text-sm">{prescription.note || 'N/A'}</p>
        )}
      </div>
      {isCurrent && (
        <div className="col-span-2 flex justify-end">
          <button
            type="button"
            onClick={() => handleCopyPrescription(prescription)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <Copy size={16} className="mr-1" />
            Copy to New Prescription
          </button>
        </div>
      )}
    </div>
  );

  const renderPatientInfoFields = () => {
    switch (activeInfoTab) {
      case 'personal':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-500">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={patientInfo.name}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-500">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={patientInfo.email}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-gray-500">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={patientInfo.phone}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-xs font-medium text-gray-500">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={patientInfo.dateOfBirth}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="sex" className="block text-xs font-medium text-gray-500">Sex</label>
              <select
                id="sex"
                name="sex"
                value={patientInfo.sex}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </>
        );
      case 'medical':
        return (
          <>
            <div>
              <label htmlFor="allergies" className="block text-xs font-medium text-gray-500">Allergies</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={patientInfo.allergies}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="medicalHistory" className="block text-xs font-medium text-gray-500">Medical History</label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={patientInfo.medicalHistory}
                onChange={handlePatientInfoChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="previousVisit" className="block text-xs font-medium text-gray-500">Previous Visit</label>
              <input
                type="date"
                id="previousVisit"
                name="previousVisit"
                value={patientInfo.previousVisit}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </>
        );
      case 'insurance':
        return (
          <>
            <div>
              <label htmlFor="insurance" className="block text-xs font-medium text-gray-500">Insurance</label>
              <input
                type="text"
                id="insurance"
                name="insurance"
                value={patientInfo.insurance}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="group" className="block text-xs font-medium text-gray-500">Group</label>
              <select
                id="group"
                name="group"
                value={patientInfo.group}
                onChange={handlePatientInfoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select</option>
                <option value="Resident">Resident</option>
                <option value="Expat">Expat</option>
                <option value="Tourist">Tourist</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {patient ? `${patientInfo.name}` : 'New Patient'}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            <Info size={20} className="mr-2 inline" />
            Patient Info
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'prescriptions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            <Pill size={20} className="mr-2 inline" />
            Prescriptions
          </button>
        </div>
      </div>

      {activeTab === 'info' && (
        <>
          <div className="mb-4">
            <div className="flex space-x-4">
              <button
                className={`py-1 px-2 ${activeInfoTab === 'personal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} rounded`}
                onClick={() => setActiveInfoTab('personal')}
              >
                <Info size={16} className="mr-2 inline" />
                Personal
              </button>
              <button
                className={`py-1 px-2 ${activeInfoTab === 'medical' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} rounded`}
                onClick={() => setActiveInfoTab('medical')}
              >
                <FileText size={16} className="mr-2 inline" />
                Medical
              </button>
              <button
                className={`py-1 px-2 ${activeInfoTab === 'insurance' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'} rounded`}
                onClick={() => setActiveInfoTab('insurance')}
              >
                <AlertCircle size={16} className="mr-2 inline" />
                Insurance
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {renderPatientInfoFields()}
          </div>
        </>
      )}

      {activeTab === 'prescriptions' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Prescriptions</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-md font-medium mb-2">Current Prescriptions</h4>
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="mb-4 p-4 border border-gray-200 rounded-md">
                  {renderPrescriptionFields(prescription, false, true)}
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-md font-medium mb-2">New Prescriptions</h4>
              {newPrescriptions.map((prescription) => (
                <div key={prescription.id} className="mb-4 p-4 border border-gray-200 rounded-md">
                  {renderPrescriptionFields(prescription, editingPrescription === prescription.id, false)}
                  <div className="flex justify-end space-x-2 mt-2">
                    {editingPrescription === prescription.id ? (
                      <button
                        type="button"
                        onClick={() => setEditingPrescription(null)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Save size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingPrescription(prescription.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeletePrescription(prescription.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPrescription}
                className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
              >
                <Plus size={16} className="mr-1" />
                Add Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowDeleteConfirmation(true)}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          <Trash size={16} />
        </button>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-gray-200 text-gray-800 p-2 rounded-md hover:bg-gray-300"
          >
            <Printer size={16} />
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {patient ? <Edit size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4 text-red-500">
              <AlertCircle size={24} className="mr-2" />
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            </div>
            <p className="mb-4">Are you sure you want to delete this patient? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleDeletePatient}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
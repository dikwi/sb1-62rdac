import React, { useState } from 'react';
import { Edit, Trash, Copy, Save, Printer } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchHealthFacilities } from '../../services/api';

interface Visit {
  id: number;
  date: string;
  healthFacility: string;
  caseType: string;
  diagnosis: string;
  queueNumber: number;
  note?: string;
}

interface VisitsProps {
  visits: Visit[];
  onChange: (visits: Visit[]) => void;
}

const Visits: React.FC<VisitsProps> = ({ visits, onChange }) => {
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);
  const [newVisit, setNewVisit] = useState<Visit>({
    id: 0,
    date: new Date().toISOString().slice(0, 10),
    healthFacility: '',
    caseType: '',
    diagnosis: '',
    queueNumber: 0,
    note: '',
  });

  const { data: healthFacilities } = useQuery('healthFacilities', fetchHealthFacilities);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, visit: Visit) => {
    const { name, value } = e.target;
    if (visit.id === 0) {
      setNewVisit({ ...newVisit, [name]: value });
    } else {
      setEditingVisit({ ...editingVisit!, [name]: value });
    }
  };

  const handleSaveEdit = () => {
    if (editingVisit) {
      const updatedVisits = visits.map(v =>
        v.id === editingVisit.id ? editingVisit : v
      );
      onChange(updatedVisits);
      setEditingVisit(null);
    } else if (newVisit.healthFacility && newVisit.caseType) {
      const updatedVisits = [...visits, { ...newVisit, id: Date.now() }];
      onChange(updatedVisits);
      setNewVisit({
        id: 0,
        date: new Date().toISOString().slice(0, 10),
        healthFacility: '',
        caseType: '',
        diagnosis: '',
        queueNumber: 0,
        note: '',
      });
    }
  };

  const handleDeleteVisit = (id: number) => {
    const updatedVisits = visits.filter(v => v.id !== id);
    onChange(updatedVisits);
  };

  const handleCopyVisit = (visit: Visit) => {
    const newVisitCopy = {
      ...visit,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    const updatedVisits = [...visits, newVisitCopy];
    onChange(updatedVisits);
  };

  const renderVisitRow = (visit: Visit, isEditing: boolean) => (
    <tr key={visit.id} className="text-sm">
      <td>
        <input
          type="date"
          name="date"
          value={visit.date}
          onChange={(e) => handleInputChange(e, visit)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <select
          name="healthFacility"
          value={visit.healthFacility}
          onChange={(e) => handleInputChange(e, visit)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="">Select Facility</option>
          {healthFacilities?.map(facility => (
            <option key={facility.id} value={facility.name}>{facility.name}</option>
          ))}
        </select>
      </td>
      <td>
        <select
          name="caseType"
          value={visit.caseType}
          onChange={(e) => handleInputChange(e, visit)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        >
          <option value="">Select Case Type</option>
          <option value="OPD">OPD</option>
          <option value="IPD">IPD</option>
          <option value="Surgery">Surgery</option>
          <option value="Abortion">Abortion</option>
          <option value="Maternity">Maternity</option>
          <option value="Small surgery">Small surgery</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          name="diagnosis"
          value={visit.diagnosis}
          onChange={(e) => handleInputChange(e, visit)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <input
          type="number"
          name="queueNumber"
          value={visit.queueNumber}
          onChange={(e) => handleInputChange(e, visit)}
          disabled={!isEditing}
          className="w-full p-1 border rounded text-sm"
        />
      </td>
      <td>
        <textarea
          name="note"
          value={visit.note}
          onChange={(e) => handleInputChange(e, visit)}
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
            <button onClick={() => setEditingVisit(visit)} className="text-blue-500 hover:text-blue-700 mr-2">
              <Edit size={16} />
            </button>
            <button onClick={() => handleDeleteVisit(visit.id)} className="text-red-500 hover:text-red-700 mr-2">
              <Trash size={16} />
            </button>
            <button onClick={() => handleCopyVisit(visit)} className="text-gray-500 hover:text-gray-700">
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
          Print Visits
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border p-1">Date</th>
            <th className="border p-1">Health Facility</th>
            <th className="border p-1">Case Type</th>
            <th className="border p-1">Diagnosis</th>
            <th className="border p-1">Queue Number</th>
            <th className="border p-1">Note</th>
            <th className="border p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderVisitRow(newVisit, true)}
          {visits.map(visit => 
            renderVisitRow(visit, editingVisit?.id === visit.id)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Visits;
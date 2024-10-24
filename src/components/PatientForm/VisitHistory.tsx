import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';

interface Visit {
  id: number;
  date: string;
  healthFacility: string;
  caseType: string;
  diagnosis: string;
  queueNumber: number;
}

interface VisitHistoryProps {
  patient: any;
  onChange: (visits: Visit[]) => void;
}

const VisitHistory: React.FC<VisitHistoryProps> = ({ patient, onChange }) => {
  const [visits, setVisits] = useState<Visit[]>(patient.visits || []);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);

  useEffect(() => {
    setVisits(patient.visits || []);
  }, [patient.visits]);

  const handleAddVisit = () => {
    const newVisit: Visit = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      healthFacility: '',
      caseType: '',
      diagnosis: '',
      queueNumber: 0,
    };
    const updatedVisits = [...visits, newVisit];
    setVisits(updatedVisits);
    setEditingVisit(newVisit);
    onChange(updatedVisits);
  };

  const handleEditVisit = (visit: Visit) => {
    setEditingVisit(visit);
  };

  const handleDeleteVisit = (id: number) => {
    const updatedVisits = visits.filter(v => v.id !== id);
    setVisits(updatedVisits);
    onChange(updatedVisits);
  };

  const handleVisitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number) => {
    const { name, value } = e.target;
    const updatedVisits = visits.map(v => v.id === id ? { ...v, [name]: value } : v);
    setVisits(updatedVisits);
    onChange(updatedVisits);
  };

  const handleSaveVisit = () => {
    setEditingVisit(null);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Visit History</h3>
      {visits.map((visit) => (
        <div key={visit.id} className="mb-4 p-4 border border-gray-200 rounded-md">
          {editingVisit?.id === visit.id ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <label htmlFor={`date-${visit.id}`} className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id={`date-${visit.id}`}
                    name="date"
                    value={visit.date}
                    onChange={(e) => handleVisitChange(e, visit.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor={`healthFacility-${visit.id}`} className="block text-sm font-medium text-gray-700">Health Facility</label>
                  <input
                    type="text"
                    id={`healthFacility-${visit.id}`}
                    name="healthFacility"
                    value={visit.healthFacility}
                    onChange={(e) => handleVisitChange(e, visit.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor={`caseType-${visit.id}`} className="block text-sm font-medium text-gray-700">Case Type</label>
                  <select
                    id={`caseType-${visit.id}`}
                    name="caseType"
                    value={visit.caseType}
                    onChange={(e) => handleVisitChange(e, visit.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">Select</option>
                    <option value="OPD">OPD</option>
                    <option value="IPD">IPD</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Abortion">Abortion</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Small surgery">Small surgery</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`diagnosis-${visit.id}`} className="block text-sm font-medium text-gray-700">Diagnosis (ICD-10)</label>
                  <input
                    type="text"
                    id={`diagnosis-${visit.id}`}
                    name="diagnosis"
                    value={visit.diagnosis}
                    onChange={(e) => handleVisitChange(e, visit.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor={`queueNumber-${visit.id}`} className="block text-sm font-medium text-gray-700">Queue Number</label>
                  <input
                    type="number"
                    id={`queueNumber-${visit.id}`}
                    name="queueNumber"
                    value={visit.queueNumber}
                    onChange={(e) => handleVisitChange(e, visit.id)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveVisit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p><strong>Date:</strong> {visit.date}</p>
              <p><strong>Health Facility:</strong> {visit.healthFacility}</p>
              <p><strong>Case Type:</strong> {visit.caseType}</p>
              <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
              <p><strong>Queue Number:</strong> {visit.queueNumber}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEditVisit(visit)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteVisit(visit.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      <button
        onClick={handleAddVisit}
        className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
      >
        <Plus size={16} className="mr-1" />
        Add Visit
      </button>
    </div>
  );
};

export default VisitHistory;
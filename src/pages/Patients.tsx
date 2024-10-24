import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchPatients, addPatient, updatePatient, deletePatient } from '../services/api';
import { Search, Plus, Edit, Trash } from 'lucide-react';
import PatientForm from '../components/PatientForm/PatientForm';

const Patients: React.FC = () => {
  const { data: patients, isLoading, error } = useQuery('patients', fetchPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isPatientFormOpen, setIsPatientFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const queryClient = useQueryClient();

  const addMutation = useMutation(addPatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
      setIsPatientFormOpen(false);
    },
  });

  const updateMutation = useMutation(updatePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
      setIsPatientFormOpen(false);
    },
  });

  const deleteMutation = useMutation(deletePatient, {
    onSuccess: () => {
      queryClient.invalidateQueries('patients');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching patients</div>;

  const filteredPatients = patients?.filter((patient: any) =>
    patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPatients = [...(filteredPatients || [])].sort((a: any, b: any) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsPatientFormOpen(true);
  };

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsPatientFormOpen(true);
  };

  const handleDeletePatient = (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deleteMutation.mutate(id);
    }
  };

  const handlePatientFormSubmit = (patientData: any) => {
    if (selectedPatient) {
      updateMutation.mutate({ ...patientData, id: selectedPatient.id });
    } else {
      addMutation.mutate(patientData);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients</h1>
        <button
          onClick={handleAddPatient}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Add Patient
        </button>
      </div>
      <div className="mb-4 flex items-center">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search patients..."
          className="border rounded-md px-2 py-1 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                Category {sortColumn === 'category' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('lastVisit')}>
                Last Visit {sortColumn === 'lastVisit' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPatients.map((patient: any) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditPatient(patient)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
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
      {isPatientFormOpen && (
        <PatientForm
          patient={selectedPatient}
          onClose={() => setIsPatientFormOpen(false)}
          onSubmit={handlePatientFormSubmit}
        />
      )}
    </div>
  );
};

export default Patients;
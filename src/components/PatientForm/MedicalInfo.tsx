import React, { useState } from 'react';
import { Plus, Edit, Trash, Save } from 'lucide-react';

interface Vaccination {
  id: number;
  name: string;
  date: string;
  status: 'completed' | 'scheduled';
}

interface MedicalInfoProps {
  patient: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const MedicalInfo: React.FC<MedicalInfoProps> = ({ patient, onChange }) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(patient.vaccinations || []);
  const [editingVaccination, setEditingVaccination] = useState<Vaccination | null>(null);
  const [newVaccination, setNewVaccination] = useState<Vaccination>({
    id: 0,
    name: '',
    date: '',
    status: 'scheduled',
  });

  const handleVaccinationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, vaccination: Vaccination) => {
    const { name, value } = e.target;
    if (vaccination.id === 0) {
      setNewVaccination({ ...newVaccination, [name]: value });
    } else {
      setEditingVaccination({ ...editingVaccination!, [name]: value });
    }
  };

  const handleSaveVaccination = () => {
    if (editingVaccination) {
      const updatedVaccinations = vaccinations.map(v =>
        v.id === editingVaccination.id ? editingVaccination : v
      );
      setVaccinations(updatedVaccinations);
      setEditingVaccination(null);
    } else if (newVaccination.name && newVaccination.date) {
      const updatedVaccinations = [...vaccinations, { ...newVaccination, id: Date.now() }];
      setVaccinations(updatedVaccinations);
      setNewVaccination({
        id: 0,
        name: '',
        date: '',
        status: 'scheduled',
      });
    }
    // Update patient object with new vaccinations
    onChange({ target: { name: 'vaccinations', value: vaccinations } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDeleteVaccination = (id: number) => {
    const updatedVaccinations = vaccinations.filter(v => v.id !== id);
    setVaccinations(updatedVaccinations);
    // Update patient object with new vaccinations
    onChange({ target: { name: 'vaccinations', value: updatedVaccinations } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="mb-4">
          <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
          <textarea
            id="allergies"
            name="allergies"
            value={patient?.allergies || ''}
            onChange={onChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={patient?.medicalHistory || ''}
            onChange={onChange}
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="previousVisit" className="block text-sm font-medium text-gray-700">Previous Visit</label>
          <input
            type="date"
            id="previousVisit"
            name="previousVisit"
            value={patient?.previousVisit || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Vaccinations</h3>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1">Name</th>
              <th className="border p-1">Date</th>
              <th className="border p-1">Status</th>
              <th className="border p-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">
                <input
                  type="text"
                  name="name"
                  value={newVaccination.name}
                  onChange={(e) => handleVaccinationChange(e, newVaccination)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-1">
                <input
                  type="date"
                  name="date"
                  value={newVaccination.date}
                  onChange={(e) => handleVaccinationChange(e, newVaccination)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border p-1">
                <select
                  name="status"
                  value={newVaccination.status}
                  onChange={(e) => handleVaccinationChange(e, newVaccination)}
                  className="w-full p-1 border rounded"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td className="border p-1">
                <button onClick={handleSaveVaccination} className="text-green-500 hover:text-green-700">
                  <Save size={16} />
                </button>
              </td>
            </tr>
            {vaccinations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(vaccination => (
              <tr key={vaccination.id}>
                <td className="border p-1">
                  {editingVaccination?.id === vaccination.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editingVaccination.name}
                      onChange={(e) => handleVaccinationChange(e, vaccination)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    vaccination.name
                  )}
                </td>
                <td className="border p-1">
                  {editingVaccination?.id === vaccination.id ? (
                    <input
                      type="date"
                      name="date"
                      value={editingVaccination.date}
                      onChange={(e) => handleVaccinationChange(e, vaccination)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    new Date(vaccination.date).toLocaleDateString()
                  )}
                </td>
                <td className="border p-1">
                  {editingVaccination?.id === vaccination.id ? (
                    <select
                      name="status"
                      value={editingVaccination.status}
                      onChange={(e) => handleVaccinationChange(e, vaccination)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    vaccination.status
                  )}
                </td>
                <td className="border p-1">
                  {editingVaccination?.id === vaccination.id ? (
                    <button onClick={handleSaveVaccination} className="text-green-500 hover:text-green-700 mr-2">
                      <Save size={16} />
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setEditingVaccination(vaccination)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteVaccination(vaccination.id)} className="text-red-500 hover:text-red-700">
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalInfo;
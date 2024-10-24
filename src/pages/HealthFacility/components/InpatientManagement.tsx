import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchPatients } from '../../../services/api';
import { Search, Filter, AlertCircle } from 'lucide-react';
import AdmissionModal from './AdmissionModal';
import DischargeModal from './DischargeModal';
import TransferModal from './TransferModal';

interface InpatientManagementProps {
  facilityId: string;
}

const InpatientManagement: React.FC<InpatientManagementProps> = ({ facilityId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'critical' | 'stable' | 'recovering'>('all');
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [modalType, setModalType] = useState<'admit' | 'discharge' | 'transfer' | null>(null);

  const { data: patients, isLoading } = useQuery(['patients', facilityId], () => fetchPatients());

  const handleAction = (patient: any, action: 'admit' | 'discharge' | 'transfer') => {
    setSelectedPatient(patient);
    setModalType(action);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setModalType(null);
  };

  if (isLoading) return <div>Loading inpatients...</div>;

  const filteredPatients = patients?.filter((patient: any) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="border rounded-md px-2 py-1"
            >
              <option value="all">All Status</option>
              <option value="critical">Critical</option>
              <option value="stable">Stable</option>
              <option value="recovering">Recovering</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => handleAction(null, 'admit')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          New Admission
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward/Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients?.map((patient: any) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.ward} - {patient.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.status === 'critical' ? 'bg-red-100 text-red-800' :
                    patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(patient.admissionDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleAction(patient, 'transfer')}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Transfer
                  </button>
                  <button
                    onClick={() => handleAction(patient, 'discharge')}
                    className="text-red-600 hover:text-red-900"
                  >
                    Discharge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalType === 'admit' && (
        <AdmissionModal
          isOpen={true}
          onClose={closeModal}
          facilityId={facilityId}
        />
      )}

      {modalType === 'discharge' && selectedPatient && (
        <DischargeModal
          isOpen={true}
          onClose={closeModal}
          patient={selectedPatient}
        />
      )}

      {modalType === 'transfer' && selectedPatient && (
        <TransferModal
          isOpen={true}
          onClose={closeModal}
          patient={selectedPatient}
          facilityId={facilityId}
        />
      )}
    </div>
  );
};

export default InpatientManagement;
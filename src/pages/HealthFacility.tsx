import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchHealthFacilities, addHealthFacility, updateHealthFacility, deleteHealthFacility } from '../services/api';
import { Plus, Edit, Trash } from 'lucide-react';
import HealthFacilityModal from '../components/HealthFacilityModal';

const HealthFacility: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any | null>(null);

  const { data: facilities, isLoading, error } = useQuery('healthFacilities', fetchHealthFacilities);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addHealthFacility, {
    onSuccess: () => {
      queryClient.invalidateQueries('healthFacilities');
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateHealthFacility, {
    onSuccess: () => {
      queryClient.invalidateQueries('healthFacilities');
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation(deleteHealthFacility, {
    onSuccess: () => {
      queryClient.invalidateQueries('healthFacilities');
    },
  });

  const handleAddFacility = () => {
    setSelectedFacility(null);
    setIsModalOpen(true);
  };

  const handleEditFacility = (facility: any) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleDeleteFacility = (id: number) => {
    if (window.confirm('Are you sure you want to delete this health facility?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching health facilities</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Health Facilities</h1>
        <button
          onClick={handleAddFacility}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Add Health Facility
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khmer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facilities?.map((facility: any) => (
              <tr key={facility.id}>
                <td className="px-6 py-4 whitespace-nowrap">{facility.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{facility.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{facility.khmerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{facility.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{facility.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{facility.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditFacility(facility)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteFacility(facility.id)}
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
        <HealthFacilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(facility) => selectedFacility ? updateMutation.mutate(facility) : addMutation.mutate(facility)}
          facility={selectedFacility}
        />
      )}
    </div>
  );
};

export default HealthFacility;
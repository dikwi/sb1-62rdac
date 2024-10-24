import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchImagingRequests, addImagingRequest, updateImagingRequest } from '../services/api';
import { Plus, Edit } from 'lucide-react';
import ImagingModal from '../components/ImagingModal';

const Imaging: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const { data: imagingRequests, isLoading, error } = useQuery('imagingRequests', fetchImagingRequests);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addImagingRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('imagingRequests');
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateImagingRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries('imagingRequests');
      setIsModalOpen(false);
    },
  });

  const handleAddRequest = () => {
    setSelectedRequest(null);
    setIsModalOpen(true);
  };

  const handleEditRequest = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleSubmit = (request: any) => {
    if (selectedRequest) {
      updateMutation.mutate(request);
    } else {
      addMutation.mutate(request);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching imaging requests</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Imaging and Para-Clinical Services</h1>
        <button
          onClick={handleAddRequest}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Request Imaging
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {imagingRequests?.map((request: any) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.serviceType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{request.requestedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditRequest(request)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ImagingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default Imaging;
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchClaims, submitClaim, updateClaimStatus } from '../services/api';
import { Plus, FileText, RefreshCw, DollarSign } from 'lucide-react';
import ClaimModal from '../components/ClaimModal';
import ClaimStatusModal from '../components/ClaimStatusModal';
import PaymentReconciliationModal from '../components/PaymentReconciliationModal';
import MonthlyClaimsBatchProcess from '../components/MonthlyClaimsBatchProcess';

const Claims: React.FC = () => {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isReconciliationModalOpen, setIsReconciliationModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<any | null>(null);

  const { data: claims, isLoading, error } = useQuery('claims', fetchClaims);
  const queryClient = useQueryClient();

  const submitClaimMutation = useMutation(submitClaim, {
    onSuccess: () => {
      queryClient.invalidateQueries('claims');
      setIsClaimModalOpen(false);
    },
  });

  const updateClaimStatusMutation = useMutation(updateClaimStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('claims');
      setIsStatusModalOpen(false);
    },
  });

  const handleSubmitClaim = (claimData: any) => {
    submitClaimMutation.mutate(claimData);
  };

  const handleUpdateClaimStatus = (claimId: string, newStatus: string) => {
    updateClaimStatusMutation.mutate({ claimId, status: newStatus });
  };

  const handleOpenClaimModal = () => {
    setSelectedClaim(null);
    setIsClaimModalOpen(true);
  };

  const handleOpenStatusModal = (claim: any) => {
    setSelectedClaim(claim);
    setIsStatusModalOpen(true);
  };

  const handleOpenReconciliationModal = () => {
    setIsReconciliationModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching claims</div>;

  return (
    <div>
      <div className="mb-6">
        <MonthlyClaimsBatchProcess />
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Claims Management</h1>
        <div className="space-x-2">
          <button
            onClick={handleOpenClaimModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-2" size={20} />
            New Claim
          </button>
          <button
            onClick={handleOpenReconciliationModal}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <DollarSign className="mr-2" size={20} />
            Payment Reconciliation
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {claims?.map((claim: any) => (
              <tr key={claim.id}>
                <td className="px-6 py-4 whitespace-nowrap">{claim.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{claim.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{claim.insurer}</td>
                <td className="px-6 py-4 whitespace-nowrap">${claim.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    claim.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {claim.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenStatusModal(claim)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <button
                    onClick={() => {/* Implement view details functionality */}}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FileText size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isClaimModalOpen && (
        <ClaimModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          onSubmit={handleSubmitClaim}
        />
      )}

      {isStatusModalOpen && selectedClaim && (
        <ClaimStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          claim={selectedClaim}
          onUpdateStatus={handleUpdateClaimStatus}
        />
      )}

      {isReconciliationModalOpen && (
        <PaymentReconciliationModal
          isOpen={isReconciliationModalOpen}
          onClose={() => setIsReconciliationModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Claims;
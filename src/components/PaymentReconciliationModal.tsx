import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUnpaidClaims, reconcilePayment } from '../services/api';

interface PaymentReconciliationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentReconciliationModal: React.FC<PaymentReconciliationModalProps> = ({ isOpen, onClose }) => {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [paymentAmount, setPaymentAmount] = useState('');

  const { data: unpaidClaims, isLoading, error } = useQuery('unpaidClaims', fetchUnpaidClaims);
  const queryClient = useQueryClient();

  const reconcileMutation = useMutation(reconcilePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('claims');
      queryClient.invalidateQueries('unpaidClaims');
      onClose();
    },
  });

  const handleClaimToggle = (claimId: string) => {
    setSelectedClaims(prev =>
      prev.includes(claimId)
        ? prev.filter(id => id !== claimId)
        : [...prev, claimId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reconcileMutation.mutate({
      claimIds: selectedClaims,
      amount: parseFloat(paymentAmount),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Payment Reconciliation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {isLoading ? (
          <p>Loading unpaid claims...</p>
        ) : error ? (
          <p>Error loading unpaid claims</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Claims to Reconcile</label>
              <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                {unpaidClaims?.map((claim: any) => (
                  <div key={claim.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`claim-${claim.id}`}
                      checked={selectedClaims.includes(claim.id)}
                      onChange={() => handleClaimToggle(claim.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`claim-${claim.id}`} className="text-sm">
                      {claim.id} - {claim.patientName} - ${claim.amount.toFixed(2)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">Payment Amount</label>
              <input
                type="number"
                id="paymentAmount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={selectedClaims.length === 0 || !paymentAmount}
              >
                Reconcile Payment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentReconciliationModal;
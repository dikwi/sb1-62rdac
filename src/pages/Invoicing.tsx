import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchInvoices, addInvoice, updateInvoice } from '../services/api';
import { Plus, Edit, Printer } from 'lucide-react';
import InvoiceModal from '../components/InvoiceModal';

const Invoicing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const { data: invoices, isLoading, error } = useQuery('invoices', fetchInvoices);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateInvoice, {
    onSuccess: () => {
      queryClient.invalidateQueries('invoices');
      setIsModalOpen(false);
    },
  });

  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching invoices</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoicing</h1>
        <button
          onClick={handleAddInvoice}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Create Invoice
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices?.map((invoice: any) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(invoice.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">${invoice.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditInvoice(invoice)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {/* Implement print functionality */}}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Printer size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <InvoiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(invoice) => selectedInvoice ? updateMutation.mutate(invoice) : addMutation.mutate(invoice)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default Invoicing;
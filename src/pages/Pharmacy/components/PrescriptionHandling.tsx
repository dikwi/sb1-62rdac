import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchPrescriptions, fetchItems } from '../../../services/api';
import { Check, X, AlertTriangle } from 'lucide-react';

const PrescriptionHandling: React.FC = () => {
  const { data: prescriptions, isLoading: prescriptionsLoading } = useQuery('prescriptions', fetchPrescriptions);
  const { data: items, isLoading: itemsLoading } = useQuery('items', fetchItems);
  const [filter, setFilter] = useState<'all' | 'pending' | 'fulfilled'>('all');

  const isLoading = prescriptionsLoading || itemsLoading;

  if (isLoading) return <div>Loading prescriptions...</div>;

  const medicineItems = items?.filter((item: any) => item.type === 'Medicine') || [];
  const medicineMap = Object.fromEntries(medicineItems.map(item => [item.name, item]));

  const filteredPrescriptions = prescriptions?.filter((prescription: any) => {
    if (filter === 'all') return true;
    return prescription.status === filter;
  });

  const handleFulfillPrescription = (id: string) => {
    // Implement prescription fulfillment logic
    console.log('Fulfill prescription:', id);
  };

  const checkStock = (medicationName: string) => {
    const medicine = medicineMap[medicationName];
    return medicine ? medicine.stock : 0;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Prescription Handling</h2>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'fulfilled')}
            className="border rounded-md px-2 py-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPrescriptions?.map((prescription: any) => {
              const stock = checkStock(prescription.medication);
              const lowStock = stock < 10;

              return (
                <tr key={prescription.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{prescription.patientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prescription.doctorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prescription.medication}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lowStock ? (
                      <span className="text-red-500 flex items-center">
                        <AlertTriangle size={16} className="mr-1" />
                        {stock}
                      </span>
                    ) : (
                      stock
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      prescription.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {prescription.status === 'pending' && (
                      <button
                        onClick={() => handleFulfillPrescription(prescription.id)}
                        className="text-green-600 hover:text-green-900 mr-2"
                        disabled={stock === 0}
                        title={stock === 0 ? 'Out of stock' : ''}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-900">
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionHandling;
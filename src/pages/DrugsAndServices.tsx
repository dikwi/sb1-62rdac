import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchDrugsAndServices, addDrug, updateDrug, updateDrugStock } from '../services/api';
import { Plus, Edit, Package } from 'lucide-react';
import DrugModal from '../components/DrugModal';
import StockModal from '../components/StockModal';

const DrugsAndServices: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<any>(null);

  const { data, isLoading, error } = useQuery('drugsAndServices', fetchDrugsAndServices);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addDrug, {
    onSuccess: () => {
      queryClient.invalidateQueries('drugsAndServices');
      setIsAddModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateDrug, {
    onSuccess: () => {
      queryClient.invalidateQueries('drugsAndServices');
      setIsEditModalOpen(false);
    },
  });

  const stockMutation = useMutation(updateDrugStock, {
    onSuccess: () => {
      queryClient.invalidateQueries('drugsAndServices');
      setIsStockModalOpen(false);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching drugs and services</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Drugs and Services</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Add Drug
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generic Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.drugs && data.drugs.map((drug: any) => (
              <tr key={drug.id}>
                <td className="px-6 py-4 whitespace-nowrap">{drug.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{drug.genericName}</td>
                <td className="px-6 py-4 whitespace-nowrap">${drug.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{drug.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedDrug(drug);
                      setIsEditModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDrug(drug);
                      setIsStockModalOpen(true);
                    }}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Package size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <DrugModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={(drug) => addMutation.mutate(drug)}
        />
      )}

      {isEditModalOpen && selectedDrug && (
        <DrugModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={(drug) => updateMutation.mutate(drug)}
          drug={selectedDrug}
        />
      )}

      {isStockModalOpen && selectedDrug && (
        <StockModal
          isOpen={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          onSubmit={(data) => stockMutation.mutate(data)}
          drug={selectedDrug}
        />
      )}
    </div>
  );
};

export default DrugsAndServices;
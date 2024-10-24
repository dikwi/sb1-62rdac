import React, { useState } from 'react';
import { Plus, Edit, Trash, AlertTriangle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchItems, addItem, updateItem, deleteItem } from '../../../services/api';
import ItemModal from '../../../components/ItemModal';

const InventoryManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [filterType, setFilterType] = useState<'Medicine' | 'Supply'>('Medicine');

  const { data: items, isLoading, error } = useQuery('items', fetchItems);
  const queryClient = useQueryClient();

  const addMutation = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation(updateItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredItems = items?.filter((item: any) => item.type === filterType) || [];

  if (isLoading) return <div>Loading inventory...</div>;
  if (error) return <div>Error loading inventory</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Inventory Management</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterType('Medicine')}
              className={`px-3 py-1 rounded-md ${
                filterType === 'Medicine' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Medicines
            </button>
            <button
              onClick={() => setFilterType('Supply')}
              className={`px-3 py-1 rounded-md ${
                filterType === 'Supply' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Supplies
            </button>
          </div>
        </div>
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Add {filterType}
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generic Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.genericName || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.stock < (item.reorderLevel || 10) ? (
                    <span className="text-red-500 flex items-center">
                      <AlertTriangle size={16} className="mr-1" />
                      {item.stock}
                    </span>
                  ) : (
                    item.stock
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.reorderLevel || 10}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
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
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(item) => {
            const itemData = {
              ...item,
              type: filterType,
            };
            if (selectedItem) {
              updateMutation.mutate(itemData);
            } else {
              addMutation.mutate(itemData);
            }
          }}
          item={selectedItem}
          defaultType={filterType}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchItems, addItem, updateItem, deleteItem } from '../services/api';
import { Plus, Edit, Trash, Search, Filter } from 'lucide-react';
import ItemModal from '../components/ItemModal';

const Items: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Medicine');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [pricelistView, setPricelistView] = useState(false);

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

  const filteredItems = useMemo(() => {
    return items?.filter((item: any) => 
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      item.type === filterType
    );
  }, [items, searchTerm, filterType]);

  const itemTypes = ['Medicine', 'Supply', 'Labo', 'Echography', 'Xray', 'CTScan', 'Endo', 'ECG', 'Coloscopy'];

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const pageCount = Math.ceil((filteredItems?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching items</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Items</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setPricelistView(!pricelistView)}
            className={`px-4 py-2 rounded-md ${
              pricelistView ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {pricelistView ? 'Standard View' : 'Pricelist View'}
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Add Item
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          {itemTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-md mr-2 ${
                filterType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              {pricelistView ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resident</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tourist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance A</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance B</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Social Security</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                </>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems?.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                {pricelistView ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                    {item.pricelists?.map((pricelist: any) => (
                      <td key={pricelist.group} className="px-6 py-4 whitespace-nowrap">
                        ${pricelist.price.toFixed(2)}
                        {pricelist.discount > 0 && (
                          <span className="ml-1 text-green-600">(-{pricelist.discount}%)</span>
                        )}
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.cost.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.stock !== undefined ? item.stock : 'N/A'}</td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
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

      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="mr-2">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border rounded-md px-2 py-1"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md mr-2 bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${pageCount}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
            className="px-3 py-1 rounded-md ml-2 bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(item) => {
            if (selectedItem) {
              updateMutation.mutate(item);
            } else {
              addMutation.mutate(item);
            }
          }}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default Items;
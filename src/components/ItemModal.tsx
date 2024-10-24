import React, { useState, useEffect } from 'react';
import { X, Plus, Trash } from 'lucide-react';

interface PricelistEntry {
  group: string;
  price: number;
  discount?: number;
}

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
  item?: any;
  defaultType?: 'Medicine' | 'Supply';
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, onSubmit, item, defaultType }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: defaultType || '',
    cost: '',
    price: '',
    stock: '',
    genericName: '',
    expiry: '',
    stockIn: '',
    stockOut: '',
    reorderLevel: '',
    pricelists: [] as PricelistEntry[],
  });

  const patientGroups = [
    'Resident',
    'Expat',
    'Tourist',
    'InsuranceA',
    'InsuranceB',
    'Social Security'
  ];

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        type: item.type,
        cost: item.cost.toString(),
        price: item.price.toString(),
        stock: item.stock !== undefined ? item.stock.toString() : '',
        genericName: item.genericName || '',
        expiry: item.expiry || '',
        stockIn: item.stockIn ? item.stockIn.toString() : '',
        stockOut: item.stockOut ? item.stockOut.toString() : '',
        reorderLevel: item.reorderLevel ? item.reorderLevel.toString() : '10',
        pricelists: item.pricelists || patientGroups.map(group => ({
          group,
          price: parseFloat(item.price) || 0,
          discount: 0
        })),
      });
    } else {
      setFormData(prev => ({
        ...prev,
        type: defaultType || '',
        reorderLevel: '10',
        pricelists: patientGroups.map(group => ({
          group,
          price: 0,
          discount: 0
        })),
      }));
    }
  }, [item, defaultType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePricelistChange = (index: number, field: 'price' | 'discount', value: string) => {
    const newPricelists = [...formData.pricelists];
    newPricelists[index] = {
      ...newPricelists[index],
      [field]: parseFloat(value) || 0
    };
    setFormData(prev => ({ ...prev, pricelists: newPricelists }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: formData.id || Date.now().toString(),
      cost: parseFloat(formData.cost),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      stockIn: formData.stockIn ? parseInt(formData.stockIn) : undefined,
      stockOut: formData.stockOut ? parseInt(formData.stockOut) : undefined,
      reorderLevel: parseInt(formData.reorderLevel),
      pricelists: formData.pricelists,
    });
  };

  const isMedicineOrSupply = formData.type === 'Medicine' || formData.type === 'Supply';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{item ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
                disabled={!!defaultType}
              >
                <option value="">Select Type</option>
                <option value="Medicine">Medicine</option>
                <option value="Supply">Supply</option>
                {!defaultType && (
                  <>
                    <option value="Labo">Labo</option>
                    <option value="Echography">Echography</option>
                    <option value="Xray">Xray</option>
                    <option value="CTScan">CT Scan</option>
                    <option value="Endo">Endo</option>
                    <option value="ECG">ECG</option>
                    <option value="Coloscopy">Coloscopy</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Base Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
                step="0.01"
              />
            </div>
          </div>

          {isMedicineOrSupply && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="genericName" className="block text-sm font-medium text-gray-700">Generic Name</label>
                <input
                  type="text"
                  id="genericName"
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="reorderLevel" className="block text-sm font-medium text-gray-700">Reorder Level</label>
                <input
                  type="number"
                  id="reorderLevel"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pricelist Packages</h3>
            <div className="space-y-4">
              {formData.pricelists.map((pricelist, index) => (
                <div key={pricelist.group} className="flex items-center space-x-4">
                  <div className="w-1/4">
                    <label className="block text-sm font-medium text-gray-700">{pricelist.group}</label>
                  </div>
                  <div className="w-1/3">
                    <input
                      type="number"
                      value={pricelist.price}
                      onChange={(e) => handlePricelistChange(index, 'price', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Price"
                      step="0.01"
                    />
                  </div>
                  <div className="w-1/3">
                    <input
                      type="number"
                      value={pricelist.discount}
                      onChange={(e) => handlePricelistChange(index, 'discount', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Discount %"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {item ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
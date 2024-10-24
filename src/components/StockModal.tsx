import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from 'react-query';
import { updateDrugStock } from '../services/api';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  drug: any;
}

const StockModal: React.FC<StockModalProps> = ({ isOpen, onClose, onSubmit, drug }) => {
  const [quantity, setQuantity] = useState('');
  const [action, setAction] = useState<'in' | 'out'>('in');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      drugId: drug.id,
      action,
      quantity: parseInt(quantity),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Update Stock for {drug.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="action" className="block text-sm font-medium text-gray-700">Action</label>
            <select
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value as 'in' | 'out')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="in">Stock In</option>
              <option value="out">Stock Out</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
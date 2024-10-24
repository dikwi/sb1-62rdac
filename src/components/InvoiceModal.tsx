import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash, Save, Printer } from 'lucide-react';
import { useQuery } from 'react-query';
import { fetchPatients, fetchDrugsAndServices, fetchUsers } from '../services/api';
import PrintableInvoice from './PrintableInvoice';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoice: any) => void;
  invoice?: any;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onClose, onSubmit, invoice }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientGroup: '',
    items: [],
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    status: 'Unpaid',
    overallDiscount: 0,
    deposit: 0,
    exchangeRate: 4100,
  });

  const { data: patients } = useQuery('patients', fetchPatients);
  const { data: drugsAndServices } = useQuery('drugsAndServices', fetchDrugsAndServices);
  const { data: users } = useQuery('users', fetchUsers);

  const printableInvoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        date: new Date(invoice.date).toISOString().split('T')[0],
        items: invoice.items || [],
        overallDiscount: invoice.overallDiscount || 0,
        deposit: invoice.deposit || 0,
        exchangeRate: invoice.exchangeRate || 4100,
      });
    }
  }, [invoice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'patientId') {
      const patient = patients?.find(p => p.id === value);
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        patientGroup: patient?.group || 'Resident'
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...formData.items];
    const item = updatedItems[index];
    
    // Get the item's pricelist for the patient's group
    const itemData = drugsAndServices?.drugs.find(d => d.name === item.description) || 
                    drugsAndServices?.services.find(s => s.name === item.description);
    
    const pricelist = itemData?.pricelists?.find(p => p.group === formData.patientGroup);
    const basePrice = pricelist?.price || itemData?.price || 0;
    const groupDiscount = pricelist?.discount || 0;

    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value,
      unitPrice: field === 'description' ? basePrice : item.unitPrice,
      groupDiscount: field === 'description' ? groupDiscount : item.groupDiscount
    };
    
    // Recalculate total amount
    const totalAmount = updatedItems.reduce((sum, item) => {
      const itemTotal = (Number(item.quantity) * Number(item.unitPrice)) * 
        (1 - (Number(item.discount) || 0) / 100) *
        (1 - (Number(item.groupDiscount) || 0) / 100);
      return sum + itemTotal;
    }, 0);

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      amount: totalAmount - Number(formData.overallDiscount),
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, discount: 0, groupDiscount: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePrint = () => {
    const printContent = printableInvoiceRef.current;
    const originalContents = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{invoice ? 'Edit Invoice' : 'Create New Invoice'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
              <select
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              >
                <option value="">Select Patient</option>
                {patients?.map((patient: any) => (
                  <option key={patient.id} value={patient.id}>{patient.name} ({patient.group})</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
            {formData.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select Item</option>
                  {drugsAndServices?.drugs.map((drug: any) => (
                    <option key={drug.id} value={drug.name}>{drug.name}</option>
                  ))}
                  {drugsAndServices?.services.map((service: any) => (
                    <option key={service.id} value={service.name}>{service.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  placeholder="Qty"
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
                <input
                  type="number"
                  value={item.unitPrice}
                  readOnly
                  placeholder="Price"
                  className="w-24 rounded-md border-gray-300 bg-gray-100 shadow-sm"
                />
                <input
                  type="number"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                  placeholder="Discount %"
                  className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {item.groupDiscount > 0 && (
                  <span className="text-green-600">Group discount: {item.groupDiscount}%</span>
                )}
                <button type="button" onClick={() => removeItem(index)} className="text-red-500">
                  <Trash size={20} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="mt-2 text-blue-500">
              <Plus size={20} className="inline mr-1" /> Add Item
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="overallDiscount" className="block text-sm font-medium text-gray-700">Overall Discount</label>
              <input
                type="number"
                id="overallDiscount"
                name="overallDiscount"
                value={formData.overallDiscount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Deposit</label>
              <input
                type="number"
                id="deposit"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="exchangeRate" className="block text-sm font-medium text-gray-700">Exchange Rate (USD to KHR)</label>
              <input
                type="number"
                id="exchangeRate"
                name="exchangeRate"
                value={formData.exchangeRate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold">Total Amount: ${formData.amount.toFixed(2)}</p>
            <p className="text-md text-gray-600">Total in KHR: {(formData.amount * formData.exchangeRate).toLocaleString()} KHR</p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrint}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              <Printer size={20} className="inline mr-2" />
              Print
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Save size={20} className="inline mr-2" />
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
      
      <div style={{ display: 'none' }}>
        <div ref={printableInvoiceRef}>
          <PrintableInvoice invoice={formData} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
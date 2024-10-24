import React from 'react';
import { Package, FileText, DollarSign, BarChart2 } from 'lucide-react';

interface PharmacyHeaderProps {
  activeTab: 'inventory' | 'prescriptions' | 'sales' | 'reports';
  setActiveTab: React.Dispatch<React.SetStateAction<'inventory' | 'prescriptions' | 'sales' | 'reports'>>;
}

const PharmacyHeader: React.FC<PharmacyHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-4">Pharmacy Management</h1>
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 flex items-center ${activeTab === 'inventory' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('inventory')}
        >
          <Package className="mr-2" size={20} />
          Inventory
        </button>
        <button
          className={`py-2 px-4 flex items-center ${activeTab === 'prescriptions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          <FileText className="mr-2" size={20} />
          Prescriptions
        </button>
        <button
          className={`py-2 px-4 flex items-center ${activeTab === 'sales' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sales')}
        >
          <DollarSign className="mr-2" size={20} />
          Sales & Billing
        </button>
        <button
          className={`py-2 px-4 flex items-center ${activeTab === 'reports' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('reports')}
        >
          <BarChart2 className="mr-2" size={20} />
          Reports
        </button>
      </div>
    </div>
  );
};

export default PharmacyHeader;
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchMedications } from '../../services/api';
import PharmacyHeader from './components/PharmacyHeader';
import InventoryManagement from './components/InventoryManagement';
import PrescriptionHandling from './components/PrescriptionHandling';
import SalesAndBilling from './components/SalesAndBilling';
import PharmacyReports from './components/PharmacyReports';
import ErrorMessage from '../../components/ErrorMessage';

const PharmacyContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'prescriptions' | 'sales' | 'reports'>('inventory');

  const { data: medications, isLoading, error } = useQuery('medications', fetchMedications);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorMessage message="Error fetching pharmacy data. Please try again later." />;

  return (
    <div>
      <PharmacyHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'inventory' && <InventoryManagement medications={medications} />}
      {activeTab === 'prescriptions' && <PrescriptionHandling />}
      {activeTab === 'sales' && <SalesAndBilling />}
      {activeTab === 'reports' && <PharmacyReports />}
    </div>
  );
};

export default PharmacyContainer;
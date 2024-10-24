import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Visits from './pages/Visits';
import DrugsAndServices from './pages/DrugsAndServices';
import Invoicing from './pages/Invoicing';
import Users from './pages/UserManagement';
import Reports from './pages/Reports';
import Appointments from './pages/Appointments';
import HumanResources from './pages/HumanResources';
import HealthFacility from './pages/HealthFacility';
import LabTests from './pages/LabTests';
import Imaging from './pages/Imaging';
import Results from './pages/Results';
import Claims from './pages/Claims';
import Items from './pages/Items';
import Pharmacy from './pages/Pharmacy';
import MedicalRecordsModal from './components/MedicalRecordsModal';
import { clearAllData } from './services/localStorageService';

const queryClient = new QueryClient();

function App() {
  const [isMedicalRecordsOpen, setIsMedicalRecordsOpen] = React.useState(false);

  useEffect(() => {
    clearAllData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout onMedicalRecordsClick={() => setIsMedicalRecordsOpen(true)}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/drugs-and-services" element={<DrugsAndServices />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/human-resources" element={<HumanResources />} />
            <Route path="/health-facility/*" element={<HealthFacility />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/imaging" element={<Imaging />} />
            <Route path="/results" element={<Results />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/items" element={<Items />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
          </Routes>
        </Layout>
        <MedicalRecordsModal isOpen={isMedicalRecordsOpen} onClose={() => setIsMedicalRecordsOpen(false)} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HealthFacilityContainer from './HealthFacilityContainer';
import InpatientManagement from './components/InpatientManagement';
import BedManagement from './components/BedManagement';
import WardManagement from './components/WardManagement';

const HealthFacility: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HealthFacilityContainer />} />
      <Route path="inpatients" element={<InpatientManagement facilityId="1" />} />
      <Route path="beds" element={<BedManagement facilityId="1" />} />
      <Route path="wards" element={<WardManagement facilityId="1" />} />
      <Route path="*" element={<Navigate to="/health-facility" replace />} />
    </Routes>
  );
};

export default HealthFacility;
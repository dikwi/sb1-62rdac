import React from 'react';
import { Building, Users, Bed, Layout } from 'lucide-react';

interface HealthFacilityHeaderProps {
  activeTab: 'facilities' | 'inpatients' | 'beds' | 'wards';
  setActiveTab: (tab: 'facilities' | 'inpatients' | 'beds' | 'wards') => void;
  facilities: any[];
  selectedFacility: string | null;
  setSelectedFacility: (id: string | null) => void;
}

const HealthFacilityHeader: React.FC<HealthFacilityHeaderProps> = ({
  activeTab,
  setActiveTab,
  facilities,
  selectedFacility,
  setSelectedFacility,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Health Facilities</h1>
        {activeTab !== 'facilities' && (
          <select
            value={selectedFacility || ''}
            onChange={(e) => setSelectedFacility(e.target.value || null)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Select Facility</option>
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 flex items-center ${
            activeTab === 'facilities' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('facilities')}
        >
          <Building className="mr-2" size={20} />
          Facilities
        </button>
        <button
          className={`py-2 px-4 flex items-center ${
            activeTab === 'inpatients' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('inpatients')}
        >
          <Users className="mr-2" size={20} />
          Inpatients
        </button>
        <button
          className={`py-2 px-4 flex items-center ${
            activeTab === 'beds' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('beds')}
        >
          <Bed className="mr-2" size={20} />
          Bed Management
        </button>
        <button
          className={`py-2 px-4 flex items-center ${
            activeTab === 'wards' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('wards')}
        >
          <Layout className="mr-2" size={20} />
          Ward Management
        </button>
      </div>
    </div>
  );
};

export default HealthFacilityHeader;
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchHealthFacilities } from '../../../services/api';
import RoomsTabs from '../../../components/HealthFacility/RoomsTabs';
import BedStats from '../../../components/HealthFacility/BedStats';
import BedGroup from '../../../components/HealthFacility/BedGroup';

interface BedManagementProps {
  facilityId: string;
}

const BedManagement: React.FC<BedManagementProps> = ({ facilityId }) => {
  const [activeTab, setActiveTab] = useState<'department' | 'building' | 'floor'>('department');
  const { data: facility } = useQuery(['healthFacility', facilityId], () => 
    fetchHealthFacilities().then(facilities => facilities.find(f => f.id === facilityId))
  );

  // Mock bed data - in real app, this would come from the API
  const beds = [
    { id: 1, number: '101-A', status: 'occupied', patient: 'John Doe', admissionDate: '2024-03-15', building: 'A', floor: 1, department: 'General Ward' },
    { id: 2, number: '101-B', status: 'available', patient: null, admissionDate: null, building: 'A', floor: 1, department: 'General Ward' },
    { id: 3, number: '102-A', status: 'maintenance', patient: null, admissionDate: null, building: 'B', floor: 2, department: 'ICU' },
    { id: 4, number: '102-B', status: 'reserved', patient: 'Jane Smith', admissionDate: '2024-03-16', building: 'B', floor: 2, department: 'ICU' },
  ];

  const groupBedsByCategory = () => {
    const grouped: { [key: string]: typeof beds } = {};
    
    beds.forEach(bed => {
      const category = activeTab === 'department' ? bed.department :
                      activeTab === 'building' ? `Building ${bed.building}` :
                      `Floor ${bed.floor}`;
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(bed);
    });

    return grouped;
  };

  const groupedBeds = groupBedsByCategory();

  // Calculate bed statistics
  const stats = {
    totalBeds: beds.length,
    availableBeds: beds.filter(bed => bed.status === 'available').length,
    occupiedBeds: beds.filter(bed => bed.status === 'occupied').length,
    maintenanceBeds: beds.filter(bed => bed.status === 'maintenance').length,
  };

  return (
    <div>
      <BedStats {...stats} />

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <RoomsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="p-4">
          {Object.entries(groupedBeds).map(([category, beds]) => (
            <BedGroup key={category} category={category} beds={beds} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BedManagement;
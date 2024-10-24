import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchHealthFacilities } from '../../../services/api';
import { Users, Bed, AlertCircle } from 'lucide-react';

interface WardManagementProps {
  facilityId: string;
}

const WardManagement: React.FC<WardManagementProps> = ({ facilityId }) => {
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const { data: facility } = useQuery(['healthFacility', facilityId], () => 
    fetchHealthFacilities().then(facilities => facilities.find(f => f.id === facilityId))
  );

  // Mock ward data - in real app, this would come from the API
  const wards = [
    {
      id: 1,
      name: 'General Ward',
      capacity: 20,
      occupied: 15,
      nurseInCharge: 'Sarah Johnson',
      status: 'operational',
    },
    {
      id: 2,
      name: 'ICU',
      capacity: 10,
      occupied: 8,
      nurseInCharge: 'Michael Chen',
      status: 'operational',
    },
    {
      id: 3,
      name: 'Pediatric Ward',
      capacity: 15,
      occupied: 10,
      nurseInCharge: 'Emily Brown',
      status: 'maintenance',
    },
  ];

  const getOccupancyColor = (occupied: number, capacity: number) => {
    const ratio = occupied / capacity;
    if (ratio < 0.5) return 'text-green-500';
    if (ratio < 0.8) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Wards</p>
              <p className="text-2xl font-bold">6</p>
            </div>
            <Users size={24} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Capacity</p>
              <p className="text-2xl font-bold">120</p>
            </div>
            <Bed size={24} className="text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Occupancy</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
            <AlertCircle size={24} className="text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Ward Overview</h3>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add Ward
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {wards.map((ward) => (
            <div
              key={ward.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{ward.name}</h4>
                  <p className="text-sm text-gray-500">Nurse in Charge: {ward.nurseInCharge}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ward.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {ward.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <span className="font-medium">{ward.capacity} beds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Occupied</span>
                  <span className={`font-medium ${getOccupancyColor(ward.occupied, ward.capacity)}`}>
                    {ward.occupied} beds
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: `${(ward.occupied / ward.capacity) * 100}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        getOccupancyColor(ward.occupied, ward.capacity).replace('text', 'bg')
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-blue-500 hover:text-blue-700 text-sm">
                  View Details
                </button>
                <button className="text-blue-500 hover:text-blue-700 text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WardManagement;
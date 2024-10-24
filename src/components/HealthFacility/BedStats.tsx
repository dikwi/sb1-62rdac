import React from 'react';
import { Bed as BedIcon, AlertCircle } from 'lucide-react';

interface BedStatsProps {
  totalBeds: number;
  availableBeds: number;
  occupiedBeds: number;
  maintenanceBeds: number;
}

const BedStats: React.FC<BedStatsProps> = ({ totalBeds, availableBeds, occupiedBeds, maintenanceBeds }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Beds</p>
            <p className="text-2xl font-bold">{totalBeds}</p>
          </div>
          <BedIcon size={24} className="text-blue-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-green-600">{availableBeds}</p>
          </div>
          <BedIcon size={24} className="text-green-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Occupied</p>
            <p className="text-2xl font-bold text-blue-600">{occupiedBeds}</p>
          </div>
          <BedIcon size={24} className="text-blue-500" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Maintenance</p>
            <p className="text-2xl font-bold text-red-600">{maintenanceBeds}</p>
          </div>
          <AlertCircle size={24} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default BedStats;
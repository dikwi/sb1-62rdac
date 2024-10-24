import React from 'react';
import BedCard from './BedCard';

interface BedGroupProps {
  category: string;
  beds: Array<{
    id: number;
    number: string;
    status: string;
    patient: string | null;
    admissionDate: string | null;
    building: string;
    floor: number;
    department: string;
  }>;
}

const BedGroup: React.FC<BedGroupProps> = ({ category, beds }) => {
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(bed => bed.status === 'occupied').length;
  const availableBeds = beds.filter(bed => bed.status === 'available').length;

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{category}</h3>
        <div className="flex space-x-4 text-sm">
          <span className="text-gray-500">Total: {totalBeds}</span>
          <span className="text-blue-600">Occupied: {occupiedBeds}</span>
          <span className="text-green-600">Available: {availableBeds}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {beds.map((bed) => (
          <BedCard key={bed.id} bed={bed} />
        ))}
      </div>
    </div>
  );
};

export default BedGroup;
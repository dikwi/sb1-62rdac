import React from 'react';
import { Bed, User, Building, ArrowUpDown } from 'lucide-react';

interface BedCardProps {
  bed: {
    id: number;
    number: string;
    status: string;
    patient: string | null;
    admissionDate: string | null;
    building: string;
    floor: number;
    department: string;
  };
}

const BedCard: React.FC<BedCardProps> = ({ bed }) => {
  const getBedStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 relative hover:shadow-md transition-shadow ${getBedStatusColor(bed.status)}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <Bed size={18} className="mr-2" />
          <span className="font-semibold">Bed {bed.number}</span>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full font-medium`}>
          {bed.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <Building size={16} className="mr-2 text-gray-500" />
          <span>Building {bed.building}</span>
        </div>

        <div className="flex items-center text-sm">
          <ArrowUpDown size={16} className="mr-2 text-gray-500" />
          <span>Floor {bed.floor}</span>
        </div>

        {bed.patient && (
          <div className="flex items-center text-sm border-t pt-2 mt-2">
            <User size={16} className="mr-2 text-gray-500" />
            <div>
              <p className="font-medium">{bed.patient}</p>
              <p className="text-xs text-gray-500">
                Since {new Date(bed.admissionDate!).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute top-2 right-2">
        <button className="text-sm font-medium hover:underline">
          Details
        </button>
      </div>
    </div>
  );
};

export default BedCard;
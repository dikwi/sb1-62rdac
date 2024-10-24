import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Visit } from '../types';

interface VisitRowProps {
  visit: Visit;
  onSelect: (id: string, checked: boolean) => void;
  onFavorite: (id: string) => void;
  onClick: () => void;
  isSelected: boolean;
}

const VisitRow: React.FC<VisitRowProps> = ({
  visit,
  onSelect,
  onFavorite,
  onClick,
  isSelected,
}) => {
  const renderStepStars = (step: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            className={i <= step ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const getDepartmentColor = (department: string) => {
    switch (department.toUpperCase()) {
      case 'ER':
        return 'bg-red-100 text-red-800';
      case 'IPD':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <tr 
      className="hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <td className="px-4 py-4">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(visit.id, e.target.checked);
          }}
          className="rounded border-gray-300"
        />
      </td>
      <td className="px-4 py-4">
        <Heart 
          size={16} 
          className={`${visit.favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(visit.id);
          }}
        />
      </td>
      <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
        {visit.patientName}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {visit.category}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(visit.dateIn)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {visit.doctor}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {visit.diagnosis}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDepartmentColor(visit.department)}`}>
          {visit.department}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {visit.room}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {renderStepStars(visit.step)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {visit.id}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          visit.status === 'P' ? 'bg-yellow-100 text-yellow-800' : 
          visit.status === 'C' ? 'bg-green-100 text-green-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {visit.status}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {visit.timeElapsed}
      </td>
    </tr>
  );
};

export default VisitRow;
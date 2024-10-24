import React from 'react';
import VisitRow from './VisitRow';
import { Visit } from '../types';

interface VisitsTableProps {
  visits: Visit[];
  selectedVisits: string[];
  onSelectVisit: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onFavorite: (id: string) => void;
  onViewVisit: (visit: Visit) => void;
}

const VisitsTable: React.FC<VisitsTableProps> = ({
  visits,
  selectedVisits,
  onSelectVisit,
  onSelectAll,
  onFavorite,
  onViewVisit,
}) => {
  const tableHeaders = [
    { key: 'checkbox', label: '', width: 'w-10' },
    { key: 'favorite', label: '', width: 'w-10' },
    { key: 'patient', label: 'Patient' },
    { key: 'category', label: 'Category' },
    { key: 'dateIn', label: 'Date IN' },
    { key: 'doctor', label: 'Doctor' },
    { key: 'diagnosis', label: 'Diagnosis' },
    { key: 'department', label: 'Department' },
    { key: 'room', label: 'Room' },
    { key: 'step', label: 'Step' },
    { key: 'id', label: 'ID' },
    { key: 'status', label: 'Status' },
    { key: 'time', label: 'Time' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {tableHeaders.map(header => (
              <th
                key={header.key}
                className={`${header.width || ''} px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
              >
                {header.key === 'checkbox' ? (
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedVisits.length === visits.length}
                    onChange={(e) => onSelectAll(e.target.checked)}
                  />
                ) : header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {visits.map((visit) => (
            <VisitRow
              key={visit.id}
              visit={visit}
              isSelected={selectedVisits.includes(visit.id)}
              onSelect={onSelectVisit}
              onFavorite={onFavorite}
              onClick={() => onViewVisit(visit)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitsTable;
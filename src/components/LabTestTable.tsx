import React from 'react';
import { Edit, ChevronUp, ChevronDown } from 'lucide-react';
import LabTestStatus from './LabTestStatus';

interface LabTestTableProps {
  labTests: any[];
  onEditTest: (test: any) => void;
  onStageAction: (test: any, stage: string) => void;
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  selectedTests: string[];
  setSelectedTests: React.Dispatch<React.SetStateAction<string[]>>;
}

const LabTestTable: React.FC<LabTestTableProps> = ({
  labTests,
  onEditTest,
  onStageAction,
  onSort,
  sortConfig,
  selectedTests,
  setSelectedTests,
}) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedTests(labTests.map(test => test.id));
    } else {
      setSelectedTests([]);
    }
  };

  const handleSelectTest = (e: React.ChangeEvent<HTMLInputElement>, testId: string) => {
    if (e.target.checked) {
      setSelectedTests(prev => [...prev, testId]);
    } else {
      setSelectedTests(prev => prev.filter(id => id !== testId));
    }
  };

  const renderSortIcon = (key: string) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedTests.length === labTests.length}
              />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('patientName')}
            >
              Patient {renderSortIcon('patientName')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('testType')}
            >
              Test Type {renderSortIcon('testType')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('status')}
            >
              Status {renderSortIcon('status')}
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort('requestedBy')}
            >
              Requested By {renderSortIcon('requestedBy')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {labTests.map((test: any) => (
            <tr key={test.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedTests.includes(test.id)}
                  onChange={(e) => handleSelectTest(e, test.id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{test.patientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{test.testType}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <LabTestStatus
                  status={test.status}
                  onAction={(stage) => onStageAction(test, stage)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{test.requestedBy}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEditTest(test)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  <Edit size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabTestTable;
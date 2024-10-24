import React from 'react';
import { Filter } from 'lucide-react';

interface LabTestFiltersProps {
  filters: {
    status: string;
    dateRange: string;
    testType: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    status: string;
    dateRange: string;
    testType: string;
  }>>;
}

const LabTestFilters: React.FC<LabTestFiltersProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center space-x-4">
      <Filter size={20} className="text-gray-500" />
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className="border rounded-md px-2 py-1"
      >
        <option value="">All Statuses</option>
        <option value="Requested">Requested</option>
        <option value="Sample Collected">Sample Collected</option>
        <option value="Processed">Processed</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Communicated">Communicated</option>
        <option value="Doctor Reviewed">Doctor Reviewed</option>
        <option value="Consultation Completed">Consultation Completed</option>
        <option value="Billed">Billed</option>
        <option value="Paid">Paid</option>
      </select>
      <select
        name="testType"
        value={filters.testType}
        onChange={handleFilterChange}
        className="border rounded-md px-2 py-1"
      >
        <option value="">All Test Types</option>
        <option value="Blood Test">Blood Test</option>
        <option value="Urine Test">Urine Test</option>
      </select>
      {/* Add date range picker here if needed */}
    </div>
  );
};

export default LabTestFilters;
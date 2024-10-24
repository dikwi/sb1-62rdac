import React from 'react';
import { Filter } from 'lucide-react';
import LabTestSearch from './LabTestSearch';

interface LabTestsFiltersProps {
  filters: {
    status: string;
    dateRange: string;
    testType: string;
    searchTerm: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    status: string;
    dateRange: string;
    testType: string;
    searchTerm: string;
  }>>;
}

const LabTestsFilters: React.FC<LabTestsFiltersProps> = ({ filters, setFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchTerm: value }));
  };

  return (
    <div className="mb-4 flex items-center space-x-4">
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
        {/* Add more test types as needed */}
      </select>
      <LabTestSearch searchTerm={filters.searchTerm} setSearchTerm={handleSearchChange} />
    </div>
  );
};

export default LabTestsFilters;
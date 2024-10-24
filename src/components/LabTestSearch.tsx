import React from 'react';
import { Search } from 'lucide-react';

interface LabTestSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const LabTestSearch: React.FC<LabTestSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search lab tests..."
        className="pl-10 pr-4 py-2 border rounded-md w-64"
      />
      <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default LabTestSearch;
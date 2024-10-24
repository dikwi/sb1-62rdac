import { useState, useMemo } from 'react';

export const useLabTestsFilter = (labTests: any[]) => {
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    testType: '',
    searchTerm: '',
  });

  const filteredTests = useMemo(() => {
    return labTests.filter(test => {
      const matchesStatus = !filters.status || test.status === filters.status;
      const matchesTestType = !filters.testType || test.testType === filters.testType;
      const matchesSearch = !filters.searchTerm || 
        test.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        test.testType.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        test.requestedBy.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Implement date range filtering if needed

      return matchesStatus && matchesTestType && matchesSearch;
    });
  }, [labTests, filters]);

  return { filters, setFilters, filteredTests };
};
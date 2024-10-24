import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchResults } from '../services/api';
import { FileText, Eye } from 'lucide-react';
import ResultModal from '../components/ResultModal';

const Results: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);

  const { data: results, isLoading, error } = useQuery('results', fetchResults);

  const handleViewResult = (result: any) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching results</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Results Management</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test/Service Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results?.map((result: any) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap">{result.patientName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(result.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    result.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewResult(result)}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={selectedResult}
        />
      )}
    </div>
  );
};

export default Results;
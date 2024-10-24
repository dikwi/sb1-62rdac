import React from 'react';
import { X } from 'lucide-react';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: any;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Result Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Patient Information</h3>
            <p>Name: {result.patientName}</p>
            <p>ID: {result.patientId}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Test/Service Information</h3>
            <p>Type: {result.type}</p>
            <p>Date: {new Date(result.date).toLocaleString()}</p>
            <p>Status: {result.status}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Results</h3>
            {result.type === 'Lab Test' ? (
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {result.results.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.test}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.referenceRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <p className="font-semibold">Findings:</p>
                <p>{result.findings}</p>
                {result.imageUrl && (
                  <div className="mt-4">
                    <p className="font-semibold">Image:</p>
                    <img src={result.imageUrl} alt="Result Image" className="max-w-full h-auto" />
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Interpretation</h3>
            <p>{result.interpretation}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Performed By</h3>
            <p>{result.performedBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface AttendanceImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (attendanceData: any[]) => void;
}

const AttendanceImportModal: React.FC<AttendanceImportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to import');
      return;
    }

    try {
      const content = await file.text();
      const attendanceData = parseCSV(content);
      onSubmit(attendanceData);
    } catch (err) {
      setError('Error parsing file. Please ensure it\'s a valid CSV.');
    }
  };

  const parseCSV = (content: string): any[] => {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === headers.length) {
        const entry: any = {};
        headers.forEach((header, index) => {
          entry[header.trim()] = values[index].trim();
        });
        data.push(entry);
      }
    }

    return data;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Import Attendance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">CSV File</label>
            <input
              type="file"
              id="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Upload className="mr-2" size={20} />
              Import Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceImportModal;
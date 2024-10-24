import React from 'react';

interface InsuranceInfoProps {
  patient: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const InsuranceInfo: React.FC<InsuranceInfoProps> = ({ patient, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">Insurance</label>
        <input
          type="text"
          id="insurance"
          name="insurance"
          value={patient?.insurance || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="group" className="block text-sm font-medium text-gray-700">Group</label>
        <select
          id="group"
          name="group"
          value={patient?.group || ''}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Select</option>
          <option value="Resident">Resident</option>
          <option value="Expat">Expat</option>
          <option value="Tourist">Tourist</option>
        </select>
      </div>
    </div>
  );
};

export default InsuranceInfo;
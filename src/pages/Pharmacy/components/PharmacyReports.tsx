import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from 'react-query';
import { fetchPharmacyReports } from '../../../services/api';

const PharmacyReports: React.FC = () => {
  const [reportType, setReportType] = useState<'sales' | 'inventory' | 'expiry'>('sales');
  const { data: reports } = useQuery(['pharmacyReports', reportType], () => fetchPharmacyReports(reportType));

  return (
    <div>
      <div className="mb-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value as 'sales' | 'inventory' | 'expiry')}
          className="border rounded-md px-2 py-1"
        >
          <option value="sales">Sales Report</option>
          <option value="inventory">Inventory Report</option>
          <option value="expiry">Expiry Report</option>
        </select>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={reports}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PharmacyReports;
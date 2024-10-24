import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDashboardData } from '../services/api';
import { Users, DollarSign, Calendar, Package } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const { data, isLoading, error } = useQuery(['dashboardData', timeFrame], () => fetchDashboardData(timeFrame));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching dashboard data</div>;

  const timeFrameOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6">
        <div className="flex space-x-2">
          {timeFrameOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeFrame(option.value as 'daily' | 'weekly' | 'monthly' | 'yearly')}
              className={`px-4 py-2 rounded-md ${
                timeFrame === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Patient Visits"
          value={data.patientVisits.total}
          icon={<Users className="w-8 h-8 text-blue-500" />}
        />
        <DashboardCard
          title="Revenue"
          value={`$${data.revenue.total.toFixed(2)}`}
          icon={<DollarSign className="w-8 h-8 text-green-500" />}
        />
        <DashboardCard
          title="Stock Items"
          value={data.stock.total}
          icon={<Package className="w-8 h-8 text-purple-500" />}
        />
        <DashboardCard
          title="Appointments"
          value={data.appointments.total}
          icon={<Calendar className="w-8 h-8 text-yellow-500" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Patient Visits</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.patientVisits.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.revenue.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Stock Items</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.stock.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.appointments.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    </div>
  </div>
);

export default Dashboard;
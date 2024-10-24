import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchStaff, addStaff, updateStaff, deleteStaff, fetchSchedules, addSchedule, fetchPayroll, processPayroll, fetchAttendance, addAttendance, importAttendance } from '../services/api';
import { Plus, Edit, Trash, Calendar, DollarSign, Clock, Upload } from 'lucide-react';
import StaffModal from '../components/StaffModal';
import ScheduleModal from '../components/ScheduleModal';
import PayrollModal from '../components/PayrollModal';
import AttendanceModal from '../components/AttendanceModal';
import AttendanceImportModal from '../components/AttendanceImportModal';

const HumanResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staff' | 'schedules' | 'attendance' | 'payroll'>('staff');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isAttendanceImportModalOpen, setIsAttendanceImportModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);

  const { data: staff, isLoading: staffLoading, error: staffError } = useQuery('staff', fetchStaff);
  const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useQuery('schedules', fetchSchedules);
  const { data: payroll, isLoading: payrollLoading, error: payrollError } = useQuery('payroll', fetchPayroll);
  const { data: attendance, isLoading: attendanceLoading, error: attendanceError } = useQuery('attendance', fetchAttendance);

  const queryClient = useQueryClient();

  const addStaffMutation = useMutation(addStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries('staff');
      setIsStaffModalOpen(false);
    },
  });

  const updateStaffMutation = useMutation(updateStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries('staff');
      setIsStaffModalOpen(false);
    },
  });

  const deleteStaffMutation = useMutation(deleteStaff, {
    onSuccess: () => {
      queryClient.invalidateQueries('staff');
    },
  });

  const addScheduleMutation = useMutation(addSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries('schedules');
      setIsScheduleModalOpen(false);
    },
  });

  const processPayrollMutation = useMutation(processPayroll, {
    onSuccess: () => {
      queryClient.invalidateQueries('payroll');
      setIsPayrollModalOpen(false);
    },
  });

  const addAttendanceMutation = useMutation(addAttendance, {
    onSuccess: () => {
      queryClient.invalidateQueries('attendance');
      setIsAttendanceModalOpen(false);
    },
  });

  const importAttendanceMutation = useMutation(importAttendance, {
    onSuccess: () => {
      queryClient.invalidateQueries('attendance');
      setIsAttendanceImportModalOpen(false);
    },
  });

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsStaffModalOpen(true);
  };

  const handleEditStaff = (staffMember: any) => {
    setSelectedStaff(staffMember);
    setIsStaffModalOpen(true);
  };

  const handleDeleteStaff = (id: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      deleteStaffMutation.mutate(id);
    }
  };

  const handleProcessPayroll = (payrollData: any) => {
    processPayrollMutation.mutate(payrollData);
  };

  const handleAddAttendance = (attendanceData: any) => {
    addAttendanceMutation.mutate(attendanceData);
  };

  const handleImportAttendance = (attendanceData: any[]) => {
    importAttendanceMutation.mutate(attendanceData);
  };

  if (staffLoading || schedulesLoading || payrollLoading || attendanceLoading) return <div>Loading...</div>;
  if (staffError || schedulesError || payrollError || attendanceError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Human Resources</h1>

      <div className="mb-6">
        <div className="flex space-x-4 border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'staff' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('staff')}
          >
            Staff
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'schedules' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('schedules')}
          >
            Schedules
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'attendance' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('attendance')}
          >
            Attendance
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'payroll' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('payroll')}
          >
            Payroll
          </button>
        </div>
      </div>

      {activeTab === 'staff' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Staff Management</h2>
            <button
              onClick={handleAddStaff}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="mr-2" size={20} />
              Add Staff
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff?.map((staffMember: any) => (
                  <tr key={staffMember.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{staffMember.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditStaff(staffMember)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(staffMember.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'schedules' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Staff Schedules</h2>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Calendar className="mr-2" size={20} />
              Add Schedule
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedules?.map((schedule: any) => (
                  <tr key={schedule.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{schedule.staffName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{schedule.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{schedule.startTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{schedule.endTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{schedule.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Staff Attendance</h2>
            <div className="space-x-2">
              <button
                onClick={() => setIsAttendanceModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Clock className="mr-2" size={20} />
                Add Attendance
              </button>
              <button
                onClick={() => setIsAttendanceImportModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Upload className="mr-2" size={20} />
                Import Attendance
              </button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendance?.map((record: any) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.staffName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.clockIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.clockOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Payroll</h2>
            <button
              onClick={() => setIsPayrollModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <DollarSign className="mr-2" size={20} />
              Process Payroll
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case-base Pay</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incentives</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pay</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payroll?.map((pay: any) => (
                  <tr key={pay.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{pay.staffName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{pay.payPeriod}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${pay.baseSalary?.toFixed(2) ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${pay.caseBasePay?.toFixed(2) ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${pay.incentives?.toFixed(2) ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${pay.deductions?.toFixed(2) ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${pay.totalPay?.toFixed(2) ?? 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(pay.processedDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isStaffModalOpen && (
        <StaffModal
          isOpen={isStaffModalOpen}
          onClose={() => setIsStaffModalOpen(false)}
          onSubmit={(staff) => selectedStaff ? updateStaffMutation.mutate(staff) : addStaffMutation.mutate(staff)}
          staff={selectedStaff}
        />
      )}

      {isScheduleModalOpen && (
        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSubmit={(schedule) => addScheduleMutation.mutate(schedule)}
        />
      )}

      {isPayrollModalOpen && (
        <PayrollModal
          isOpen={isPayrollModalOpen}
          onClose={() => setIsPayrollModalOpen(false)}
          onSubmit={handleProcessPayroll}
        />
      )}

      {isAttendanceModalOpen && (
        <AttendanceModal
          isOpen={isAttendanceModalOpen}
          onClose={() => setIsAttendanceModalOpen(false)}
          onSubmit={handleAddAttendance}
        />
      )}

      {isAttendanceImportModalOpen && (
        <AttendanceImportModal
          isOpen={isAttendanceImportModalOpen}
          onClose={() => setIsAttendanceImportModalOpen(false)}
          onSubmit={handleImportAttendance}
        />
      )}
    </div>
  );
};

export default HumanResources;
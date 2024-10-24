import {
  fetchData,
  addData,
  updateData,
  deleteData,
} from './localStorageService';

// Patients
export const fetchPatients = () => fetchData('patients');
export const addPatient = (patient: any) => addData('patients', patient);
export const updatePatient = (patient: any) => updateData('patients', patient);
export const deletePatient = (id: string) => deleteData('patients', id);

// Visits
export const fetchVisits = () => fetchData('visits');
export const addVisit = (visit: any) => addData('visits', visit);
export const updateVisit = (visit: any) => updateData('visits', visit);
export const deleteVisit = (id: string) => deleteData('visits', id);

// Lab Tests
export const fetchLabTests = () => fetchData('labTests');
export const addLabTest = (test: any) => addData('labTests', test);
export const updateLabTest = (test: any) => updateData('labTests', test);
export const updateLabTestBatch = ({ ids, action }: { ids: string[], action: string }) => {
  const labTests = fetchData('labTests');
  const updatedTests = labTests.map((test: any) => {
    if (ids.includes(test.id)) {
      return { ...test, status: action };
    }
    return test;
  });
  updatedTests.forEach((test: any) => updateData('labTests', test));
  return { success: true, message: `Updated ${ids.length} tests` };
};

// Medications
export const fetchMedications = () => fetchData('medications');
export const addMedication = (medication: any) => addData('medications', medication);
export const updateMedication = (medication: any) => updateData('medications', medication);
export const deleteMedication = (id: string) => deleteData('medications', id);

// Prescriptions
export const fetchPrescriptions = () => fetchData('prescriptions');
export const updatePrescription = (prescription: any) => updateData('prescriptions', prescription);

// Invoices
export const fetchInvoices = () => fetchData('invoices');
export const addInvoice = (invoice: any) => addData('invoices', invoice);
export const updateInvoice = (invoice: any) => updateData('invoices', invoice);

// Users
export const fetchUsers = () => fetchData('users');
export const addUser = (user: any) => addData('users', user);
export const updateUser = (user: any) => updateData('users', user);

// Doctors (for appointments)
export const fetchDoctors = () => {
  const users = fetchData('users');
  return users.filter((user: any) => user.role === 'Doctor');
};

// Pharmacy Reports
export const fetchPharmacyReports = (reportType: 'sales' | 'inventory' | 'expiry') => {
  // This is a placeholder. In a real app, you'd calculate these reports based on actual data.
  const mockReportData = {
    sales: [
      { name: 'Jan', value: 4000 },
      { name: 'Feb', value: 3000 },
      { name: 'Mar', value: 5000 },
    ],
    inventory: [
      { name: 'Medication A', value: 100 },
      { name: 'Medication B', value: 200 },
      { name: 'Medication C', value: 150 },
    ],
    expiry: [
      { name: 'This Month', value: 10 },
      { name: 'Next Month', value: 20 },
      { name: 'In 3 Months', value: 30 },
    ],
  };
  return mockReportData[reportType];
};

// Lab Test Workflow Functions
export const submitLabTestRequest = (request: any) => updateData('labTests', { ...request, status: 'Requested' });
export const submitSampleCollection = (data: any) => updateData('labTests', { ...data, status: 'Sample Collected' });
export const submitLabProcessing = (data: any) => updateData('labTests', { ...data, status: 'Processed' });
export const submitResultsReview = (data: any) => updateData('labTests', { ...data, status: 'Reviewed' });
export const submitResultsCommunication = (data: any) => updateData('labTests', { ...data, status: 'Communicated' });
export const submitDoctorReview = (data: any) => updateData('labTests', { ...data, status: 'Doctor Reviewed' });
export const submitPatientConsultation = (data: any) => updateData('labTests', { ...data, status: 'Consultation Completed' });

// Sync with Google Calendar (placeholder function)
export const syncGoogleCalendar = () => {
  console.log('Syncing with Google Calendar...');
  return { success: true, message: 'Synced with Google Calendar' };
};

// Dashboard
export const fetchDashboardData = (timeFrame: 'daily' | 'weekly' | 'monthly' | 'yearly') => mockApiCall(mockDashboardData[timeFrame]);

// ... (previous content remains unchanged)

// Appointments
export const fetchAppointments = () => mockApiCall([]);
export const addAppointment = (appointment: any) => {
  return mockApiCall({ ...appointment, id: Date.now().toString() });
};
export const updateAppointment = (appointment: any) => {
  return mockApiCall(appointment);
};
export const deleteAppointment = (id: string) => {
  return mockApiCall({ success: true });
};



// ... (rest of the content remains unchanged)
import { mockDashboardData, mockPatients, mockDrugsAndServices, mockInvoices, mockUsers, mockReportData, mockStaff, mockSchedules, mockPayroll, mockClaims, mockInsurers, mockLabTests, mockImagingRequests, mockResults, mockHealthFacilities, mockItems, mockAttendance } from './mockData';

// Helper function to simulate API call delay
const mockApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};




// Drugs and Services
export const fetchDrugsAndServices = () => mockApiCall(mockDrugsAndServices);
export const addDrug = (drug: any) => {
  const newDrug = { ...drug, id: mockDrugsAndServices.drugs.length + 1 };
  mockDrugsAndServices.drugs.push(newDrug);
  return mockApiCall(newDrug);
};
export const updateDrug = (drug: any) => {
  const index = mockDrugsAndServices.drugs.findIndex(d => d.id === drug.id);
  if (index !== -1) {
    mockDrugsAndServices.drugs[index] = { ...mockDrugsAndServices.drugs[index], ...drug };
    return mockApiCall(mockDrugsAndServices.drugs[index]);
  }
  throw new Error('Drug not found');
};
export const updateDrugStock = (data: { drugId: number; action: 'in' | 'out'; quantity: number; prescriptionId?: string; note?: string }) => {
  const drug = mockDrugsAndServices.drugs.find(d => d.id === data.drugId);
  if (drug) {
    if (data.action === 'in') {
      drug.stock += data.quantity;
    } else {
      drug.stock -= data.quantity;
    }
    return mockApiCall(drug);
  }
  throw new Error('Drug not found');
};




// Reports
export const fetchReportData = () => mockApiCall(mockReportData);

// Staff
export const fetchStaff = () => mockApiCall(mockStaff);
export const addStaff = (staffMember: any) => {
  const newStaffMember = { ...staffMember, id: mockStaff.length + 1 };
  mockStaff.push(newStaffMember);
  return mockApiCall(newStaffMember);
};
export const updateStaff = (staffMember: any) => {
  const index = mockStaff.findIndex(s => s.id === staffMember.id);
  if (index !== -1) {
    mockStaff[index] = { ...mockStaff[index], ...staffMember };
    return mockApiCall(mockStaff[index]);
  }
  throw new Error('Staff member not found');
};
export const deleteStaff = (id: number) => {
  const index = mockStaff.findIndex(s => s.id === id);
  if (index !== -1) {
    const deletedStaff = mockStaff.splice(index, 1)[0];
    return mockApiCall(deletedStaff);
  }
  throw new Error('Staff member not found');
};

// Schedules
export const fetchSchedules = () => mockApiCall(mockSchedules);
export const addSchedule = (schedule: any) => {
  const newSchedule = { ...schedule, id: mockSchedules.length + 1 };
  mockSchedules.push(newSchedule);
  return mockApiCall(newSchedule);
};

// Payroll
export const fetchPayroll = () => mockApiCall(mockPayroll);
export const processPayroll = (payrollData: any) => {
  const newPayroll = { ...payrollData, id: mockPayroll.length + 1, processedDate: new Date().toISOString() };
  mockPayroll.push(newPayroll);
  return mockApiCall(newPayroll);
};



// Imaging Requests
export const fetchImagingRequests = () => mockApiCall(mockImagingRequests);
export const addImagingRequest = (request: any) => {
  const newRequest = { ...request, id: Date.now().toString() };
  mockImagingRequests.push(newRequest);
  return mockApiCall(newRequest);
};
export const updateImagingRequest = (request: any) => {
  const index = mockImagingRequests.findIndex(r => r.id === request.id);
  if (index !== -1) {
    mockImagingRequests[index] = { ...mockImagingRequests[index], ...request };
    return mockApiCall(mockImagingRequests[index]);
  }
  throw new Error('Imaging request not found');
};

// Results
export const fetchResults = () => mockApiCall(mockResults);

// Claims
export const fetchClaims = () => mockApiCall(mockClaims);
export const submitClaim = (claim: any) => {
  const newClaim = { ...claim, id: Date.now().toString(), status: 'Pending' };
  mockClaims.push(newClaim);
  return mockApiCall(newClaim);
};
export const updateClaimStatus = ({ claimId, status }: { claimId: string; status: string }) => {
  const index = mockClaims.findIndex(c => c.id === claimId);
  if (index !== -1) {
    mockClaims[index] = { ...mockClaims[index], status };
    return mockApiCall(mockClaims[index]);
  }
  throw new Error('Claim not found');
};

// Insurers
export const fetchInsurers = () => mockApiCall(mockInsurers);

// Unpaid Claims
export const fetchUnpaidClaims = () => mockApiCall(mockClaims.filter(claim => claim.status !== 'Paid'));

// Payment Reconciliation
export const reconcilePayment = ({ claimIds, amount }: { claimIds: string[]; amount: number }) => {
  claimIds.forEach(id => {
    const claim = mockClaims.find(c => c.id === id);
    if (claim) {
      claim.status = 'Paid';
    }
  });
  return mockApiCall({ success: true });
};


export const fetchLaboItems = () => mockApiCall(mockItems.filter(item => item.type === 'Labo'));

// Health Facilities
export const fetchHealthFacilities = () => mockApiCall(mockHealthFacilities);
export const addHealthFacility = (facility: any) => {
  const newFacility = { ...facility, id: mockHealthFacilities.length + 1 };
  mockHealthFacilities.push(newFacility);
  return mockApiCall(newFacility);
};
export const updateHealthFacility = (facility: any) => {
  const index = mockHealthFacilities.findIndex(f => f.id === facility.id);
  if (index !== -1) {
    mockHealthFacilities[index] = { ...mockHealthFacilities[index], ...facility };
    return mockApiCall(mockHealthFacilities[index]);
  }
  throw new Error('Health facility not found');
};
export const deleteHealthFacility = (id: number) => {
  const index = mockHealthFacilities.findIndex(f => f.id === id);
  if (index !== -1) {
    const deletedFacility = mockHealthFacilities.splice(index, 1)[0];
    return mockApiCall(deletedFacility);
  }
  throw new Error('Health facility not found');
};

// Items
export const fetchItems = () => mockApiCall(mockItems);
export const addItem = (item: any) => {
  const newItem = { ...item, id: mockItems.length + 1 };
  mockItems.push(newItem);
  return mockApiCall(newItem);
};
export const updateItem = (item: any) => {
  const index = mockItems.findIndex(i => i.id === item.id);
  if (index !== -1) {
    mockItems[index] = { ...mockItems[index], ...item };
    return mockApiCall(mockItems[index]);
  }
  throw new Error('Item not found');
};
export const deleteItem = (id: number) => {
  const index = mockItems.findIndex(i => i.id === id);
  if (index !== -1) {
    const deletedItem = mockItems.splice(index, 1)[0];
    return mockApiCall(deletedItem);
  }
  throw new Error('Item not found');
};

// Attendance
export const fetchAttendance = () => mockApiCall(mockAttendance);
export const addAttendance = (attendance: any) => {
  const newAttendance = { ...attendance, id: Date.now().toString() };
  mockAttendance.push(newAttendance);
  return mockApiCall(newAttendance);
};

// Import Attendance
export const importAttendance = (attendanceData: any[]) => {
  attendanceData.forEach(record => {
    const newAttendance = { ...record, id: Date.now().toString() };
    mockAttendance.push(newAttendance);
  });
  return mockApiCall({ success: true, importedCount: attendanceData.length });
};
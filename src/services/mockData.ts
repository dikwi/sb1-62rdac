// ... (previous mock data)

// Medications data
export const mockMedications = [
  { id: '1', name: 'Aspirin', stock: 100, reorderLevel: 20, expiryDate: '2024-12-31', price: 5.99 },
  { id: '2', name: 'Ibuprofen', stock: 150, reorderLevel: 30, expiryDate: '2024-10-31', price: 7.99 },
  { id: '3', name: 'Amoxicillin', stock: 80, reorderLevel: 15, expiryDate: '2023-12-31', price: 12.99 },
  // Add more mock medications as needed
];

// Prescriptions data
export const mockPrescriptions = [
  { id: '1', patientName: 'John Doe', doctorName: 'Dr. Smith', medication: 'Aspirin', status: 'pending' },
  { id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Johnson', medication: 'Ibuprofen', status: 'fulfilled' },
  { id: '3', patientName: 'Bob Brown', doctorName: 'Dr. Lee', medication: 'Amoxicillin', status: 'pending' },
  // Add more mock prescriptions as needed
];

// ... (rest of the file remains unchanged)
// ... (previous mock data)

// Visits data
export const mockVisits = [
  { id: '1', patientName: 'John Doe', doctorName: 'Dr. Alice Johnson', date: '2023-05-20T10:00:00', status: 'Completed', reason: 'Annual checkup', consultationNotes: 'Patient is in good health', treatment: 'No treatment required', prescription: 'Vitamin D supplements' },
  { id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Bob Brown', date: '2023-05-21T14:30:00', status: 'In Progress', reason: 'Flu symptoms', consultationNotes: 'Patient has high fever and cough', treatment: 'Prescribed antibiotics', prescription: 'Amoxicillin 500mg' },
  { id: '3', patientName: 'Alice Johnson', doctorName: 'Dr. Charlie Davis', date: '2023-05-22T11:15:00', status: 'Waiting', reason: 'Sprained ankle', consultationNotes: '', treatment: '', prescription: '' },
  // Add more mock visits as needed
];

// ... (rest of the file remains unchanged)
// ... (previous mock data)

// Updated Items data
export const mockItems = [
  { id: 1, name: 'Paracetamol', type: 'Medicine', cost: 0.5, price: 1, stock: 1000 },
  { id: 2, name: 'Bandage', type: 'Supply', cost: 0.2, price: 0.5, stock: 500 },
  { id: 4, name: 'Ultrasound', type: 'Echography', cost: 50, price: 100 },
  { id: 5, name: 'Chest X-ray', type: 'Xray', cost: 30, price: 75 },
  { id: 6, name: 'Gastroscopy', type: 'Endo', cost: 100, price: 200 },
  { id: 7, name: 'ECG Test', type: 'ECG', cost: 40, price: 80 },
  { id: 8, name: 'Colonoscopy', type: 'Coloscopy', cost: 150, price: 300 },

  // Labo items
  { id: 'L001', name: 'Hg (CBC)', type: 'Labo', cost: 10, price: 25, group: 'HEMATOLOGY' },
  { id: 'L002', name: 'VS (ESR)', type: 'Labo', cost: 10, price: 25, group: 'HEMATOLOGY' },
  { id: 'L003', name: 'ABO Group / Rhesus', type: 'Labo', cost: 10, price: 25, group: 'HEMATOLOGY' },
  { id: 'L004', name: 'Reticulocyte', type: 'Labo', cost: 10, price: 25, group: 'HEMATOLOGY' },
  { id: 'L005', name: 'Malaria / Hematozoire', type: 'Labo', cost: 10, price: 25, group: 'HEMATOLOGY' },

  { id: 'L006', name: 'TS TC', type: 'Labo', cost: 10, price: 25, group: 'HEMOSTASIS' },
  { id: 'L007', name: 'PT/Taux Prothrombine', type: 'Labo', cost: 10, price: 25, group: 'HEMOSTASIS' },
  { id: 'L008', name: 'TCA / APTT', type: 'Labo', cost: 10, price: 25, group: 'HEMOSTASIS' },

  { id: 'L009', name: 'Glucose', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L010', name: 'HbA1C', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L011', name: 'Calcium', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L012', name: 'Cholesterol Total', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L013', name: 'Cholesterol HDL', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L014', name: 'Cholesterol LDL', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L015', name: 'Triglycerides', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L016', name: 'Urea / BUN', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L017', name: 'Creatinine', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L018', name: 'Bilirubine Total', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L019', name: 'Bilirubine Direct', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L020', name: 'Uric Acid', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L021', name: 'Albumin', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L022', name: 'Magnesium', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L023', name: 'Protein Total', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L024', name: 'Morphine ( Blood/Hg Tube )', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L025', name: 'Ferritine', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L026', name: 'Bicarbonates', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L027', name: 'Electrophores', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },
  { id: 'L028', name: 'Ionogramme (Na,K,Cl)', type: 'Labo', cost: 10, price: 25, group: 'BIOCHEMISTRY' },

  { id: 'L029', name: 'Transaminase', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L030', name: 'Gamma-GT', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L031', name: 'Amylase', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L032', name: 'ALP / PAL', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L033', name: 'Lippase', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L034', name: 'CPK', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L035', name: 'Troponine T', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L036', name: 'Calcitonin', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L037', name: 'Procalcitonin', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L038', name: 'Antigen HBs', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L039', name: 'Anti-HBs', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L040', name: 'Anti-HCV', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },
  { id: 'L041', name: 'Anti-HIV', type: 'Labo', cost: 10, price: 25, group: 'ENZYMOLOGY' },

  { id: 'L042', name: 'Anti-HBe', type: 'Labo', cost: 10, price: 25, group: 'SEROLOGY' },
  { id: 'L043', name: 'Anti HBc IgM', type: 'Labo', cost: 10, price: 25, group: 'SEROLOGY' },
  { id: 'L044', name: 'Anti HBc Total', type: 'Labo', cost: 10, price: 25, group: 'SEROLOGY' },
  { id: 'L045', name: 'Anti HAV IgG/IgM', type: 'Labo', cost: 10, price: 25, group: 'SEROLOGY' },
  { id: 'L046', name: 'Anti HAV Total', type: 'Labo', cost: 10, price: 25, group: 'SEROLOGY' },
  { id: 'L047', name: 'Syphilis TPHA', type: 'Labo', cost: 10, price: 25, group: 'SEROLOGY' },

  { id: 'L048', name: 'Dengue IgG/IgM', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L049', name: 'Dengue NS1', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L050', name: 'Chikungunya IgG/IgM', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L051', name: 'H-pylori IgG/IgM', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L052', name: 'ASLO', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L053', name: 'Facteur Rhumatoide', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L054', name: 'CRP (C-Reactive protein)', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L055', name: 'IgE', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L056', name: 'Allergy panel', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L057', name: 'TB (Tuberculosis) IgG/IgM', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },
  { id: 'L058', name: 'Widal (TO & TH)', type: 'Labo', cost: 10, price: 25, group: 'SERO-IMMUNOLOGY' },

  { id: 'L059', name: 'FT3', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L060', name: 'FT4', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L061', name: 'TSH', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L062', name: 'Beta HCG', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L063', name: 'Cortisol 4am or 8am', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L064', name: 'Estradiol', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L065', name: 'FSH', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L066', name: 'LH', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L067', name: 'Progesterone', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },
  { id: 'L068', name: 'Prolactine', type: 'Labo', cost: 10, price: 25, group: 'HORMONOLOGY' },

  { id: 'L069', name: 'AFP', type: 'Labo', cost: 10, price: 25, group: 'TUMOR MAKER' },
  { id: 'L070', name: 'PSA', type: 'Labo', cost: 10, price: 25, group: 'TUMOR MAKER' },
  { id: 'L071', name: 'CA 125', type: 'Labo', cost: 10, price: 25, group: 'TUMOR MAKER' },
  { id: 'L072', name: 'CA 15-3', type: 'Labo', cost: 10, price: 25, group: 'TUMOR MAKER' },
  { id: 'L073', name: 'CA 19-9', type: 'Labo', cost: 10, price: 25, group: 'TUMOR MAKER' },
  { id: 'L074', name: 'CA 72-4', type: 'Labo', cost: 10, price: 25, group: 'TUMOR MAKER' },

  { id: 'L075', name: 'Albumine, Sure, pH', type: 'Labo', cost: 10, price: 25, group: 'UROLOGY' },
  { id: 'L076', name: 'Cytology', type: 'Labo', cost: 10, price: 25, group: 'UROLOGY' },
  { id: 'L077', name: 'Amphetamine', type: 'Labo', cost: 10, price: 25, group: 'UROLOGY' },
  { id: 'L078', name: 'Morphine', type: 'Labo', cost: 10, price: 25, group: 'UROLOGY' },
  { id: 'L079', name: 'Methamphetamine', type: 'Labo', cost: 10, price: 25, group: 'UROLOGY' },

  { id: 'L080', name: 'HBV DNA (Qualitative)', type: 'Labo', cost: 10, price: 25, group: 'PCR' },
  { id: 'L081', name: 'HBV DNA (Quantitative)', type: 'Labo', cost: 10, price: 25, group: 'PCR' },
  { id: 'L082', name: 'HCV RNA (Qualitative)', type: 'Labo', cost: 10, price: 25, group: 'PCR' },
  { id: 'L083', name: 'HCV RNA (Quantitative)', type: 'Labo', cost: 10, price: 25, group: 'PCR' },
  { id: 'L084', name: 'HCV Genotype', type: 'Labo', cost: 10, price: 25, group: 'PCR' },

  { id: 'L085', name: 'Uroculture', type: 'Labo', cost: 10, price: 25, group: 'BACTERIOLOGY' },
  { id: 'L086', name: 'Hemoculture', type: 'Labo', cost: 10, price: 25, group: 'BACTERIOLOGY' },
  { id: 'L087', name: 'Examen Direct (Pus)', type: 'Labo', cost: 10, price: 25, group: 'BACTERIOLOGY' },
  { id: 'L088', name: 'Color, de Gram', type: 'Labo', cost: 10, price: 25, group: 'BACTERIOLOGY' },
  { id: 'L089', name: 'Coproculture', type: 'Labo', cost: 10, price: 25, group: 'BACTERIOLOGY' },
  { id: 'L090', name: 'Pus Culture', type: 'Labo', cost: 10, price: 25, group: 'BACTERIOLOGY' },
];

// ... (rest of the mock data)

// Dashboard data
export const mockDashboardData = {
  daily: {
    patientVisits: {
      total: 25,
      data: [
        { label: '00:00', value: 0 },
        { label: '04:00', value: 2 },
        { label: '08:00', value: 8 },
        { label: '12:00', value: 10 },
        { label: '16:00', value: 5 },
        { label: '20:00', value: 0 },
      ],
    },
    revenue: {
      total: 5000,
      data: [
        { label: '00:00', value: 0 },
        { label: '04:00', value: 500 },
        { label: '08:00', value: 1500 },
        { label: '12:00', value: 2000 },
        { label: '16:00', value: 1000 },
        { label: '20:00', value: 0 },
      ],
    },
    stock: {
      total: 1000,
      data: [
        { label: 'Medicine', value: 500 },
        { label: 'Supplies', value: 300 },
        { label: 'Equipment', value: 200 },
      ],
    },
    appointments: {
      total: 30,
      data: [
        { label: '08:00', value: 5 },
        { label: '10:00', value: 8 },
        { label: '12:00', value: 7 },
        { label: '14:00', value: 6 },
        { label: '16:00', value: 4 },
      ],
    },
  },
  weekly: {
    patientVisits: {
      total: 150,
      data: [
        { label: 'Mon', value: 20 },
        { label: 'Tue', value: 25 },
        { label: 'Wed', value: 30 },
        { label: 'Thu', value: 28 },
        { label: 'Fri', value: 22 },
        { label: 'Sat', value: 15 },
        { label: 'Sun', value: 10 },
      ],
    },
    revenue: {
      total: 30000,
      data: [
        { label: 'Mon', value: 4000 },
        { label: 'Tue', value: 5000 },
        { label: 'Wed', value: 6000 },
        { label: 'Thu', value: 5500 },
        { label: 'Fri', value: 4500 },
        { label: 'Sat', value: 3000 },
        { label: 'Sun', value: 2000 },
      ],
    },
    stock: {
      total: 1000,
      data: [
        { label: 'Medicine', value: 500 },
        { label: 'Supplies', value: 300 },
        { label: 'Equipment', value: 200 },
      ],
    },
    appointments: {
      total: 180,
      data: [
        { label: 'Mon', value: 30 },
        { label: 'Tue', value: 35 },
        { label: 'Wed', value: 32 },
        { label: 'Thu', value: 28 },
        { label: 'Fri', value: 25 },
        { label: 'Sat', value: 20 },
        { label: 'Sun', value: 10 },
      ],
    },
  },
  monthly: {
    patientVisits: {
      total: 600,
      data: [
        { label: 'Week 1', value: 150 },
        { label: 'Week 2', value: 160 },
        { label: 'Week 3', value: 140 },
        { label: 'Week 4', value: 150 },
      ],
    },
    revenue: {
      total: 120000,
      data: [
        { label: 'Week 1', value: 30000 },
        { label: 'Week 2', value: 32000 },
        { label: 'Week 3', value: 28000 },
        { label: 'Week 4', value: 30000 },
      ],
    },
    stock: {
      total: 1000,
      data: [
        { label: 'Medicine', value: 500 },
        { label: 'Supplies', value: 300 },
        { label: 'Equipment', value: 200 },
      ],
    },
    appointments: {
      total: 720,
      data: [
        { label: 'Week 1', value: 180 },
        { label: 'Week 2', value: 190 },
        { label: 'Week 3', value: 170 },
        { label: 'Week 4', value: 180 },
      ],
    },
  },
  yearly: {
    patientVisits: {
      total: 7200,
      data: [
        { label: 'Jan', value: 600 },
        { label: 'Feb', value: 550 },
        { label: 'Mar', value: 600 },
        { label: 'Apr', value: 580 },
        { label: 'May', value: 620 },
        { label: 'Jun', value: 650 },
        { label: 'Jul', value: 630 },
        { label: 'Aug', value: 600 },
        { label: 'Sep', value: 590 },
        { label: 'Oct', value: 610 },
        { label: 'Nov', value: 580 },
        { label: 'Dec', value: 590 },
      ],
    },
    revenue: {
      total: 1440000,
      data: [
        { label: 'Jan', value: 120000 },
        { label: 'Feb', value: 110000 },
        { label: 'Mar', value: 120000 },
        { label: 'Apr', value: 116000 },
        { label: 'May', value: 124000 },
        { label: 'Jun', value: 130000 },
        { label: 'Jul', value: 126000 },
        { label: 'Aug', value: 120000 },
        { label: 'Sep', value: 118000 },
        { label: 'Oct', value: 122000 },
        { label: 'Nov', value: 116000 },
        { label: 'Dec', value: 118000 },
      ],
    },
    stock: {
      total: 1000,
      data: [
        { label: 'Medicine', value: 500 },
        { label: 'Supplies', value: 300 },
        { label: 'Equipment', value: 200 },
      ],
    },
    appointments: {
      total: 8640,
      data: [
        { label: 'Jan', value: 720 },
        { label: 'Feb', value: 660 },
        { label: 'Mar', value: 720 },
        { label: 'Apr', value: 696 },
        { label: 'May', value: 744 },
        { label: 'Jun', value: 780 },
        { label: 'Jul', value: 756 },
        { label: 'Aug', value: 720 },
        { label: 'Sep', value: 708 },
        { label: 'Oct', value: 732 },
        { label: 'Nov', value: 696 },
        { label: 'Dec', value: 708 },
      ],
    },
  },
};

// ... (rest of the content remains unchanged)
// Appointments data
export const mockAppointments = [
  { id: '1', patientName: 'John Doe', doctorName: 'Dr. Alice Johnson', date: '2023-05-20T10:00:00', status: 'Scheduled' },
  { id: '2', patientName: 'Jane Smith', doctorName: 'Dr. Bob Brown', date: '2023-05-21T14:30:00', status: 'Completed' },
  { id: '3', patientName: 'Alice Johnson', doctorName: 'Dr. Charlie Davis', date: '2023-05-22T11:15:00', status: 'Canceled' },
  { id: '4', patientName: 'Robert Wilson', doctorName: 'Dr. Alice Johnson', date: '2023-05-23T09:00:00', status: 'Scheduled' },
  { id: '5', patientName: 'Emily Brown', doctorName: 'Dr. David Lee', date: '2023-05-24T16:45:00', status: 'Scheduled' },
  { id: '6', patientName: 'Michael Chen', doctorName: 'Dr. Bob Brown', date: '2023-05-25T13:30:00', status: 'Scheduled' },
  { id: '7', patientName: 'Sarah Davis', doctorName: 'Dr. Charlie Davis', date: '2023-05-26T10:15:00', status: 'Scheduled' },
  { id: '8', patientName: 'David Thompson', doctorName: 'Dr. Alice Johnson', date: '2023-05-27T11:00:00', status: 'Scheduled' },
  { id: '9', patientName: 'Lisa Garcia', doctorName: 'Dr. David Lee', date: '2023-05-28T15:30:00', status: 'Scheduled' },
  { id: '10', patientName: 'James Wilson', doctorName: 'Dr. Bob Brown', date: '2023-05-29T14:00:00', status: 'Scheduled' },
];

// Patients data
export const mockPatients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', dateOfBirth: '1990-01-01', sex: 'M', category: 'Worker' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', dateOfBirth: '1985-05-15', sex: 'F', category: 'Dependant' },
  // Add more mock patients as needed
];

// Drugs and Services data
export const mockDrugsAndServices = {
  drugs: [
    { id: 1, name: 'Paracetamol', genericName: 'Acetaminophen', price: 5, stock: 100 },
    { id: 2, name: 'Amoxicillin', genericName: 'Amoxicillin', price: 10, stock: 50 },
    // Add more mock drugs as needed
  ],
  services: [
    { id: 1, name: 'General Consultation', price: 50 },
    { id: 2, name: 'X-Ray', price: 100 },
    // Add more mock services as needed
  ],
};

// Invoices data
export const mockInvoices = [
  { id: 1, patientName: 'John Doe', date: '2023-05-01', amount: 150, status: 'Paid' },
  { id: 2, patientName: 'Jane Smith', date: '2023-05-02', amount: 200, status: 'Unpaid' },
  // Add more mock invoices as needed
];

// Users data
export const mockUsers = [
  { id: 1, name: 'Dr. Alice Johnson', email: 'alice@example.com', role: 'Doctor', isActive: true },
  { id: 2, name: 'Nurse Bob Brown', email: 'bob@example.com', role: 'Nurse', isActive: true },
  // Add more mock users as needed
];

// Report data
export const mockReportData = {
  revenue: [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 6000 },
    { month: 'Mar', revenue: 7500 },
    // Add more mock revenue data as needed
  ],
  patients: [
    { month: 'Jan', visits: 100 },
    { month: 'Feb', visits: 120 },
    { month: 'Mar', visits: 150 },
    // Add more mock patient visit data as needed
  ],
};

// Staff data
export const mockStaff = [
  { id: 1, name: 'Dr. Alice Johnson', role: 'Doctor', contact: '123-456-7890', email: 'alice@example.com' },
  { id: 2, name: 'Nurse Bob Brown', role: 'Nurse', contact: '098-765-4321', email: 'bob@example.com' },
  // Add more mock staff data as needed
];

// Schedules data
export const mockSchedules = [
  { id: 1, staffName: 'Dr. Alice Johnson', date: '2023-05-01', startTime: '09:00', endTime: '17:00', department: 'General Medicine' },
  { id: 2, staffName: 'Nurse Bob Brown', date: '2023-05-01', startTime: '08:00', endTime: '16:00', department: 'Emergency' },
  // Add more mock schedule data as needed
];

// Payroll data
export const mockPayroll = [
  { id: 1, staffName: 'Dr. Alice Johnson', payPeriod: 'May 2023', baseSalary: 5000, caseBasePay: 1000, incentives: 500, deductions: 200, totalPay: 6300, processedDate: '2023-05-31' },
  { id: 2, staffName: 'Nurse Bob Brown', payPeriod: 'May 2023', baseSalary: 3000, caseBasePay: 500, incentives: 200, deductions: 100, totalPay: 3600, processedDate: '2023-05-31' },
  // Add more mock payroll data as needed
];

// Claims data
export const mockClaims = [
  { id: '1', patientName: 'John Doe', insurer: 'ABC Insurance', amount: 500, status: 'Pending' },
  { id: '2', patientName: 'Jane Smith', insurer: 'XYZ Insurance', amount: 750, status: 'Approved' },
  // Add more mock claims data as needed
];

// Insurers data
export const mockInsurers = [
  { id: 1, name: 'ABC Insurance', contact: '123-456-7890', email: 'info@abcinsurance.com' },
  { id: 2, name: 'XYZ Insurance', contact: '098-765-4321', email: 'info@xyzinsurance.com' },
  // Add more mock insurers data as needed
];

// Lab Tests data
export const mockLabTests = [
  { id: '1', patientName: 'John Doe', testType: 'Blood Test', priority: 'Routine', status: 'Pending', requestedBy: 'Dr. Alice Johnson' },
  { id: '2', patientName: 'Jane Smith', testType: 'Urine Test', priority: 'Urgent', status: 'Completed', requestedBy: 'Dr. Bob Brown' },
  // Add more mock lab tests data as needed
];

// Imaging Requests data
export const mockImagingRequests = [
  { id: '1', patientName: 'John Doe', serviceType: 'X-Ray', priority: 'Routine', status: 'Pending', requestedBy: 'Dr. Alice Johnson' },
  { id: '2', patientName: 'Jane Smith', serviceType: 'MRI', priority: 'Urgent', status: 'Completed', requestedBy: 'Dr. Bob Brown' },
  // Add more mock imaging requests data as needed
];

// Results data
export const mockResults = [
  { id: '1', patientName: 'John Doe', type: 'Blood Test', date: '2023-05-01', status: 'Completed' },
  { id: '2', patientName: 'Jane Smith', type: 'X-Ray', date: '2023-05-02', status: 'Pending' },
  // Add more mock results data as needed
];

// Health Facilities data
export const mockHealthFacilities = [
  { id: 1, name: 'Calmette Hospital', khmerName: 'មន្ទីរពេទ្យកាល់ម៉ែត', phone: '023 123 456', email: 'info@ppgh.com', location: 'Phnom Penh' },
  { id: 2, name: 'Siem Reap Provincial Hospital', khmerName: 'មន្ទីរពេទ្យបង្អែកខេត្តសៀមរាប', phone: '063 765 432', email: 'info@srph.com', location: 'Siem Reap' },
  { id: 3, name: 'Battambang Referral Hospital', khmerName: 'មន្ទីរពេទ្យបង្អែកខេត្តបាត់ដំបង', phone: '053 952 511', email: 'info@bbrh.com', location: 'Battambang' },
];


// Attendance data
export const mockAttendance = [
  { id: '1', staffName: 'Dr. Alice Johnson', date: '2023-05-15', clockIn: '09:00', clockOut: '17:00', totalHours: 8 },
  { id: '2', staffName: 'Nurse Bob Brown', date: '2023-05-15', clockIn: '08:00', clockOut: '16:00', totalHours: 8 },
  { id: '3', staffName: 'Dr. Alice Johnson', date: '2023-05-16', clockIn: '09:15', clockOut: '17:30', totalHours: 8.25 },
  { id: '4', staffName: 'Nurse Bob Brown', date: '2023-05-16', clockIn: '07:45', clockOut: '16:15', totalHours: 8.5 },
];
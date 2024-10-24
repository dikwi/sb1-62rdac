import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'dr_dada_app_data';

interface AppData {
  patients: any[];
  visits: any[];
  labTests: any[];
  medications: any[];
  prescriptions: any[];
  invoices: any[];
  users: any[];
}

const defaultData: AppData = {
  patients: [],
  visits: [],
  labTests: [],
  medications: [],
  prescriptions: [],
  invoices: [],
  users: [
    { id: '1', name: 'Dr. Alice Johnson', email: 'alice@example.com', role: 'Doctor' },
    { id: '2', name: 'Nurse Bob Brown', email: 'bob@example.com', role: 'Nurse' },
  ],
};

const getStoredData = (): AppData => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : defaultData;
};

const setStoredData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const generateId = (): string => {
  try {
    return uuidv4();
  } catch (error) {
    // Fallback to a simple ID generation if uuid is not available
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};

export const fetchData = (key: keyof AppData) => {
  const data = getStoredData();
  return data[key];
};

export const addData = (key: keyof AppData, item: any) => {
  const data = getStoredData();
  const newItem = { ...item, id: generateId() };
  data[key] = [...data[key], newItem];
  setStoredData(data);
  return newItem;
};

export const updateData = (key: keyof AppData, item: any) => {
  const data = getStoredData();
  data[key] = data[key].map((i: any) => (i.id === item.id ? item : i));
  setStoredData(data);
  return item;
};

export const deleteData = (key: keyof AppData, id: string) => {
  const data = getStoredData();
  data[key] = data[key].filter((i: any) => i.id !== id);
  setStoredData(data);
};

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEY);
};
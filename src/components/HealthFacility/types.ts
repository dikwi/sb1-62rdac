export interface Bed {
  id: string;
  number: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
}

export interface Room {
  id: string;
  name: string;
  department: string;
  building: string;
  floor: number;
  type: string;
  hasAircon: boolean;
  beds: Bed[];
}

export interface RoomType {
  value: string;
  label: string;
  capacity: number;
}

export interface RoomGroup {
  title: string;
  rooms: Room[];
}
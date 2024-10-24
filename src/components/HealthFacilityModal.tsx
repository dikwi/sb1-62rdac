import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash } from 'lucide-react';
import AddRoomForm from './HealthFacility/AddRoomForm';
import { Room, RoomType } from './HealthFacility/types';

interface HealthFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (facility: any) => void;
  facility?: any;
}

const HealthFacilityModal: React.FC<HealthFacilityModalProps> = ({ isOpen, onClose, onSubmit, facility }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'rooms'>('general');
  const [formData, setFormData] = useState({
    name: '',
    khmerName: '',
    phone: '',
    email: '',
    location: '',
    departments: ['General Ward', 'ICU', 'Pediatric', 'Surgery', 'Emergency'],
    rooms: [] as Room[],
  });
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    name: '',
    department: '',
    building: '',
    floor: 1,
    type: 'vip',
    hasAircon: false,
    beds: [],
  });

  const roomTypes: RoomType[] = [
    { value: 'vip', label: 'VIP (1 bed)', capacity: 1 },
    { value: 'double', label: 'Double (2 beds)', capacity: 2 },
    ...Array.from({ length: 8 }, (_, i) => ({
      value: `ward-${i + 3}`,
      label: `Ward (${i + 3} beds)`,
      capacity: i + 3
    }))
  ];

  const cambodianProvinces = [
    'Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang', 'Kampong Speu',
    'Kampong Thom', 'Kampot', 'Kandal', 'Koh Kong', 'Kep', 'Kratie', 'Mondulkiri',
    'Oddar Meanchey', 'Pailin', 'Phnom Penh', 'Preah Vihear', 'Prey Veng', 'Pursat',
    'Ratanakiri', 'Siem Reap', 'Preah Sihanouk', 'Stung Treng', 'Svay Rieng', 'Takeo', 'Tboung Khmum'
  ];

  useEffect(() => {
    if (facility) {
      setFormData({
        ...facility,
        departments: facility.departments || ['General Ward', 'ICU', 'Pediatric', 'Surgery', 'Emergency'],
        rooms: facility.rooms || [],
      });
    }
  }, [facility]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getRoomCapacity = (type: string): number => {
    const roomType = roomTypes.find(rt => rt.value === type);
    return roomType?.capacity || 1;
  };

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.department && newRoom.building) {
      const room: Room = {
        id: Date.now().toString(),
        name: newRoom.name,
        department: newRoom.department,
        building: newRoom.building,
        floor: newRoom.floor || 1,
        type: newRoom.type || 'vip',
        hasAircon: newRoom.hasAircon || false,
        beds: Array.from({ length: getRoomCapacity(newRoom.type || 'vip') }, (_, i) => ({
          id: `${Date.now()}-${i}`,
          number: `${newRoom.name}-${i + 1}`,
          status: 'available',
        })),
      };

      setFormData(prev => ({
        ...prev,
        rooms: [...prev.rooms, room],
      }));

      setNewRoom({
        name: '',
        department: '',
        building: '',
        floor: 1,
        type: 'vip',
        hasAircon: false,
        beds: [],
      });
    }
  };

  const handleEditRoom = (id: string) => {
    setEditingRoom(id);
  };

  const handleUpdateRoom = (id: string, updates: Partial<Room>) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room => 
        room.id === id ? { ...room, ...updates } : room
      ),
    }));
  };

  const handleDeleteRoom = (id: string) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.filter(room => room.id !== id),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{facility ? 'Edit Health Facility' : 'Add Health Facility'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'general' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('general')}
            >
              General Information
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'rooms' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms/Beds
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'general' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="khmerName" className="block text-sm font-medium text-gray-700">Khmer Name</label>
                <input
                  type="text"
                  id="khmerName"
                  name="khmerName"
                  value={formData.khmerName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select Province</option>
                  {cambodianProvinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <AddRoomForm
                newRoom={newRoom}
                setNewRoom={setNewRoom}
                departments={formData.departments}
                roomTypes={roomTypes}
                onAddRoom={handleAddRoom}
              />

              <div>
                <h3 className="text-lg font-medium mb-4">Rooms by Department</h3>
                {formData.departments.map(department => {
                  const departmentRooms = formData.rooms.filter(room => room.department === department);
                  if (departmentRooms.length === 0) return null;

                  return (
                    <div key={department} className="mb-6">
                      <h4 className="text-md font-medium mb-2">{department}</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {departmentRooms.map(room => (
                          <div key={room.id} className="border rounded-lg p-4">
                            {editingRoom === room.id ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <input
                                    type="text"
                                    value={room.name}
                                    onChange={(e) => handleUpdateRoom(room.id, { name: e.target.value })}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Room Name"
                                  />
                                  <input
                                    type="text"
                                    value={room.building}
                                    onChange={(e) => handleUpdateRoom(room.id, { building: e.target.value })}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Building"
                                  />
                                  <input
                                    type="number"
                                    value={room.floor}
                                    onChange={(e) => handleUpdateRoom(room.id, { floor: parseInt(e.target.value) })}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    placeholder="Floor"
                                    min="1"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <select
                                    value={room.type}
                                    onChange={(e) => handleUpdateRoom(room.id, { type: e.target.value })}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  >
                                    {roomTypes.map(type => (
                                      <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                  </select>
                                  <label className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={room.hasAircon}
                                      onChange={(e) => handleUpdateRoom(room.id, { hasAircon: e.target.checked })}
                                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Air Conditioning</span>
                                  </label>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setEditingRoom(null)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium">{room.name}</h5>
                                    <p className="text-sm text-gray-500">
                                      Building {room.building} • Floor {room.floor} •{' '}
                                      {roomTypes.find(rt => rt.value === room.type)?.label}
                                      {room.hasAircon && ' • Air Conditioned'}
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      type="button"
                                      onClick={() => handleEditRoom(room.id)}
                                      className="text-blue-500 hover:text-blue-700"
                                    >
                                      <Edit size={16} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteRoom(room.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-4 grid grid-cols-6 gap-2">
                                  {room.beds.map(bed => (
                                    <div
                                      key={bed.id}
                                      className={`p-2 rounded-md text-center text-sm ${
                                        bed.status === 'available' ? 'bg-green-100 text-green-800' :
                                        bed.status === 'occupied' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                      }`}
                                    >
                                      {bed.number}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {facility ? 'Update Facility' : 'Add Facility'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthFacilityModal;
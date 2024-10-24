import React from 'react';
import { Room, RoomType } from './types';

interface AddRoomFormProps {
  newRoom: Partial<Room>;
  setNewRoom: React.Dispatch<React.SetStateAction<Partial<Room>>>;
  departments: string[];
  roomTypes: RoomType[];
  onAddRoom: () => void;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({
  newRoom,
  setNewRoom,
  departments,
  roomTypes,
  onAddRoom,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Add New Room</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            value={newRoom.department}
            onChange={(e) => setNewRoom(prev => ({ ...prev, department: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Building</label>
          <input
            type="text"
            value={newRoom.building}
            onChange={(e) => setNewRoom(prev => ({ ...prev, building: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="e.g., Building A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Floor</label>
          <input
            type="number"
            value={newRoom.floor}
            onChange={(e) => setNewRoom(prev => ({ ...prev, floor: parseInt(e.target.value) || 1 }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            min="1"
            placeholder="e.g., 1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Room Name</label>
          <input
            type="text"
            value={newRoom.name}
            onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="e.g., Room 101"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Room Type</label>
          <select
            value={newRoom.type}
            onChange={(e) => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            {roomTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={newRoom.hasAircon}
            onChange={(e) => setNewRoom(prev => ({ ...prev, hasAircon: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">Air Conditioning</span>
        </label>
      </div>

      <button
        type="button"
        onClick={onAddRoom}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Room
      </button>
    </div>
  );
};

export default AddRoomForm;
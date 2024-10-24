import React from 'react';

interface RoomsTabsProps {
  activeTab: 'department' | 'building' | 'floor';
  onTabChange: (tab: 'department' | 'building' | 'floor') => void;
}

const RoomsTabs: React.FC<RoomsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 border-b px-4">
      <button
        className={`py-2 px-4 ${activeTab === 'department' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => onTabChange('department')}
      >
        By Department
      </button>
      <button
        className={`py-2 px-4 ${activeTab === 'building' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => onTabChange('building')}
      >
        By Building
      </button>
      <button
        className={`py-2 px-4 ${activeTab === 'floor' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => onTabChange('floor')}
      >
        By Floor
      </button>
    </div>
  );
};

export default RoomsTabs;
import React, { useState, useMemo } from 'react';
import { X, Edit, Save, Trash } from 'lucide-react';

interface MedicalRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MedicalRecord {
  id: string;
  patientName: string;
  type: string;
  date: string;
}

interface VitalSign {
  id: string;
  date: string;
  time: string;
  temperature: number;
  heartRate: number;
  bloodPressure: string;
  respiratoryRate: number;
  oxygenSaturation: number;
}

interface Note {
  id: string;
  date: string;
  time: string;
  content: string;
  author: string;
}

const MedicalRecordsModal: React.FC<MedicalRecordsModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'vitals' | 'progress' | 'nurse' | 'doctor'>('vitals');
  const [editingVitalSign, setEditingVitalSign] = useState<string | null>(null);
  const [newVitalSign, setNewVitalSign] = useState<VitalSign>({
    id: 'new',
    date: '',
    time: '',
    temperature: 0,
    heartRate: 0,
    bloodPressure: '',
    respiratoryRate: 0,
    oxygenSaturation: 0,
  });

  // Mock data for medical records
  const mockRecords: MedicalRecord[] = [
    { id: '1', patientName: 'John Doe', type: 'Check-up', date: '2023-05-15' },
    { id: '2', patientName: 'Jane Smith', type: 'Surgery', date: '2023-05-16' },
  ];

  // Mock data for vital signs
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    { id: '1', date: '2023-05-15', time: '09:00', temperature: 37.0, heartRate: 72, bloodPressure: '120/80', respiratoryRate: 16, oxygenSaturation: 98 },
    { id: '2', date: '2023-05-15', time: '15:00', temperature: 37.2, heartRate: 75, bloodPressure: '118/78', respiratoryRate: 18, oxygenSaturation: 97 },
    { id: '3', date: '2023-05-16', time: '10:00', temperature: 36.8, heartRate: 70, bloodPressure: '122/82', respiratoryRate: 14, oxygenSaturation: 99 },
  ]);

  // Mock data for notes
  const [progressNotes, setProgressNotes] = useState<Note[]>([
    { id: '1', date: '2023-05-15', time: '10:00', content: 'Patient shows improvement', author: 'Dr. Smith' },
  ]);
  const [nurseNotes, setNurseNotes] = useState<Note[]>([
    { id: '1', date: '2023-05-15', time: '11:00', content: 'Administered medication as prescribed', author: 'Nurse Johnson' },
  ]);
  const [doctorComments, setDoctorComments] = useState<Note[]>([
    { id: '1', date: '2023-05-15', time: '14:00', content: 'Recommend follow-up in 2 weeks', author: 'Dr. Brown' },
  ]);

  // New note state
  const [newNote, setNewNote] = useState<Note>({
    id: 'new',
    date: '',
    time: '',
    content: '',
    author: '',
  });

  const filteredRecords = useMemo(() => {
    return mockRecords.filter(record =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedVitalSigns = useMemo(() => {
    return [...vitalSigns].sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeB.getTime() - dateTimeA.getTime();
    });
  }, [vitalSigns]);

  const handleAddVitalSign = () => {
    if (newVitalSign.date && newVitalSign.time) {
      const addedVitalSign = {
        ...newVitalSign,
        id: Date.now().toString(),
      };
      setVitalSigns([...vitalSigns, addedVitalSign]);
      setNewVitalSign({
        id: 'new',
        date: '',
        time: '',
        temperature: 0,
        heartRate: 0,
        bloodPressure: '',
        respiratoryRate: 0,
        oxygenSaturation: 0,
      });
    }
  };

  const handleEditVitalSign = (id: string) => {
    setEditingVitalSign(id);
  };

  const handleSaveVitalSign = (id: string) => {
    setEditingVitalSign(null);
  };

  const handleDeleteVitalSign = (id: string) => {
    setVitalSigns(vitalSigns.filter(vs => vs.id !== id));
  };

  const handleVitalSignChange = (id: string, field: keyof VitalSign, value: string | number) => {
    if (id === 'new') {
      setNewVitalSign(prev => ({ ...prev, [field]: value }));
    } else {
      setVitalSigns(vitalSigns.map(vs => 
        vs.id === id ? { ...vs, [field]: value } : vs
      ));
    }
  };

  const handleAddNote = (notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>>) => {
    if (newNote.date && newNote.time && newNote.content && newNote.author) {
      const addedNote = {
        ...newNote,
        id: Date.now().toString(),
      };
      setNotes([...notes, addedNote]);
      setNewNote({
        id: 'new',
        date: '',
        time: '',
        content: '',
        author: '',
      });
    }
  };

  const handleNoteChange = (field: keyof Note, value: string) => {
    setNewNote(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteNote = (notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>>, id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const renderVitalSigns = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Temperature (°C)</th>
            <th className="border p-2">Heart Rate (bpm)</th>
            <th className="border p-2">Blood Pressure</th>
            <th className="border p-2">Respiratory Rate</th>
            <th className="border p-2">O2 Saturation (%)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">
              <input
                type="date"
                value={newVitalSign.date}
                onChange={(e) => handleVitalSignChange('new', 'date', e.target.value)}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="time"
                value={newVitalSign.time}
                onChange={(e) => handleVitalSignChange('new', 'time', e.target.value)}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                step="0.1"
                value={newVitalSign.temperature || ''}
                onChange={(e) => handleVitalSignChange('new', 'temperature', parseFloat(e.target.value))}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                value={newVitalSign.heartRate || ''}
                onChange={(e) => handleVitalSignChange('new', 'heartRate', parseInt(e.target.value))}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                value={newVitalSign.bloodPressure}
                onChange={(e) => handleVitalSignChange('new', 'bloodPressure', e.target.value)}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                value={newVitalSign.respiratoryRate || ''}
                onChange={(e) => handleVitalSignChange('new', 'respiratoryRate', parseInt(e.target.value))}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                value={newVitalSign.oxygenSaturation || ''}
                onChange={(e) => handleVitalSignChange('new', 'oxygenSaturation', parseInt(e.target.value))}
                className="w-full"
              />
            </td>
            <td className="border p-2">
              <button onClick={handleAddVitalSign} className="text-green-500 mr-2">
                <Save size={16} />
              </button>
            </td>
          </tr>
          {sortedVitalSigns.map(vs => (
            <tr key={vs.id}>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="date"
                    value={vs.date}
                    onChange={(e) => handleVitalSignChange(vs.id, 'date', e.target.value)}
                    className="w-full"
                  />
                ) : vs.date}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="time"
                    value={vs.time}
                    onChange={(e) => handleVitalSignChange(vs.id, 'time', e.target.value)}
                    className="w-full"
                  />
                ) : vs.time}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="number"
                    step="0.1"
                    value={vs.temperature}
                    onChange={(e) => handleVitalSignChange(vs.id, 'temperature', parseFloat(e.target.value))}
                    className="w-full"
                  />
                ) : vs.temperature}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="number"
                    value={vs.heartRate}
                    onChange={(e) => handleVitalSignChange(vs.id, 'heartRate', parseInt(e.target.value))}
                    className="w-full"
                  />
                ) : vs.heartRate}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="text"
                    value={vs.bloodPressure}
                    onChange={(e) => handleVitalSignChange(vs.id, 'bloodPressure', e.target.value)}
                    className="w-full"
                  />
                ) : vs.bloodPressure}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="number"
                    value={vs.respiratoryRate}
                    onChange={(e) => handleVitalSignChange(vs.id, 'respiratoryRate', parseInt(e.target.value))}
                    className="w-full"
                  />
                ) : vs.respiratoryRate}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <input
                    type="number"
                    value={vs.oxygenSaturation}
                    onChange={(e) => handleVitalSignChange(vs.id, 'oxygenSaturation', parseInt(e.target.value))}
                    className="w-full"
                  />
                ) : vs.oxygenSaturation}
              </td>
              <td className="border p-2">
                {editingVitalSign === vs.id ? (
                  <button onClick={() => handleSaveVitalSign(vs.id)} className="text-green-500 mr-2">
                    <Save size={16} />
                  </button>
                ) : (
                  <button onClick={() => handleEditVitalSign(vs.id)} className="text-blue-500 mr-2">
                    <Edit size={16} />
                  </button>
                )}
                <button onClick={() => handleDeleteVitalSign(vs.id)} className="text-red-500">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderNotes = (notes: Note[], setNotes: React.Dispatch<React.SetStateAction<Note[]>>) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <input
            type="date"
            value={newNote.date}
            onChange={(e) => handleNoteChange('date', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="time"
            value={newNote.time}
            onChange={(e) => handleNoteChange('time', e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            value={newNote.author}
            onChange={(e) => handleNoteChange('author', e.target.value)}
            placeholder="Author"
            className="border rounded p-2"
          />
          <button onClick={() => handleAddNote(notes, setNotes)} className="bg-blue-500 text-white rounded p-2">
            Add Note
          </button>
        </div>
        <textarea
          value={newNote.content}
          onChange={(e) => handleNoteChange('content', e.target.value)}
          placeholder="Enter note content..."
          className="w-full h-24 border rounded p-2"
        />
        {notes.map(note => (
          <div key={note.id} className="border rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{note.date} {note.time}</span>
              <span>{note.author}</span>
            </div>
            <p>{note.content}</p>
            <button onClick={() => handleDeleteNote(notes, setNotes, note.id)} className="text-red-500 mt-2">
              <Trash size={16} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-6xl h-5/6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Medical Records</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex-grow flex gap-4 overflow-hidden">
          <div className="w-3/10 border rounded-md p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Record List</h3>
            {filteredRecords.map(record => (
              <div
                key={record.id}
                className={`p-2 mb-2 rounded-md cursor-pointer ${selectedRecord === record.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedRecord(record.id)}
              >
                <p className="font-medium">{record.patientName}</p>
                <p className="text-sm text-gray-600">{record.type} - {record.date}</p>
              </div>
            ))}
          </div>
          <div className="w-7/10 border rounded-md p-4 overflow-hidden flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Record Details</h3>
            {selectedRecord ? (
              <>
                <div className="flex mb-4 overflow-x-auto">
                  <button
                    className={`mr-2 px-3 py-1 rounded whitespace-nowrap ${activeTab === 'vitals' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('vitals')}
                  >
                    Vital Signs
                  </button>
                  <button
                    className={`mr-2 px-3 py-1 rounded whitespace-nowrap ${activeTab === 'progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('progress')}
                  >
                    Progress Notes
                  </button>
                  <button
                    className={`mr-2 px-3 py-1 rounded whitespace-nowrap ${activeTab === 'nurse' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('nurse')}
                  >
                    Nurse Notes
                  </button>
                  <button
                    className={`px-3 py-1 rounded whitespace-nowrap ${activeTab === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('doctor')}
                  >
                    Doctor Comments
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                  {activeTab === 'vitals' && renderVitalSigns()}
                  {activeTab === 'progress' && renderNotes(progressNotes, setProgressNotes)}
                  {activeTab === 'nurse' && renderNotes(nurseNotes, setNurseNotes)}
                  {activeTab === 'doctor' && renderNotes(doctorComments, setDoctorComments)}
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select a record to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsModal;
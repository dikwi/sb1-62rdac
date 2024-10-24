import React from 'react';

interface PrintablePatientFormProps {
  patient: any;
}

const PrintablePatientForm: React.FC<PrintablePatientFormProps> = ({ patient }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Patient Information Form</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
            <p><strong>Sex:</strong> {patient.sex}</p>
          </div>
          <div>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Category:</strong> {patient.category}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Medical Information</h2>
        <p><strong>Allergies:</strong> {patient.allergies || 'None'}</p>
        <p><strong>Medical History:</strong> {patient.medicalHistory || 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Insurance Information</h2>
        <p><strong>Insurance:</strong> {patient.insurance || 'N/A'}</p>
        <p><strong>Group:</strong> {patient.group || 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Visits</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Health Facility</th>
              <th className="border p-2">Case Type</th>
              <th className="border p-2">Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {(patient.visits || []).slice(0, 5).map((visit: any, index: number) => (
              <tr key={index}>
                <td className="border p-2">{visit.date}</td>
                <td className="border p-2">{visit.healthFacility}</td>
                <td className="border p-2">{visit.caseType}</td>
                <td className="border p-2">{visit.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <p className="text-sm text-gray-500">This form is for medical purposes only and should be kept confidential.</p>
      </div>
    </div>
  );
};

export default PrintablePatientForm;
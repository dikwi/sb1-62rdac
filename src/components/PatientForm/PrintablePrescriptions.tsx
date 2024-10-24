import React from 'react';

interface PrintablePrescriptionsProps {
  prescriptions: any[];
}

const PrintablePrescriptions: React.FC<PrintablePrescriptionsProps> = ({ prescriptions }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Prescriptions</h1>
      
      {prescriptions.map((prescription, index) => (
        <div key={index} className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">Prescription #{index + 1}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Medication:</strong> {prescription.medication}</p>
              <p><strong>Dosage:</strong> {prescription.dosage}</p>
              <p><strong>Frequency:</strong> {prescription.frequency}</p>
            </div>
            <div>
              <p><strong>Duration:</strong> {prescription.duration}</p>
              <p><strong>Quantity:</strong> {prescription.quantity}</p>
              <p><strong>Date:</strong> {new Date(prescription.date).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="mt-2"><strong>Doctor:</strong> {prescription.doctor}</p>
          {prescription.note && (
            <p className="mt-2"><strong>Note:</strong> {prescription.note}</p>
          )}
        </div>
      ))}

      <div className="mt-8">
        <p className="text-sm text-gray-500">Please follow the prescribed dosage and consult your doctor if you have any questions or concerns.</p>
      </div>
    </div>
  );
};

export default PrintablePrescriptions;
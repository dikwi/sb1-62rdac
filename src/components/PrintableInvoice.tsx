import React from 'react';
import QRCode from 'qrcode.react';

interface PrintableInvoiceProps {
  invoice: any;
}

const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ invoice }) => {
  const totalAmount = invoice.items.reduce((sum: number, item: any) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#3B82F6', marginBottom: '5px' }}>Dr. DADA</h1>
        <p style={{ margin: '0' }}>123 Medical Street, Health City, HC 12345</p>
        <p style={{ margin: '0' }}>Phone: (123) 456-7890 | Email: info@drdada.com</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ marginBottom: '5px' }}>Invoice #{invoice.invoiceNumber}</h2>
          <p style={{ margin: '0' }}>Date: {new Date(invoice.date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div>
          <QRCode value={JSON.stringify(invoice)} size={100} />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '5px' }}>Patient Information:</h3>
        <p style={{ margin: '0' }}>Name: {invoice.patientName}</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', width: '40%' }}>Item</th>
            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', width: '15%' }}>Quantity</th>
            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', width: '15%' }}>Unit Price</th>
            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', width: '15%' }}>Discount</th>
            <th style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', width: '15%' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item: any, index: number) => (
            <tr key={index}>
              <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb' }}>{item.description}</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{item.quantity}</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>${item.unitPrice.toFixed(2)}</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>{item.discount || 0}%</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
                ${((item.quantity * item.unitPrice) * (1 - (item.discount || 0) / 100)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>Subtotal:</td>
            <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>${totalAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} style={{ padding: '10px', textAlign: 'right' }}>Overall Discount:</td>
            <td style={{ padding: '10px', textAlign: 'right' }}>${invoice.overallDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} style={{ padding: '10px', textAlign: 'right' }}>Deposit:</td>
            <td style={{ padding: '10px', textAlign: 'right' }}>${invoice.deposit.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
            <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>${invoice.amount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} style={{ padding: '10px', textAlign: 'right' }}>Total in KHR:</td>
            <td style={{ padding: '10px', textAlign: 'right' }}>
              {(invoice.amount * invoice.exchangeRate).toLocaleString()} KHR
            </td>
          </tr>
        </tfoot>
      </table>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '5px' }}>Payment Status:</h3>
        <p style={{ margin: '0', fontWeight: 'bold', color: invoice.paid ? 'green' : 'red' }}>
          {invoice.paid ? 'Paid' : 'Unpaid'}
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', color: '#6b7280', fontSize: '12px' }}>
        <p>Thank you for choosing Dr. DADA. We appreciate your business!</p>
      </div>
    </div>
  );
};

export default PrintableInvoice;
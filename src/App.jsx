import React from 'react';
import InvoiceForm from './components/InvoiceForm';
import { generatePDF } from './utils/generatePDF';

const App = () => {
  const handleGenerateInvoice = (invoiceData) => {
    generatePDF(invoiceData);
  };

  return (
    <div>
      <h1 className='inoiceheading'>Invoice Generator</h1>
      <InvoiceForm handleGenerateInvoice={handleGenerateInvoice} />
    </div>
  );
};

export default App;

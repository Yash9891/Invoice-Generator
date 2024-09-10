import React, { useState } from 'react';

const InvoiceForm = ({ handleGenerateInvoice }) => {
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);
  const [sellerDetails, setSellerDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', panNo: '', gstNo: '' });
  const [orderDetails, setOrderDetails] = useState({ orderNo: '', orderDate: '' });
  const [billingDetails, setBillingDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', code: '' });
  const [shippingDetails, setShippingDetails] = useState({ name: '', address: '', city: '', state: '', pincode: '', code: '' });
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [invoiceDetails, setInvoiceDetails] = useState({ invoiceNo: '', invoiceDate: '' });
  const [items, setItems] = useState([{ description: '', unitPrice: '', quantity: '', discount: '', taxRate: '' }]);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleItemsChange = (e, index, field) => {
    const { value } = e.target;
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index][field] = value;
      return updatedItems;
    });
  };

  const handleAddItem = () => {
    setItems(prevItems => [...prevItems, { description: '', unitPrice: '', quantity: '', discount: '', taxRate: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleGenerateInvoice({
      logo,
      signature,
      sellerDetails,
      orderDetails,
      billingDetails,
      shippingDetails,
      placeOfDelivery,
      invoiceDetails,
      items
    });
  };

  return (
    <div className='formcontainer'>
    <form onSubmit={handleSubmit}>
      <h2 className='maha'>Generate invoice for orders</h2>

      <div className='top1'>
       <div className='section1'>
      <h3>Seller Details</h3>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={sellerDetails.name} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={sellerDetails.address} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={sellerDetails.city} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" value={sellerDetails.state} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      <div>
        <label>Pincode:</label>
        <input type="text" name="pincode" value={sellerDetails.pincode} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      <div>
        <label>PAN No.:</label>
        <input type="text" name="panNo" value={sellerDetails.panNo} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      <div>
        <label>GST No.:</label>
        <input type="text" name="gstNo" value={sellerDetails.gstNo} onChange={(e) => handleInputChange(e, setSellerDetails)} />
      </div>
      </div>
  <div className='section2'>
  <h3>Order Details</h3>
      <div>
        <label>Order No.:</label>
        <input type="text" name="orderNo" value={orderDetails.orderNo} onChange={(e) => handleInputChange(e, setOrderDetails)} />
      </div>
      <div>
        <label>Order Date:</label>
        <input type="date" name="orderDate" value={orderDetails.orderDate} onChange={(e) => handleInputChange(e, setOrderDetails)} />
      </div>

      <h3>Invoice Details</h3>
      <div>
        <label>Invoice No:</label>
        <input type="text" name="invoiceNo" value={invoiceDetails.invoiceNo} onChange={(e) => handleInputChange(e, setInvoiceDetails)} />
      </div>
      <div>
        <label>Invoice Date:</label>
        <input type="date" name="invoiceDate" value={invoiceDetails.invoiceDate} onChange={(e) => handleInputChange(e, setInvoiceDetails)} />
      </div>

      <div>
        <label>Place of Delivery:</label>
        <input type="text" value={placeOfDelivery} onChange={(e) => setPlaceOfDelivery(e.target.value)} />
      </div>

  </div>
  </div>
  <div className='top2'>
    <div className='section3'>

      <h3>Billing Details</h3>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={billingDetails.name} onChange={(e) => handleInputChange(e, setBillingDetails)} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={billingDetails.address} onChange={(e) => handleInputChange(e, setBillingDetails)} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={billingDetails.city} onChange={(e) => handleInputChange(e, setBillingDetails)} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" value={billingDetails.state} onChange={(e) => handleInputChange(e, setBillingDetails)} />
      </div>
      <div>
        <label>Pincode:</label>
        <input type="text" name="pincode" value={billingDetails.pincode} onChange={(e) => handleInputChange(e, setBillingDetails)} />
      </div>
      <div>
        <label>Code:</label>
        <input type="text" name="code" value={billingDetails.code} onChange={(e) => handleInputChange(e, setBillingDetails)} />
      </div>
      </div>

      <div className='section4'>
      <h3>Shipping Details</h3>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={shippingDetails.name} onChange={(e) => handleInputChange(e, setShippingDetails)} />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={shippingDetails.address} onChange={(e) => handleInputChange(e, setShippingDetails)} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={shippingDetails.city} onChange={(e) => handleInputChange(e, setShippingDetails)} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="state" value={shippingDetails.state} onChange={(e) => handleInputChange(e, setShippingDetails)} />
      </div>
      <div>
        <label>Pincode:</label>
        <input type="text" name="pincode" value={shippingDetails.pincode} onChange={(e) => handleInputChange(e, setShippingDetails)} />
      </div>
      <div>
        <label>Code:</label>
        <input type="text" name="code" value={shippingDetails.code} onChange={(e) => handleInputChange(e, setShippingDetails)} />
      </div>

      
      </div>
      </div>

      <h3>Items</h3>
      {items.map((item, index) => (
        <div key={index}>
          <h4 className='items'>Item {index + 1}</h4>
          <div>
            <label>Description:</label>
            <input type="text" value={item.description} onChange={(e) => handleItemsChange(e, index, 'description')} />
          </div>
          <div>
            <label>Unit Price:</label>
            <input type="number" value={item.unitPrice} onChange={(e) => handleItemsChange(e, index, 'unitPrice')} />
          </div>
          <div>
            <label>Quantity:</label>
            <input type="number" value={item.quantity} onChange={(e) => handleItemsChange(e, index, 'quantity')} />
          </div>
          <div>
            <label>Discount:</label>
            <input type="number" value={item.discount} onChange={(e) => handleItemsChange(e, index, 'discount')} />
          </div>
          <div>
            <label>Tax Rate:</label>
            <input type="number" value={item.taxRate} onChange={(e) => handleItemsChange(e, index, 'taxRate')} />
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddItem} className='itembutton'>Add Item</button>

     
     <div className='files'>
      <div className='logo'>
        <label>Logo:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogo)} className='sys'/>
      </div>

      <div className='logo2'>
        <label>Signature:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setSignature)} className='sys' />
      </div>
      </div>

      <button type="submit">Generate Invoice</button>

    </form>

    </div>
  );
};

export default InvoiceForm;

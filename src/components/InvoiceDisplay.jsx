
const InvoiceDisplay = ({ invoiceData = {} }) => {
    // Default values
    const sellerDetails = invoiceData.sellerDetails || {};
    const billingDetails = invoiceData.billingDetails || {};
    const shippingDetails = invoiceData.shippingDetails || {};
    const orderDetails = invoiceData.orderDetails || {};
    const invoiceDetails = invoiceData.invoiceDetails || {};
    const items = invoiceData.items || [];

    const calculateNetAmount = (unitPrice, quantity, discount) => {
        return (unitPrice * quantity) - discount;
    };

    const calculateTaxAmount = (netAmount, taxRate) => {
        return (netAmount * taxRate) / 100;
    };

    const calculateTotalAmount = (netAmount, taxAmount) => {
        return netAmount + taxAmount;
    };

    const renderFile = (file) => {
        return file ? URL.createObjectURL(file) : '';
    };

    return (
        <div>
            <h2>Invoice</h2>

            {/* Seller Details */}
            <h3 className='seller'>Seller Details</h3>
            <div>Name: {sellerDetails.name || 'N/A'}</div>
            <div>Address: {sellerDetails.address || 'N/A'}</div>
            <div>City: {sellerDetails.city || 'N/A'}</div>
            <div>State: {sellerDetails.state || 'N/A'}</div>
            <div>Pincode: {sellerDetails.pincode || 'N/A'}</div>
            <div>PAN No.: {sellerDetails.panNo || 'N/A'}</div>
            <div>GST No.: {sellerDetails.gstNo || 'N/A'}</div>

            {/* Place of Supply */}
            <h3>Place of Supply</h3>
            <div>{invoiceData.placeOfSupply || 'N/A'}</div>

            {/* Billing Details */}
            <h3 >Billing Details</h3>
            <div>Name: {billingDetails.name || 'N/A'}</div>
            <div>Address: {billingDetails.address || 'N/A'}</div>
            <div>City: {billingDetails.city || 'N/A'}</div>
            <div>State: {billingDetails.state || 'N/A'}</div>
            <div>Pincode: {billingDetails.pincode || 'N/A'}</div>
            <div>Code: {billingDetails.code || 'N/A'}</div>

            {/* Shipping Details */}
            <h3>Shipping Details</h3>
            {shippingDetails.name || shippingDetails.address || shippingDetails.city || shippingDetails.state || shippingDetails.pincode || shippingDetails.code ? (
                <>
                    <div>Name: {shippingDetails.name || 'N/A'}</div>
                    <div>Address: {shippingDetails.address || 'N/A'}</div>
                    <div>City: {shippingDetails.city || 'N/A'}</div>
                    <div>State: {shippingDetails.state || 'N/A'}</div>
                    <div>Pincode: {shippingDetails.pincode || 'N/A'}</div>
                    <div>Code: {shippingDetails.code || 'N/A'}</div>
                </>
            ) : (
                <div>Shipping Details not available</div>
            )}

            {/* Place of Delivery */}
            <h3>Place of Delivery</h3>
            <div>{invoiceData.placeOfDelivery || 'N/A'}</div>

            {/* Order Details */}
            <h3>Order Details</h3>
            <div>Order No.: {orderDetails.orderNo || 'N/A'}</div>
            <div>Order Date: {orderDetails.orderDate || 'N/A'}</div>

            {/* Invoice Details */}
            <h3>Invoice Details</h3>
            <div>Invoice No.: {invoiceDetails.invoiceNo || 'N/A'}</div>
            <div>Invoice Date: {invoiceDetails.invoiceDate || 'N/A'}</div>

            {/* Reverse Charge */}
            <h3>Reverse Charge</h3>
            <div>{invoiceData.reverseCharge ? 'Applicable' : 'Not Applicable'}</div>

            {/* Items */}
            <h3 id='item'>Items</h3>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Discount</th>
                        <th>Net Amount</th>
                        <th>Tax Rate</th>
                        <th>Tax Amount</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const netAmount = calculateNetAmount(item.unitPrice || 0, item.quantity || 0, item.discount || 0);
                        const taxAmount = calculateTaxAmount(netAmount, item.taxRate || 0);
                        const totalAmount = calculateTotalAmount(netAmount, taxAmount);

                        return (
                            <tr key={index}>
                                <td>{item.description || 'N/A'}</td>
                                <td>{(item.unitPrice || 0).toFixed(2)}</td>
                                <td>{item.quantity || 0}</td>
                                <td>{(item.discount || 0).toFixed(2)}</td>
                                <td>{netAmount.toFixed(2)}</td>
                                <td>{(item.taxRate || 0).toFixed(2)}%</td>
                                <td>{taxAmount.toFixed(2)}</td>
                                <td>{totalAmount.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Upload Logo and Signature */}
            <h3>Uploaded Files</h3>
            <div>
            {invoiceData.logo && <img src={renderFile(invoiceData.logo)} alt="Logo" style={{ maxWidth: '100px', height: 'auto' }} />}

            {invoiceData.signature && <img src={renderFile(invoiceData.signature)} alt="Signature" style={{ maxWidth: '100px', maxHeight: '50px' }} />}
            </div>
        </div>
    );
};

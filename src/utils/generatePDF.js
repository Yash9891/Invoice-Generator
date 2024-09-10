import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = async (invoiceData) => {
    const doc = new jsPDF();

    // Helper function to load image as base64
    const loadImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    try {
        // Load logo and signature images if available
        const [logoBase64, signatureBase64] = await Promise.all([
            invoiceData.logo ? loadImage(invoiceData.logo) : Promise.resolve(null),
            invoiceData.signature ? loadImage(invoiceData.signature) : Promise.resolve(null)
        ]);

        // Add logo if available
        if (logoBase64) {
            doc.addImage(logoBase64, 'PNG', 15, 10, 35, 15);
        }

        doc.setFont('helvetica');
        doc.setFontSize(11);

        // Text shifted to the right
        const pageWidth = doc.internal.pageSize.getWidth();
        const centerX = pageWidth / 2;
        const textMargin = 15;

        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('Tax Invoice/Bill of Supply/Cash Memo', centerX + textMargin, 10, { align: 'center' });

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('(Original for Recipient)', centerX + textMargin, 15, { align: 'center' });

        const margin = 15;

        // Left-side details
        const leftMargin = margin;
        doc.setFont('helvetica', 'bold');
        doc.text('Sold By:', leftMargin, 40);
        doc.setFont('helvetica', 'normal');
        doc.text(` ${invoiceData.sellerDetails?.name || 'N/A'}`, leftMargin, 50);
        doc.text(` ${invoiceData.sellerDetails?.address || 'N/A'}`, leftMargin, 55);
        doc.text(`City: ${invoiceData.sellerDetails?.city || 'N/A'}, ${invoiceData.sellerDetails?.state || 'N/A'}, ${invoiceData.sellerDetails?.pincode || 'N/A'}`, leftMargin, 60);
        // doc.text(`State: ${invoiceData.sellerDetails?.state || 'N/A'}`, leftMargin, 65);
        // doc.text(`Pincode: ${invoiceData.sellerDetails?.pincode || 'N/A'}`, leftMargin, 70);

        doc.text(`PAN No.: ${invoiceData.sellerDetails?.panNo || 'N/A'}`, leftMargin, 75);
        doc.text(`GST Registration No: ${invoiceData.sellerDetails?.gstNo || 'N/A'}`, leftMargin, 80);

        doc.setFont('helvetica', 'bold');
        doc.text('Order Details:', leftMargin, 140);
        doc.setFont('helvetica', 'normal');
        doc.text(`Order No.: ${invoiceData.orderDetails?.orderNo || 'N/A'}`, leftMargin, 145);
        doc.text(`Order Date: ${invoiceData.orderDetails?.orderDate || 'N/A'}`, leftMargin, 150);

        // Right-side details
        const rightMargin = pageWidth - margin;
        doc.setFont('helvetica', 'bold');
        doc.text('Billing Details:', rightMargin, 40, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.text(` ${invoiceData.billingDetails?.name || 'N/A'}`, rightMargin, 50, { align: 'right' });
        doc.text(`${invoiceData.billingDetails?.address || 'N/A'}`, rightMargin, 55, { align: 'right' });
        doc.text(`City: ${invoiceData.billingDetails?.city || 'N/A'}, ${invoiceData.billingDetails?.state || 'N/A'}, ${invoiceData.billingDetails?.pincode || 'N/A'}`, rightMargin, 60, { align: 'right' });
        // doc.text(`State: ${invoiceData.billingDetails?.state || 'N/A'}`, rightMargin, 65, { align: 'right' });
        // doc.text(`Pincode: ${invoiceData.billingDetails?.pincode || 'N/A'}`, rightMargin, 70, { align: 'right' });
        doc.text(`State/UT Code: ${invoiceData.billingDetails?.code || 'N/A'}`, rightMargin, 65, { align: 'right' });

        doc.setFont('helvetica', 'bold');
        doc.text('Shipping Address:', rightMargin, 90, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        if (invoiceData.shippingDetails?.name || invoiceData.shippingDetails?.address || invoiceData.shippingDetails?.city || invoiceData.shippingDetails?.state || invoiceData.shippingDetails?.pincode || invoiceData.shippingDetails?.code) {
            doc.text(` ${invoiceData.shippingDetails?.name || 'N/A'}`, rightMargin, 95, { align: 'right' });
            doc.text(`${invoiceData.shippingDetails?.address || 'N/A'}`, rightMargin, 100, { align: 'right' });
            doc.text(` ${invoiceData.shippingDetails?.city || 'N/A'}, ${invoiceData.shippingDetails?.state || 'N/A'}, ${invoiceData.shippingDetails?.pincode || 'N/A'}`, rightMargin, 105, { align: 'right' });
            // doc.text(`State: ${invoiceData.shippingDetails?.state || 'N/A'}`, rightMargin, 125, { align: 'right' });
            // doc.text(`Pincode: ${invoiceData.shippingDetails?.pincode || 'N/A'}`, rightMargin, 130, { align: 'right' });
            doc.text(`State UT/Code: ${invoiceData.shippingDetails?.code || 'N/A'}`, rightMargin, 110, { align: 'right' });
        } else {
            doc.text('Shipping Details not available', rightMargin, 110, { align: 'right' });
        }

        doc.setFont('helvetica', 'bold');
        doc.text('Place of Supply:', rightMargin, 120, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.text(`${invoiceData.placeOfDelivery || 'N/A'}`, rightMargin, 125, { align: 'right' });

        doc.setFont('helvetica', 'bold');
        doc.text('Place of Delivery:', rightMargin, 130, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.text(`${invoiceData.placeOfDelivery || 'N/A'}`, rightMargin, 135, { align: 'right' });
 

        doc.setFont('helvetica', 'bold');
        doc.text('Invoice Details:', rightMargin, 140, { align: 'right' });
        doc.setFont('helvetica', 'normal');
        doc.text(`Invoice No.: ${invoiceData.invoiceDetails?.invoiceNo || 'N/A'}`, rightMargin, 145, { align: 'right' });
        doc.text(`Invoice Date: ${invoiceData.invoiceDetails?.invoiceDate || 'N/A'}`, rightMargin, 150, { align: 'right' });

        // Items Table
        const items = invoiceData.items.map((item) => {
            const unitPrice = Number(item.unitPrice) || 0;
            const quantity = Number(item.quantity) || 0;
            const discount = Number(item.discount) || 0;
            const taxRate = Number(item.taxRate) || 0;
            const totalAmount = (unitPrice * quantity) - discount + ((unitPrice * quantity - discount) * taxRate / 100);

            return [
                item.description,
                unitPrice.toFixed(2),
                quantity.toFixed(2),
                discount.toFixed(2),
                taxRate.toFixed(2),
                totalAmount.toFixed(2)
            ];
        });

        doc.autoTable({
            startY: 165,
            head: [['Description', 'Unit Price', 'Quantity', 'Discount', 'Tax Rate', 'Total']],
            body: items,
            theme: 'grid',
            styles: {
                cellPadding: 2,
                fillColor: [169, 169, 169], // Grey color for the header row
                textColor: [0, 0, 0], // Black color for text
                lineColor: [0, 0, 0], // Black border color
                lineWidth: 0.75
            },
            headStyles: {
                fillColor: [169, 169, 169] // Grey color for header background
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255] // White color for alternate rows
            },
            columnStyles: { 
                0: { cellWidth: 'auto' }, 
                1: { cellWidth: 30 }, 
                2: { cellWidth: 20 }, 
                3: { cellWidth: 20 }, 
                4: { cellWidth: 20 }, 
                5: { cellWidth: 30 }
            }
        });

        // Calculate total sum
        const totalSum = items.reduce((acc, item) => acc + parseFloat(item[5]), 0);
        
        // New Table for Total in numbers and words
        doc.autoTable({
            startY: doc.autoTable.previous.finalY -1, // Reduced gap
            head: [['Total in Numbers']],
            body: [[
                totalSum.toFixed(2)
               
            ]],
            styles: {
                cellPadding: 2,
                fillColor: [255, 255, 255], // White color for the body row
                textColor: [0, 0, 0], // Black color for text
                lineColor: [0, 0, 0], // Black border color
                lineWidth: 0.75
            },
            headStyles: {
                fillColor: [255, 255, 255] // Grey color for header background
            },
            columnStyles: {
                0: { cellWidth: 182 }, 
                1: { cellWidth: 182 }
            }
        });
        
        // Add signature image if available
        if (signatureBase64) {
            doc.addImage(signatureBase64, 'PNG', 146, doc.autoTable.previous.finalY + 10, 45, 12); // Adjusted vertical position
        }
      // Draw the horizontal line
// Draw the horizontal line
// Adjust the X coordinates to shift lines to the left


        doc.save('invoice.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

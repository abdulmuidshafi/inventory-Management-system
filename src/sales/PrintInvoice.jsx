import React, { forwardRef, useImperativeHandle } from 'react';
import { useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

const PrintInvoiceForm = forwardRef((props, ref) => {
  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice',
  });
  React.useImperativeHandle(ref, () => ({
    printData,
  }));

  const [invoiceFormData, setInvoiceFormData] = useState(props.selectedSale); // Initialize with selected sale data

  const handleFormChange = (event) => {
    setInvoiceFormData({
      ...invoiceFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., save invoice data)
  };

  const calculateTotal = (items) => {
    let total = items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
    return total;
  };

  return (
    <div>
      <Card className="invoice-card" ref={componentRef}>
        <Card.Header>Invoice</Card.Header>
        <Card.Body>
          <form className="invoice-form" onSubmit={handleSubmit}>
            <div className="invoice-header">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>ABDI SPERPARTS</h4>
                  <p>Phone: 09654576</p>
                  <p>Address: ADDISABABA</p>
                  <p>Supplier's TIN no: 12222222222222</p>
                </div>
                <div>
                  <p>Invoice Number: {invoiceFormData._id}</p>
                  <p>Date: {format(invoiceFormData.saleOrderTime, 'MM/dd/yyyy')}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="invoice-details">
              <h5>Customer Information</h5>
              <div className="form-group">
                <label htmlFor="customerName">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  name="customer_name"
                  value={invoiceFormData.customer_name}
                  onChange={handleFormChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerTIN">Customer TIN:</label>
                <input
                  type="text"
                  id="customerTIN"
                  name="customer_TIN"
                  value={invoiceFormData.customer_TIN}
                  onChange={handleFormChange}
                  className="form-control"
                />
              </div>
              <h5>Invoice Items</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead> 
                <tbody>
                  {invoiceFormData.items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.product.price}</td>
                      <td>${item.product.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody> 

              </table>
              <hr />
              <div className="invoice-summary">
                <p>Subtotal: ${calculateTotal(invoiceFormData.items)}</p>
                {/* Add additional charges if needed (e.g., tax) */}
                <p>Total: ${calculateTotal(invoiceFormData.items)}</p>
 
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
});

export default PrintInvoiceForm;

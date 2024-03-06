<<<<<<< HEAD
import React, { forwardRef, useImperativeHandle } from "react";
import { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import numWords from "num-words";
import pic from "./photo_2024-02-17_23-16-23.jpg";
=======
import React, { forwardRef, useImperativeHandle } from 'react';
import { useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68

const PrintInvoiceForm = forwardRef((props, ref) => {
  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
<<<<<<< HEAD
    documentTitle: "Invoice",
  });

  useImperativeHandle(ref, () => ({
    printData,
  }));

  const [invoiceFormData, setInvoiceFormData] = useState(props.selectedSale);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setInvoiceFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
=======
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
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., save invoice data)
  };

  const calculateTotal = (items) => {
<<<<<<< HEAD
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotalWithVAT = (items) => {
    const subtotal = calculateTotal(items);
    const vatAmount = (subtotal * 0) / 100; // Assuming VAT rate is 0%
    return subtotal + vatAmount;
  };

  const totalAmountInWords = (amount) => {
    return numWords(amount, { case: "title" });
=======
    let total = items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
    return total;
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  };

  return (
    <div>
      <Card className="invoice-card" ref={componentRef}>
<<<<<<< HEAD
        <Card.Header className="bg-primary text-white">
          <img src={pic} className="circle" alt="Company Logo" width="100" />
          <h3>Invoice</h3>
        </Card.Header>

=======
        <Card.Header>Invoice</Card.Header>
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
                  <p>
                    Date: {format(invoiceFormData.saleOrderTime, "MM/dd/yyyy")}
                  </p>
=======
                  <p>Date: {format(invoiceFormData.saleOrderTime, 'MM/dd/yyyy')}</p>
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
                    <th>No</th>
=======
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
<<<<<<< HEAD
                </thead>
                <tbody>
                  {invoiceFormData.items.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
=======
                </thead> 
                <tbody>
                  {invoiceFormData.items.map((item) => (
                    <tr key={item._id}>
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
                      <td>{item.product.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.product.price}</td>
                      <td>${item.product.price * item.quantity}</td>
                    </tr>
                  ))}
<<<<<<< HEAD
                </tbody>
=======
                </tbody> 

>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
              </table>
              <hr />
              <div className="invoice-summary">
                <p>Subtotal: ${calculateTotal(invoiceFormData.items)}</p>
                {/* Add additional charges if needed (e.g., tax) */}
<<<<<<< HEAD
                <p>
                  VAT (0%): $
                  {calculateTotalWithVAT(invoiceFormData.items) -
                    calculateTotal(invoiceFormData.items)}
                </p>
                <p>Total: ${calculateTotalWithVAT(invoiceFormData.items)}</p>
                <p>
                  Total Amount in Words:{" "}
                  {totalAmountInWords(
                    calculateTotalWithVAT(invoiceFormData.items)
                  )}
                </p>
=======
                <p>Total: ${calculateTotal(invoiceFormData.items)}</p>
 
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
});

export default PrintInvoiceForm;

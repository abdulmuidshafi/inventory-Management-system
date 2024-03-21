import React, { forwardRef, useImperativeHandle } from "react";
import { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import numWords from "num-words";
import "./PrintInvoiceForm.css";
//import pic from "./photo_2024-02-17_23-16-23.jpg";
const PrintInvoiceForm = forwardRef((props, ref) => {
  const componentRef = useRef();
  const printData = useReactToPrint({
    content: () => componentRef.current,
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., save invoice data)
  };

  const calculateTotal = (items) => {
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
  };

  return (
    <div>
      <Card className="invoice-card" ref={componentRef}>
        <Card.Header className="bg-primary text-white">
          {/*<img src={pic} className="circle" alt="Company Logo" width="100" />*/}
          <h3>Invoice</h3>
        </Card.Header>

        <Card.Body>
          <form className="invoice-form" onSubmit={handleSubmit}>
            <div className="invoice-header">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>EASTERN AFRICA VETERN SERVICE</h4>
                  <p>Phone: 09654576</p>
                  <p>Address: ADDISABABA</p>
                  <p>Supplier's TIN no: 12222222222222</p>
                </div>
                <div>
                  <p>Invoice Number: {invoiceFormData._id || ""}</p>
                  <p>
                    Date: {format(invoiceFormData.saleOrderTime, "MM/dd/yyyy")}
                  </p>
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
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceFormData.items.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
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
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
});

export default PrintInvoiceForm;
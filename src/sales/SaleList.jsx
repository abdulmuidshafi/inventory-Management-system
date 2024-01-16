import React, { useState, useEffect } from "react";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = () => {
    AxiosInstance.get("/sales")
      .then((response) => response.data)
      .then((data) => {
        setSales(data);
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
      });
  };

  const filterSalesByCustomerName = () => {
    const filteredSales = sales.filter((sale) =>
      sale.customer_name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filteredSales;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredSales = filterSalesByCustomerName();
    setSales(filteredSales);
  };

  const calculateTotal = (items) => {
    let total = items.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0
    );
    return total;
  };

  const confirmPayment = (saleId) => {
    const sale = sales.find((sale) => sale._id === saleId);
    if (sale) {
      if (sale.status === "complete") {
        setShowAlert(true);
      } else {
        // Implement your logic here to confirm the payment for the given saleId
        // You can make an API call or update the payment status in the database
        try {
          AxiosInstance.post(`/sales/${saleId}/confirmsale`)
         const updatedSales = sales.map((sale) => {
          if (sale._id === saleId) {
            return { ...sale, status: "complete" };
          }
          return sale;
        });

        setSales(updatedSales); 
        } catch (error) {
          alert("unable to confirm")
        }
        
        // For example, you can update the payment status directly in the state
        
      }
    }
  };

  const returnProduct = (saleId) => {
    const sale = sales.find((sale) => sale._id === saleId);
    if (sale) {
      if (sale.status === "complete") {
        setShowAlert(true);
      } else {
        // Implement your logic here to handle returning the product for the given saleId

        // For example, you can make an API call or update the product status in the database
        try {
           AxiosInstance.post(`/sales/${saleId}/returnsale`)
           const updatedSales = sales.filter((sale) => sale._id !== saleId);
         setSales(updatedSales);
        } catch (error) {
          alert("unable to return")
        }
       
        // After handling the return, you can remove the sale from the state
        // 
      }
    }
  };

  return (
    <div className="p-2">
      <div>
        <Button onClick={() => navigate("/sales/add")}>Add sale</Button>
      </div>
      <Form onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Search by customer name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          This action cannot be performed on a paid sale.
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Sale Order Time</th>
            <th>Status</th>
            <th>Seller</th>
            <th>Items</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Customer Name</th>
            <th>Customer TIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale._id}>
              <td>{index + 1}</td>
              <td>{sale.saleOrderTime}</td>
              <td>
                {sale.status === "complete" ? (
                  <span className="text-success">Paid</span>
                ) : (
                  <Button
                    variant="outline-primary"
                   
                    size="sm"
                    onClick={() => confirmPayment(sale._id)}
                  >
                    Confirm Payment
                  </Button>
                )}
              </td>
              <td>{sale?.seller.name}</td>
              <td>
                <ul>
                  {sale.items.map((item) => (
                    <li key={item._id}>
                      {item.product.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{sale.subtotal}</td>
              <td>{calculateTotal(sale.items)}</td>
              
              <td>{sale.customer_name}</td>
              <td>{sale.customer_TIN}</td>
              <td>
                {sale.status !== "complete" && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => returnProduct(sale._id)}
                  >
                    Return Product
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SaleList;  
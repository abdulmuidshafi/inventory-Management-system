import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
//import {tost} from ""
const PurchaseList = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch purchases data
    fetchPurchases();
  }, []);

  const fetchPurchases = () => {
    // Make an API call to fetch purchases data
    // Replace 'api/purchases' with your actual API endpoint
    AxiosInstance.get("/purchases")
      .then((response) => response.data)
      .then((data) => {
        setPurchases(data);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter purchases based on the search term
    const filteredPurchases = purchases.filter((purchase) =>
      purchase.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPurchases(filteredPurchases);
  };

  return (
    <div className="p-2">
      <Button onClick={() => navigate("/purchase/add")}>Add purchase</Button>
      <Form onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Supplier</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={purchase._id}>
              <td>{index + 1}</td>
              <td>{purchase.product.name}</td>
              <td>{purchase.supplier.name}</td>
              <td>{purchase.unit_price}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseList;
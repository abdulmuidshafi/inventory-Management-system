import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddPurchase = () => {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    supplier: "",
    unit_price: null,
    quantity: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch product data
    fetchProducts();

    // Fetch supplier data
    fetchSuppliers();
  }, []);

  const fetchProducts = () => {
    // Make an API call to fetch product data
    // Replace 'api/products' with your actual API endpoint
    AxiosInstance.get("/products")
      .then((response) => response.data)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const fetchSuppliers = () => {
    // Make an API call to fetch supplier data
    // Replace 'api/suppliers' with your actual API endpoint
    AxiosInstance.get("/suppliers")
      .then((response) => response.data)
      .then((data) => {
        setSuppliers(data);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make an API call to add the purchase
    // Replace 'api/purchases' with your actual API endpoint
    AxiosInstance.post("/purchases", formData)
      .then((response) => response.data)
      .then((data) => {
        console.log("Purchase added successfully:", data);
        // Reset form data
        setFormData({
          product: "",
          supplier: "",
          unit_price: 0,
          quantity: 0,
        });
        navigate("/purchase");
        toast.success("Purchase added successfully");
      })
      .catch((error) => {
        console.error("Error adding purchase:", error);
      });
  };

  return (
    <Card className="shadow-sm p-3 mb-4">
    <CardHeader className="bg-light text-dark">
    <h4>Add Purchase</h4>
  </CardHeader>
  <CardBody>
      <Form onSubmit={handleSubmit}>
      <Row>
            <Col>
        <Form.Group controlId="product">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="supplier">
          <Form.Label>Supplier</Form.Label>
          <Form.Control
            as="select"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        </Col>
        </Row>
        <Row>
            
            <Col>
        <Form.Group controlId="unitPrice">
          <Form.Label>Unit Price</Form.Label>
          <Form.Control
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add Purchase
        </Button>
      </Form>
      </CardBody>
    </Card>
  );
};

export default AddPurchase;

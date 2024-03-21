import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import AxiosInstance from "../api/AxiosInstance"; // Assuming AxiosInstance is defined elsewhere
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      brand,
    };
    try {
      const response = await AxiosInstance.post("/products", productData);
      console.log(response.data);
      toast.success("Product successfully created!"); // Clearer success message
      navigate("/products");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the product."); // Informative error message
    }
  };
  const handleCancel = () => {
    navigate("/products");
  };
  return (
    <div className="container product-add-container">  {/* Added container class */}
      <h2 className="text-center mb-4">Add Product</h2>
      <Card className="product-add-card"> {/* Added card class */}
        <Form onSubmit={handleSubmit} className="product-form">
          <Form.Group controlId="formName">
            <Form.Label className="form-label">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formBrand">
            <Form.Label className="form-label">Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter a detailed description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label className="form-label">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price in currency format "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-control"
            />
          </Form.Group>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" style={{ marginLeft: "1rem" }}>
            Add Product
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;

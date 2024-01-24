  import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"; 
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price,
      //stock,
      brand,
    };
    console.log(productData);

    try {
      const response = await AxiosInstance.post("/products", productData);
      console.log(response.data);
      // Handle 
      navigate("/products")
      toast.success("successful product creation")
      // e.g., show success message, redirect, etc.
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };

  return (
    <div className="container">
    <h2 className="text-center mb-4">Add Product</h2>
    <Form onSubmit={handleSubmit} className="product-form">
      <Form.Group controlId="formName">
        <Form.Label className="form-label">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
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
          placeholder="Enter brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="form-control"
        />
      </Form.Group>
  
      <Form.Group controlId="formDescription">
        <Form.Label className="form-label">Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </Form.Group>
  
      <Form.Group controlId="formPrice">
        <Form.Label className="form-label">Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="form-control"
        />
      </Form.Group>
  
      <Button variant="primary" type="submit" className="btn-block mt-3">
        Add Product
      </Button>
    </Form>
  </div>
  
  );
};

export default AddProduct;
 
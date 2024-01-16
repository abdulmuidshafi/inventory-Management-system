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
    <div className="p-3">
      <h2>Add Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        {/*  <Form.Group controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group> */}

        <Form.Group controlId="formBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" className="mt-3" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
 
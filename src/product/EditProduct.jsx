import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"; 
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";
const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); 
  const [brand, setBrand] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  console.log(productId);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    try {
      const response = await AxiosInstance.get(`/products/${productId}`);
      const product = response.data;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price); 
      setBrand(product.brand);
    } catch (error) {
      console.error(error);
      // Handle error
      toast.error("Something went wrong");
    }
  };
      // e.g., show error message, etc.
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price,
      // stock,
      brand,
    };

    try {
      await AxiosInstance.put(`/products/${productId}`, productData);
      // Handle successful product update'
      toast.success("updated");
      navigate("/products");
      // e.g., show success message, redirect, etc.
    } catch (error) {
      console.error(error); 
    }
  };
  const handleCancel = () => {
    navigate("/products");
  };
  return (
    <div className="p-3">
      <h2>Edit Product</h2>
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

        {/* <Form.Group controlId="formStock">
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
        <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" style={{ marginLeft: "1rem" }}>
            Update Product
          </Button>
      </Form>
    </div>
  );
};

export default EditProduct;

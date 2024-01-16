import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"; 
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddSupplier = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const suppliersData = {
      name,
      description,
    };
    console.log(suppliersData);

    try {
      const response = await AxiosInstance.post("suppliers", suppliersData);
      console.log(response.data);
      navigate("/Supplier");
      toast.success(" Handle successful Supplier creation");
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

        <Button variant="primary" className="mt-3" type="submit">
          Add Supplier
        </Button>
      </Form>
    </div>
  );
};
export default AddSupplier;

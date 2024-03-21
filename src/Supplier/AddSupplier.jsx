import React, { useState } from "react";
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
  const handleCancel = () => {
    navigate("/Supplier");
  };
  return (
    <Card className="shadow-sm p-3 mb-4">
      <CardHeader className="bg-light text-dark">
        <h4>Add New Supplier</h4>
      </CardHeader>
      <CardBody>
      <Form onSubmit={handleSubmit}>
      <Row>
            <Col>
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
        </Col>
        <Col>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        </Col>
        
        </Row>
        <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" style={{ marginLeft: "1rem" }}>
            Add supplier
          </Button>
      </Form>
      </CardBody>
    </Card>
  );
};
export default AddSupplier;

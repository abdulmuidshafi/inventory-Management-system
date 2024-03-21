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
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";

const EditSupplier = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { suppliersId } = useParams();
  const navigate = useNavigate();
  console.log(suppliersId);
  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await AxiosInstance.get(`/suppliers/${suppliersId}`);
      const supplier = response.data;
      setName(supplier.name);
      setDescription(supplier.description);
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      name,
      description,
    };

    try {
      await AxiosInstance.put(`/suppliers/${suppliersId}`, supplierData);
      // Handle successful supplier update'
      toast.success("updated");
      navigate("/Supplier");
      // e.g., show success message, redirect, etc.
    } catch (error) {
      console.error(error);
toast.error("error");
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
             Update supplier
          </Button>
      </Form>
      </CardBody>
    </Card>
  );
};

export default EditSupplier;

// EditSupplier;

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
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosInstance.post("/user", {
        name,
        email,
        phone,
        password,
        role,
      });
      console.log("User created:", response.data);
      navigate("/Management");
      toast.success("User created");
    } catch (error) {
      toast.error("Error creating user:");
    }
  };

  return (
    <Card className="shadow-sm p-3 mb-4">
      <CardHeader className="bg-light text-dark">
        <h4>Create User</h4>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button variant="secondary" onClick={() => navigate("/Management")}>
            Cancel
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateUser;

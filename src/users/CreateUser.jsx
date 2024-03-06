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
<<<<<<< HEAD
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
=======
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68

    try {
      const response = await AxiosInstance.post("/user", {
        name,
        email,
<<<<<<< HEAD
        phone,
        password,
        role,
      });
      console.log("User created:", response.data);
      navigate("/user");
      toast.success("User created");
    } catch (error) {
      toast.error("Error creating user:");
=======
        password,
        role,
        phone,
      });
      console.log("User created:", response.data);
      // Handle success or navigate to another page
      navigate("/user");
      toast.success(" Handle successful user creation");
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error
      toast.error("Handle error does not provive");
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
    }
  };

  return (
    <Card className="shadow-sm p-3 mb-4">
      <CardHeader className="bg-light text-dark">
<<<<<<< HEAD
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
          <Button variant="secondary" onClick={() => navigate("/user")}>
            Cancel
=======
        <h4>Create New User</h4>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={10}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={10}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm={10}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={10}>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {/*<option value="admin">admin</option>*/}
                  <option value="seller">seller</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={10}>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="mt-2">
            Create User
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CreateUser;

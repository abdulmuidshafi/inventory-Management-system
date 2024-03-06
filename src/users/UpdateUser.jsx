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

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await AxiosInstance.get(`/user/${userId}`);
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.put(`/user/${userId}`, user);
      // Handle successful user update
      toast.success("Updated");
      navigate("/user");
      // e.g., show success message, redirect, etc.
    } catch (error) {
      console.error(error);
      toast.error("error message try agin");
      // Handle error
      // e.g., show error message, etc.
    }
  };

  return (
    <Card className="shadow-sm p-3 mb-4">
      <CardHeader className="bg-light text-dark">
        <h4>Update User</h4>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={user.role}
              onChange={handleInputChange}
              required
            >
              <option value="admin">admin</option>
              <option value="seller">seller</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={() => navigate("/user")}>
            Cancel
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UpdateUser;

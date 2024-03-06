<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';

const UpdateUser = () => {
  //const [userId, setuserId] = useState(''); // Store user ID explicitly
  const { userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(''); // Update if role selection is implemented
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosInstance.get(`/user/${userId}`);
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setRole(user.role); // Update if role selection is implemented
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user data'); // Use toast for user feedback
      }
    };

    if (userId) { // Fetch only if userId is available
      fetchUser();
    }
  }, [userId]);
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
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
=======
    const userData = {
      name,
      email,
      phone,
      role, // Update if role selection is implemented
    };

    try {
      await AxiosInstance.put(`/user/${userId}`, userData);
      toast.success('User updated successfully');
      navigate('/user'); // Redirect to users list
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user'); // Use toast for user feedback
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <Card className="mb-3">
      <CardBody>
        <CardTitle>Update User Information</CardTitle>
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
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">Seller</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" className="mt-3" type="submit">
            Update User
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UpdateUser;

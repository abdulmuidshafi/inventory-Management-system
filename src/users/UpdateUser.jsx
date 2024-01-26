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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
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
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UpdateUser;

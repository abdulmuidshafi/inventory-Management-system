import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { toast } from "react-toastify";
import pic from "./photo_2024-03-13_15-13-56.jpg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to authenticate the user
      const response = await AxiosInstance.post("/user/login", {
        email,
        password,
      });
      // Handle the successful login response
      toast.success("Login successful");
      localStorage.setItem("token", JSON.stringify(response.data));
      window.location.href = "/";
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle the login error
      toast.error("Login error:", error);
      // setError(error?.response?.data.message);
      toast.error(error?.response?.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-container w-screen">
<div className="w-1/2 login-card">
          
<img src={pic} alt="Login image" className="login-image" />
      
</div>
        <Card className="login-card w-1/2">
          <Card.Body>
            <h1 className="text-center mb-4"> Login Page</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <Link to="/forgot-password"> if you Forgot Password</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
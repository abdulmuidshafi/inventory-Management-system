import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
 
import "bootstrap-icons/font/bootstrap-icons.css";
const Layout = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  console.log(user);
  
  return (
    <>
  
          <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Store</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
        
            {user.role === "admin" && (
              <>
                <LinkContainer to="/products">
                  <Nav.Link>Products</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/user">
                  <Nav.Link>User Management</Nav.Link>
                </LinkContainer>
              </>
            )}
            
            <LinkContainer to="/sales">
              <Nav.Link>Sale</Nav.Link>
            </LinkContainer>
            
            {user.role === "admin" && (
              <>
                <LinkContainer to="/purchase">
                  <Nav.Link>Purchase</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/supplier">
                  <Nav.Link>Supplier</Nav.Link>
                </LinkContainer>
              </>
            )}
            
            <Button className="bg-dark border-0" onClick={() => localStorage.removeItem("token")}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet /> 

    </>
  );
};

export default Layout;
import React from "react";
import {
 Button,
 Container,
 Nav,
 Navbar,
 NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import pic from "../assets/photo_2022-02-10_07-16-12.jpg"
  const Layout = () => {
 const user = JSON.parse(localStorage.getItem("token"));
//  console.log(user);
 const handleLogout = () => {
  localStorage.removeItem("token"); // Clear the token
  navigate("/login"); // Redirect to login
 };
 
 const navigate = useNavigate()
 return (
  <>
   <Navbar bg="light" expand="lg" fixed="top">
    <Container>
     <Navbar.Brand href="#home">
      <img src={pic} alt="Store Logo" className="circle" height="40" />
      
     </Navbar.Brand>
     <Navbar.Toggle aria-controls="navbarScroll" />
     <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto my-2 my-lg-0">
       <LinkContainer to="/">
        <Nav.Link className="text-primary">
         <i className="bi bi-house-door-fill"></i>
         Dashboard
        </Nav.Link>
       </LinkContainer>

       {user.role === "admin" && (
        <NavDropdown title="Management" id="management-dropdown">
         <LinkContainer to="/products">
          <NavDropdown.Item>
           <i className="bi bi-box-seam"></i> Products
          </NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to="/user">
          <NavDropdown.Item>
           <i className="bi bi-people-fill"></i> Users
          </NavDropdown.Item>
         </LinkContainer>
        </NavDropdown>
       )}

       <LinkContainer to="/sales">
        <Nav.Link className="text-primary">
         <i className="bi bi-cart4"></i> Sales
        </Nav.Link>
       </LinkContainer>

       {user.role === "admin" && (
        <NavDropdown title="Operations" id="operations-dropdown">
         <LinkContainer to="/purchase">
          <NavDropdown.Item>
           <i className="bi bi-cash-stack"></i> Purchases
          </NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to="/supplier">
          <NavDropdown.Item>
           <i className="bi bi-truck"></i> Suppliers
          </NavDropdown.Item>
         </LinkContainer>
        </NavDropdown>
       )}
       
      </Nav>
      <NavDropdown title="profile" className="bi bi-person-circle">
  <NavDropdown.Item>
    <Button variant="outline-light">
      <i className="bi bi-person"></i> Profile
    </Button>
    
      <LinkContainer to="/profile/edit">
        <NavDropdown.Item>
          <i className="bi bi-pencil"></i> Edit Profile
        </NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item>
        <i className="bi bi-gear"></i> Account Settings
      </NavDropdown.Item>
     
  </NavDropdown.Item>
  <LinkContainer to="/profile/changepassword">
  <NavDropdown.Item>
    <Button variant="outline-light">
      <i className="bi bi-key"></i> Change Password
    </Button>
  </NavDropdown.Item>
  </LinkContainer>

  <NavDropdown.Divider />
  <Button variant="danger" onClick={handleLogout}>
    Logout
  </Button>
</NavDropdown>

     </Navbar.Collapse>
    </Container>
   </Navbar>
   <div style={{marginTop:64}}>
 <Outlet />
   </div>
   
  </>
 );
};
export default Layout; 
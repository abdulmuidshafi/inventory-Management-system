<<<<<<< HEAD
import React from "react";

function Layout() {
  return <div>Layout</div>;
}

=======
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  MDBContainer,
  MDBNavbar,
  MDBIcon,
  MDBCollapse,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
const Layout = () => {
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  let isshow = showShow || window.innerWidth > 768;
  return (
    <>
      <div>
        <MDBCollapse
          show={isshow.toString()}
          tag="nav"
          style={{ zIndex: 10 }}
          className={`${isshow ? "d-block" : "d-none"} bg-white sidebar`}
        >
          <div className="position-sticky">
            <MDBListGroup flush="true" className="">
              <MDBListGroupItem
                tag="a"
                onClick={() => navigate("/")}
                action
                active={location.pathname.length === 1}
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="tachometer-alt me-3" />
                Dashboard
              </MDBListGroupItem>
              {user.role === "admin" && (
                <>
                  <MDBListGroupItem
                    tag="a"
                    onClick={() => navigate("/purchase")}
                    action
                    active={location.pathname.includes("purchase")}
                    className="border-0 border-bottom rounded"
                  >
                    <MDBIcon fas icon="globe me-3" />
                    <i className="bi bi-cash-stack me-2"></i> Purchase
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    tag="a"
                    active={location.pathname.includes("products")}
                    onClick={() => navigate("/products")}
                    action
                    className="border-0 border-bottom rounded"
                  >
                    <MDBIcon far icon="chart-bar me-3" />
                    <i className="bi bi-box-seam me-2"></i> Products
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    tag="a"
                    active={location.pathname.includes("supplier")}
                    onClick={() => navigate("/supplier")}
                    action
                    className="border-0 border-bottom rounded"
                  >
                    <MDBIcon fas icon="calendar me-3" />
                    <i className="bi bi-truck me-2"></i> Supplier
                  </MDBListGroupItem>

                  <MDBListGroupItem
                    tag="a"
                    onClick={() => navigate("/user")}
                    active={location.pathname.includes("user")}
                    action
                    className="border-0 border-bottom rounded"
                  >
                    <MDBIcon fas icon="calendar me-3" />
                    <i className="bi bi-people-fill me-2"></i> User
                  </MDBListGroupItem>
                </>
              )}
              <MDBListGroupItem
                tag="a"
                onClick={() => navigate("/sales")}
                action
                active={location.pathname.includes("sales")}
                className="border-0 border-bottom rounded"
              >
                <MDBIcon fas icon="chart-pie me-3" />
                <i className="bi bi-cart4 me-2"></i> Sales
              </MDBListGroupItem>
            </MDBListGroup>
          </div>
        </MDBCollapse>
        <MDBNavbar
          style={{ position: "sticky", top: 0, zIndex: 10 }}
          expand="lg"
          light
          bgColor="light"
          className="py-1"
        >
          <MDBContainer fluid>
            <h4 className="ps-2 d-md-block d-none">Inventory App</h4>
            <MenuIcon
              onClick={() => setShowShow(!showShow)}
              className="d-md-none "
            />
            {/* <button
              onClick={() => setShowShow(!showShow)}
              className="d-md-none "
            >
              toggal
            </button> */}
            <div className="ms-auto">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenuOpen}
                className="me-2"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <Button color="inherit" component={Link} to="/profile/edit">
                    Edit Profile
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <KeyIcon fontSize="small" />
                  </ListItemIcon>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/profile/changepassword"
                  >
                    Change Password
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </div>
          </MDBContainer>
        </MDBNavbar>
        <div style={{}} className="containerLeft px-3 py-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
export default Layout;

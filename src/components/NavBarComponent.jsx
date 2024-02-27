import {
  Box,
  Grid,
  AppBar,
  Container,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import {
  NotificationsOutlined,
  Settings,
  Logout,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
//import "./styles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import KeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
export default function NavBarComponent() {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  // handleNotificationClicked
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);
  const handleAvatarClicked = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClicked = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const notificationHandleClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Paper elevation={4}>
          <AppBar sx={{ padding: 2 }} position="static">
            <Container maxWidth="xxl">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="a"
                  href="/"
                  sx={{
                    mx: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  INVENTORY MANAGEMENT STYSTEM
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <IconButton color="inherit">
                    <Badge variant="dot" color="error" invisible={false}>
                      <NotificationsOutlined
                        sx={{ width: 32, height: 32 }}
                        onClick={handleNotificationClicked}
                      />
                    </Badge>
                  </IconButton>
                  <Menu
                    open={notificationOpen}
                    anchorEl={notificationAnchorEl}
                    onClick={notificationHandleClose}
                    onClose={notificationHandleClose}
                  >
                    <MenuItem>Notification number 1 </MenuItem>
                    <Divider />
                    <MenuItem>Notification number 2</MenuItem>
                    <MenuItem>Notification number 3</MenuItem>
                  </Menu>
                  <IconButton
                    onClick={handleAvatarClicked}
                    size="small"
                    sx={{ mx: 2 }}
                    aria-haspopup="true"
                  >
                    <Tooltip title="profile">
                      <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                    </Tooltip>
                  </IconButton>
                  <Typography fontFamily={"Inter"}>Abdulmuid shafi</Typography>
                </Box>

                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  onClick={handleClose}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile/edit">
                    <ListItemIcon>
                      <AccountCircleOutlined fontSize="small" />
                    </ListItemIcon>
                    Edit Profile
                  </MenuItem>
                  <Divider />

                  <MenuItem component={Link} to="/profile/changepassword">
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    change password
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Container>
          </AppBar>
        </Paper>
      </Grid>
    </Grid>
  );
}

{
  {
    /*<Grid item md={7}>
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        width: "50%",
        mx: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></Paper>
    </Grid>;*/
  }
}

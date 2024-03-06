import React, { useState } from "react"; 
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Box, 
} from "@mui/material";
import {
  HomeOutlined,
  Inventory2Outlined,
  SettingsOutlined,
  DescriptionOutlined,
  MonetizationOnOutlined,
  CardTravelOutlined,
  TrendingUpOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import {  useLocation, useNavigate } from "react-router-dom";
export default function SideBarComponent() {
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("token"));
  const navigateTo = (to) => {
    navigate(to);
  };
  const location = useLocation();
  const currentPage = location.pathname; 
  const sideBarComponent = [
    {
      title: "Home",
      component: <HomeOutlined fontSize="medium" color="primary" />,
      roles: ["admin", "seller"],
    },
    {
      title: "Products",
      component: <Inventory2Outlined fontSize="medium" color="primary" />,
      roles: ["admin"],
    },
    {
      title: "Purchase",
      component: <CardTravelOutlined fontSize="medium" color="primary" />,
      roles: ["admin"],
    },
    {
      title: "User",
      component: <PeopleAltOutlined fontSize="medium" color="primary" />,
      roles: ["admin" ],
    },
    {
      title: "Revenue",
      component: <MonetizationOnOutlined fontSize="medium" color="primary" />,
      roles: ["admin", "seller"],
    },
    {
      title: "Growth",
      component: <TrendingUpOutlined fontSize="medium" color="primary" />,
      roles: ["admin", "seller"],
    },
    {
      title: "Sales",
      component: (
        <DescriptionOutlined
          fontSize="medium"
          color="primary" 
          className="border-0 border-bottom rounded bi bi-cart4 me-2"
        />
      ),
      roles: ["admin", "seller"],
    },

    {
      title: "Supplier",
      component: <SettingsOutlined fontSize="medium" color="primary" />,
      roles: ["admin"],
    },
  ];

  const [selected, setSelected] = useState(0);
  const handleSelectedComponent = (event, index) => {
    setSelected(index);
  };

  const filteredComponents = sideBarComponent.filter((comp) =>
    comp.roles.includes(user.role)
  );

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 280,
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <List>
        {filteredComponents.map((comp, index) => (
          <ListItem disablePadding dense={true} key={index}>
            <ListItemButton
              onClick={(event) => {
                handleSelectedComponent(event, index);
                navigateTo(comp.title.toLowerCase());
              }}
              selected={
                index === selected &&
                currentPage === "/" + comp.title.toLowerCase()
              }
              sx={{
                mb: 1,
                backgroundColor: index === selected ? "#e0e0e0" : "transparent",
              }}
            >
              <ListItemIcon>
                <IconButton>{comp.component}</IconButton>
              </ListItemIcon>
              <ListItemText
                primary={comp.title}
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: selected === index ? "bold" : "inherit",
                  color: selected === index ? "#000" : "#666",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

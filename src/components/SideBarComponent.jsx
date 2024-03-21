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
import { CarCrash, Dashboard, ManageAccounts, MonetizationOnOutlined, MonochromePhotos, ProductionQuantityLimitsTwoTone, Store, TrendingUpOutlined } from "@mui/icons-material";
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
      title: "Dashboard",
      component: <Dashboard fontSize="medium" color="primary" />,
      roles: ["admin", "seller"],
    },
   /* {
      title: "Revenue",
      component: <MonetizationOnOutlined fontSize="medium" color="primary" />,
      roles: ["admin", "seller"],
    },*/
    {
      title: "Growth",
      component: <TrendingUpOutlined fontSize="medium" color="primary" />,
      roles: ["admin", "seller"],
    },
    {
      title: "Products",
      component: <ProductionQuantityLimitsTwoTone fontSize="medium" color="primary" />,
      roles: ["admin"],
    },
    {
      title: "stores",
      component: <Store fontSize="medium" color="primary" />,
      roles: ["admin"],
    },
    {
      title: "Purchase",
      component: <CarCrash fontSize="medium" color="primary" />,
      roles: ["admin"],
    },
    {
      title: "Management",
      component: <ManageAccounts fontSize="medium" color="primary" />,
      roles: ["admin" ],
    },
    {
      title: "Sales",
      component: (
        < MonochromePhotos
          fontSize="medium"
          color="primary" 
          className="border-0 border-bottom rounded bi bi-cart4 me-2"
        />
      ),
      roles: ["admin", "seller"],
    },

    {
      title: "Supplier",
      component: <CarCrash fontSize="medium" color="primary" />,
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
        height: "150vh",
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

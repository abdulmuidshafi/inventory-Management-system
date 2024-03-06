<<<<<<< HEAD
import Inter from "../public/static/fonts/Inter.ttf";
import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import RootComponent from "./components/RootComponent";
import RootPage from "./components/RootPage";
import Sales from "./page/Sales";
import SaleList from "./sales/SaleList";
import AddSale from "./sales/AddSale";
import ResetPassword from "./page/ResetPassword";
import ForgetPassword from "./page/ForgetPassword";
import Login from "./page/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "../ProtectedRoute";
import Home from "./components/bodyComponents/home/Home";
import Revenue from "./components/bodyComponents/revenue/Revenue";
import Growth from "./components/bodyComponents/growth/Growth";
import Setting from "./components/bodyComponents/Settings/Setting";
import Products from "./page/Products";
import ProductList from "./product/ProductList";
import AddProduct from "./product/AddProduct";
import EditProduct from "./product/EditProduct";
import Supplier from "./page/Supplier";
import Purchase from "./page/Purchase";
=======
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./page/Dashboard";
import Login from "./page/Login";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "./layout/Layout";
import Products from "./page/Products";
import Sales from "./page/Sales";
import Supplier from "./page/Supplier";
import Purchase from "./page/Purchase";
import ProductList from "./product/ProductList";
import AddProduct from "./product/AddProduct";
import EditProduct from "./product/EditProduct";
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
import SupplierList from "./Supplier/SupplierList";
import AddSupplier from "./Supplier/AddSupplier";
import EditSupplier from "./Supplier/EditSupplier";
import AddPurchase from "./purchase/AddPurchase";
import PurchaseList from "./purchase/PurchaseList";
<<<<<<< HEAD
=======
import SaleList from "./sales/SaleList";
import AddSale from "./sales/AddSale";
import ResetPassword from "./page/ResetPassword";
import ForgetPassword from "./page/ForgetPassword";
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
import User from "./page/User";
import ListUsers from "./users/ListUesrs";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
import SettingsPage from "./page/SettingsPage";
import ChangePasswordForm from "./profiles/ChangePasswordForm";
import EditProfileForm from "./profiles/EditProfileForm";
<<<<<<< HEAD
function App() {
  const theme = createTheme({
    spacing: 4,
    palette: {
      mode: "light",
    },
    typography: {
      fontFamily: "Inter",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
     @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: local('Raleway'), local('Raleway-Regular'), url(${Inter}) format('woff2')
      unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
     }
    `,
      },
    },
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootComponent />}>
            <Route index element={<RootPage />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/revenue" element={<Revenue />}></Route>
            <Route path="/growth" element={<Growth />}></Route>
            <Route path="/settings" element={<Setting />}></Route>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductList />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="edit/:productId" element={<EditProduct />} />
            </Route>
            <Route path="user" element={<User />}>
              <Route index element={<ListUsers />} />
              <Route path="add" element={<CreateUser />} />
              <Route path="edit/:userId" element={<UpdateUser />} />
            </Route>
            <Route path="purchase" element={<Purchase />}>
              <Route index element={<PurchaseList />} />
              <Route path="add" element={<AddPurchase />} />
            </Route>
            <Route path="profile" element={<SettingsPage />}>
              <Route path="changepassword" element={<ChangePasswordForm />} />
              <Route path="edit" element={<EditProfileForm />} />
            </Route>
            <Route path="Supplier" element={<Supplier />}>
              <Route index element={<SupplierList />} />
              <Route path="add" element={<AddSupplier />} />
              <Route path="edit/:suppliersId" element={<EditSupplier />} />
            </Route>
            <Route path="sales" element={<Sales />}>
              <Route index element={<SaleList />} />
              <Route path="add" element={<AddSale />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </>
    )
  );
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
      < ToastContainer style={{
        position: "top-right",
        autoClose: 1000, // In milliseconds
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
      }} />
    </ThemeProvider>
  );
}
export default App;
=======
//import User from "./user/User";
//import UserList from "./user/UserList";
function App() {
  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Route> */}
      <Route element={<ProtectedRoute />}>

         <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:productId" element={<EditProduct />} />
          </Route>
          <Route path="Supplier" element={<Supplier />}>
            <Route index element={<SupplierList />} />
            <Route path="add" element={<AddSupplier />} />
            <Route path="edit/:suppliersId" element={<EditSupplier />} />
          </Route>
          <Route path="sales" element={<Sales />}>
            <Route index element={<SaleList />} />
            <Route path="add" element={<AddSale />} />
          </Route>
                    <Route path="user" element={<User />}>
            <Route index element={<ListUsers />} />  
            <Route path="add" element={<CreateUser />} />
            <Route path="edit/:userId" element={<UpdateUser />} />
          </Route> 

          <Route path="profile" element={<SettingsPage />}>
            {/*<Route index element={<PurchaseList />} />*/}
            <Route path="changepassword" element={<ChangePasswordForm />} /> 
            <Route path="edit" element={<EditProfileForm />} />
          </Route>

          <Route path="purchase" element={<Purchase />}>
            <Route index element={<PurchaseList />} />
            <Route path="add" element={<AddPurchase />} />
            {/* <Route path="edit/:purchaseId" element={<EditPurchase />} /> */}
          </Route>
        </Route>
      </Route>
       
        {/*    <ProtectedRoute path="/">
        <HomePage />
      </ProtectedRoute> */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68

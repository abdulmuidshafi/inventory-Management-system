import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import RootComponent from "./components/RootComponent";
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
import Revenue from "./components/bodyComponents/revenue/Revenue";
import Growth from "./components/bodyComponents/growth/Growth";
import Products from "./page/Products";
import ProductList from "./product/ProductList";
import AddProduct from "./product/AddProduct";
import EditProduct from "./product/EditProduct";
import Supplier from "./page/Supplier";
import Purchase from "./page/Purchase";
import SupplierList from "./Supplier/SupplierList";
import AddSupplier from "./Supplier/AddSupplier";
import EditSupplier from "./Supplier/EditSupplier";
import AddPurchase from "./purchase/AddPurchase";
import PurchaseList from "./purchase/PurchaseList";
import User from "./page/User";
import ListUsers from "./users/ListUesrs";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
import SettingsPage from "./page/SettingsPage";
import ChangePasswordForm from "./profiles/ChangePasswordForm";
import EditProfileForm from "./profiles/EditProfileForm";
import Dashboard from "./home/Dashboard";
import Store from "./page/Store";
import StoreList from "./stores/StoreList";
import StoreCreate from "./stores/StoreCreate";
import StoreUpdate from "./stores/StoreUpdate";
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
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/growth" element={<Growth />} />
            <Route path="products" element={<Products />}>
              <Route index element={<ProductList />} />
              <Route path="add" element={<AddProduct />} />
              <Route path="edit/:productId" element={<EditProduct />} />
            </Route>
            <Route path="Management" element={<User />}>
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
            <Route path="stores" element={<Store />}>
              <Route index element={<StoreList />} />
              <Route path="add" element={<StoreCreate />} />
              <Route path="edit/:storeId" element={<StoreUpdate />} />
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
      <ToastContainer style={{
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
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
import SupplierList from "./Supplier/SupplierList";
import AddSupplier from "./Supplier/AddSupplier";
import EditSupplier from "./Supplier/EditSupplier";
import AddPurchase from "./purchase/AddPurchase";
import PurchaseList from "./purchase/PurchaseList";
import SaleList from "./sales/SaleList";
import AddSale from "./sales/AddSale";
import ResetPassword from "./page/ResetPassword";
import ForgetPassword from "./page/ForgetPassword";
import User from "./page/User";
import ListUsers from "./users/ListUesrs";
import CreateUser from "./users/CreateUser";
import UpdateUser from "./users/UpdateUser";
import SettingsPage from "./page/SettingsPage";
import ChangePasswordForm from "./changepassword/ChangePasswordForm";
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

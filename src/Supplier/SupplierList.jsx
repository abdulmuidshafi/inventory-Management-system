import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const SupplierList = () => {
  const [suppliers, setSupplier] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await AxiosInstance.get("/suppliers");
      setSupplier(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };

  const handleDelete = async (suppliersId) => {
    try {
      await AxiosInstance.delete(`/suppliers/${suppliersId}`);
      // Handle successful deletion
      // e.g., show success message, update product list, etc.
      fetchSupplier();
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };

  return (
    <div className="p-3">
      <div className="d-flex p-2 justify-content-between align-items-center">
        <h2>Supplier List </h2>
        <Button onClick={() => navigate("/Supplier/add")}>Add suppliers</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((Supplier) => (
            <tr key={Supplier._id}>
              <td>{Supplier.name}</td>
              <td>{Supplier.description}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/Supplier/edit/${Supplier._id}`)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(Supplier._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SupplierList;

//SupplierList;

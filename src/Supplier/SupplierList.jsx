import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
      <Table striped bordered hover responsive className="mx-auto">
  <thead>
    <tr>
      <th style={{ color: '#333', fontWeight: 'bold' }}>Supplier Name</th>
      <th style={{ color: '#333', fontWeight: 'bold' }}>Description</th>
      <th style={{ color: '#333', fontWeight: 'bold' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {suppliers.map((supplier, index) => (
      <tr key={supplier._id} style={{ backgroundColor: (index % 2 === 0) ? '#f5f5f5' : '#fff' }}>
        <td>{supplier.name}</td>
        <td>{supplier.description.length > 30 ? `${supplier.description.substring(0, 30)}...` : supplier.description}</td>
        <td>
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate(`/Supplier/edit/${supplier._id}`)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(supplier._id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </ButtonGroup>
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

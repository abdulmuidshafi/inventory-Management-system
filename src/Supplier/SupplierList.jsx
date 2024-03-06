import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import {
  Table,
  Button,
  Modal,
  Alert,
  Card,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup } from "react-bootstrap";

=======
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
const SupplierList = () => {
  const [suppliers, setSupplier] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

=======
  const navigate = useNavigate();
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await AxiosInstance.get("/suppliers");
      setSupplier(response.data);
<<<<<<< HEAD
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // Display a user-friendly error message
      Alert.error("Something went wrong fetching suppliers. Please try again.");
    }
  };

=======
    } catch (error) {
      console.error(error);
      // Handle error
      // e.g., show error message, etc.
    }
  };


>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  const handleDeletePrompt = (supplierId) => {
    setSupplierToDelete(supplierId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await AxiosInstance.delete(`/suppliers/${supplierToDelete}`);
      setShowDeleteModal(false);
      setSupplierToDelete(null);
      fetchSupplier(); // Refresh the supplier list
<<<<<<< HEAD
      // Show success message with a clearer indication of action
      toast.success("Supplier deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      // Provide more specific error handling if possible
      toast.error(
        "Failed to delete supplier. Please check your network or try again."
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end mt-4">
        <Button onClick={() => navigate("/Supplier/add")}>
          <FontAwesomeIcon icon={faCoffee} className="me-2" />
          Add New Supplier
        </Button>
      </div>
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="mb-4 text-center">Manage Your Suppliers</h2>
          {isLoading ? (
            <Spinner animation="border" variant="primary" size="lg" />
          ) : (
            <Card className="p-4">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th style={{ color: "#333", fontWeight: "bold" }}>
                      <FontAwesomeIcon icon={faCoffee} className="me-2" />
                      Supplier Name
                    </th>
                    <th style={{ color: "#333", fontWeight: "bold" }}>
                      Description
                    </th>
                    <th style={{ color: "#333", fontWeight: "bold" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier, index) => (
                    <tr
                      key={supplier._id}
                      className={index % 2 === 0 ? "bg-light" : ""}
                    >
                      <td>{supplier.name}</td>
                      <td>{supplier.description}</td>
                      <td>
                        <ButtonGroup size="sm">
                          <Button
                            variant="primary"
                            onClick={() =>
                              navigate(`/Supplier/edit/${supplier._id}`)
                            }
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeletePrompt(supplier._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}

          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Supplier Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to permanently delete this supplier? This
              action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>
                Delete Supplier
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
=======
      // Show success message to the user
    toast.success  ("Supplier deleted successfully!");
    } catch (error) {
      console.error(error);
      // Handle error and display an error message to the user
      toast.error("Failed to delete supplier. Please try again.");
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
              <Button
                variant="primary"
                onClick={() => navigate(`/Supplier/edit/${supplier._id}`)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeletePrompt(supplier._id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </ButtonGroup>
          </td>
      </tr>
    ))}
  </tbody>
</Table>
<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this supplier? This action cannot be undone.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDeleteConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>

>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
    </div>
  );
};

export default SupplierList;
<<<<<<< HEAD
=======

//SupplierList;
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68

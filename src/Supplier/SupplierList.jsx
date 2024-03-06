import React, { useState, useEffect } from "react";
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

const SupplierList = () => {
  const [suppliers, setSupplier] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const response = await AxiosInstance.get("/suppliers");
      setSupplier(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // Display a user-friendly error message
      Alert.error("Something went wrong fetching suppliers. Please try again.");
    }
  };

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
    </div>
  );
};

export default SupplierList;

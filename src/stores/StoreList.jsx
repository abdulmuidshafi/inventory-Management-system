import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Row, Col, Card, Spinner, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';
import './StoreList.css';

function StoreList() {
  const [stores, setStores] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storeIdToDelete, setStoreIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    setIsLoading(true);
    try {
      const response = await AxiosInstance.get('/stores');
      setStores(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch stores. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (storeId) => {
    setStoreIdToDelete(storeId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await AxiosInstance.delete(`/stores/${storeIdToDelete}`);
      const updatedStores = stores.filter((store) => store._id !== storeIdToDelete);
      setStores(updatedStores);
      setShowDeleteModal(false);
      toast.success('Store deleted successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete store. Please check your network or try again.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end mt-4">
        <Button
          variant="primary"
          className="bg-blue-500 text-white hover:bg-blue-700 px-3"
          onClick={() => navigate('/stores/add')}
        >
          <FontAwesomeIcon icon={faCoffee} className="me-2" />
          Add New Store
        </Button>
      </div>
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-lg font-medium text-center mb-4">Manage Your Stores</h2>
          {isLoading ? (
            <Spinner animation="border" variant="primary" size="lg" />
          ) : (
            <Card className="shadow-md rounded-lg p-4">
              <Table responsive striped bordered hover className="table-modern">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Image</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) => (
                    <tr key={store._id}>
                      <td>{index + 1}</td>
                      <td>{store.name}</td>
                      <td>{store.address}</td>
                      <td>{store.city}</td>
                      <td>
                        <img src={store.image} alt={store.name} width="50" height="30" />
                      </td>
                      <td>{store.phone}</td>
                      <td>
                        <a href={store.website} target="_blank" rel="noreferrer">
                          {store.website}
                        </a>
                      </td>
                      <td>
                        <ButtonGroup size="sm">
                          <Button
                            variant="primary"
                            className="bg-blue-500 text-white hover:bg-blue-700"
                            onClick={() => navigate(`/stores/edit/${store._id}`)}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="bg-red-500 text-white hover:bg-red-700"
                            onClick={() => handleDeleteClick(store._id)}
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
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this store?
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
          </Col>
        </Row>
      </div>
     
  );
}

export default StoreList;
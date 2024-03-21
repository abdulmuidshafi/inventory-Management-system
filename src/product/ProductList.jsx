import React, { useState, useEffect } from "react";
import { Card, Table, Form, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Modal } from "react-bootstrap";
const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await AxiosInstance.get("/products", {
        params: { name: searchName },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when performing a new search
    fetchProducts();
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : [];
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const filteredProductsOnPage = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const handleDeletePrompt = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await AxiosInstance.delete(`/products/${productToDelete}`);
      setShowDeleteModal(false);
      setProductToDelete(null);
      fetchProducts(); // Refresh the product list
      // Show success message to the user
      alert("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      // Handle error and display an error message to the user
      alert("Failed to delete product. Please try again.");
    }
  };
  return (
    <Card className="my-3 shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Product List</h5>
        <Button
          variant="primary"
          size="sm"
          className="float-right"
          onClick={() => navigate("/products/add")}
        >
          <i className="fas fa-plus"></i> Add Product
        </Button>
      </Card.Header>
      <Card.Body>
        <div>
          <Form onSubmit={handleSearch} className="d-flex align-items-center">
            <Form.Control
              className="d-flex align-items-center form-control-sm"
              type="text"
              placeholder="Search by product name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ width: "150px", marginLeft: "auto" }}
            />
            <Button variant="primary" type="submit">
              <i className="fas fa-search"></i> Search
            </Button>
          </Form>
        </div>
        <Table striped bordered hover size="sm" responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th style={{ width: "30%" }}>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductsOnPage.map((product, index) => (
              <tr
                key={product._id}
                style={index % 2 ? { backgroundColor: "#f5f5f5" } : null}
              >
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  {product.description.length > 50 ? (
                    <span>
                      {product.description.substring(0, 47)}...{" "}
                      <a href="#">Read more</a>
                    </span>
                  ) : (
                    product.description
                  )}
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.brand}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeletePrompt(product._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          style={{ zIndex: 10000 }}
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Pagination className="mt-3">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          />
          <Pagination.Item
            active={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </Pagination.Item>
          {/* Generate page numbers based on page size and total products */}
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={currentPage === i + 2}
              onClick={() => setCurrentPage(i + 2)}
            >
              {i + 2}
            </Pagination.Item>
          ))}
          {/* Show ellipsis again if more than 5 pages and current page is not near the beginning or end */}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <Pagination.Item>...</Pagination.Item>
          )}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          />
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default ProductList;

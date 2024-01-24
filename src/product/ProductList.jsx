import React, { useState, useEffect } from "react";
import { Card, Table, Form, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

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

  const handleDelete = async (productId) => {
    try {
      await AxiosInstance.delete(`/products/${productId}`);
      // Handle successful deletion
      // e.g., show success message, update product list, etc.
      fetchProducts();
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      // This code will always run, regardless of success or error
      // You can use it to do cleanup tasks, like hiding progress indicators
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const filteredProductsOnPage = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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

        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th style={{ width: '30%' }}>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Brand</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProductsOnPage.map((product, index) => (
          <tr key={product._id} style={index % 2 ? { backgroundColor: '#f5f5f5' } : null}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>
              {product.description.length > 50 ? (
                <span>{product.description.substring(0, 47)}... <a href="#">Read more</a></span>
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
                  onClick={() => handleDelete(product._id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
        <Pagination className="mt-3 justify-content-between">
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
              key={i + 2}
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
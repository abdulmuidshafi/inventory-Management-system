import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const filteredProduct = products.filter(product=> product.name.toLowerCase().includes(searchName.toLowerCase()))
console.log(filteredProduct);
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
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="p-3">
      <div className="d-flex p-2 justify-content-between align-items-center">
        <h2>Product List</h2>
        <Button 
          variant="primary"
        onClick={() => navigate("/products/add")}>Add Product</Button>
      </div>
{
 <div className="my-3">
 <Form onSubmit={handleSearch}>
   <Form.Control
     type="text"
     placeholder="Search by product name"
     value={searchName}
     onChange={(e) => setSearchName(e.target.value)}
   />
   <Button variant="primary" type="submit">
     Search
   </Button>
 </Form>
</div>

}
     

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduct.map((product,index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.brand}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/products/edit/${product._id}`)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
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

export default ProductList;

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSale = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
   // seller: "",
    items: [],
    customer_name: "",
    customer_TIN: "",
  });
  const [sellerInfo, setSellerInfo] = useState(null);
  const navigate = useNavigate();
const user = JSON.parse( localStorage.getItem("token"))
  useEffect(() => {
    // Fetch product data
    fetchProducts();

    // Fetch seller data
    // fetchSeller();
  }, []);

  const fetchProducts = () => {
    AxiosInstance.get("/products")
      .then((response) => response.data)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // const fetchSeller = () => {
  //   AxiosInstance.get("/seller")
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setSellerInfo(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching seller information:", error);
  //     });
  // };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleItemChange = (event, index) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [event.target.name]: event.target.value,
    };
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product: "", quantity: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
console.log(formData,user);
// return
    AxiosInstance.post("/sales", {...formData,seller:user._id})
      .then((response) => response.data)
      .then((data) => {
        console.log("Sale added successfully:", data);
        setFormData({          
          items: [],
          customer_name: "",
          customer_TIN: "",
        });
        navigate("/sales");
        toast.success("Sale added successfully.");
      })
      .catch((error) => {
        console.error("Error adding sale:", error);
      });
  };

  const calculateUnitPrice = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      return (product.price * quantity).toFixed(2);
    }
    return "0.00";
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    formData.items.forEach((item) => {
      totalPrice += parseFloat(calculateUnitPrice(item.product, item.quantity));
    });
    return totalPrice.toFixed(2);
  };

  return (
    <div className="p-3">
      <h1>Seller Information</h1>
      {sellerInfo ? (
        <div>
          <p>Name: {sellerInfo.name}</p>
          <p>Email: {sellerInfo.email}</p>
          <p>Address: {sellerInfo.address}</p>
        </div>
      ) : (
        <p>Loading seller information...</p>
      )}

      <Form onSubmit={handleSubmit}>
       

        <Form.Group controlId="items">
          <Form.Label>Items</Form.Label>
          {formData.items.map((item, index) => (
            <div key={index}>
              <Form.Control
                as="select"
                name="product"
                value={item.product}
                onChange={(event) => handleItemChange(event, index)}
                required
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Quantity of product"
                value={item.quantity}
                onChange={(event) => handleItemChange(event, index)}
                required
              />
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="text"
                name="unitPrice"
                value={calculateUnitPrice(item.product, item.quantity)}
                readOnly
              />
              <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                Remove
              </Button>
            </div>
          ))}
        </Form.Group>

        <Button variant="primary" onClick={handleAddItem}>
          Add Item
        </Button>

        <Form.Group controlId="customer_name">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="customer_TIN">
          <Form.Label>Customer TIN</Form.Label>
          <Form.Control
            type="text"
            name="customer_TIN"
            value={formData.customer_TIN}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Sale
        </Button>
      </Form>
    </div>
  );
};

export default AddSale;
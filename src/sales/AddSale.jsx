 import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../api/AxiosInstance";
const AddSale = () => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    store_id: "",
    items: [{ product: "", quantity: "" }],
    customer_name: "",
    customer_TIN: "",
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    fetchStores();
    fetchProducts();
  }, []);

  const fetchStores = () => {
    AxiosInstance.get("/stores")
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };
  const fetchProducts = () => {
    AxiosInstance.get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value,
    };
    setFormData((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };
  const handleAddItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      items: [...prevState.items, { product: "", quantity: "" }],
    }));
  };
  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AxiosInstance.post("/sales", {
        store_id: formData.store_id,
        items: formData.items,
        customer_name: formData.customer_name,
        customer_TIN: formData.customer_TIN,
        seller: user._id,
      });
      const data = response.data;
      console.log("Sale added successfully:", data);

      setFormData({
        store_id: "",
        items: [{ product: "", quantity: "" }],
        customer_name: "",
        customer_TIN: "",
      });
      navigate("/sales");
      toast.success("Sale added successfully.");
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };
  const calculateUnitPrice = (productId, quantity) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      return product.price * quantity;
    }
    return 0;
  };

  const calculateTotal = () => {
    let subtotal = 0;
    formData.items.forEach((item) => {
      const unitPrice = calculateUnitPrice(item.product, item.quantity);
      subtotal += unitPrice;
    });
    return subtotal;
  };
  const handleCancel = () => {
    navigate("/sales");
  };
  return (
    <Card>
      <CardHeader>
        <h2>Add Sale</h2>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row> 
            <Col md={6}>
              <Form.Group>
                <Form.Label>Store</Form.Label>
                <Form.Control
                  as="select"
                  name="store_id"
                  value={formData.store_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select a store</option>
                  {stores.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col> 
            </Row>
          <h4>Items</h4>
          {formData.items.map((item,index) => (
            <div key={index}>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                      as="select"
                      name="product"
                      value={item.product}
                      onChange={(event) => handleItemChange(event, index)}
                    >
                  <option value="">Select a product</option>
                  {products
                    .filter((prod) => prod.stock > 0)
                    .map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(event) => handleItemChange(event, index)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </div>
          ))}

          <Button
            variant="primary"
            onClick={handleAddItem}
            style={{ marginBottom: "1rem" }}
          >
            Add Item
          </Button>
          <Row> 
            <Col md={6}>
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
          </Col>
            <Col md={6}>
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
            </Col>
          </Row>
          <h4>total: ETB={calculateTotal()}</h4>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit" style={{ marginLeft: "1rem" }}>
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default AddSale;
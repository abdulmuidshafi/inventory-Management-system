import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
function CreateStore() {
  const navigate=useNavigate();
  const [storeData, setStoreData] = useState({
    name: '',
    address: '',
    city: '',
    image: '',
    phone: '',
    website: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setStoreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await AxiosInstance.post('/stores', storeData);
      console.log(response.data);
      navigate("/stores");
      toast.success('Store Created Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={storeData.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" value={storeData.address} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" name="city" value={storeData.city} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="url" name="image" value={storeData.image} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone Number (Optional)</Form.Label>
        <Form.Control type="tel" name="phone" value={storeData.phone} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="website">
        <Form.Label>Website URL (Optional)</Form.Label>
        <Form.Control type="url" name="website" value={storeData.website} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Store
      </Button>
    </Form>
  );
}

export default CreateStore;
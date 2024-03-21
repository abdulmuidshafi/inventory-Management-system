import React, { useState, useEffect } from 'react';
import { Form, Button, FormGroup, Row, Col } from 'react-bootstrap';
import AxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
function StoreUpdate() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [categories, setCategories] = useState([]);
  const { storeId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await AxiosInstance.get(`/stores/${storeId}`);
        const store = response.data;
        setName(store.name);
        setAddress(store.address);
        setCity(store.city);
        setImage(store.image);
        setPhone(store.phone);
        setWebsite(store.website);
        setOpeningHours(store.openingHours);
        setCategories(store.categories);
      } catch (error) {
        console.error(error);
        // Display error message to the user
        toast.error('Failed to fetch store. Please try again.');
      }
    };

    fetchStore();
  }, [storeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await AxiosInstance.put(`/stores/${storeId}`, {
        name,
        address,
        city,
        image,
        phone,
        website,
        openingHours,
        categories,
      });
navigate("/stores")
      toast.success('Store updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      // Display error message to the user
      toast.error('Failed to update store. Please check your network or try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>Address:</Form.Label>
        <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>City:</Form.Label>
        <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>Image URL:</Form.Label>
        <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>Website:</Form.Label>
        <Form.Control type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>Opening Hours:</Form.Label>
        <Form.Control type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Form.Label>Categories (comma separated):</Form.Label>
        <Form.Control type="text" value={categories.join(', ')} onChange={(e) => setCategories(e.target.value.split(', '))} />
      </FormGroup>
      <Row>
        <Col>
          <Button variant="primary" type="submit">
            Update Store
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default StoreUpdate;
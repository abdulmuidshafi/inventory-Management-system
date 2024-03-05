import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Container, Table } from 'react-bootstrap';
import { format } from "date-fns";
import AxiosInstance from "./../../../api/AxiosInstance";
const GenerateSalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!startDate || !endDate) {
      setError('Please provide both start and end dates.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post('/sales/report', {
        startDate,
        endDate,
      });

      setSalesData(response.data.sales);
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Fetch initial sales data on component mount (if applicable)
  }, []);

  return (
    <Container>
      <h1>Generate Sales Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={6}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Generate Report'}
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>

      {salesData.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Sale Order Time</th>
              <th>Seller Name</th>
              {/* Add other relevant columns as needed */}
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sale.saleOrderTime}</td>
                <td>{sale.seller.name}</td>
                {/* Add cells for other data based on your API response structure */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default GenerateSalesReport;

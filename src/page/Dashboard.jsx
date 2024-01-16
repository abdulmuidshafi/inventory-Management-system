import React, { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Dashboard.css';
export const Dashboard = () => {
  const [dailySales, setDailySales] = useState();
  const [weeklySales, setWeeklySales] = useState();
  const [monthlySales, setMonthlySales] = useState(); 
  const [amountDaily,setAmountDaily]=useState({});
  const [amountWeekly, setAmountWeekly] = useState({});
  const [amountMonthly, setAmountMonthly] = useState({});
  const [products, setProducts] = useState({});
  /*
  console.log(products); 
  console.log(dailySales);
  console.log(weeklySales);
  console.log(monthlySales);
  console.log(amountDaily);
  console.log(amountWeekly);
  console.log(amountMonthly);
  //console.log);
  */
  useEffect(() => { 
    fetchDailySales();
    fetchProductsData();
       fetchMonthlySales();
       fetchWeeklySales();
       fetchAmountDaily();
       fetchAmountWeekly();
       fetchAmountMonthly(); 
   
  }, []);
  const fetchDailySales = () => {
    AxiosInstance.get(`/sales/daily/`)
      .then((response) => setDailySales(response.data))
      .catch((error) => console.log(error));
  };
  const fetchAmountDaily = () => {
    AxiosInstance.get(`/sales/amount/daily/`)
      .then((response) => setAmountDaily(response.data))
      .catch((error) => console.log(error));
  };
  const fetchWeeklySales = () => {
    AxiosInstance.get(`/sales/weekly`)
      .then((response) => setWeeklySales(response.data))
      .catch((error) => console.log(error));
  };
  const fetchMonthlySales = () => {
    AxiosInstance.get(`/sales/monthly`)
      .then((response) => setMonthlySales(response.data))
      .catch((error) => console.log(error));
  };
   
  const fetchAmountWeekly = () => {
    AxiosInstance.get('/sales/total-by-weekly')
      .then((response) => setAmountWeekly(response.data))
      .catch((error) => console.log(error));
  };
  const fetchAmountMonthly = () => {
    AxiosInstance.get('/sales/total-by-month')
      .then((response) => setAmountMonthly(response.data))
      .catch((error) => console.log(error));
  };
  const fetchProductsData = () => {
    AxiosInstance.get(`/products/dashboard`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }; 
return (
<Container>
    <Row className="row-cols-1 col-span-12 gap-4 p-4">
    <Col sm={6} md={4} lg={3}>
  <Card className="dashboard-card rounded-lg border border-gray-200 bg-sky-100 p-6 shadow">
    <div className="dashboard-card-success">
      <i className="bi bi-check-circle-fill text-white"></i>
    </div>
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        the number of People you bought today
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {dailySales?.sales}
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
<Col sm={6} md={4} lg={3}>
  {/* Daily Sales card */}
  <Card className="dashboard-card rounded-lg border border-gray-200 bg-humanlike p-6 shadow">
    <div className="dashboard-card-success">
      <i className="bi bi-check-circle-fill text-white"></i>
    </div>
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        the number of People you bought weekly
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {weeklySales?.sales}
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
<Col sm={6} md={4} lg={3}>
  {/* Daily Sales card */}
  <Card className="dashboard-card rounded-lg border border-gray-200 bg-humanlike p-6 shadow">
    <div className="dashboard-card-success">
      <i className="bi bi-check-circle-fill text-white"></i>
    </div>
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        the number of People you bought monthly
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {monthlySales?.sales}
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
      <Col sm={6} md={4} lg={3}>
        {/* Amount Sales Daily card */}
        <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow">
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        Amount Sales Daily Birr Daily
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {amountDaily?.totalWeekAmount}
      </Card.Text>
    </Card.Body>
  </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
  {/* Amount Sales Weekly card */}
  <Card className="rounded-lg border border-gray-200 bg-coast p-6 shadow">
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        Amount Sales Weekly Birr
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {amountWeekly?.totalWeekAmount}
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
<Col sm={6} md={4} lg={3}>
  {/* Monthly Sales Amount card */}
  <Card className="rounded-lg border border-gray-200 bg-money p-6 shadow">
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        Monthly Sales Amount Birr
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {amountMonthly?.totalWeekAmount}
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
      <Col sm={6} md={4} lg={3}>
        {/* Total Products card */}
        <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow">
    <div className="d-flex justify-content-end rounded bg-red-500 p-2">
      <i className="bi bi-exclamation-circle-fill text-white"></i>
    </div>
    <Card.Body>
      <Card.Title className="text-sm font-medium text-gray-600">
        Total Products
      </Card.Title>
      <Card.Text className="text-2xl font-semibold text-gray-900">
        {products?.totalproduct}
      </Card.Text>
    </Card.Body>
  </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
  {/* Out of Stock Products card */}
  <Card className="rounded-lg border border-gray-200 bg-danger p-6 shadow">
    <div className="d-flex justify-content-end rounded bg-blue-500 p-2">
      <i className="bi bi-exclamation-circle-fill text-white"></i>
    </div>
    <Card.Body>
      <Card.Title className="dashboard-card-value">Out of Stock Products</Card.Title>
      <Card.Text className="text-2xl font-semibold text-blue-600">
        {products?.outofstockproduct}
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
    </Row>
  </Container>

);
  } //change to react react-bootstrap
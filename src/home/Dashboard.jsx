import React, { useState, useEffect } from "react";
import {  Grid } from "@mui/material"; 
import TotalSales from "./TotalSales";
import SalesByCity from "./SalesByCity";
import {
  Dangerous,
  MonetizationOnRounded,
  Person,
  ProductionQuantityLimitsTwoTone,
} from "@mui/icons-material";  
import AxiosInstance from "../api/AxiosInstance";
import { Typography, Card, CardContent, CardActionArea } from "@mui/material";
const Dashboard = () => { 
  const [dailySales, setDailySales] = useState();
  const [weeklySales, setWeeklySales] = useState();
  const [monthlySales, setMonthlySales] = useState();
  const [amountDaily, setAmountDaily] = useState({});
  const [amountWeekly, setAmountWeekly] = useState({});
  const [amountMonthly, setAmountMonthly] = useState({});
  const [products, setProducts] = useState({});
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
    AxiosInstance.get("/sales/total-by-weekly")
      .then((response) => setAmountWeekly(response.data))
      .catch((error) => console.log(error));
  };
  const fetchAmountMonthly = () => {
    AxiosInstance.get("/sales/total-by-month")
      .then((response) => setAmountMonthly(response.data))
      .catch((error) => console.log(error));
  };
  const fetchProductsData = () => {
    AxiosInstance.get(`/products/dashboard`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
  return (
<Grid container spacing={4} className="mt-3 px-3 py-0">
  <Grid item xs={12} md={3}>
    <Card className="card" style={{ backgroundColor: "#8BC34A", height: "200px" }}>
      <CardActionArea>
        <CardContent>
          <Card className="mt-6 p-1" placeholder="card view">
            <div className="d-flex flex-row align-items-center justify-content-start">
              <div className="rounded-lg bg-gray-900 text-white" style={{ fontSize: "64px", padding: "2px", width: "64px", height: "64px" }}>
                <Person className="text-dark" style={{ fontSize: "50px" }} />
              </div>
              <div className="ms-3">
                <Typography placeholder="card view" variant="h6" color="blue-gray">
                  Visitors
                </Typography>
                <Typography
                  placeholder="card view"
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                  style={{ maxWidth: "200px" }}
                >
                  Today: {dailySales?.sales} <br />
                  Weekly: {weeklySales?.sales} <br />
                  Monthly: {monthlySales?.sales}
                </Typography>
              </div>
            </div>
          </Card>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  <Grid item xs={12} md={3}>
    <Card className="card" style={{ backgroundColor: "#4285f4", height: "200px" }}>
      <CardActionArea>
        <CardContent>
          <Card className="mt-6 p-1" placeholder="card view">
            <div className="d-flex flex-row align-items-center justify-content-start">
              <div className="rounded-lg bg-gray-900 text-white" style={{ fontSize: "64px", padding: "2px", width: "64px", height: "64px" }}>
                <MonetizationOnRounded className="text-dark" style={{ fontSize: "50px" }} />
              </div>
              <div className="ms-3">
                <Typography placeholder="card view" variant="h6" color="primary">
                  Total Sales amount(Birr)
                </Typography>
                <Typography
                  placeholder="card view"
                  variant="small"
                  color="primary"
                  className="max-w-sm font-normal"
                  style={{ maxWidth: "100px" }}
                >
                  Today: {amountDaily?.totalWeekAmount} <br />
                  Weekly: {amountWeekly?.totalWeekAmount} <br />
                  Monthly: {amountMonthly?.totalWeekAmount}
                </Typography>
              </div>
            </div>
          </Card>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  <Grid item xs={12} md={3}>
    <Card className="card" style={{ backgroundColor: "#0054BB", height: "200px" }}>
      <CardActionArea>
        <CardContent>
          <Card className="mt-6 p-1" placeholder="card view">
            <div className="d-flex flex-row align-items-center justify-content-start">
              <div className="rounded-lg bg-gray-900 text-white" style={{ fontSize: "64px", padding: "2px", width: "64px", height: "64px" }}>
                <ProductionQuantityLimitsTwoTone className="text-dark" style={{ fontSize: "50px" }} />
              </div>
              <div className="ms-3">
                <Typography placeholder="card view" variant="h6" color="primary">
                  Total Products 
                </Typography>
                <Typography
                  placeholder="card view"
                  variant="small"
                  color="primary"
                  className="max-w-sm font-normal"
                  style={{ maxWidth: "100px" }}
                >
                   {products?.totalproduct} 
                
                </Typography>
              </div>
            </div>
          </Card>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  <Grid item xs={12} md={3}>
  <Card className="card" style={{ backgroundColor: "#f44336", height: "200px" }}>
    <CardActionArea>
      <CardContent>
        <Card className="mt-6 p-1" placeholder="card view">
          <div className="d-flex flex-row align-items-center justify-content-start">
            <div className="rounded-lg bg-gray-900 text-white" style={{ fontSize: "64px", padding: "2px", width: "64px", height: "64px" }}>
              <Dangerous className="text-dark" style={{ fontSize: "50px" }} />
            </div>
            <div className="ms-3">
              <Typography placeholder="card view" variant="h6" color="primary">
                Out of Stock Items
              </Typography>
              <Typography
                placeholder="card view"
                variant="small"
                color="primary"
                className="max-w-sm font-normal"
                style={{ maxWidth: "100px" }}
              >
                {products?.outofstockproduct}
              </Typography>
            </div>
          </div>
        </Card>
      </CardContent>
    </CardActionArea>
  </Card>
</Grid>
  <Grid item xs={12} md={6}>
    <TotalSales dailySales={dailySales} />
  </Grid>

  <Grid item xs={12} md={6}>
    <SalesByCity />
  </Grid>
</Grid>
  );
};
export default Dashboard;

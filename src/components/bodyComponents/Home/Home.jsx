import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import UilReceipt from "@iconscout/react-unicons/icons/uil-receipt";
import UilBox from "@iconscout/react-unicons/icons/uil-box";
import UilTruck from "@iconscout/react-unicons/icons/uil-truck";
import UilCheckCircle from "@iconscout/react-unicons/icons/uil-check-circle";
import InfoCard from "../../subComponents/InfoCard";
import TotalSales from "./TotalSales";
import SalesByCity from "./SalesByCity";
import Channels from "./Channels";
import TopSellingProduct from "./TopSellingProduct";
import AxiosInstance from "./../../../api/AxiosInstance";
import { Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ApexChart } from "react-apexcharts";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    color: "#4285f4",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4285f4",
  },
  cardAnnotation: {
    fontSize: "14px",
    color: "#888",
  },
});
const Home = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const period = currentDate.getDay() === 0 ? "Weekly" : "Monthly"; // Example logic
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
    <Grid container spacing={4} className={`mt-3 px-3 py-0`}>
      <Grid item xs={12} md={3}>
        <Card className={classes.card} style={{ backgroundColor: "#8BC34A" }}>
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="People Icon">
                <i className="bi bi-people" style={{ color: "#fff" }}></i>
              </div>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Number of People Bought Today
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ color: "#fff", animation: "pulse 1s ease-in-out" }}
              ></Typography>
              <Typography
                className={classes.cardAnnotation}
                style={{ color: "#ddd" }}
              >
                {dailySales?.sales}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          className={classes.card}
          style={{
            backgroundImage: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
          }}
        >
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="People Icon">
                <i
                  className="bi bi-calendar-week"
                  style={{ color: "#4285f4" }}
                ></i>
              </div>
              <Typography variant="h6">
                Number of People Bought Weekly {period}
              </Typography>
              <Typography className={classes.cardValue}></Typography>
              <Typography className={classes.cardAnnotation}>
                {weeklySales?.sales}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="People Icon">
                <i className="bi bi-calendar-month"></i>
              </div>
              <Typography variant="h6">
                Number of People Bought Monthly
              </Typography>
              <Typography className={classes.cardValue}></Typography>
              <Typography className={classes.cardAnnotation}>
                {monthlySales?.sales}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          className={classes.card}
          style={{ backgroundColor: "#4285f4", color: "#fff" }}
        >
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="Calendar Icon">
                <i
                  className="bi bi-calendar-week"
                  style={{ color: "#fff" }}
                ></i>
              </div>
              <Typography
                variant="h6"
                style={{ fontSize: 18, fontWeight: 700 }}
              >
                Total Amount (Birr)
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ fontSize: 24, fontWeight: 700 }}
              ></Typography>
              <br />
              <Typography variant="subtitle2" style={{ color: "#ddd" }}>
                daily Total Amount (Birr):
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ color: "#ddd" }}
              >
                {amountDaily?.totalWeekAmount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          className={classes.card}
          style={{ backgroundColor: "#4285f4", color: "#fff" }}
        >
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="Calendar Icon">
                <i
                  className="bi bi-calendar-week"
                  style={{ color: "#fff" }}
                ></i>
              </div>
              <Typography
                variant="h6"
                style={{ fontSize: 18, fontWeight: 700 }}
              >
                Total Amount (Birr)
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ fontSize: 24, fontWeight: 700 }}
              ></Typography>
              <br />
              <Typography variant="subtitle2" style={{ color: "#ddd" }}>
                wekly Total Amount (Birr):
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ color: "#ddd" }}
              >
                {amountWeekly?.totalWeekAmount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          className={classes.card}
          style={{ backgroundColor: "#4285f4", color: "#fff" }}
        >
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="Calendar Icon">
                <i
                  className="bi bi-calendar-week"
                  style={{ color: "#fff" }}
                ></i>
              </div>
              <Typography
                variant="h6"
                style={{ fontSize: 18, fontWeight: 700 }}
              >
                Total Amount (Birr)
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ fontSize: 24, fontWeight: 700 }}
              ></Typography>
              <br />
              <Typography variant="subtitle2" style={{ color: "#ddd" }}>
                Monthly Total Amount (Birr):
              </Typography>
              <Typography
                className={classes.cardValue}
                style={{ color: "#ddd" }}
              >
                {amountMonthly?.totalWeekAmount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="Product Icon">
                <i className="bi bi-cart4" style={{ color: "#e91e63" }}></i>
              </div>
              <Typography variant="h6">Total Number of Products</Typography>
              {products?.totalproduct}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          className={classes.card}
          style={{ backgroundColor: "#f5f5f5", border: "1px solid #ddd" }}
        >
          <CardActionArea>
            <CardContent>
              <div className={classes.cardIcon} aria-label="Warning Icon">
                <i
                  className="bi bi-exclamation-triangle"
                  style={{ color: "#e91e63" }}
                ></i>
              </div>
              <Typography variant="h6" style={{ color: "#333" }}>
                Out of Stock Items
              </Typography>
              {products?.outofstockproduct}
              <Typography
                className={classes.cardValue}
                style={{ color: "#333", fontSize: 18 }}
              ></Typography>
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
      <Grid item xs={12} md={6}>
        <Channels />
      </Grid>
      <Grid item xs={12} md={6}>
        <TopSellingProduct products={products} />
      </Grid>
    </Grid>
  );
};

export default Home;

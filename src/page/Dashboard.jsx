import React, { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  IconButton,
  Chip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import "bootstrap-icons/font/bootstrap-icons.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  card: {
    minWidth: 250,
    backgroundColor: "#f5f5f5", // Light grey background
    borderRadius: 5,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 8,
  },
  cardAnnotation: {
    color: "text.secondary",
    fontSize: 14,
  },
  cardIcon: {
    marginRight: 10,
    fontSize: "1.5rem",
    color: "#4285f4", // Blue icon color
  },

  /*card: {
    marginBottom: 10,

    card: {
      marginRight: 10,
      fontSize: "1.5rem",
      color: "#4285f4", // Blue icon color
    },
    // Add further styles for spacing, headers, etc.
  },*/
});

// Add further styles for spacing, headers, etc.

export const Dashboard = () => {
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
    <>
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
          <Card className={classes.card} style={{ backgroundColor: "#8BC34A" }}>
            <CardActionArea>
              <CardContent>
                <div className={classes.cardIcon} aria-label="People Icon">
                  <i className="bi bi-people" style={{ color: "#fff" }}></i>
                </div>
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Number of People Bought Weekly
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
          <Card className={classes.card} style={{ backgroundColor: "#8BC34A" }}>
            <CardActionArea>
              <CardContent>
                <div className={classes.cardIcon} aria-label="People Icon">
                  <i className="bi bi-people" style={{ color: "#fff" }}></i>
                </div>
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Number of People Bought Monthly
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
        </Grid>{" "}
        <br />
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
      </Grid>
    </>
  );
};

import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Box } from "@mui/material";
import AxiosInstance from "../api/AxiosInstance";

export default function TotalSales() {
  const currentDate = new Date();
  const period = currentDate.getDay() === 0 ? "Weekly" : "Monthly";

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
    AxiosInstance.get(`/sales/daily`)
      .then((response) => setDailySales(response.data))
      .catch((error) => console.log(error));
  };

  const fetchAmountDaily = () => {
    AxiosInstance.get(`/sales/amount/daily`)
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

  const options = {
    title: {
      text: "Total Sales",
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#666",
      },
    },
    subtitle: {
      text: `Sales for ${period} period`,
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    legend: {
      customLegendItems: [
        `Number of visitors today: ${dailySales?.sales}`,
        `Number of visitors this week: ${weeklySales?.sales}`,
        `Number of visitors this month: ${monthlySales?.sales}`,
        `Daily sales amount (birr): ${amountDaily?.totalWeekAmount}`,
        `Weekly sales amount (birr): ${amountWeekly?.totalWeekAmount}`,
        `Monthly sales amount (birr): ${amountMonthly?.totalWeekAmount}`,
        `Total Products: ${products?.totalproduct}`,
        `Out of Stock: ${products?.outofstockproduct}`,
      ],
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      offsetY: -20,
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      hover: {
        size: 9,
      },
    },
    theme: {
      mode: "light",
    },
    chart: {
      height: 328,
      type: "line",
      zoom: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.2,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [2000, 3200, 3250, 4700, 3900, 4900, 3200],
    },
    {
      name: "Series 2",
      data: [1500, 1900, 1800, 2900, 2600, 3200, 2200],
    },
  ];

  return (
    <Box
      sx={{
        margin: 3,
        bgcolor: "white",
        borderRadius: 2,
        padding: 3,
        height: "100%",
      }}
    >
      <ApexCharts
        options={options}
        series={series}
        height={300}
        type="line"
        width="100%"
      />
    </Box>
  );
}
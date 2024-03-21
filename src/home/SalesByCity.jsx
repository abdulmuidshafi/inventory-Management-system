import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Box } from "@mui/material";
import AxiosInstance from "../api/AxiosInstance";

export default function TotalSales() {
  const [dailySales, setDailySales] = useState(null);
  const [weeklySales, setWeeklySales] = useState(null);
  const [monthlySales, setMonthlySales] = useState(null);
  const [amountDaily, setAmountDaily] = useState({});
  const [amountWeekly, setAmountWeekly] = useState({});
  const [amountMonthly, setAmountMonthly] = useState({});
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        dailySalesResponse,
        weeklySalesResponse,
        monthlySalesResponse,
        amountDailyResponse,
        amountWeeklyResponse,
        amountMonthlyResponse,
        productsResponse,
      ] = await Promise.all([
        AxiosInstance.get("/sales/daily"),
        AxiosInstance.get("/sales/weekly"),
        AxiosInstance.get("/sales/monthly"),
        AxiosInstance.get("/sales/amount/daily"),
        AxiosInstance.get("/sales/total-by-weekly"),
        AxiosInstance.get("/sales/total-by-month"),
        AxiosInstance.get("/products/dashboard"),
      ]);

      setDailySales(dailySalesResponse.data);
      setWeeklySales(weeklySalesResponse.data);
      setMonthlySales(monthlySalesResponse.data);
      setAmountDaily(amountDailyResponse.data);
      setAmountWeekly(amountWeeklyResponse.data);
      setAmountMonthly(amountMonthlyResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const currentDate = new Date();
  const period = currentDate.getDay() === 0 ? "Weekly" : "Monthly";

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
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      offsetY: -20,
    },
    theme: {
      mode: "light",
    },
    chart: {
      height: 328,
      type: "pie",
    },
  };

  const series = [dailySales?.sales, weeklySales?.sales,
     monthlySales?.sales,amountDaily?.totalWeekAmount,amountWeekly?.totalWeekAmount,
    amountMonthly?.totalWeekAmount,products?.totalproduct,products?.outofstockproduct];

  const labels = ["Daily Sales", "Weekly Sales", "Monthly Sales"];

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
        labels={labels}
        height={300}
        type="pie"
        width="100%"
      />
    </Box>
  );
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Paper, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Content.css";

function Content() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://patipan-app-api-e82f7762346f.herokuapp.com/patientinformation"
      );
      setData(result.data);
    };

    fetchData();
  }, []);

  const processDataForBarChart = (data) => {
    const bloodGroups = data.reduce((acc, item) => {
      acc[item.bloodgrp] = (acc[item.bloodgrp] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(bloodGroups).map((bloodgrp) => ({
      name: bloodgrp,
      patients: bloodGroups[bloodgrp],
    }));
  };

  const dataForBarChart = processDataForBarChart(data);

  return (
    <div style={{ marginTop: "110px", marginLeft: "270px" }}>
      <Typography variant="h4" gutterBottom>
        Data Visualization Overview
      </Typography>{" "}
      <br />
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Paper elevation={3} style={{ padding: "10px", margin: "10px" }}>
              <Typography variant="h5" component="h2">
                {item.fname}
              </Typography>
              <Typography color="textSecondary">รหัส: {item.hn}</Typography>
              <Typography color="textSecondary">
                กรุ๊ปเลือด: {item.bloodgrp}
              </Typography>
              <Typography color="textSecondary">
                ประเทศ: {item.country}
              </Typography>
              <Typography color="textSecondary">เพศ: {item.sex}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Paper
        elevation={3}
        style={{ padding: "20px", margin: "20px", marginTop: "50px" }}
      >
        <Typography
          variant="h5"
          component="h2"
          style={{ marginBottom: "20px" }}
        >
          กรุ๊ปเลือด(จำนวน)
        </Typography>
        <BarChart
          width={600}
          height={300}
          data={dataForBarChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="patients" fill="#fe02ef" />
        </BarChart>
      </Paper>
    </div>
  );
}

export default Content;

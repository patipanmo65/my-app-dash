import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import "./ChartPageStyle.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  // ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ComposedChart,
  Area,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ScatterChart,
  Scatter,
  // FunnelChart,
  // Funnel,
  // LabelList,
} from "recharts";

function ChartPage() {
  const [data, setData] = useState([]);
  const maxItemsToShow = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://patipan-app-api-e82f7762346f.herokuapp.com/patientinformation"
          // "http://localhost:5000/api/cribs",
          // "http://localhost:5000/api/patientinformation"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const limitedData = data.slice(0, maxItemsToShow);
  const [selectedKeys, setSelectedKeys] = useState([
    "hn",
    "pname",
    "fname",
    "lname",
    "pttype",
    "firstday",
    "birthday",
    "sex",
    "mothername",
    "motherlname",
    "fathername",
    "fatherlname",
    "occupation",
    "country",
    "nationality",
    "religion",
    "addrpart",
    "moopart",
    "road",
    "hometel",
    "marrystatus",
    "spsname",
    "spslname",
    "informname",
    "informrelation",
    "informaddr",
    "informtel",
    "bloodgrp",
    "drugallergy",
    "cid",
  ]); // Default selected keys

  // // Handle change in checkbox selections
  // const handleSelectChange = (event) => {
  //   const value = event.target.value;
  //   setSelectedKeys((current) => {
  //     if (current.includes(value)) {
  //       return current.filter((key) => key !== value);
  //     } else {
  //       return [...current, value];
  //     }
  //   });
  // };

  const handleSelectChange = (event) => {
    const { value, checked } = event.target;
    setSelectedKeys((prev) =>
      checked ? [...prev, value] : prev.filter((key) => key !== value)
    );
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mb: 4, ml: 40 }}
      className="chartContainerWithSidebar chartPageMarginTop"
    >
      <Grid container spacing={2} justifyContent="center">
        {/* ตัวอย่างการใช้ limitedData กับ LineChart */}
        <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">Line Chart</h2>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedKeys.includes("bloodgrp") && (
              <Line type="monotone" dataKey="bloodgrp" stroke="#ff7300" />
            )}
            {selectedKeys.includes("hn") && (
              <Line type="monotone" dataKey="hn" stroke="#82ca9d" />
            )}
          </LineChart>
          <Box display="flex" justifyContent="center" mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedKeys.includes("bloodgrp")}
                  onChange={handleSelectChange}
                  value="bloodgrp"
                />
              }
              label="Blood Group"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedKeys.includes("hn")}
                  onChange={handleSelectChange}
                  value="hn"
                />
              }
              label="HN"
            />
          </Box>
        </Grid>

        {/* BarChart */}
        <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">Bar Chart</h2>
          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedKeys.includes("hn") && <Bar dataKey="hn" fill="#ff7300" />}
            {selectedKeys.includes("fname") && (
              <Bar dataKey="fname" fill="#82ca9d" />
            )}
            {selectedKeys.includes("country") && (
              <Bar dataKey="country" fill="#413ea0" />
            )}
          </BarChart>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {["hn", "fname", "country"].map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={selectedKeys.includes(key)}
                    onChange={handleSelectChange}
                    value={key}
                  />
                }
                label={key.toUpperCase()}
              />
            ))}
          </div>
        </Grid>

        {/* ComposedChart */}
        <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">Composed Chart</h2>
          <ComposedChart width={500} height={300} data={limitedData}>
            <XAxis dataKey="fname" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedKeys.includes("hn") && <Bar dataKey="hn" fill="#8884d8" />}
            {selectedKeys.includes("fname") && (
              <Bar dataKey="fname" fill="#82ca9d" />
            )}
            {selectedKeys.includes("country") && (
              <Bar dataKey="country" fill="#413ea0" />
            )}
            {selectedKeys.includes("sex") && (
              <Bar dataKey="sex" fill="#8884d8" />
            )}
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="" fill="#8884d8" stroke="#8884d8" />
            <Line type="monotone" dataKey="" stroke="#ff7300" />
            <Bar dataKey="" barSize={20} fill="#413ea0" />
          </ComposedChart>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {["hn", "fname", "country", "sex"].map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={selectedKeys.includes(key)}
                    onChange={handleSelectChange}
                    value={key}
                  />
                }
                label={key.toUpperCase()}
              />
            ))}
          </div>
        </Grid>

        {/* RadarChart */}
        <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">Radar Chart</h2>
          <RadarChart
            outerRadius={115}
            width={500}
            height={300}
            data={limitedData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="fname" />
            <PolarRadiusAxis />
            <Radar
              name="รหัส"
              dataKey="hn"
              stroke="#8884d8"
              fill="#ff402d"
              fillOpacity={0.6}
            />
            <Radar
              name="ที่อยู่"
              dataKey="contact"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Tooltip />
            <Legend />
          </RadarChart>
        </Grid>

        <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">Scatter Chart</h2>
          <ScatterChart
            width={500}
            height={300}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis dataKey="hn" type="number" name="hn" />
            <YAxis dataKey="hn" type="text" name="fname" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="ข้อมูล" data={limitedData} fill="#8884d8" />
          </ScatterChart>
        </Grid>

        {/* RadialBarChart */}
        <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">RadialBar Chart</h2>
          <RadialBarChart
            width={500}
            height={300}
            innerRadius="10%"
            outerRadius="80%"
            data={limitedData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              label={{ fill: "#666", position: "insideStart" }}
              background
              clockWise={true}
              dataKey="hn"
            />

            <Legend
              iconSize={10}
              width={120}
              height={140}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <h2 className="text-2xl font-bold mb-4">Funnel Chart</h2>
          <FunnelChart width={500} height={300}>
            <Tooltip />
            <Funnel dataKey="fname" data={limitedData} isAnimationActive>
              <LabelList
                position="right"
                fill="#000"
                stroke="none"
                dataKey="hn"
              />
            </Funnel>
          </FunnelChart>
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default ChartPage;

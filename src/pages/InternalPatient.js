import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import {
//   PieChart,
//   Pie,
//   Tooltip as PieTooltip,
//   Cell,
//   Legend as PieLegend,
// } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend as BarLegend,
} from "recharts";

function InternalPatient() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://patipan-app-api-e82f7762346f.herokuapp.com/cribs")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // สำหรับ Pie Chart
  // const dataForPieChart = rows.reduce((acc, row) => {
  //   const zoneIndex = acc.findIndex((item) => item.name === row.zone);
  //   if (zoneIndex > -1) {
  //     acc[zoneIndex].value += 1;
  //   } else {
  //     acc.push({ name: row.zone, value: 1 });
  //   }
  //   return acc;
  // }, []);

  // สำหรับ Bar Chart
  const dataForBarChart = rows.map((row) => ({
    name: row.crib_code, // หรืออาจจะใช้ชื่อโซนถ้าต้องการแสดงข้อมูลโดยแบ่งตามโซน
    จำนวนงาน: row.usage_count,
  }));

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={14}
        ml={14}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          ข้อมูลเปล
        </Typography>
        {/* ตาราง */}
        <TableContainer component={Paper} sx={{ maxWidth: 1000, mt: 4 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID เปล</TableCell>
                <TableCell>Code เปล</TableCell>
                <TableCell>จำนวนงาน(ครั้ง)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.crib_code}</TableCell>
                  <TableCell>{row.usage_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pie Chart */}
        {/* <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          แสดงเปลในแต่ละโซน
        </Typography> */}
        {/* <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={dataForPieChart}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dataForPieChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <PieTooltip />
          <PieLegend />
        </PieChart> */}
        {/* Bar Chart สำหรับแสดงจำนวนงานของเปล */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 8 }}>
          จำนวนงานของเปล
        </Typography>
        <BarChart
          width={1200}
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
          <BarTooltip />
          <BarLegend />
          <Bar dataKey="จำนวนงาน" fill="#2102fe" />
        </BarChart>
      </Box>
    </Container>
  );
}

export default InternalPatient;

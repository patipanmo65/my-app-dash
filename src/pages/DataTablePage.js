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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function DataTablePage() {
  const [dataOne, setDataOne] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);

  useEffect(() => {
    axios
      .get("https://patipan-app-api-e82f7762346f.herokuapp.com/lists")
      .then((response) => {
        setDataOne(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    axios
      .get("https://patipan-app-api-e82f7762346f.herokuapp.com/zones")
      .then((response) => {
        setDataTwo(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const renderTable = (data, title) => (
    <>
      <Typography variant="h5" component="h3" gutterBottom>
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mb: 5, mt: 5, overflowX: "auto" }}
      >
        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>รหัส</TableCell>
              <TableCell>รายการ</TableCell>
              <TableCell>รายละเอียด</TableCell>
              <TableCell>วันที่บันทึก</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.ListID || row.zone_id}
                </TableCell>
                <TableCell>{row.Name || row.zone_name}</TableCell>
                <TableCell>{row.Description || row.description}</TableCell>
                <TableCell>{row.CreationDate || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const renderZoneChart = (data) => {
    const chartData = data.map((zone) => ({
      name: zone.zone_name, // หรือฟิลด์อื่นๆ ที่แสดงชื่อโซน
      patients: zone.patient_count, // สมมติว่ามีฟิลด์ patientCount หรือคุณสามารถเปลี่ยนเป็นข้อมูลจริง
    }));

    return (
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          จำนวนผู้ป่วยภายในโซน
        </Typography>
        <BarChart width={750} height={350} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="patients" fill="#27ed00" name="จำนวนผู้ป่วย" />
        </BarChart>
      </Box>
    );
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={14}
        ml={14}
      >
        {renderTable(dataOne, "รายการตรวจ")}
        {renderTable(dataTwo, "โซนตรวจ")}
        {renderZoneChart(dataTwo)}
      </Box>
    </Container>
  );
}

export default DataTablePage;

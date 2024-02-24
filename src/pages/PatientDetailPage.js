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
  // Legend,
} from "recharts";

function PatientDetailPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://patipan-app-api-e82f7762346f.herokuapp.com/crib_staff")
      .then((response) => {
        // ตั้งสมมติฐานว่า response.data มีฟิลด์ 'workload' สำหรับจำนวนงาน
        setRows(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // สร้างข้อมูลสำหรับกราฟ
  const chartData = rows.map((row) => ({
    name: row.name, // ชื่อพนักงาน
    assignments: row.patient_assignments_count, // สมมติว่า 'workload' คือฟิลด์ที่บ่งบอกจำนวนงาน
  }));

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
          ข้อมูลพนักงาน
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 1000, mt: 4 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>รหัสพนักงาน</TableCell>
                <TableCell>ชื่อพนักงาน</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.staff_code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.staff_code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
        <br />
        {/* แสดงกราฟ */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          จำนวนงานของพนักงาน
        </Typography>
        <BarChart width={700} height={350} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="assignments" fill="#feae02" />
        </BarChart>
      </Box>
    </Container>
  );
}

export default PatientDetailPage;

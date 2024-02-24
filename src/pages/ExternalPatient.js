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
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

function ExternalPatient() {
  const [rows, setRows] = useState([]);
  const [patientChartData, setPatientChartData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(
        "https://patipan-app-api-e82f7762346f.herokuapp.com/patientinformation"
      )
      .then((response) => {
        setRows(response.data);
        const chartData = processChartData(response.data);
        setPatientChartData(chartData);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const processChartData = (data) => {
    const counts = data.reduce((acc, patient) => {
      const type = patient.patient_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map((type) => ({
      name: type,
      value: counts[type],
    }));
  };

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={14}
        ml={14}
      >
        <Typography variant="h4" gutterBottom>
          ข้อมูลผู้ป่วย
        </Typography>
        <TableContainer
          component={Paper}
          elevation={4}
          sx={{ mb: 4, mt: 4, maxWidth: 1000 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>รหัสผู้ป่วย</TableCell>
                {/* <TableCell></TableCell> */}
                <TableCell>เลขบัตรประชาชน</TableCell>
                <TableCell>ชื่อ</TableCell>
                <TableCell>นามสกุล</TableCell>
                <TableCell>วันเกิด</TableCell>
                <TableCell>เพศ</TableCell>
                {/* <TableCell>สัญชาติ</TableCell> */}
                {/* <TableCell>อาชีพ</TableCell> */}
                {/* <TableCell>หมู่เลือด</TableCell> */}
                {/* <TableCell>บันทึกข้อมูลล่าสุด</TableCell> */}
                {/* <TableCell>ผู้รับส่ง</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.hn}
                  </TableCell>
                  <TableCell>{row.cid}</TableCell>
                  <TableCell>{row.fname}</TableCell>
                  <TableCell>{row.lname}</TableCell>
                  <TableCell>{row.birthday}</TableCell>
                  <TableCell>{row.sex}</TableCell>
                  {/* <TableCell>{row.nationality}</TableCell>
                  <TableCell>{row.country}</TableCell> */}
                  {/* <TableCell>{row.occupation}</TableCell> */}
                  {/* <TableCell>{row.bloodgrp}</TableCell> */}
                  {/* <TableCell>{row.birthday}</TableCell> */}
                  {/* <TableCell>{row.rider}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          จำนวนผู้ป่วยภายในและภายนอก
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={patientChartData}
              cx="50%"
              cy="50%"
              outerRadius="60%"
              fill={theme.palette.primary.main}
              label
              labelLine={false}
            >
              {patientChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}

export default ExternalPatient;

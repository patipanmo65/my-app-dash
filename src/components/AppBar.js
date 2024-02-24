import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Content";

function AppBar() {
  return (
    <MuiAppBar position="fixed" sx={{ backgroundColor: "black" }}>
      <Toolbar
        sx={{
          padding: "7px 24px",
          ml: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component={Link}
          to="./Content"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Dashboard
        </Typography>

        {/* ข้อความมุมขวาบน */}
        <Box display="flex" alignItems="center">
          <Typography variant="h5" sx={{ color: "white" }}>
            Data Visualization
          </Typography>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;

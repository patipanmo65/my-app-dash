import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isMobile ? 200 : 250, // ลดขนาดเมื่ออยู่ในโหมดมือถือ
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? 200 : 250, // ลดขนาดเมื่ออยู่ในโหมดมือถือ
          boxSizing: "border-box",
          marginTop: isMobile ? "56px" : "64px", // ปรับ marginTop ให้เหมาะสมกับ AppBar ในโหมดมือถือ
          backgroundColor: "black",
          position: "fixed",
        },
      }}
    >
      <List>
        <br />
        <ListItem button component={Link} to="/data-table">
          <ListItemText primary="ข้อมูลรายการ" sx={{ color: "white", ml: 4 }} />
        </ListItem>
        {/* <ListItem button component={Link} to="/src/components/Content">
          <ListItemText primary="เนื้อหา" sx={{ color: "white" }} />
        </ListItem> */}
        <ListItem button component={Link} to="/chart">
          <ListItemText
            primary="เเสดงข้อมูลกราฟ"
            sx={{ color: "white", ml: 4 }}
          />
        </ListItem>
        <ListItem button component={Link} to="/PatientDetailPage">
          <ListItemText
            primary="เเสดงข้อมูลพนักงาน"
            sx={{ color: "white", ml: 4 }}
          />
        </ListItem>
        <ListItem button component={Link} to="/InternalPatient">
          <ListItemText
            primary="เเสดงข้อมูลเปล"
            sx={{ color: "white", ml: 4 }}
          />
        </ListItem>
        <ListItem button component={Link} to="/ExternalPatient">
          <ListItemText
            primary="เเสดงข้อมูลผู้ป่วย"
            sx={{ color: "white", ml: 4 }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;

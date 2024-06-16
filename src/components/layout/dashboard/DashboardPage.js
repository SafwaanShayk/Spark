import React, { useState } from "react";
import DashSidebar from "./DashSidebar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import DashNavbar from "./DashNavbar";

function DashboardPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <DashNavbar onToggleDrawer={handleDrawerToggle} />
      <div style={{ marginTop: "100px" }}></div>
      <Box sx={{ display: "flex" }}>
        <DashSidebar isOpen={isDrawerOpen} toggleDrawer={handleDrawerToggle} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <Typography paragraph> */}
          <Outlet />
          {/* </Typography> */}
        </Box>
      </Box>
    </>
  );
}

export default DashboardPage;

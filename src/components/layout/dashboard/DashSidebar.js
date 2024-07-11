import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { useLocation, useNavigate } from "react-router-dom";
import { Difference, Inventory, PostAdd } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashSidebar({ isOpen, toggleDrawer }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (path, index) => {
    navigate(path);
    setActiveItem(index);
  };
  useEffect(() => {
    const pathToIndex = {
      comparison: 0,
      "project-form": 1,
      "your-project": 2,
      "buy-project": 3,
      trash: 4,
      spam: 5,
    };
    const currentPath = location.pathname.split("/").pop();
    setActiveItem(pathToIndex[currentPath]);
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isOpen} onClose={toggleDrawer}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "Comparison Framework",
              icon: <Difference />,
              path: "comparison",
            },
            { text: "Add Project", icon: <PostAdd />, path: "project-form" },
            { text: "Your Project", icon: <Inventory />, path: "your-project" },
            {
              text: "Buy Project",
              icon: <LocalMallIcon />,
              path: "buy-project",
            },
            // { text: "Trash", icon: <MailIcon />, path: "trash" },
            // { text: "Spam", icon: <MailIcon />, path: "spam" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isOpen ? "initial" : "center",
                  px: 2,
                  backgroundColor:
                    activeItem === index ? "action.selected" : "inherit",
                }}
                onClick={() => handleItemClick(item.path, index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: isOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Scrollbar from "../../../../../components/scrollbar";
import useResponsive from "../../../../../components/hooks/useResponsive";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { makeStyles } from "@mui/styles";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import clsx from "clsx";

const NAV_WIDTH = 280;
const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));
const useStyles = makeStyles((theme) => ({
  selected: {
    background: "#474bd1",
    borderRadius: 10,
  },
  icon: {
    marginLeft: "auto",
  },
  drawer: {},
  btn: {},
}));
export default function Nav({ openNav, onCloseNav }) {
  const ListData = [
    {
      id: 1,
      title: "Dashboard",
      icon: <DashboardIcon />,
      to: "/admin/dashboard",
    },
    {
      id: 2,
      title: "Manage Events",
      icon: <EventAvailableIcon />,
      to: "/admin/events",
    },
    {
      id: 10,
      title: "Manage News",
      icon: <NewspaperIcon />,
      to: "/admin/news",
    },
    {
      id: 22,
      title: "Manage Blogs",
      icon: <EventAvailableIcon />,
      to: "/admin/blogs",
    },
    {
      id: 122,
      title: "Add Category",
      icon: <EventAvailableIcon />,
      to: "/admin/category",
    },
    {
      id: 33,
      title: "Competetions",
      icon: <EmojiEventsIcon />,
      to: "/admin/competetions",
    },
    {
      id: 3,
      title: "LeaderBoard",
      icon: <LeaderboardIcon />,
      to: "/admin/leaderboard",
    },
    {
      id: 4,
      title: "Order",
      icon: <ShoppingCartIcon />,
      to: "/admin/order",
    },
    {
      id: 44,
      title: "Manage Wiki",
      icon: <ArchitectureIcon />,
      to: "/admin/manage-wiki",
    },
    {
      id: 5,
      title: "Products",
      icon: <Inventory2Icon />,
      // to: "/admin/categories",
    },
    {
      id: 6,
      title: "Sales Report",
      icon: <TimelineIcon />,
      // to: "/admin/vendors",
    },
    {
      id: 7,
      title: "Messages",
      icon: <MessageIcon />,
      // to: "/admin/users",
    },
    {
      id: 8,
      title: "Settings",
      icon: <SettingsIcon />,
      // to: "/admin/new-invoices",
    },
    {
      id: 9,
      title: "Signout",
      icon: <ExitToAppIcon />,
      // to: "/admin/approved-by-admin",
    },
  ];
  const location = useLocation();
  const [dOpen, setDopen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const isDesktop = useResponsive("up", "lg");
  const classes = useStyles();
  React.useEffect(() => {
    const matchingItem = ListData.find((item) => item.to === location.pathname);
    if (matchingItem) {
      setSelectedIndex(matchingItem.id);
    }
  }, [location.pathname]);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setDopen(false);
  };
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const renderContent = (
    <>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "inline-flex",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <img src="/assets/images/log.png" alt="logo" width="55px" />
          <Typography
            variant="h6"
            component="div"
            sx={{ mt: 1.5, fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Architecture
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <List component="nav">
          {ListData.map((val, index) => {
            return (
              <>
                <ListItem
                  key={index}
                  disablePadding
                  className={clsx(classes.root, {
                    [classes.selected]: selectedIndex === val.id,
                  })}
                  component={Link}
                  to={val.to}
                  sx={{ mb: 2 }}
                >
                  <ListItemButton
                    selected={selectedIndex === val.id}
                    onClick={(event) => handleListItemClick(event, val.id)}
                    sx={{
                      "&:hover": {
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selectedIndex === val.id ? "#fff" : "#686868",
                      }}
                    >
                      {val.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={val.title}
                      sx={{
                        color: selectedIndex === val.id ? "#fff" : "#686868",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            );
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
              overflowY: "scroll",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

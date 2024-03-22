import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  TextField,
  Toolbar,
  Typography,
  Stack,
  InputAdornment,
  Button,
  Badge,
  Tooltip,
  Tab,
  Tabs,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import { ExitToApp } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { logOut } from "../../store/actions/adminActions";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import { tabChangeAction } from "../../store/actions/tabChangeActions";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const isAuthenticatedUser = useSelector((state) => state.admin.user);
  // console.log("USER in Header======", isAuthenticatedUser);
  const isAuthenticatedAdmin = useSelector(
    (state) => state.admin.isAuthenticatedAdmin
  );
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  // console.log(isAuthenticatedUser == null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/user/profile");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNews = () => {
    navigate("/news");
  };

  const theme = useTheme();
  const handleLogOut = () => {
    setAnchorEl(null);
    confirmAlert({
      title: "Log Out?",
      message: "Are you sure to want to log out ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(logOut());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setAnchorEl2(null);
  };
  const tabValue = useSelector((state) => state.tab.tabValue);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (name, index) => {
    // setSelectedTab(index);
    dispatch(tabChangeAction(name));
  };

  const navbarMenus = [
    { name: "postsection" },
    { name: "projectsection" },
    { name: "Wiki" },
    { name: "Competitions" },
    { name: "Events" },
    { name: "Blogs" },
    { name: "News" },
  ];

  return (
    <Stack sx={{ flexGrow: 1, pb: 5 }} spacing={4}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "end", px: 8 }}
      >
        <Box></Box>
        {/* logo & Title */}
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "end", gap: -3 }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              position: "relative",
              top: 6,
            }}
          >
            <img
              src="/assets/images/log.png"
              alt={"logo"}
              style={{ height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Architecture
          </Typography>
        </Stack>

        <Stack>
          {" "}
          {isAuthenticatedUser ? (
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.5 }}>
              <Avatar
                sx={{ backgroundColor: "#3E3A57", textTransform: "capitalize" }}
              >
                {isAuthenticatedUser.name[0]}
              </Avatar>
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ color: "#3E3A57" }}
              >
                <MenuItem onClick={handleProfile}>{t("profile")}</MenuItem>
                <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
              </Menu> */}
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleProfile}>{t("profile")}</MenuItem>
                  <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
                </Menu>
              </div>
            </Stack>
          ) : (
            <Button
              variant="contained"
              className="bg-[#3E3A57]"
              sx={{ height: "40px", textTransform: "none" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Stack>
      </Stack>

      <Box
        color="#000"
        sx={{
          ml: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {navbarMenus.map((menu, index) => (
          <Typography
            name={menu.name}
            key={index}
            onClick={() => handleTabChange(menu.name, index)}
            sx={{
              cursor: "pointer",
              color: tabValue === menu.name ? "#00B5E2" : "#000",
              fontWeight: tabValue === menu.name ? 600 : 400,
              fontSize: "18px",
              pr: 0.5,
              mt: 0.5,
            }}
            // onClick={() => console.log(menu.name)}
          >
            {t(menu.name)}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          sx={{ background: "#e2e2e2", width: "500px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Stack>
  );
};

export default Header;

{
  /* <Box
color="#000"
sx={{
  ml: "auto",
  display: "flex",
  flexDirection: "row",
  gap: 3,
}}
>

{navbarMenus.map((menu, index) => (
  <Typography
    name={menu.name}
    key={index}
    onClick={() => handleTabChange(menu.name, index)}
    sx={{
      cursor: "pointer",
      color: selectedTab === index ? "#00B5E2" : "#000",
      fontWeight: selectedTab === index ? 600 : 400,
      fontSize: "18px",
      pr: 0.5,
      mt: 0.5,
    }}
    // onClick={() => console.log(menu.name)}
  >
    {t(menu.name)}
  </Typography>
))}
</Box> */
}

{
  /* <Box sx={{ flexGrow: 1 }}>
  <AppBar
    sx={{ background: theme.palette.primary.main }}
    position="static"
    elevation={0}
  >
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex" }}>
        <img src="/assets/images/log.png" alt="logo" width="55px" />
        <Typography
          variant="h6"
          component="div"
          sx={{
            mt: 1.5,
            fontSize: "1.5rem",
            color: "#3E393C",
            fontWeight: "bold",
          }}
        >
          <p>{t("header")}</p>
        </Typography>
      </Box>
      <Box>
        <TextField
          placeholder={t("search")}
          size="small"
          sx={{
            width: "350px",
            background: "#fff",
          }}
        />
        <Button
          variant="contained"
          className="bg-[#3E3A57]"
          sx={{ height: "40px" }}
        >
          <SearchIcon />
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: !isAuthenticatedUser ? "flex" : "none",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#000" }}>
            <LanguageIcon /> {t("langH")} {t("lang")}
          </Typography>
          <IconButton
            aria-controls="language-menu"
            aria-haspopup="true"
            onClick={handleClick2}
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("ar")}>
              العربی
            </MenuItem>
          </Menu>
        </Box>
 

        {isAuthenticatedUser == null ? (
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/login"
            sx={{ ml: 2 }}
          >
            {t("login")}
          </Button>
        ) : null}
      </Box>
    </Toolbar>
  </AppBar>
  <AppBar position="static" sx={{ bgcolor: "#fff" }} elevation={5}>
    <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
      {!(isAuthenticatedUser == null) ? (
        <>
          <Box>
            <Typography
              fontSize={16}
              ml={2}
              display="inline"
              sx={{ color: "#000", fontWeight: "bold" }}
            >
              {t("addPost")}
            </Typography>
            <IconButton sx={{ mr: 1 }} component={Link} to="/add-post">
              <Tooltip title={t("addPost")}>
                <AddCircleIcon />
              </Tooltip>
            </IconButton>
            <IconButton sx={{ mr: 2 }} component={Link} to="/messages">
              <Badge badgeContent={13} color="custom">
                <Tooltip title={t("msgs")}>
                  <ChatIcon
                    sx={{
                      color: "#fff",
                      fontSize: "30px",
                    }}
                  />
                </Tooltip>
              </Badge>
            </IconButton>
          </Box>
          <Box
            color="#000"
            sx={{
              ml: "auto",
              display: "flex",
              flexDirection: "row",
              gap: 3,
            }}
          >
            {navbarMenus.map((menu, index) => (
              <Typography
                name={menu.name}
                key={index}
                onClick={() => handleTabChange(menu.name, index)}
                sx={{
                  cursor: "pointer",
                  color: selectedTab === index ? "#00B5E2" : "#000",
                  fontWeight: selectedTab === index ? 600 : 400,
                  fontSize: "18px",
                  pr: 0.5,
                  mt: 0.5,
                }}
                // onClick={() => console.log(menu.name)}
              >
                {t(menu.name)}
              </Typography>
            ))}
          </Box>
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#000" }}>
              <LanguageIcon /> {t("langH")} {t("lang")}
            </Typography>
            <IconButton
              aria-controls="language-menu"
              aria-haspopup="true"
              onClick={handleClick2}
            >
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl2}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleLanguageChange("en")}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("ar")}>
                العربی
              </MenuItem>
            </Menu>
            <Avatar
              src="/assets/images/user.png"
              sx={{ cursor: "pointer" }}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2 }}
              component={Link}
              to={isAuthenticatedAdmin ? "/admin/dashboard" : "/user/dashboard"}
            >
              {t("dash")}
            </Button>
          </Box>
        </>
      ) : null}
      {!isAuthenticatedUser && (
        <Tabs
          value={selectedTab}
          textColor="primary"
          indicatorColor="primary"
          centered
          onChange={handleTabChange}
        >
          <Tab label={t("postSection")} selected={selectedTab === 0} />
          <Tab label={t("projectsection")} selected={selectedTab === 1} />
          <Tab label="Wiki" selected={selectedTab === 2} />
          <Tab label="Competetions" selected={selectedTab === 3} />
          <Tab label="Events" selected={selectedTab === 4} />
          <Tab label="Blocks" selected={selectedTab === 5} />
          <Tab label="News" selected={selectedTab === 6} />
        </Tabs>
      )}
    </Toolbar>
  </AppBar>
  <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      "aria-labelledby": "basic-button",
    }}
  >
    <MenuItem onClick={handleProfile}>{t("profile")}</MenuItem>
    <MenuItem onClick={handleLogOut}>{t("logout")}</MenuItem>
  </Menu>
</Box>; */
}

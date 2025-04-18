import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemText, styled } from "@mui/material";

const NavLink = styled(Link)(({ theme, active }) => ({
  display: "block",
  padding: "6px 16px",
  textDecoration: "none",
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: active ? 500 : 400,
  borderLeft: active ? `2px solid ${theme.palette.error.main}` : "none",
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const SettingsSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/settings/profile", label: "Profile Information" },
    { path: "/settings/account", label: "Account" },
    { path: "/settings/display", label: "Display" },
    { path: "/messages",          label: "Messages" }, 
    { path: "#logout", label: "Log Out", isLogout: true },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ width: 224 }}>
      <List sx={{ padding: 0 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
            {item.isLogout ? (
              <Box
                onClick={handleLogout}
                sx={{
                  cursor: "pointer",
                  padding: "6px 16px",
                  color: "error.main",
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                />
              </Box>
            ) : (
              <NavLink
                to={item.path}
                active={
                  pathname === item.path ||
                  (item.path === "/settings/account" &&
                    pathname === "/settings/reset-password")
                    ? 1
                    : 0
                }
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                />
              </NavLink>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsSidebar;

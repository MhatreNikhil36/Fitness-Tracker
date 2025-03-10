import { Link, useLocation } from "react-router-dom";
import { Box, List, ListItem, ListItemText, styled } from "@mui/material";

// Styled component for the navigation links
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

  const navItems = [
    { path: "/settings/profile", label: "Profile Information" },
    { path: "/settings/account", label: "Account" },
    { path: "/settings/display", label: "Display" },
  ];

  return (
    <Box sx={{ width: 224 }}>
      <List sx={{ padding: 0 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <NavLink to={item.path} active={pathname === item.path ? 1 : 0}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                }}
              />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsSidebar;

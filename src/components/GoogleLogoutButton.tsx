// src/components/GoogleLogoutButton.tsx
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../slices/store";
import { clearUser } from "../slices/userSlice";

const GoogleLogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("activeUser");
    localStorage.removeItem("todos");
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <Button
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        borderRadius: 999,
        px: 2.5,
        py: 0.7,
        background: "linear-gradient(90deg, #f8bbd0 0%, #e1bee7 100%)",
        textTransform: "none",
        color: "#3c2a3d",
        fontWeight: 600,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
        "&:hover": {
          background: "linear-gradient(90deg, #f48fb1 0%, #ce93d8 100%)",
        },
      }}
    >
      Logga ut
    </Button>
  );
};

export default GoogleLogoutButton;

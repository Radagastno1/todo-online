import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import GoogleLogoutButton from "./components/GoogleLogoutButton";
import { useAppSelector } from "./slices/store";

const RootLayout = () => {
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        m: 0,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#3c2a3d",
          borderBottom: "1px solid rgba(255, 192, 203, 0.4)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1100,
            mx: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#f48fb1",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              T
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: 600,
                }}
              >
                Todo-Online
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 11, md: 12 },
                  color: "text.secondary",
                }}
              >
                Din rosa kom-ihåg-kompis 💗
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
            }}
          >
            {activeUser && (
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  color: "text.secondary",
                  maxWidth: 160,
                  textAlign: "right",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Inloggad som{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: 600, color: "#3c2a3d" }}
                >
                  {activeUser.name}
                </Typography>
              </Typography>
            )}
            <GoogleLogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          background:
            "linear-gradient(135deg, #ffe4f0 0%, #e3f2fd 40%, #fff7e6 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          py: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            px: { xs: 2, md: 0 },
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 1.5,
          textAlign: "center",
          fontSize: 12,
          color: "rgba(60,42,61,0.6)",
          bgcolor: "rgba(255,255,255,0.9)",
          borderTop: "1px solid rgba(255, 192, 203, 0.3)",
        }}
      >
        Todo-Online • Gjord med kaffe & pasteller ☕💖
      </Box>
    </Box>
  );
};

export default RootLayout;

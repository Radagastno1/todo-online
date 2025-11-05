import { Box, Paper, Typography } from "@mui/material";
import GoogleLoginButton from "./components/GoogleLoginButton";

const LogIn = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, #ffe4f0 0%, #e3f2fd 40%, #fff7e6 100%)",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          px: { xs: 3, md: 4 },
          py: { xs: 4, md: 5 },
          textAlign: "center",
          bgcolor: "rgba(255,255,255,0.95)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#3c2a3d",
            fontSize: { xs: 24, md: 28 },
          }}
        >
          Välkommen till Todo-Online
        </Typography>
        <Typography
          sx={{
            mb: 3,
            fontSize: 14,
            color: "rgba(60,42,61,0.8)",
          }}
        >
          Samla alla dina “måsten” på ett ställe och bocka av dem med stil.
        </Typography>

        <GoogleLoginButton />
      </Paper>
    </Box>
  );
};

export default LogIn;

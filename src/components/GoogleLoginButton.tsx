// src/components/GoogleLoginButton.tsx
import { Box, Typography } from "@mui/material";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../slices/store";
import { User, addUserAsync } from "../slices/userSlice";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      const userInfo = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${response.credential}`
      ).then((res) => res.json());

      if (userInfo.error) {
        console.error("Error verifying token: ", userInfo.error_description);
        return;
      }

      const user: User = {
        accountId: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
      };

      dispatch(addUserAsync(user));
      navigate("/todo");
    }
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          useOneTap
        />

        <Typography
          variant="caption"
          sx={{
            color: "rgba(60,42,61,0.6)",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Vi använder Google-inloggning för att spara dina todos säkert.
        </Typography>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

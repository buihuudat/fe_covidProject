import { Box, Container, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { bgAuth, gifAuth } from "../resources/images";
import authUtils from "../utils/authUtils";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(0);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        setIsLoading(false);
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        pt: 15,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={3}
      >
        <img
          src={gifAuth}
          alt="gif"
          style={{ width: 100, ml: "auto", mr: "auto" }}
        />
        <img src={bgAuth} alt="bg" style={{ width: 500 }} />
      </Box>
      <Box>
        <Typography align="center" fontWeight={"bold"} fontSize={30}>
          {pathname === "/dang-nhap" ? "Đăng nhập" : "Đăng Ký tài khoản"}
        </Typography>
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;

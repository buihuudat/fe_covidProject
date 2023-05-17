import { Box, LinearProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import authUtils from "../utils/authUtils";
import { useDispatch } from "react-redux";
import { setUserSlice } from "../hooks/userSlice";

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (user) {
        setIsLoading(false);
        dispatch(setUserSlice(user));
      } else {
        navigate("/dang-nhap");
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Navbar />
      <Box mt={10}>
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;

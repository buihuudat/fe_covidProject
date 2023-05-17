import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import PrevetionPage from "./pages/PrevetionPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="dang-nhap" element={<LoginPage />} />
          <Route path="dang-ky" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route index path="phong-chong" element={<PrevetionPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;

import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authApi } from "../../apis/authApi";
import { useDispatch } from "react-redux";

import setUserSlice from "../../hooks/userSlice";
import { useNavigate } from "react-router-dom";
import { notification } from "../../components/notifi";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneErr, setPhoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      phone: formData.get("phone").trim(),
      password: formData.get("password").trim(),
    };

    setPhoneErr("");
    setPasswordErr("");
    setIsLoading(true);

    try {
      const res = await authApi.login(data);
      notification("success", "Đăng nhập thành công");
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      const errors = err?.data?.errors;
      errors &&
        errors.forEach((err) => {
          switch (err.param) {
            case "phone":
              setPhoneErr(err.msg);
              break;
            case "password":
              setPasswordErr(err.msg);
              break;
            default:
              break;
          }
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      component={"form"}
      onSubmit={handleSubmit}
      sx={{ minWidth: 400, mt: 10 }}
    >
      <TextField
        label="Số điện thoại"
        margin="normal"
        name="phone"
        error={phoneErr !== ""}
        helperText={phoneErr}
        required
      />
      <TextField
        label="Mật khẩu"
        margin="normal"
        name="password"
        error={passwordErr !== ""}
        helperText={passwordErr}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton
        loading={isLoading}
        sx={{ my: 1 }}
        variant="contained"
        type="submit"
      >
        Đăng nhập
      </LoadingButton>
      <Typography>
        Đã có tài khoản?
        <Link href="/dang-ky"> Đăng ký ngay!</Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;

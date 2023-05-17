import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { authApi } from "../../apis/authApi";

import { useNavigate } from "react-router-dom";
import { notification } from "../../components/notifi";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sex, setSex] = useState("male");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      fullName: {
        firstName: formData.get("firstName").trim(),
        lastName: formData.get("lastName").trim(),
      },
      email: formData.get("email").trim(),
      phone: formData.get("phone").trim(),
      password: formData.get("password").trim(),
      confirmPassword: formData.get("confirmPassword").trim(),
      sex,
    };

    let error = false;

    if (data.fullName.firstName.length < 2) {
      setFirstNameErr("Họ không hợp lệ");
      error = true;
    }
    if (data.fullName.lastName.length < 2) {
      setLastNameErr("Tên không hợp lệ");
      error = true;
    }
    if (data.phone.length < 10) {
      setPhoneErr("Số điện thoại không hợp lệ");
      error = true;
    }

    if (data.password.length < 8) {
      setPasswordErr("Mật khẩu yêu cầu tối thiểu 8 ký tự");
      error = true;
    }

    if (data.password !== data.confirmPassword) {
      setConfirmPasswordErr("Mật khẩu không khớp");
      error = true;
    }

    if (error) return;

    setFirstNameErr("");
    setLastNameErr("");
    setEmailErr("");
    setPhoneErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");
    setIsLoading(true);
    try {
      const res = await authApi.register(data);
      notification("success", "Đăng ký thành công");
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      const errors = err?.data?.erros;
      errors &&
        errors.forEach((err) => {
          switch (err.param) {
            case "firstName":
              setFirstNameErr(err.msg);
              break;
            case "lastName":
              setLastNameErr(err.msg);
              break;
            case "email":
              setEmailErr(err.msg);
              break;
            case "phone":
              setPhoneErr(err.msg);
              break;
            case "password":
              passwordErr(err.msg);
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
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Box my={1} display={"flex"} gap={1}>
        <TextField
          label="Họ"
          error={firstNameErr !== ""}
          helperText={firstNameErr}
          name="firstName"
        />
        <TextField
          label="Tên"
          error={lastNameErr !== ""}
          helperText={lastNameErr}
          name="lastName"
        />
      </Box>
      <TextField
        label="Số điện thoại"
        margin="normal"
        name="phone"
        error={phoneErr !== ""}
        helperText={phoneErr}
        required
      />
      <TextField
        label="Email"
        margin="normal"
        name="email"
        error={emailErr !== ""}
        helperText={emailErr}
        type="email"
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
      <TextField
        label="Nhập lại mật khẩu"
        margin="normal"
        name="confirmPassword"
        error={confirmPasswordErr !== ""}
        helperText={confirmPasswordErr}
        type={showConfirmPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowConfirmPassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Giới tính</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="male"
          name="radio-buttons-group"
          onChange={(e) => setSex(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Nam" />
          <FormControlLabel value="female" control={<Radio />} label="Nữ" />
          <FormControlLabel value="other" control={<Radio />} label="Khác" />
        </RadioGroup>
      </FormControl>
      <LoadingButton
        loading={isLoading}
        sx={{ my: 1 }}
        variant="contained"
        type="submit"
      >
        Đăng ký
      </LoadingButton>
      <Button sx={{ my: 1 }} variant="outlined" color="warning" type="reset">
        Reset
      </Button>
      <Typography>
        Chưa có tài khoản?
        <Link href="/dang-nhap"> Đăng nhập ngay!</Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;

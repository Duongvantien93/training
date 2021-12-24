import { Container, Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import StorageKeys from "../../service/contants";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginApi } from "../../service/api";
import { ILogin } from "../../types/type";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";

export default function Login({
  setLogin,
}: {
  setLogin: Dispatch<SetStateAction<boolean>>;
}) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: ILogin) => {
      mutate(values);
    },
    validate: () => {},
  });
  let history = useHistory();
  const { mutate, isLoading } = useMutation(loginApi.login, {
    onSuccess: (data: any) => {
      let token = data.access_token;
      localStorage.setItem(StorageKeys.TOKEN, token);
      setLogin(true);
      history.push("/");
    },
    onError: () => {
      alert("there was an error");
    },
  });
  return (
    <Container>
      <Box>
        <h3>Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            size="small"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            fullWidth
            size="small"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

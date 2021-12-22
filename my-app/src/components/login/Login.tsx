import { Container, Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { connect, ConnectedProps } from "react-redux";
import { loginRequestAction } from "../../redux/actions";
import { RootState } from "../../reducers";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ILogin } from "../../types/type";

interface LoginProps extends PropsFromRedux {
  login: boolean;
}
function Login({ login, loginRequestAction }: LoginProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: ILogin) => {
      console.log("login::::", values);
      loginRequestAction();
    },
    validate: () => {},
  });
  let history = useHistory();
  useEffect(() => {
    if (login) history.push("/");
  }, [login, history]);
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
const connector = connect(
  (state: RootState) => {
    return {
      login: state.trucks.login,
    };
  },
  {
    loginRequestAction,
  }
);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);

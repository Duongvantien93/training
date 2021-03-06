import { Container, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import StorageKeys from "../../service/constants";
import { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import { ILogin } from "../../types/type";
import FormikTextField from "../../components/formikTextField/formikTextField";
import * as Yup from "yup";
import useLogin from "./useLogin";

const ValidateForm = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "example: example@email.com"
    ),
  password: Yup.string().required("Required"),
});

const Login = ({
  setLogin,
  handleOpenAlert,
}: {
  setLogin: Dispatch<SetStateAction<boolean>>;
  handleOpenAlert: (message: string) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: ILogin) => {
      mutate(values);
    },
    validationSchema: ValidateForm,
  });
  let history = useHistory();
  const onSuccess = (data: any) => {
    let token = data["access_token"];
    let user = data["userResponse"];
    localStorage.setItem(StorageKeys.TOKEN, token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
    setLogin(true);
    history.push("/truck");
    handleOpenAlert("Login success");
  };
  const onError = (message: string) => {
    handleOpenAlert("Error");
  };
  const { mutate } = useLogin(onSuccess, onError);
  return (
    <Container>
      <Box className="box-login">
        <h3>Login</h3>
        <form onSubmit={formik.handleSubmit}>
          <FormikTextField
            type="input"
            name="email"
            value={formik.values.email}
            handleOnChange={formik.handleChange}
            touched={formik.touched.email}
            error={formik.errors.email}
          />

          <FormikTextField
            type="password"
            name="password"
            value={formik.values.password}
            handleOnChange={formik.handleChange}
            touched={formik.touched.password}
            error={formik.errors.password}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default Login;

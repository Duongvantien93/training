import { Container, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import StorageKeys from "../../service/contants";
import { Dispatch, SetStateAction, useState } from "react";
import { useHistory } from "react-router-dom";
import { loginApi } from "../../service/api";
import { ILogin } from "../../types/type";
import { useMutation } from "react-query";
import FormikTextField from "../../components/formikTextField/formikTextField";
import * as Yup from "yup";

const ValidateForm = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "example: example@email.com"
    ),
  password: Yup.string().required("Required"),
});

export default function Login({
  setLogin,
}: {
  setLogin: Dispatch<SetStateAction<boolean>>;
}) {
  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: ILogin) => {
      setUser({ ...values });
      mutate(values);
    },
    validationSchema: ValidateForm,
  });
  let history = useHistory();
  const { mutate, isLoading } = useMutation(loginApi.login, {
    onSuccess: (data: any) => {
      let token = data.access_token;
      localStorage.setItem(StorageKeys.TOKEN, token);
      localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
      setLogin(true);
      history.push("/");
    },
  });
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
            listValues={[]}
            multi={false}
            touched={formik.touched}
            error={formik.errors}
          />

          <FormikTextField
            type="password"
            name="password"
            value={formik.values.password}
            handleOnChange={formik.handleChange}
            listValues={[]}
            multi={false}
            touched={formik.touched}
            error={formik.errors}
          />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}
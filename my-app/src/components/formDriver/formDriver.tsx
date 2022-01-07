import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormikTextField from "../formikTextField/formikTextField";
import { useFormik } from "formik";
import { IDriver, IField } from "../../types/type";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { fieldDriver } from "./fieldDriver";

const ValidateForm = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});
interface IProps {
  title: string;
  handleSubmitForm: (values: IDriver) => void;
  handleOpenDialog?: (open: boolean) => void;
  initialValues: IDriver;
}
const FormDriver = ({
  title,
  handleSubmitForm,
  handleOpenDialog,
  initialValues,
}: IProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: IDriver) => {
      handleSubmitForm(values);
    },
    validationSchema: ValidateForm,
  });
  return (
    <Container>
      <h3>Driver {title}</h3>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {fieldDriver.map((item: IField) => {
            let name = item.name as keyof IDriver;
            return (
              <FormikTextField
                key={item.name}
                {...item}
                handleOnChange={formik.handleChange}
                value={formik.values[name]}
                touched={formik.touched[name]}
                error={formik.errors[name]}
              />
            );
          })}
          <Grid item xs={12}>
            <Button type="submit" color="primary" variant="outlined">
              {title === "update" ? "update" : "add"}
            </Button>
            &nbsp;
            {title === "update" && handleOpenDialog && (
              <Button
                onClick={() => handleOpenDialog(true)}
                color="primary"
                variant="contained"
              >
                delete
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
export default FormDriver;

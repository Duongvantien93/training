import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormikTextField from "../formikTextField/formikTextField";
import { useFormik } from "formik";
import { IDriver } from "../../types/type";
import Button from "@mui/material/Button";
import * as Yup from "yup";

interface IFieldTruck {
  name: string;
  type: string;
  multi: boolean;
}
const ValidateForm = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
export default function FormDriver({
  field,
  title,
  handleSubmitForm,
  type,
  handleOpenDialog,
  initialValues,
}: {
  field: IFieldTruck[];
  title: string;
  handleSubmitForm: (values: any) => void;
  type: string;
  handleOpenDialog: (open: boolean) => void;
  initialValues: IDriver;
}) {
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
          {field &&
            field.map((item: IFieldTruck) => {
              let name = item.name as keyof IDriver;
              return (
                <FormikTextField
                  key={item.name}
                  {...item}
                  handleOnChange={formik.handleChange}
                  value={formik.values[name]}
                  listValues={[]}
                  touched={formik.touched}
                  error={formik.errors}
                />
              );
            })}
          <Grid item xs={12}>
            <Button type="submit" color="primary" variant="outlined">
              {title === "update" ? "update" : "add"}
            </Button>
            &nbsp;
            {title === "update" && (
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
}

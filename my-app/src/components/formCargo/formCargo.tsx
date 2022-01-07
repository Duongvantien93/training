import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormikTextField from "../formikTextField/formikTextField";
import { useFormik } from "formik";
import { ICargo, IField } from "../../types/type";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { fieldCargo } from "./fieldCargo";

const ValidateForm = Yup.object().shape({
  name: Yup.string().required("Required"),
});
interface IProps {
  title: string;
  handleSubmitForm: (values: ICargo) => void;
  handleOpenDialog?: (open: boolean) => void;
  initialValues: ICargo;
}
const FormCargo = ({
  title,
  handleSubmitForm,
  handleOpenDialog,
  initialValues,
}: IProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: ICargo) => {
      handleSubmitForm(values);
    },
    validationSchema: ValidateForm,
  });
  return (
    <Container>
      <h3>Cargo {title}</h3>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {fieldCargo.map((item: IField) => {
            let name = item.name as keyof ICargo;
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
export default FormCargo;

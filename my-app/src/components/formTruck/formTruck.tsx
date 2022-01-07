import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormikTextField from "../formikTextField/formikTextField";
import { useFormik } from "formik";
import { ITruck, IField, IListValue } from "../../types/type";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import AutocompleteField from "../autocompleteField/autocompleteField";
import { fieldTruck } from "./fieldTruck";
import YearPicker from "../yearPicker/yearPicker";

const ValidateForm = Yup.object().shape({
  truck_plate: Yup.string()
    .required("Required")
    .matches(
      /^[0-9]{2}[a-z|A-Z]{1}[0-9]{1}-[0-9]{4,5}$/,
      "Is not in correct format, example: 30A-12345"
    ),
  cargos: Yup.array().min(1, "Required").max(10, "Too Long!"),
  driver: Yup.object().required("Required"),
  address: Yup.string().required("Required").max(200, "Too long!"),
});

interface IProps {
  title: string;
  handleSubmitForm: (values: ITruck) => void;
  handleOpenDialog?: (open: boolean) => void;
  initialValues: ITruck;
  listValues: IListValue;
}
const FormTruck = ({
  title,
  handleSubmitForm,
  handleOpenDialog,
  initialValues,
  listValues,
}: IProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: ITruck) => {
      handleSubmitForm(values);
    },
    validationSchema: ValidateForm,
  });
  return (
    <Container>
      <h3>Truck {title}</h3>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {fieldTruck.map((item: IField) => {
            let name = item.name as keyof ITruck;
            if (item.type === "select") {
              let keyofListValue = item.name as keyof IListValue;
              return (
                <AutocompleteField
                  key={item.name}
                  {...item}
                  handleOnChange={formik.handleChange}
                  setValue={formik.setFieldValue}
                  value={formik.values[name]}
                  listValues={listValues[keyofListValue]}
                  touched={formik.touched[name]}
                  error={formik.errors[name]}
                />
              );
            }
            if (item.type === "date") {
              return (
                <YearPicker
                  key={item.name}
                  {...item}
                  handleOnChange={formik.handleChange}
                  setValue={formik.setFieldValue}
                  value={formik.values[name]}
                  touched={formik.touched[name]}
                  error={formik.errors[name]}
                />
              );
            }
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
      </form>
    </Container>
  );
};
export default FormTruck;

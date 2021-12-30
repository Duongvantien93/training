import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormikTextField from "../formikTextField/formikTextField";
import { useFormik } from "formik";
import { useQuery, UseQueryResult } from "react-query";
import { cargosApi, driversApi } from "../../service/api";
import { IDriver, ITruck, ICargo } from "../../types/type";
import Button from "@mui/material/Button";
import * as Yup from "yup";

interface IFieldTruck {
  name: string;
  type: string;
  multi: boolean;
}
const ValidateForm = Yup.object().shape({
  truck_plate: Yup.string()
    .required("Required")
    .matches(
      /^[0-9]{2}[a-z|A-Z]{1}-[0-9]{4,5}$/,
      "Is not in correct format, example: 30A-12345"
    ),
  cargos: Yup.array().min(1, "Required").max(10, "Too Long!"),
  driver: Yup.object().required("Required"),
  address: Yup.string().required("Required").max(200, "Too long!"),
});
export default function FormTruck({
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
  initialValues: ITruck;
}) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values: any) => {
      handleSubmitForm(values);
    },
    validationSchema: ValidateForm,
  });
  let status = [
    { id: "1", status: "New" },
    { id: "2", status: "In - Used" },
  ];
  const { data: driver, isLoading: driverLoading }: UseQueryResult<IDriver[]> =
    useQuery("driver", driversApi.getListDrivers, {
      enabled: type === "truck",
    });
  const { data: cargos, isLoading: cargosLoading }: UseQueryResult<ICargo[]> =
    useQuery("cargos", cargosApi.getListCargos, {
      enabled: type === "truck",
    });
  if (cargosLoading || driverLoading) return <span>Loading...</span>;
  let listValues: any = { driver, cargos, status };
  return (
    <Container>
      <h3>Truck {title}</h3>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {field &&
            field.map((item: IFieldTruck) => {
              let name = item.name as keyof ITruck;
              return (
                <FormikTextField
                  key={item.name}
                  {...item}
                  handleOnChange={formik.handleChange}
                  value={formik.values[name]}
                  listValues={
                    item.type === "select" ? listValues[item.name] : []
                  }
                  touched={formik.touched}
                  error={formik.errors}
                />
              );
            })}
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
      </form>
    </Container>
  );
}

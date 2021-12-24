import { Container, Grid, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { trucksApi } from "../../service/api";
import { ICargo, IDriver, ITruck } from "../../types/type";

export default function NewTruck() {
  const [truck, setTruck] = useState<ITruck>({
    id: "",
    plate: "",
    cargos: [],
    driver: "",
    truck_type: "",
    price: 0,
    dimension: "",
    address: "",
    production_year: 0,
    status: "",
    description: "",
  });
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  let history = useHistory();
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: truck,
    onSubmit: (values: any) => {
      addNewTruck(values);
      history.push("/");
    },
    validate: () => {},
  });
  let queryClient = useQueryClient();
  const listDrivers: IDriver[] | undefined = queryClient.getQueryData("driver");
  const listCargos: ICargo[] | undefined = queryClient.getQueryData("cargos");
  const { mutate: addNewTruck } = useMutation(trucksApi.addNewTruck, {
    onSuccess: (data: any) => {
      console.log("add new", data);
    },
  });
  console.log(123);
  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>Add new truck</h3>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Truck plate :</InputLabel>
            <TextField
              size="small"
              name="plate"
              value={formik.values.plate}
              onChange={formik.handleChange}
            />
            <InputLabel>Cargos :</InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="cargo"
              multiple
              value={personName}
              onChange={handleChange}
            >
              {listCargos &&
                listCargos.length > 0 &&
                listCargos.map((item: any) => (
                  <MenuItem key={item.id} value={item.cargo}>
                    {item.cargo}
                  </MenuItem>
                ))}
            </Select>
            <InputLabel>Driver :</InputLabel>
            <Select
              fullWidth
              size="small"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="driver"
              value={formik.values.driver}
              onChange={formik.handleChange}
            >
              {listDrivers &&
                listDrivers.length > 0 &&
                listDrivers.map((item: any) => (
                  <MenuItem key={item.id} value={item.driver}>
                    {item.driver}
                  </MenuItem>
                ))}
            </Select>
            <InputLabel>Truck type :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="truck_type"
              value={formik.values.truck_type}
              onChange={formik.handleChange}
            />
            <InputLabel>Price :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Dimension :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="dimension"
              value={formik.values.dimension}
              onChange={formik.handleChange}
            />
            <InputLabel>Parking Address :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <InputLabel>Production Year :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="production_year"
              value={formik.values.production_year}
              onChange={formik.handleChange}
            />
            <InputLabel>Status :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            />
            <InputLabel>Description :</InputLabel>
            <TextField
              fullWidth
              size="small"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Grid>
          &nbsp;
        </Grid>
        <Button type="submit" color="primary" variant="outlined">
          save
        </Button>
      </Container>
    </form>
  );
}

import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { getTruckById } from "../../redux/api";
import { useQuery } from "react-query";
import { useEffect, useLayoutEffect, useState } from "react";

export function TruckDetail() {
  let { id }: { id: string } = useParams();
  const [truck, setTruck] = useState({
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
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: truck,
    onSubmit: (values: any) => {
      console.log("login::::", values);
    },
    validate: () => {},
  });
  const { data, isLoading, isError } = useQuery(["truckById", id], () =>
    getTruckById(id)
  );
  useEffect(() => {
    if (data) setTruck(data);
  }, [data]);
  if (isLoading) {
    return <span>Loading.......</span>;
  }
  if (isError) {
    return <span>Error.......</span>;
  }
  return (
    <Container>
      <Box sx={{ width: 500, margin: "auto" }}>
        <form>
          {id && (
            <Box>
              <InputLabel>Id</InputLabel>
              <TextField
                size="small"
                name="id"
                value={formik.values.id}
                disabled
                onChange={formik.handleChange}
              />
            </Box>
          )}

          <InputLabel>Cargos :</InputLabel>
          <Select
            fullWidth
            size="small"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            name="cargo"
            multiple
            value={formik.values.cargos}
            onChange={formik.handleChange}
            input={<OutlinedInput label="Cargo" />}
            // MenuProps={MenuProps}
          >
            {/* {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem> */}
            {/* ))} */}
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
            input={<OutlinedInput label="Driver" />}
            // MenuProps={MenuProps}
          >
            {/* {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem> */}
            {/* ))} */}
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
        </form>
      </Box>
    </Container>
  );
}

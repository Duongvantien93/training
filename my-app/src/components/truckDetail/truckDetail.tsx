import { Container, Box, Grid, makeStyles } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { useEffect, useState } from "react";
import { trucksApi } from "../../service/api";
import { IDriver, ITruck, ICargo } from "../../types/type";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogDeleteItem from "../common/dialog";

export default function TruckDetail() {
  let { id }: { id: string } = useParams();
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
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
  };
  let history = useHistory();
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: truck,
    onSubmit: (values: any) => {
      values.cargos = personName;
      updateTruck(values);
      history.push("/");
    },
    validate: () => {},
  });
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };
  let queryClient = useQueryClient();
  const listDrivers: IDriver[] | undefined = queryClient.getQueryData("driver");
  const listCargos: ICargo[] | undefined = queryClient.getQueryData("cargos");
  const { data, isLoading, isError }: UseQueryResult<ITruck> = useQuery(
    ["truckById", id],
    () => trucksApi.getTruckById(id)
  );
  const { mutate: updateTruck } = useMutation(trucksApi.updateTruck, {
    onSuccess: (data: any) => {
      console.log("updateData", data);
    },
  });
  const { mutate: deleteTruck } = useMutation(trucksApi.deleteTruck, {
    onSuccess: (data: any) => {
      history.push("/");
      console.log("delete", data);
    },
  });
  useEffect(() => {
    if (data) {
      setTruck(data);
      setPersonName(data.cargos);
    }
  }, [data]);
  if (isLoading) {
    return <span>Loading.......</span>;
  }
  if (isError) {
    return <span>Error.......</span>;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>Truck detail</h3>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Truck plate :</InputLabel>
            <TextField
              size="small"
              name="plate"
              value={formik.values.plate}
              disabled
              onChange={handleChange}
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
          update
        </Button>
        &nbsp;
        <Button
          onClick={() => handleOpenDialog(true)}
          color="primary"
          variant="contained"
        >
          delete
        </Button>
        <DialogDeleteItem
          id={id}
          handleDeleteItem={deleteTruck}
          handleOpenDialog={handleOpenDialog}
          openDialog={openDialog}
          title={"Truck"}
        />
      </Container>
    </form>
  );
}

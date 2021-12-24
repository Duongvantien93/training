import { QueryClient, useQuery, UseQueryResult } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { cargosApi, driversApi, trucksApi } from "../../service/api";
import { ICargo, IDriver, ITruck } from "../../types/type";
import { Container, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    margin: "10px 0 10px 0",
  },
  row: {
    "& th": {
      fontWeight: "bold",
      padding: "0px",
    },
  },
});

export default function Home() {
  const {
    isLoading,
    data,
    error,
  }: UseQueryResult<ITruck[], { status: string; message: string }> = useQuery(
    "trucks",
    trucksApi.getListTrucks
  );
  const { data: listDriver }: UseQueryResult<IDriver[]> = useQuery(
    "driver",
    driversApi.getListDrivers
  );
  const { data: listCargos }: UseQueryResult<ICargo[]> = useQuery(
    "cargos",
    cargosApi.getListCargos
  );
  const classes = useStyles();
  let history = useHistory();
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) return <span>An error has occurred: {error.message}</span>;
  return (
    <Container>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/truck/newTruck")}
      >
        Add new
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.row}>
              <TableCell>Truck plate</TableCell>
              <TableCell align="center">Cargo type</TableCell>
              <TableCell align="center">Driver</TableCell>
              <TableCell align="center">Truck type</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Dimension</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Production year</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data.map((item: any) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => history.push(`/truck/${item.id}`)}
                >
                  <TableCell component="th" scope="row">
                    {item.plate}
                  </TableCell>
                  <TableCell align="center">
                    {item.cargos.map((item: string) => (
                      <span>{item}, </span>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item.driver}</TableCell>
                  <TableCell align="center">{item.truck_type}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.dimension}</TableCell>
                  <TableCell align="center">{item.address}</TableCell>
                  <TableCell align="center">{item.production_year}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

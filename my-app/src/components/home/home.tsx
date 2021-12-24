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

  let history = useHistory();
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) return <span>An error has occurred: {error.message}</span>;
  return (
    <Container>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/truck/newTruck")}
      >
        Add new
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Truck plate</TableCell>
              <TableCell align="right">Cargo type</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="right">Truck type</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell>Dimension</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Production year</TableCell>
              <TableCell align="right">Status</TableCell>
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
                  <TableCell align="right">
                    {item.cargos.map((item: string) => (
                      <span>{item}, </span>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.driver}</TableCell>
                  <TableCell align="right">{item.truck_type}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.dimension}</TableCell>
                  <TableCell align="right">{item.address}</TableCell>
                  <TableCell align="right">{item.production_year}</TableCell>
                  <TableCell align="right">{item.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

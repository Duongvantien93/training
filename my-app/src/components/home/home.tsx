import { useQueries, useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getListCargos, getListDrivers, getListTrucks } from "../../redux/api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getListCargosAndDriver } from "../../redux/actions";

export default function Home() {
  const { isLoading, isError, data } = useQuery("trucks", getListTrucks);
  const result = useQueries([
    { queryKey: "trucks", queryFn: getListTrucks },
    { queryKey: "cargos", queryFn: getListCargos },
    { queryKey: "driver", queryFn: getListDrivers },
  ]);
  const dispatch = useDispatch();

  let history = useHistory();
  useEffect(() => {
    dispatch(getListCargosAndDriver(result[1], result[2]));
  }, []);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Some thing went wrong...</span>;
  }
  return (
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
                <TableCell align="right"></TableCell>
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
  );
}

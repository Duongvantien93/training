import { useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowTable from "./RowTable";
import { useState } from "react";

export default function Cargo() {
  let abc = [
    {
      id: 1,
      cargo: "computer",
    },
    {
      id: 2,
      cargo: "vegetables",
    },
    {
      id: 3,
      cargo: "Telephone",
    },
  ];
  const [openForm, setOpenForm] = useState<string | null>(null);
  function openFormEdit(id: string) {
    if (id === openForm) {
      setOpenForm(null);
      return;
    }
    setOpenForm(id);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>id</TableCell>
            <TableCell align="right">Cargo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {abc.map((item: any) => (
            <RowTable
              openForm={openForm}
              openFormEdit={openFormEdit}
              key={item.id}
              row={item}
            />
          ))}
          {/* {data &&
        data.data.length > 0 &&
        data.data.map((item: any) => (
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
        ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

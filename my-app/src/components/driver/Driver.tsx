import { useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowTable from "../rowTable/RowTable";
import { useState } from "react";
import { getListDrivers } from "../../redux/api";

export default function Driver() {
  const [openForm, setOpenForm] = useState<string | null>(null);
  function openFormEdit(id: string) {
    if (id === openForm) {
      setOpenForm(null);
      return;
    }
    setOpenForm(id);
  }
  const { data, isLoading, isError } = useQuery("driver", getListDrivers);
  if (isLoading) {
    return <span>Loading.......</span>;
  }
  if (isError) {
    return <span>Error.......</span>;
  }
  let collumn = Object.keys(data[0]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {collumn.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((item: any) => (
              <RowTable
                openForm={openForm}
                openFormEdit={openFormEdit}
                key={item.id}
                row={item}
                collumn={collumn}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

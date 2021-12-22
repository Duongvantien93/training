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
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers";

interface CargoProps extends PropsFromRedux {
  cargos: any;
}
function Cargo({ cargos }: CargoProps) {
  const [openForm, setOpenForm] = useState<string | null>(null);
  function openFormEdit(id: string) {
    if (id === openForm) {
      setOpenForm(null);
      return;
    }
    setOpenForm(id);
  }

  let collumn = Object.keys(cargos);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cargos.length > 0 &&
            cargos.map((item: any) => (
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
const connector = connect((state: RootState) => {
  return {
    cargos: state.trucks.cargos,
  };
}, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Cargo);

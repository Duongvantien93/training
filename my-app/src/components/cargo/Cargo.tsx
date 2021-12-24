import {
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RowTable from "../rowTable/RowTable";
import { useState } from "react";
import { cargosApi } from "../../service/api";
import { ICargo } from "../../types/type";
import { Container } from "@mui/material";
import DialogDeleteItem from "../common/dialog";
import Button from "@mui/material/Button";
import AddNewItem from "../common/addNewItem";
export default function Cargo() {
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idItemSelected, setIdItemSelect] = useState<string>("");
  const [openAddNewItem, setOpenAddNewItem] = useState<boolean>(false);
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
  };
  function handleSelectItem(id: string) {
    setOpenDialog(true);
    setIdItemSelect(id);
  }
  function openFormEdit(id: string) {
    if (id === openForm) {
      setOpenForm(null);
      return;
    }
    setOpenForm(id);
  }
  function handleUpdateCargo(value: any) {
    updateCargo(value);
  }
  function handleAddNewCargo(value: any) {
    addNewCargo(value);
  }
  let queryClient = useQueryClient();
  const data: ICargo[] | undefined = queryClient.getQueryData("cargos");
  const { mutate: deleteCargo } = useMutation(cargosApi.deleteCargo, {
    onSuccess: async (data: any) => {
      await queryClient.refetchQueries(["cargos"], {
        active: false,
        exact: true,
      });
    },
  });
  const { mutate: updateCargo } = useMutation(cargosApi.updateCargo, {
    onSuccess: async (data: any) => {
      await queryClient.refetchQueries(["cargos"], {
        active: false,
        exact: true,
      });
      setOpenForm(null);
    },
  });
  const { mutate: addNewCargo } = useMutation(cargosApi.addNewCargo, {
    onSuccess: async (data: any) => {
      await queryClient.refetchQueries(["cargos"], {
        active: false,
        exact: true,
      });
      setOpenAddNewItem(false);
    },
  });
  let newItem = { cargo: "" };
  let collumn = data ? Object.keys(data[0]) : [];
  return (
    <Container>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setOpenAddNewItem(!openAddNewItem)}
      >
        Add new
      </Button>
      {openAddNewItem && (
        <AddNewItem value={newItem} addNewItem={handleAddNewCargo} />
      )}
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
            {data &&
              data.length > 0 &&
              data.map((item: any) => (
                <RowTable
                  openForm={openForm}
                  openFormEdit={openFormEdit}
                  key={item.id}
                  row={item}
                  collumn={collumn}
                  handleSelectItem={handleSelectItem}
                  handleUpdateItem={handleUpdateCargo}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogDeleteItem
        id={idItemSelected}
        handleDeleteItem={deleteCargo}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        title={"Cargo"}
      />
    </Container>
  );
}

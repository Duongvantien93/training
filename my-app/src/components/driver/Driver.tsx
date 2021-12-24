import {
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
import { driversApi } from "../../service/api";
import { IDriver } from "../../types/type";
import { Container } from "@mui/material";
import DialogDeleteItem from "../common/dialog";
import AddNewItem from "../common/addNewItem";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    margin: "10px 0 10px 0",
  },
  row: {
    fontWeight: "bold",
  },
});
export default function Driver() {
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idItemSelected, setIdItemSelect] = useState<string>("");
  const [openAddNewItem, setOpenAddNewItem] = useState<boolean>(false);
  const classes = useStyles();
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
  function handleUpdateDriver(value: any) {
    updateDriver(value);
  }
  function handleAddNewDriver(value: any) {
    addNewDriver(value);
  }
  let queryClient = useQueryClient();
  const data: IDriver[] | undefined = queryClient.getQueryData("driver");
  const { mutate: deleteDriver } = useMutation(driversApi.deleteDriver, {
    onSuccess: async (data: any) => {
      await queryClient.refetchQueries(["driver"], {
        active: false,
        exact: true,
      });
    },
  });
  const { mutate: updateDriver } = useMutation(driversApi.updateDriver, {
    onSuccess: async (data: any) => {
      await queryClient.refetchQueries(["driver"], {
        active: false,
        exact: true,
      });
      setOpenForm(null);
    },
  });
  const { mutate: addNewDriver } = useMutation(driversApi.addNewDriver, {
    onSuccess: async (data: any) => {
      await queryClient.refetchQueries(["driver"], {
        active: false,
        exact: true,
      });
      setOpenAddNewItem(false);
    },
  });
  let collumn: string[] = data ? Object.keys(data[0]) : [];
  let newItem = { driver: "", address: "", phone: "" };
  return (
    <Container>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => setOpenAddNewItem(!openAddNewItem)}
      >
        Add new
      </Button>
      {openAddNewItem && (
        <AddNewItem value={newItem} addNewItem={handleAddNewDriver} />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {collumn.map((item) => (
                <TableCell className={classes.row} key={item}>
                  {item}
                </TableCell>
              ))}
              <TableCell className={classes.row}>Action</TableCell>
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
                  handleUpdateItem={handleUpdateDriver}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogDeleteItem
        id={idItemSelected}
        handleDeleteItem={deleteDriver}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        title={"Driver"}
      />
    </Container>
  );
}

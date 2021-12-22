import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Collapse } from "@mui/material";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function RowTable({
  row,
  openForm,
  openFormEdit,
  collumn,
}: {
  row: any;
  openForm: string | null;
  openFormEdit: (id: string) => void;
  collumn: string[];
}) {
  const formik = useFormik({
    initialValues: row,
    onSubmit: (values: any) => {
      console.log("login::::", values);
    },
    validate: () => {},
  });
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {collumn.map((item) => (
          <TableCell key={item}>{row[item]}</TableCell>
        ))}
        <TableCell>
          <EditIcon
            onClick={() => {
              openFormEdit(row.id);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse
            in={row.id === openForm}
            timeout="auto"
            unmountOnExit
            style={{ alignItems: "center" }}
          >
            <form onSubmit={formik.handleSubmit}>
              {collumn.map((item) => (
                <TextField
                  key={item}
                  margin="dense"
                  size="small"
                  style={{
                    width: item === "id" ? "10%" : "",
                    marginTop: 0,
                    marginRight: "5px",
                  }}
                  name={item}
                  label={item}
                  value={formik.values[item]}
                  disabled={item === "id"}
                  onChange={formik.handleChange}
                />
              ))}
              <Button color="primary" variant="contained" type="submit">
                Update
              </Button>
            </form>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

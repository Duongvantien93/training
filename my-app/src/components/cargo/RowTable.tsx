import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Collapse, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { Container, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function RowTable({
  row,
  openForm,
  openFormEdit,
}: {
  row: any;
  openForm: string | null;
  openFormEdit: (id: string) => void;
}) {
  const formik = useFormik({
    initialValues: {
      id: row.id,
      cargo: row.cargo,
    },
    onSubmit: (values: any) => {
      console.log("login::::", values);
    },
    validate: () => {},
  });
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <EditIcon
            onClick={() => {
              openFormEdit(row.id);
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.cargo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse
            in={row.id == openForm}
            timeout="auto"
            unmountOnExit
            style={{ alignItems: "center" }}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="dense"
                size="small"
                style={{ width: "10%", marginTop: 0 }}
                id="id"
                name="id"
                label="id"
                value={formik.values.id}
                disabled
              />
              &nbsp;&nbsp;&nbsp;
              <TextField
                margin="dense"
                size="small"
                style={{ width: "60%", marginTop: 0 }}
                id="cargo"
                name="cargo"
                label="cargo"
                type="text"
                value={formik.values.cargo}
                onChange={formik.handleChange}
                error={formik.touched.cargo && Boolean(formik.errors.cargo)}
                helperText={formik.touched.cargo && formik.errors.cargo}
              />
              &nbsp;&nbsp;&nbsp;
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

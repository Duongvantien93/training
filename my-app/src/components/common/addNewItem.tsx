import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { ICargo, IDriver } from "../../types/type";
import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";

export default function AddNewItem({
  value,
  addNewItem,
}: {
  value: any;
  addNewItem: (value: IDriver | ICargo) => void;
}) {
  const formik = useFormik({
    initialValues: value,
    onSubmit: (values: IDriver | ICargo, { resetForm }) => {
      addNewItem(values);
      resetForm();
    },
    validate: () => {},
  });
  const names: string[] = Object.keys(value);
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        {names.map((name: string) => (
          <TextField
            key={name}
            margin="dense"
            size="small"
            name={name}
            label={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            style={{
              marginTop: 0,
              marginRight: "5px",
            }}
          />
        ))}
        <Button color="primary" variant="contained" type="submit">
          Add
        </Button>
      </form>
    </Box>
  );
}

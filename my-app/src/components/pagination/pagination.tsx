import { SetStateAction, Dispatch, ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MenuItem, Select, SelectChangeEvent, InputLabel } from "@mui/material";

interface IProps {
  setParam: Dispatch<SetStateAction<{ page: number; limit: number }>>;
  param: { page: number; limit: number };
  count: number;
}
const PaginationTable = ({ setParam, param, count }: IProps) => {
  const handleChange = (event: ChangeEvent<any>, page: number) =>
    setParam({ ...param, page: page });
  const handleChangeLimit = (event: SelectChangeEvent<any>) =>
    setParam({ limit: event.target.value, page: 1 });
  return (
    <Stack
      direction="row"
      style={{ margin: "15px 25px", alignItems: "baseline" }}
      spacing={2}
    >
      <Pagination
        onChange={handleChange}
        count={count}
        variant="outlined"
        shape="rounded"
        page={param.page}
      />
      <InputLabel id="demo-simple-select-label">Limit:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        className="select-custom"
        onChange={handleChangeLimit}
        value={param.limit}
      >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </Stack>
  );
};
export default PaginationTable;

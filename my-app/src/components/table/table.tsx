import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory, useLocation } from "react-router-dom";

interface IPropsTableView<T> {
  data: T[];
  columns: string[];
}
const TableView = <T extends object>({ data, columns }: IPropsTableView<T>) => {
  const convertCapitalize = (str: string) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    if (newStr.includes("_")) return newStr.replace("_", " ");
    return newStr;
  };
  const convertProductionYear = (date: Date) => {
    return new Date(date).getFullYear();
  };
  let history = useHistory();
  let location = useLocation();
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns &&
            columns.map((column: string) => (
              <TableCell key={column}>{convertCapitalize(column)}</TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((row: any) => (
            <TableRow
              key={row.id}
              onClick={() => history.push(location.pathname + "/" + row.id)}
            >
              {columns.map((item: string, index: number) => {
                if (Array.isArray(row[item]))
                  return (
                    <TableCell key={index}>
                      {row[item].map((ele: any) => ele?.name + ", ")}
                    </TableCell>
                  );
                if (typeof row[item] === "object")
                  return (
                    <TableCell key={index}>
                      {row[item]?.name || row[item]?.status}
                    </TableCell>
                  );
                if (item === "production_year")
                  return (
                    <TableCell key={index}>
                      {convertProductionYear(row[item])}
                    </TableCell>
                  );
                return <TableCell key={index}>{row[item]}</TableCell>;
              })}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
export default TableView;

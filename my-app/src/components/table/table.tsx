import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import RowTable from "../rowTable/RowTable";

const useStyles = makeStyles({
  button: {
    margin: "10px 0 10px 0",
  },
  row: {
    "& th": {
      fontWeight: "bold",
      padding: "0px",
    },
  },
});

export default function TableView({
  data,
  collumns,
}: {
  data: any;
  collumns: any;
}) {
  const classes = useStyles();
  function convertCapitalize(str: string) {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    if (newStr.includes("_")) return newStr.replace("_", " ");
    return newStr;
  }
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow className={classes.row}>
          {collumns &&
            collumns.map((collumn: string) => (
              <TableCell align="center" key={collumn}>
                {convertCapitalize(collumn)}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.length > 0 &&
          data.map((item: any) => (
            <RowTable key={item.id} row={item} collumn={collumns} />
          ))}
      </TableBody>
    </Table>
  );
}

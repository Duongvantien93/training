import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useHistory, useLocation } from "react-router-dom";

export default function RowTable({
  row,
  collumn,
}: {
  row: any;
  collumn: string[];
}) {
  let history = useHistory();
  let location = useLocation();
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => history.push(location.pathname + "/" + row.id)}
      >
        {collumn.map((item: string, index: number) => {
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

          return (
            <TableCell align="center" key={index}>
              {row[item]}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}

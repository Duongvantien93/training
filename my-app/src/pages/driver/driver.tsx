import { useQuery, UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { driversApi } from "../../service/api";
import { IDriver } from "../../types/type";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TableView from "../../components/table/table";
import { useHistory } from "react-router-dom";
import PaginationTable from "../../components/common/panigation";
import { collumnDriver } from "../../components/contants/contants";

const useStyles = makeStyles({
  button: {
    margin: "10px 0 10px 0",
  },
  row: {
    fontWeight: "bold",
  },
});
export default function Driver() {
  const [param, setParam] = useState({
    page: 1,
    limit: 2,
  });
  const [count, setCount] = useState(0);
  const classes = useStyles();
  const { data, refetch }: UseQueryResult<IDriver[]> = useQuery(
    ["driverbyParam", param],
    () => driversApi.getDriverParams(param)
  );
  const { data: listDriver }: UseQueryResult<IDriver[]> = useQuery(
    "driver",
    driversApi.getListDrivers,
    {
      onSuccess: (data) => {
        setCount(Math.ceil(data.length / param.limit));
      },
    }
  );
  let history = useHistory();
  useEffect(() => {
    refetch();
    if (listDriver) setCount(Math.ceil(listDriver.length / param.limit));
  }, [param]);
  return (
    <Container>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/driver/newDriver")}
      >
        Add new
      </Button>
      <TableView data={data} collumns={collumnDriver} />
      {count && (
        <PaginationTable count={count} param={param} setParam={setParam} />
      )}
    </Container>
  );
}

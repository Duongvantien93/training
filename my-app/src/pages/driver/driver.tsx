import { UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { IDriver } from "../../types/type";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import TableView from "../../components/table/table";
import { useHistory } from "react-router-dom";
import PaginationTable from "../../components/pagination/pagination";
import { columnDriver } from "./columnDriver";
import {
  useQueryListDriver,
  useQueryListDriverByParam,
} from "./useQueryDrivers";

const Driver = () => {
  const [param, setParam] = useState({
    page: 1,
    limit: 2,
  });
  const [count, setCount] = useState(0);
  const onSuccess = () => {
    if (listDriver && data)
      setCount(Math.ceil(listDriver.length / param.limit));
  };
  const { data, refetch }: UseQueryResult<IDriver[]> =
    useQueryListDriverByParam(param);
  const { data: listDriver }: UseQueryResult<IDriver[]> =
    useQueryListDriver(onSuccess);
  let history = useHistory();
  useEffect(() => {
    refetch();
    if (listDriver) setCount(Math.ceil(listDriver.length / param.limit));
  }, [param, listDriver, refetch]);
  return (
    <Container>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/driver/newDriver")}
      >
        Add new
      </Button>
      {data && data.length > 0 && (
        <TableView data={data} columns={columnDriver} />
      )}
      {data && data.length === 0 && <p>Please add new data</p>}
      {count > 0 && (
        <PaginationTable count={count} param={param} setParam={setParam} />
      )}
    </Container>
  );
};
export default Driver;

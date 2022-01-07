import { UseQueryResult } from "react-query";
import { useHistory } from "react-router-dom";
import { ITruck } from "../../types/type";
import { Button } from "@mui/material";
import TableView from "../../components/table/table";
import { useEffect, useState } from "react";
import PaginationTable from "../../components/pagination/pagination";
import ChartView from "../../components/victoryChart/victoryChart";
import Box from "@mui/material/Box";
import { columnTruck } from "./columnTruck";
import { useQueryListTruck, useQueryListTruckByParam } from "./useQueryTrucks";

const Home = () => {
  const [param, setParam] = useState({
    page: 1,
    limit: 2,
  });

  const [count, setCount] = useState(0);
  const [viewChart, setViewChart] = useState(false);
  const onSuccess = () => {
    if (listTruck && data) setCount(Math.ceil(listTruck.length / param.limit));
  };

  const {
    isLoading,
    data,
    error,
    status,
    refetch,
  }: UseQueryResult<ITruck[], { status: string; message: string }> =
    useQueryListTruckByParam(param);
  const { data: listTruck }: UseQueryResult<ITruck[]> =
    useQueryListTruck(onSuccess);
  let history = useHistory();

  useEffect(() => {
    refetch();
    if (listTruck) setCount(Math.ceil(listTruck.length / param.limit));
  }, [param, listTruck, refetch]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    if (error?.message.includes("code 401")) {
      localStorage.clear();
      history.push("/login");
    }
  }
  let dataChart: any = data?.map((item: ITruck) => {
    return {
      x: item.production_year,
      y: item.price,
    };
  });

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/truck/newTruck")}
      >
        Add new
      </Button>
      &nbsp;
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setViewChart(!viewChart)}
      >
        View Chart
      </Button>
      {data && data.length > 0 && (
        <TableView data={data} columns={columnTruck} />
      )}
      {data && data.length === 0 && <p>Please add new data</p>}
      {count > 0 && (
        <PaginationTable count={count} param={param} setParam={setParam} />
      )}
      {viewChart && (
        <Box textAlign="center">
          <h3>Chart</h3>
          <ChartView data={dataChart} />
        </Box>
      )}
    </div>
  );
};
export default Home;

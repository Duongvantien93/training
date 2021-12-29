import { useQuery, UseQueryResult } from "react-query";
import { useHistory } from "react-router-dom";
import { trucksApi } from "../../service/api";
import { ITruck } from "../../types/type";
import { Button } from "@mui/material";
import TableView from "../../components/table/table";
import { useEffect, useState } from "react";
import PaginationTable from "../../components/common/panigation";
import VictoryChart2 from "../../components/victoryChart/vicrotyChart";
import Box from "@mui/material/Box";
import { collumnTruck } from "../../components/contants/contants";
import { makeStyles } from "@mui/styles";

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

export default function Home() {
  const [param, setParam] = useState({
    page: 1,
    limit: 2,
  });
  const [count, setCount] = useState(0);
  const [viewChart, setViewChart] = useState(false);
  const {
    isLoading,
    data,
    error,
    refetch,
  }: UseQueryResult<ITruck[], { status: string; message: string }> = useQuery(
    ["trucksByParam", param],
    () => trucksApi.getTruckParams(param)
  );
  const { data: listTruck }: UseQueryResult<ITruck[]> = useQuery(
    "truck",
    trucksApi.getListTrucks,
    {
      onSuccess: (data) => {
        setCount(Math.ceil(data.length / param.limit));
      },
    }
  );

  const classes = useStyles();
  let history = useHistory();
  useEffect(() => {
    refetch();
    if (listTruck) setCount(Math.ceil(listTruck.length / param.limit));
  }, [param]);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) return <span>An error has occurred: {error.message}</span>;
  let dataChart = data?.map((item: ITruck) => {
    return {
      x: item.production_year,
      y: item.price,
    };
  });

  return (
    <div>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/truck/newTruck")}
      >
        Add new
      </Button>
      &nbsp;
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        onClick={() => setViewChart(!viewChart)}
      >
        View Chart
      </Button>
      {data && <TableView data={data} collumns={collumnTruck} />}
      {count && (
        <PaginationTable count={count} param={param} setParam={setParam} />
      )}
      {viewChart && (
        <Box textAlign="center">
          <h3>Chart</h3>
          <VictoryChart2 data={dataChart} />
        </Box>
      )}
    </div>
  );
}

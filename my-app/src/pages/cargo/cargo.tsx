import { useQuery, UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { cargosApi } from "../../service/api";
import { ICargo } from "../../types/type";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TableView from "../../components/table/table";
import { useHistory } from "react-router-dom";
import PaginationTable from "../../components/common/panigation";
import { collumnCargo } from "../../components/contants/contants";

const useStyles = makeStyles({
  button: {
    margin: "10px 0 10px 0",
  },
  row: {
    fontWeight: "bold",
  },
});
export default function Cargo() {
  const [param, setParam] = useState({
    page: 1,
    limit: 2,
  });
  const [count, setCount] = useState(0);
  const classes = useStyles();

  const { data, refetch }: UseQueryResult<ICargo[]> = useQuery(
    ["cargosByParam", param],
    () => cargosApi.getCargoParams(param)
  );
  const { data: listCargos }: UseQueryResult<ICargo[]> = useQuery(
    "cargo",
    cargosApi.getListCargos,
    {
      onSuccess: (data) => {
        setCount(Math.ceil(data.length / param.limit));
      },
    }
  );

  let history = useHistory();
  useEffect(() => {
    refetch();
    if (listCargos) setCount(Math.ceil(listCargos.length / param.limit));
  }, [param]);
  if (!data) return <span>Loading....</span>;
  return (
    <Container>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={() => history.push("/cargo/newCargo")}
      >
        Add new
      </Button>
      {data && <TableView data={data} collumns={collumnCargo} />}
      {count && (
        <PaginationTable count={count} param={param} setParam={setParam} />
      )}
    </Container>
  );
}

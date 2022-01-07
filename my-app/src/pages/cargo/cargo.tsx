import { UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { ICargo } from "../../types/type";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import TableView from "../../components/table/table";
import { useHistory } from "react-router-dom";
import PaginationTable from "../../components/pagination/pagination";
import { columnCargo } from "./columnCargo";
import { useQueryListCargo, useQueryListCargoByParam } from "./useCargos";

const Cargo = () => {
  const [param, setParam] = useState({
    page: 1,
    limit: 2,
  });
  const [count, setCount] = useState(0);
  const onSuccess = () => {
    if (listCargos && data)
      setCount(Math.ceil(listCargos.length / param.limit));
  };
  const { data, refetch }: UseQueryResult<ICargo[]> =
    useQueryListCargoByParam(param);
  const { data: listCargos }: UseQueryResult<ICargo[]> =
    useQueryListCargo(onSuccess);

  let history = useHistory();
  useEffect(() => {
    refetch();
    if (listCargos) setCount(Math.ceil(listCargos.length / param.limit));
  }, [param, listCargos, refetch]);
  if (!data) return <span>Loading....</span>;
  return (
    <Container>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/cargos/newCargo")}
      >
        Add new
      </Button>
      {data && data.length > 0 && (
        <TableView data={data} columns={columnCargo} />
      )}
      {data && data.length === 0 && <p>Please add new data</p>}
      {count > 0 && (
        <PaginationTable count={count} param={param} setParam={setParam} />
      )}
    </Container>
  );
};
export default Cargo;

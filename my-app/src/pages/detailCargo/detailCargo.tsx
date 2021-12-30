import { Container } from "@mui/material";

import { useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import DialogDeleteItem from "../../components/common/dialog";
import { fieldCargo } from "../../components/contants/contants";
import FormCargo from "../../components/formCargo/formCargo";
import { cargosApi } from "../../service/api";
import { ICargo } from "../../types/type";

export default function DetailCargo() {
  const { id }: { id: string } = useParams();
  const [cargo, setCargo] = useState<ICargo>({
    name: "",
  });
  function handleSubmitForm(values: any) {
    updateCargo(values);
  }
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
  };
  const history = useHistory();
  const { data, isLoading }: UseQueryResult<ICargo, boolean> = useQuery(
    ["getCargoById", id],
    () => cargosApi.getCargoById(id),
    {
      onSuccess: (data: any) => {
        setCargo(data);
      },
    }
  );
  const { mutate: updateCargo } = useMutation(cargosApi.updateCargo, {
    onSuccess: (data: any) => {
      history.push("/cargos");
    },
  });
  const { mutate: deleteCargo } = useMutation(cargosApi.deleteCargo, {
    onSuccess: (data: any) => {
      history.push("/cargos");
    },
  });
  if (isLoading) return <span>Loading...</span>;
  return (
    <Container>
      <FormCargo
        initialValues={cargo}
        type={"cargo"}
        field={fieldCargo}
        title="update"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={handleOpenDialog}
      />
      <DialogDeleteItem
        id={id}
        handleDeleteItem={deleteCargo}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        title={"driver"}
      />
    </Container>
  );
}

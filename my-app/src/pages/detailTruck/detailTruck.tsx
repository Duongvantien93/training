import Container from "@mui/material/Container";
import { fieldTruck } from "../../components/contants/contants";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useState } from "react";
import { trucksApi } from "../../service/api";
import { ITruck } from "../../types/type";

import DialogDeleteItem from "../../components/common/dialog";
import { useParams, useHistory } from "react-router-dom";
import FormTruck from "../../components/formTruck/formTruck";

export default function DetailTruck() {
  let { id }: { id: string } = useParams();
  const [truck, setTruck] = useState<any>({
    plate: "",
    cargos: [],
    driver: "",
    truck_type: "",
    price: 0,
    dimension: "",
    address: "",
    production_year: 0,
    status: "",
    description: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
  };
  const { data, isLoading }: UseQueryResult<ITruck, boolean> = useQuery(
    ["trucks", id],
    () => trucksApi.getTruckById(id),
    {
      onSuccess: (data: any) => {
        setTruck(data);
      },
    }
  );
  let history = useHistory();
  const { mutate: updateTruck } = useMutation(trucksApi.updateTruck, {
    onSuccess: (data: any) => {
      history.push("/truck");
    },
  });
  const { mutate: deleteTruck } = useMutation(trucksApi.deleteTruck, {
    onSuccess: (data: any) => {
      history.push("/truck");
    },
  });
  function handleSubmitForm(values: any) {
    updateTruck(values);
  }
  if (isLoading) return <span>Loading...</span>;
  return (
    <Container>
      <FormTruck
        initialValues={truck}
        type={"truck"}
        field={fieldTruck}
        title="update"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={handleOpenDialog}
      />
      <DialogDeleteItem
        id={id}
        handleDeleteItem={deleteTruck}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        title={"Truck"}
      />
    </Container>
  );
}

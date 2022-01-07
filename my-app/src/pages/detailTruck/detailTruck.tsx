import Container from "@mui/material/Container";
import { UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { ITruck } from "../../types/type";
import DialogDeleteItem from "../../components/dialog/dialog";
import { useParams, useHistory } from "react-router-dom";
import FormTruck from "../../components/formTruck/formTruck";
import {
  useDeleteTruck,
  useQueryTruckByID,
  useUpdateTruck,
} from "./useDetailTruck";

const DetailTruck = ({
  handleOpenAlert,
}: {
  handleOpenAlert: (message: string) => void;
}) => {
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
  const onSuccess = () => {
    history.push("/truck");
    handleOpenAlert("Success");
  };
  const onError = () => {
    handleOpenAlert("Error");
  };
  const { data, isLoading }: UseQueryResult<ITruck, boolean> =
    useQueryTruckByID(id);
  let history = useHistory();
  const { mutate: updateTruck } = useUpdateTruck(onSuccess, onError);
  const { mutate: deleteTruck } = useDeleteTruck(onSuccess, onError);
  function handleSubmitForm(values: ITruck) {
    updateTruck(values);
  }
  useEffect(() => {
    if (data) setTruck(data);
  }, [data]);

  if (isLoading) return <span>Loading...</span>;
  return (
    <Container>
      <FormTruck
        initialValues={truck}
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
};
export default DetailTruck;

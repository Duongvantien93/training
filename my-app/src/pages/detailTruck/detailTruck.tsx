import Container from "@mui/material/Container";
import { UseQueryResult } from "react-query";
import { useEffect, useState } from "react";
import { IListValue, ITruck } from "../../types/type";
import DialogDeleteItem from "../../components/dialog/dialog";
import { useParams, useHistory } from "react-router-dom";
import FormTruck from "../../components/formTruck/formTruck";
import {
  useDeleteTruck,
  useQueryTruckByID,
  useUpdateTruck,
  useQueryListDriver,
  useQueryListCargos,
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
  function handleSubmitForm(values: ITruck) {
    updateTruck(values);
  }
  const { data, isLoading }: UseQueryResult<ITruck, boolean> =
    useQueryTruckByID(id);
  let history = useHistory();
  const { mutate: updateTruck } = useUpdateTruck(onSuccess, onError);
  const { mutate: deleteTruck } = useDeleteTruck(onSuccess, onError);
  let status = [
    { id: "1", name: "New" },
    { id: "2", name: "In - Used" },
  ];
  let truck_type = [
    { id: "1", name: "5" },
    { id: "2", name: "10" },
    { id: "3", name: "15" },
    { id: "4", name: "20" },
  ];
  const { data: driver, isLoading: driverLoading } = useQueryListDriver();
  const { data: cargos, isLoading: cargosLoading } = useQueryListCargos();
  useEffect(() => {
    if (data) setTruck(data);
  }, [data]);
  if (cargosLoading || driverLoading || isLoading)
    return <span>Loading...</span>;

  let listValues: IListValue | null =
    driver && cargos ? { driver, cargos, status, truck_type } : null;
  return (
    <Container>
      {listValues && (
        <FormTruck
          initialValues={truck}
          title="update"
          handleSubmitForm={handleSubmitForm}
          handleOpenDialog={handleOpenDialog}
          listValues={listValues}
        />
      )}
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

import Container from "@mui/material/Container";
import { IListValue, ITruck } from "../../types/type";
import { useHistory } from "react-router-dom";
import FormTruck from "../../components/formTruck/formTruck";
import {
  useAddNewTruck,
  useQueryListCargos,
  useQueryListDriver,
} from "./useAddNewTruck";

const NewTruck = ({
  handleOpenAlert,
}: {
  handleOpenAlert: (message: string) => void;
}) => {
  const initialValues: ITruck = {
    truck_plate: "",
    cargos: [],
    driver: "",
    truck_type: "",
    price: "",
    dimension: "",
    address: "",
    production_year: new Date(),
    status: "",
    description: "",
  };

  let history = useHistory();
  const onSuccess = () => {
    handleOpenAlert("Success");
    history.push("/truck");
  };
  const onError = () => {
    handleOpenAlert("Error");
  };
  const { mutate: addNewTruck } = useAddNewTruck(onSuccess, onError);
  function handleSubmitForm(values: ITruck) {
    addNewTruck(values);
  }
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
  if (cargosLoading || driverLoading) return <span>Loading...</span>;

  let listValues: IListValue | null =
    driver && cargos ? { driver, cargos, status, truck_type } : null;

  return (
    <Container>
      {listValues && (
        <FormTruck
          initialValues={initialValues}
          title="New"
          handleSubmitForm={handleSubmitForm}
          listValues={listValues}
        />
      )}
    </Container>
  );
};
export default NewTruck;

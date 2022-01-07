import Container from "@mui/material/Container";
import { ITruck } from "../../types/type";
import { useHistory } from "react-router-dom";
import FormTruck from "../../components/formTruck/formTruck";
import { useAddNewTruck } from "./useAddNewTruck";

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

  return (
    <Container>
      <FormTruck
        initialValues={initialValues}
        title="New"
        handleSubmitForm={handleSubmitForm}
      />
    </Container>
  );
};
export default NewTruck;

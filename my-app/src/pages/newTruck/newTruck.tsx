import Container from "@mui/material/Container";
import { fieldTruck } from "../../components/contants/contants";
import { useMutation } from "react-query";
import { trucksApi } from "../../service/api";
import { ITruck } from "../../types/type";
import { useHistory } from "react-router-dom";
import FormTruck from "../../components/formTruck/formTruck";

export default function NewTruck() {
  const initialValues: ITruck = {
    truck_plate: "",
    cargos: [],
    driver: "",
    truck_type: "",
    price: 0,
    dimension: "",
    address: "",
    production_year: 0,
    status: "",
    description: "",
  };

  let history = useHistory();

  const { mutate: addNewTruck } = useMutation(trucksApi.addNewTruck, {
    onSuccess: (data: any) => {
      console.log("add new", data);
      history.push("/truck");
    },
  });
  function handleSubmitForm(values: any) {
    addNewTruck(values);
  }

  return (
    <Container>
      <FormTruck
        initialValues={initialValues}
        type={"truck"}
        field={fieldTruck}
        title="New"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={() => console.log("opendialog")}
      />
    </Container>
  );
}

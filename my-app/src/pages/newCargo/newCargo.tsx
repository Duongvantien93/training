import Container from "@mui/material/Container";
import { fieldCargo } from "../../components/contants/contants";
import { useMutation } from "react-query";
import { cargosApi } from "../../service/api";
import { ICargo } from "../../types/type";
import { useHistory } from "react-router-dom";
import FormCargo from "../../components/formCargo/formCargo";

export default function NewCargo() {
  const initialValues: ICargo = {
    name: "",
  };

  let history = useHistory();

  const { mutate: addNewCargo } = useMutation(cargosApi.addNewCargo, {
    onSuccess: (data: any) => {
      history.push("/cargos");
    },
  });
  function handleSubmitForm(values: any) {
    addNewCargo(values);
  }

  return (
    <Container>
      <FormCargo
        initialValues={initialValues}
        type={"driver"}
        field={fieldCargo}
        title="New"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={() => console.log("opendialog")}
      />
    </Container>
  );
}

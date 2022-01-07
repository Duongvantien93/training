import Container from "@mui/material/Container";
import { ICargo } from "../../types/type";
import { useHistory } from "react-router-dom";
import FormCargo from "../../components/formCargo/formCargo";
import useAddNewCargo from "./useAddNewCargo";

const NewCargo = ({
  handleOpenAlert,
}: {
  handleOpenAlert: (message: string) => void;
}) => {
  const initialValues: ICargo = {
    name: "",
  };
  let history = useHistory();
  const onSuccess = () => {
    history.push("/cargos");
    handleOpenAlert("Success");
  };
  const onError = () => {
    handleOpenAlert("Error");
  };
  const { mutate: addNewCargo } = useAddNewCargo(onSuccess, onError);
  function handleSubmitForm(values: ICargo) {
    addNewCargo(values);
  }

  return (
    <Container>
      <FormCargo
        initialValues={initialValues}
        title="New"
        handleSubmitForm={handleSubmitForm}
      />
    </Container>
  );
};
export default NewCargo;

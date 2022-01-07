import Container from "@mui/material/Container";
import { IDriver } from "../../types/type";
import { useHistory } from "react-router-dom";
import FormDriver from "../../components/formDriver/formDriver";
import useAddNewDriver from "./useAddNewDriver";

const NewDriver = ({
  handleOpenAlert,
}: {
  handleOpenAlert: (message: string) => void;
}) => {
  const initialValues: IDriver = {
    name: "",
    address: "",
    phone: 0,
  };

  let history = useHistory();
  const onSuccess = () => {
    history.push("/driver");
    handleOpenAlert("Success");
  };
  const onError = () => {
    handleOpenAlert("Error");
  };
  const { mutate: addNewDriver } = useAddNewDriver(onSuccess, onError);
  function handleSubmitForm(values: IDriver) {
    addNewDriver(values);
  }

  return (
    <Container>
      <FormDriver
        initialValues={initialValues}
        title="New"
        handleSubmitForm={handleSubmitForm}
      />
    </Container>
  );
};
export default NewDriver;

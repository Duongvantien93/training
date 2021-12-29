import Container from "@mui/material/Container";
import { fieldDriver } from "../../components/contants/contants";
import { useMutation } from "react-query";
import { driversApi } from "../../service/api";
import { IDriver } from "../../types/type";
import { useHistory } from "react-router-dom";

import FormDriver from "../../components/formDriver/formDriver";

export default function NewDriver() {
  const initialValues: IDriver = {
    name: "",
    address: "",
    phone: 0,
  };

  let history = useHistory();

  const { mutate: addNewDriver } = useMutation(driversApi.addNewDriver, {
    onSuccess: (data: any) => {
      history.push("/driver");
    },
  });
  function handleSubmitForm(values: any) {
    addNewDriver(values);
  }

  return (
    <Container>
      <FormDriver
        initialValues={initialValues}
        type={"driver"}
        field={fieldDriver}
        title="New"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={() => console.log("opendialog")}
      />
    </Container>
  );
}

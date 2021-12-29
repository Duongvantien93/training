import { Container } from "@mui/material";

import { useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import DialogDeleteItem from "../../components/common/dialog";
import { fieldDriver } from "../../components/contants/contants";
import FormDriver from "../../components/formDriver/formDriver";
import { driversApi } from "../../service/api";
import { IDriver } from "../../types/type";

export default function DetailDriver() {
  const { id }: { id: string } = useParams();
  const [driver, setDriver] = useState<IDriver>({
    name: "",
    address: "",
    phone: 0,
  });
  function handleSubmitForm(values: any) {
    updateDriver(values);
  }
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
  };
  const history = useHistory();
  const { data, isLoading }: UseQueryResult<IDriver, boolean> = useQuery(
    ["getdriverbyId", id],
    () => driversApi.getDriverById(id),
    {
      onSuccess: (data: any) => {
        setDriver(data);
      },
    }
  );
  const { mutate: updateDriver } = useMutation(driversApi.updateDriver, {
    onSuccess: (data: any) => {
      history.push("/driver");
    },
  });
  const { mutate: deleteDriver } = useMutation(driversApi.deleteDriver, {
    onSuccess: (data: any) => {
      history.push("/driver");
    },
  });
  if (isLoading) return <span>Loading...</span>;
  return (
    <Container>
      <FormDriver
        initialValues={driver}
        type={"driver"}
        field={fieldDriver}
        title="update"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={handleOpenDialog}
      />
      <DialogDeleteItem
        id={id}
        handleDeleteItem={deleteDriver}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        title={"driver"}
      />
    </Container>
  );
}

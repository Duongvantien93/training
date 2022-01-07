import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DialogDeleteItem from "../../components/dialog/dialog";
import FormDriver from "../../components/formDriver/formDriver";
import { IDriver } from "../../types/type";
import {
  useDeleteDriver,
  useQueryDriverByID,
  useUpdateDriver,
} from "./useDetailDriver";

const DetailDriver = ({
  handleOpenAlert,
}: {
  handleOpenAlert: (message: string) => void;
}) => {
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
  const onSuccess = () => {
    history.push("/driver");
    handleOpenAlert("Success");
  };
  const onError = () => {
    handleOpenAlert("Error");
  };
  const history = useHistory();
  const { data, isLoading } = useQueryDriverByID(id);
  const { mutate: updateDriver } = useUpdateDriver(onSuccess, onError);
  const { mutate: deleteDriver } = useDeleteDriver(onSuccess, onError);
  useEffect(() => {
    if (data) setDriver(data);
  }, [data]);
  if (isLoading) return <span>Loading...</span>;
  return (
    <Container>
      <FormDriver
        initialValues={driver}
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
};
export default DetailDriver;

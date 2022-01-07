import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DialogDeleteItem from "../../components/dialog/dialog";
import FormCargo from "../../components/formCargo/formCargo";
import { ICargo } from "../../types/type";
import {
  useDeleteCargo,
  useQueryCargoByID,
  useUpdateCargo,
} from "./useDetailCargo";

const DetailCargo = ({
  handleOpenAlert,
}: {
  handleOpenAlert: (message: string) => void;
}) => {
  const { id }: { id: string } = useParams();
  const [cargo, setCargo] = useState<ICargo>({
    name: "",
  });
  function handleSubmitForm(values: ICargo) {
    updateCargo(values);
  }
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
  };
  const history = useHistory();
  const onSuccess = () => {
    history.push("/cargos");
    handleOpenAlert("Success");
  };
  const onError = () => {
    handleOpenAlert("Error");
  };
  const { data, isLoading } = useQueryCargoByID(id);
  const { mutate: updateCargo } = useUpdateCargo(onSuccess, onError);
  const { mutate: deleteCargo } = useDeleteCargo(onSuccess, onError);
  useEffect(() => {
    if (data) setCargo(data);
  }, [data, setCargo]);
  if (isLoading) return <span>Loading...</span>;
  return (
    <Container>
      <FormCargo
        initialValues={cargo}
        title="update"
        handleSubmitForm={handleSubmitForm}
        handleOpenDialog={handleOpenDialog}
      />
      <DialogDeleteItem
        id={id}
        handleDeleteItem={deleteCargo}
        handleOpenDialog={handleOpenDialog}
        openDialog={openDialog}
        title={"driver"}
      />
    </Container>
  );
};
export default DetailCargo;

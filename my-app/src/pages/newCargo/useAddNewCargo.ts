import { useMutation } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ICargo } from "../../types/type"

const url = "/cargos"
const addNewCargo = (data: ICargo) => axiosClient.post(url, data)
const useAddNewCargo = (onSuccess: () => void, onError: () => void) => useMutation(addNewCargo, { onSuccess, onError })
export default useAddNewCargo
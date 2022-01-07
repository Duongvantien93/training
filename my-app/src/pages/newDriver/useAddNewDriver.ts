import { useMutation } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { IDriver } from "../../types/type"

const url = "/driver"
const addNewDriver = (data: IDriver) => axiosClient.post(url, data)
const useAddNewDriver = (onSuccess: () => void, onError: () => void) => useMutation(addNewDriver, { onSuccess, onError })
export default useAddNewDriver
import { useMutation } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ITruck } from "../../types/type"

const url = "/trucks"
const addNewTruck = (data: ITruck) => axiosClient.post(url, data)
export const useAddNewTruck = (onSuccess: () => void, onError: () => void) => useMutation(addNewTruck, { onSuccess, onError })
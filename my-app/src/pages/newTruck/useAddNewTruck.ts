import { useMutation, useQuery, UseQueryResult } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ICargo, IDriver, ITruck } from "../../types/type"

const url = "/trucks"
const addNewTruck = (data: ITruck) => axiosClient.post(url, data)
const getListCargos = () => {
    const url = "/cargos"
    return axiosClient.get(url)
}
const getListDriver = () => {
    const url = "/driver"
    return axiosClient.get(url)
}
export const useQueryListCargos = (): UseQueryResult<ICargo[], boolean> => useQuery("getListCargos", getListCargos)
export const useQueryListDriver = (): UseQueryResult<IDriver[], boolean> => useQuery("getListDrivers", getListDriver)
export const useAddNewTruck = (onSuccess: () => void, onError: () => void) => useMutation(addNewTruck, { onSuccess, onError })
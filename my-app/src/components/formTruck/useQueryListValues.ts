import { useQuery, UseQueryResult } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ICargo, IDriver } from '../../types/type';

const getListCargos = () => {
    const url = "/cargos"
    return axiosClient.get(url)
}
const getListDriver = () => {
    const url = "/driver"
    return axiosClient.get(url)
}

export const useQueryListCargos = (): UseQueryResult<ICargo, boolean> => useQuery("getListCargos", getListCargos)
export const useQueryListDriver = (): UseQueryResult<IDriver, boolean> => useQuery("getListDrivers", getListDriver)
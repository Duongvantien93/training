import { IParam } from '../../types/type';
import { useQuery, UseQueryResult } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ITruck } from "../../types/type"

const url = "/trucks"
const getListTrucks = () => axiosClient.get(url)
const getTruckParams = ({ page, limit }: IParam) => axiosClient.get(url, { params: { _page: page, _limit: limit } })
export const useQueryListTruck = (onSuccess: () => void): UseQueryResult<ITruck[]> =>
    useQuery("getListTruck", getListTrucks, { onSuccess })
export const useQueryListTruckByParam = (param: IParam): UseQueryResult<ITruck[], { status: string; message: string }> =>
    useQuery("getListTruckByParam", () => getTruckParams(param), {
        refetchOnMount: false
    })

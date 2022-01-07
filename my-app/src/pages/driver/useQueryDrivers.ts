import { IParam } from '../../types/type';
import { useQuery, UseQueryResult } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { IDriver } from "../../types/type"

const url = "/driver"
const getListDrivers = () => axiosClient.get(url)
const getDriverParams = ({ page, limit }: IParam) => axiosClient.get(url, { params: { _page: page, _limit: limit } })
export const useQueryListDriver = (onSuccess: () => void): UseQueryResult<IDriver[]> =>
    useQuery("getListDriver", getListDrivers, { onSuccess })
export const useQueryListDriverByParam = (param: IParam): UseQueryResult<IDriver[]> =>
    useQuery("getListDriverByParam", () => getDriverParams(param))
import { IParam } from './../../types/type';
import { useQuery, UseQueryResult } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ICargo } from "../../types/type"

const url = "/cargos"
const getListCargos = () => axiosClient.get(url)
const getCargoParams = ({ page, limit }: IParam) => axiosClient.get(url, { params: { _page: page, _limit: limit } })
export const useQueryListCargo = (onSuccess: () => void): UseQueryResult<ICargo[]> =>
    useQuery("getListCargos", getListCargos, { onSuccess })
export const useQueryListCargoByParam = (param: IParam): UseQueryResult<ICargo[]> =>
    useQuery("getListCargosByParam", () => getCargoParams(param))
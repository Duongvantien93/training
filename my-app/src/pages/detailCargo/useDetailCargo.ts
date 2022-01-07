

import { useQuery, UseQueryResult, useMutation } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ICargo } from "../../types/type"


const url = "/cargos"
const updateCargo = (data: ICargo) => axiosClient.put(`${url}/${data.id}`, data)
const deleteCargo = (id: string) => axiosClient.delete(`${url}/${id}`)
const getCargoById = (id: string) => axiosClient.get(url + "/" + id)

export const useUpdateCargo = (onSuccess: () => void, onError: () => void) => useMutation(updateCargo, { onSuccess, onError })
export const useDeleteCargo = (onSuccess: () => void, onError: () => void) => useMutation(deleteCargo, { onSuccess, onError })
export const useQueryCargoByID = (id: string): UseQueryResult<ICargo, unknown> =>
    useQuery("getCargoById", () => getCargoById(id))
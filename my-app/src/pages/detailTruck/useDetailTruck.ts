

import { useQuery, UseQueryResult, useMutation } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { ITruck } from "../../types/type"


const url = "/trucks"
const updateTruck = (data: ITruck) => axiosClient.put(`${url}/${data.id}`, data)
const deleteTruck = (id: string) => axiosClient.delete(`${url}/${id}`)
const getTruckById = (id: string) => axiosClient.get(url + "/" + id)
export const useUpdateTruck = (onSuccess: () => void, onError: () => void) => useMutation(updateTruck, { onSuccess, onError })
export const useDeleteTruck = (onSuccess: () => void, onError: () => void) => useMutation(deleteTruck, { onSuccess, onError })
export const useQueryTruckByID = (id: string): UseQueryResult<ITruck, boolean> =>
    useQuery("getTruckById", () => getTruckById(id))
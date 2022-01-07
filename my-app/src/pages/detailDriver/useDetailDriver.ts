

import { useQuery, UseQueryResult, useMutation } from 'react-query';
import axiosClient from "../../service/axiosClient"
import { IDriver } from "../../types/type"


const url = "/driver"
const updateDriver = (data: IDriver) => axiosClient.put(`${url}/${data.id}`, data)
const deleteDriver = (id: string) => axiosClient.delete(`${url}/${id}`)
const getDriverById = (id: string) => axiosClient.get(url + "/" + id)

export const useUpdateDriver = (onSuccess: () => void, onError: () => void) => useMutation(updateDriver, { onSuccess, onError })
export const useDeleteDriver = (onSuccess: () => void, onError: () => void) => useMutation(deleteDriver, { onSuccess, onError })
export const useQueryDriverByID = (id: string): UseQueryResult<IDriver, boolean> =>
    useQuery("getDriverById", () => getDriverById(id))
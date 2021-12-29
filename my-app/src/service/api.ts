import axiosClient from "./axiosClient";
import { AxiosResponse } from "axios";
import {
    Login, ITruck, ICargo, IDriver
} from "../types/type";

export const loginApi = {
    register(data: Login): Promise<AxiosResponse<unknown, any>> {
        const url = "/auth/register";
        return axiosClient.post(url, data);
    },
    login(data: Login): Promise<AxiosResponse<{ access_token: string }, any>> {
        const url = "auth/login";
        return axiosClient.post(url, data);
    },
};
export const trucksApi = {
    getListTrucks() {
        const url = "/trucks"
        return axiosClient.get(url)
    },
    addNewTruck(data: ITruck) {
        const url = "/trucks"
        return axiosClient.post(url, data)
    },
    updateTruck(data: ITruck) {
        const url = "/trucks"
        return axiosClient.put(`${url}/${data.id}`, data)
    },
    deleteTruck(id: string) {
        const url = "/trucks"
        return axiosClient.delete(`${url}/${id}`)
    },
    getTruckById(id: string) {
        const url = "/trucks"
        return axiosClient.get(url + "/" + id)
    }, getTruckParams({ page, limit }: { page: number, limit: number }) {
        const url = "/trucks"
        return axiosClient.get(url, { params: { _page: page, _limit: limit } })
    }
}
export const cargosApi = {
    getListCargos() {
        const url = "/cargos"
        return axiosClient.get(url)
    },
    addNewCargo(data: ICargo) {
        const url = "/cargos"
        return axiosClient.post(url, data)
    },
    updateCargo(data: ICargo) {
        const url = "/cargos"
        return axiosClient.put(`${url}/${data.id}`, data)
    },
    deleteCargo(id: string) {
        const url = "/cargos"
        return axiosClient.delete(`${url}/${id}`)
    },
    getCargoById(id: string) {
        const url = "/cargos"
        return axiosClient.get(url + "/" + id)
    },
    getCargoParams({ page, limit }: { page: number, limit: number }) {
        const url = "/cargos"
        return axiosClient.get(url, { params: { _page: page, _limit: limit } })
    }
}
export const driversApi = {
    getListDrivers() {
        const url = "/driver"
        return axiosClient.get(url)
    },
    addNewDriver(data: IDriver) {
        const url = "/driver"
        return axiosClient.post(url, data)
    },
    updateDriver(data: IDriver) {
        const url = "/driver"
        return axiosClient.put(`${url}/${data.id}`, data)
    },
    deleteDriver(id: string) {
        const url = "/driver"
        return axiosClient.delete(`${url}/${id}`)
    },
    getDriverById(id: string) {
        const url = "/driver"
        return axiosClient.get(url + "/" + id)
    }, getDriverParams({ page, limit }: { page: number, limit: number }) {
        const url = "/driver"
        return axiosClient.get(url, { params: { _page: page, _limit: limit } })
    }
}




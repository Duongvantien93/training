import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/"
})
export const getListTrucks = () => api.get("trucks").then(res => res.data)
export const getListCargos = () => api.get("cargos").then(res => res.data)
export const getListDrivers = () => api.get("driver").then(res => res.data)
export const getTruckById = (id: string) => api.get("trucks", { params: { id: id } }).then(res => res.data[0])

import { ComponentType } from "react";

export interface ILogin {
    email: string,
    password: string
}
export interface ITruck {
    id?: number | string,
    truck_plate: string,
    cargos: string[],
    driver: string,
    truck_type: string,
    price: number | string,
    dimension: string,
    address: string,
    production_year: Date,
    status: string,
    description: string
}

export interface LoginResponse {
    access_token: string,
    userResponse: ILogin
}
export interface ICargo {
    id?: number | string,
    name: string
}

export interface IDriver {
    id?: number | string,
    name: string,
    address: string,
    phone: number
}

export interface IStatus {
    id: string,
    name: string
}
export interface IRouter {
    name: string,
    path: string,
    component?: ComponentType<any>,
    header?: boolean
}
export interface IParam {
    page: number,
    limit: number
}
export interface IField {
    name: string;
    type: string;
    multi: boolean;
}

export interface IStatus {
    id: string,
    name: string
}
export interface ITruckType {
    id: string,
    name: string
}
export interface IListValue {
    driver: IDriver[],
    cargos: ICargo[],
    status: IStatus[],
    truck_type: ITruckType[]
}
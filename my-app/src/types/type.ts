export interface ILogin {
    email: string,
    password: string
}
export interface ITruck {
    id?: number | string,
    plate: string,
    cargos: string[],
    driver: string,
    truck_type: string,
    price: number,
    dimension: string,
    address: string,
    production_year: number,
    status: string,
    description: string
}
export interface Register {
    username: string;
    email: string;
    password: string;
}
export interface RegisterUser {
    user: Register;
}
export interface Login {
    email: string;
    password: string;
}
export interface ICargo {
    id?: number | string,
    cargo: string
}

export interface IDriver {
    id?: number | string,
    driver: string,
    address: string,
    phone: string
}
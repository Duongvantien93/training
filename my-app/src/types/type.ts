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
    price: number,
    dimension: string,
    address: string,
    production_year: number,
    status: string,
    description: string
}
// export interface Register {
//     username: string;
//     email: string;
//     password: string;
// // }
// export interface RegisterUser {
//     user: Register;
// }
export interface Login {
    email: string;
    password: string;
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
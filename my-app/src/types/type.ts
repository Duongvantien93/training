export interface ILogin {
    email: string,
    password: string
}
export interface ITruck {
    id: number,
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

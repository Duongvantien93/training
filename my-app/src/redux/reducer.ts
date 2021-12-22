import { Action } from "redux";
import * as types from "./contants"

export interface User {
    login: boolean;
    cargos: any;
    drivers: any;
}

const initValue: User = {
    login: false,
    cargos: [],
    drivers: []
}

interface UserAction extends Action {
    payload: Partial<any>
    cargos: Partial<any>;
    drivers: Partial<any>
}

export function trucksReducer(state = initValue, action: UserAction): any {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                login: true
            }
        // return action.payload as User
        case types.LOGOUT_REQUEST:
            return {
                ...state,
                login: false
            }
        case types.LIST_CARGOS_DRIVERS:
            return {
                ...state,
                cargos: action.cargos,
                drivers: action.drivers
            }
    }
    return state;
}

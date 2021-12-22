import { Action } from "redux";
import * as types from "./contants"

export interface User {
    login: boolean;
    cargos: any;
    driver: any;
}

const initValue: User = {
    login: false,
    cargos: [],
    driver: []
}

interface UserAction extends Action {
    payload: Partial<any>;
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
        case 'update_user_id':
            return {
                ...state,
                ...action.payload
            }
    }
    return state;
}

import * as types from "./contants";

export function loginRequestAction() {
    return {
        type: types.LOGIN_REQUEST,
    }
}

export function logoutRequestAction() {
    return {
        type: types.LOGOUT_REQUEST,
    }
}
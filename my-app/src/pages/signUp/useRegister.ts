import { useMutation, UseMutationResult } from 'react-query';
import { AxiosResponse } from "axios";
import axiosClient from "../../service/axiosClient";
import { LoginResponse, ILogin } from "../../types/type";

const url = "/auth/register";
const register = (data: ILogin): Promise<AxiosResponse<LoginResponse>> => {
    return axiosClient.post(url, data)
}
const useRegister = (onSuccess: (data: AxiosResponse<LoginResponse>) => void,
    onError: () => void): UseMutationResult<
        AxiosResponse<LoginResponse, any>, any, any, unknown> =>
    useMutation(register, { onSuccess, onError })
export default useRegister
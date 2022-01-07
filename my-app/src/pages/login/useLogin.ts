import { useMutation } from 'react-query';
import { AxiosResponse } from "axios";
import axiosClient from "../../service/axiosClient";
import { LoginResponse, ILogin } from "../../types/type";

const url = "/auth/login";
const login = (data: ILogin) => {
    return axiosClient.post(url, data)
}
const useLogin = (
    onSuccess: (data: AxiosResponse<LoginResponse>) => void,
    onError: (error: string) => void) => useMutation(login, { onSuccess, onError })
export default useLogin
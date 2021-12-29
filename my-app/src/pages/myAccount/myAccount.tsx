import StorageKeys from "../../service/contants";
import { ILogin } from "../../types/type";

export default function MyAccount() {
  let user = localStorage.getItem(StorageKeys.USER);
  let convertUser = user ? JSON.parse(user) : {};
  return <div>My account ::{convertUser.email}</div>;
}

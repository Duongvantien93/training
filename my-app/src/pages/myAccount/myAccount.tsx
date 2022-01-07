import StorageKeys from "../../service/constants";
const MyAccount = () => {
  let user = localStorage.getItem(StorageKeys.USER);
  let convertUser = user ? JSON.parse(user) : {};
  return <div>My account ::{convertUser.email}</div>;
};
export default MyAccount;

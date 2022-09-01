import axios from "axios";
import { useSelector } from 'react-redux';

const BASE_URL = "https://baby-pingviin.herokuapp.com/api/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
// export const GetUser = () => {  
//   const token = useSelector((state) => state.user.currentUser.token)
//     return token}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
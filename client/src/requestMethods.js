import axios from "axios";
import { useNavigate } from "react-router";

const BASE_URL = "http://localhost:5000/api/v1/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyY2JlMjE5NzQ3YTI4NWM0ZTJmMzFiYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Nzc0NDY5OCwiZXhwIjoxNjU4MDAzODk4fQ.7daxD3CSubuHEJPl-IMtp_lguXimAIULd46BbJ-I8PQ";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";



// if(!TOKEN){
//   const navigation = useNavigate();
//   navigation("/login");
// }

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
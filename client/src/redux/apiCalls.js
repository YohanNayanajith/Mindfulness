import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // console.log(res);
    if(res.data.isActivated){
      dispatch(loginSuccess(res.data));
      // alert("Login Success!");
    }else {
      alert("User is deactivated! Please contact system admin");
      dispatch(loginFailure());
    }
  } catch (err) {
    alert("Login Unsuccess!");
    dispatch(loginFailure());
  }
};

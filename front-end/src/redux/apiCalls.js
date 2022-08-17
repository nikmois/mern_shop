import { publicRequest } from "../requestMethods";
import { emptyCart } from "./cartRedux";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"

export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("https://baby-pingviin.herokuapp.com/auth/login",user)
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}
export const logOut = (dispatch) => {
    dispatch(logout());
};

export const emptyAllCart = (dispatch) => {
    dispatch(emptyCart());
};

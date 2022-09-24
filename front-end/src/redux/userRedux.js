import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: null
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload
        },
        loginFailure:(state, action)=>{
            state.isFetching=false;
            console.log(action)
            state.error={
                type: "user/loginFailure", 
                message:action.payload.response.data.message
            };
        },
        logout:(state)=>{
            state.isFetching=false;
            state.currentUser=null;
        },
    },
});

export const {loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer;
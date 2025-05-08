import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser: null,
    loading: false,
    error: false
};

const userSlice= createSlice({
    name:'user',
    initialState,
    //reducers used to change the state of our user
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFailure:(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        logOut:(state)=>{
            state.currentUser=null;
        }
    }
});

export const {signInStart, signInSuccess, signInFailure, logOut}=userSlice.actions;

export default userSlice.reducer;
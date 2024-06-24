import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, saveToLocalStorage } from "../../config/localstorage.js";

const initialState = {
    isLoading: false,
    auth: null,
    isLoggedIn: false,
    isError: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            // console.log(action.payload)
            state.auth = action.payload;
            // console.log(state.auth)
            state.isLoggedIn = true;
            // console.log(state.isLoggedIn)
            if (action.payload.token) {
                saveToLocalStorage("token", action.payload.token);
            }
        },
        authFailure: (state, action) => {   
            state.isLoading = false;
            state.isError = action.payload;
        },
        authLogout: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            // console.log(state.isLoggedIn)
            clearLocalStorage();
        },
    },
});

export const {
    authStart,
    authSuccess,
    authFailure,
    authLogout,
} = AuthSlice.actions;
export default AuthSlice.reducer;
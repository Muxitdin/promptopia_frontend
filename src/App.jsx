import { React, useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearLocalStorage, saveToLocalStorage, getFromLocalStorage } from "./config/localstorage.js";
import { authStart, authSuccess, authFailure } from './redux/slice/authSlice.js';
import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Service from './config/service.js';
import Create from './pages/Create.jsx';
import Update from './pages/Update.jsx';
import './App.css'


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAuthFunction = async () => {
            try {
                dispatch(authStart());
                const { data } = await Service.getAuth();
                // console.log(data)
                dispatch(authSuccess(data));
            } catch (error) {
                dispatch(authFailure(error.response.data))
                console.log(error.response.data)
            }
        };

        if (getFromLocalStorage("token")) {
            getAuthFunction();
        }
    }, []);

    return (
            <div className="wrapper">
                <div className="main">
                    <div className="gradient" />
                </div>
                <div>
                    <Navbar />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create-prompt" element={<Create />} />
                        <Route path="/update-prompt" element={<Update />} />
                    </Routes>
                </div>
            </div>
    )
}

export default App

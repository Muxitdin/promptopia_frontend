import React from 'react'
import s from "./styles/Navbar.module.css"
import logo from "../assets/images/logo.svg"
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from '../redux/slice/authSlice.js'
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isLoggedIn, auth } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(authLogout())
        navigate("/")
        document.location.reload();
    }
    
    return (
        <div className={s.wrapper}>
            <header>
                <div className={s.logo}>
                    <NavLink to="/">
                        <img src={logo} alt="logo" />
                        <span>Promptopia</span>
                    </NavLink>
                </div>
                <div className={s.btns}>
                    {isLoggedIn ? (
                        <>
                            <NavLink to="/create-prompt"><button className={s.button} role="button">Create Prompt</button></NavLink>
                            <a><button onClick={handleLogOut} className={s.logout} role="button">Sign Out</button></a>
                            <NavLink to="/profile"><img className={s.user_icon} src={auth.image} alt="profile" /></NavLink>
                        </>
                    ) : (
                        <NavLink to="/signin"><button className={s.button} role="button">SignIn</button></NavLink>
                    )}

                </div>
            </header>
        </div>
    )
}

export default Navbar
import React from 'react'
import s from "./styles/Navbar.module.css"
import logo from "../assets/images/logo.svg"
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from '../redux/slice/authSlice.js'

function Navbar() {
    const dispatch = useDispatch()
    const { isLoggedIn, auth } = useSelector(state => state.auth)

    const handleLogOut = () => {
        dispatch(authLogout())
        document.location.reload();
    }
    
    return (
        <div className={s.wrapper}>
            <header>
                <div className={s.logo}>
                    <a href="/">
                        <img src={logo} alt="logo" />
                        <span>Promptopia</span>
                    </a>
                </div>
                <div className={s.btns}>
                    {isLoggedIn ? (
                        <>
                            <a href="/create-prompt"><button className={s.button} role="button">Create Prompt</button></a>
                            <a><button onClick={handleLogOut} className={s.logout} role="button">Sign Out</button></a>
                            <a href="/profile"><img className={s.user_icon} src={auth.image} alt="profile" /></a>
                        </>
                    ) : (
                        <a href="/signin"><button className={s.button} role="button">SignIn</button></a>
                    )}

                </div>
            </header>
        </div>
    )
}

export default Navbar
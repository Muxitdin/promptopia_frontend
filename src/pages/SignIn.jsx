import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToLocalStorage } from '../config/localstorage.js'
import axios from 'axios'
import s from "./styles/SignIn.module.css"

function SignIn() {
    const navigate = useNavigate()

    const [existedUserData, setExistedUserData] = useState({
        email: "",
        password: "",
    })

    const handleLoginUser = async (e) => {
        e.preventDefault()
        // console.log(existedUserData)
        try {
            const { data } = await axios.post("https://promptopia-back.onrender.com/api/auth/login", existedUserData)
            // console.log(data);
            saveToLocalStorage("token", data.token);
            navigate("/")
            document.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        setExistedUserData({
            ...existedUserData,
            [e.target.name]: e.target.value
        })
        // console.log(existedUserData)
    }

    return (
        <div className={s.wrapper}>
            <form onSubmit={handleLoginUser} className='backdrop-blur-sm bg-white/30 border-gray-400'>
                <h1>Sign In</h1>
                <input onChange={handleInputChange} name='email' type="email" placeholder='E-mail' />
                <input onChange={handleInputChange} name='password' type="password" placeholder='Password' />
                <button type='submit' className={s.button}>Sign In</button>
            </form>
            <p>hasn't got an account yet? <a href="/signup">Sign Up</a></p>
        </div>
    )
}

export default SignIn
import axios from 'axios'
import { React, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { saveToLocalStorage } from '../config/localstorage.js'
import s from "./styles/SignUp.module.css"


function SignUp() {
    const navigate = useNavigate()

    const [newUserData, setNewUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        image: "",
    })

    const handleCreateNewUser = async (e) => {
        e.preventDefault()
        // console.log(newUserData)
        try {
            const { data } = await axios.post("https://promptopia-back.onrender.com/api/auth/register", newUserData)
            // console.log(data);
            saveToLocalStorage("token", data.token);
            navigate("/")
            document.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e) => {
        setNewUserData({
            ...newUserData,
            [e.target.name]: e.target.value
        })
        // console.log(newUserData)
    }

    const uploadImage = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        const { data } = await axios.post("https://promptopia-back.onrender.com/api/upload-image", formData);
        console.log(data)
        setNewUserData({
            ...newUserData,
            image: data?.imgUrl
        })
    }

    return (
        <div className={s.wrapper}>
            <form className='backdrop-blur-sm bg-white/30 border-gray-400' onSubmit={handleCreateNewUser}>
                <h1>Sign Up</h1>
                <input onChange={handleInputChange} className='p-[10px]' name='fullName' type="fullName" placeholder='User Name' />
                <input onChange={handleInputChange} className='p-[10px]' name='email' type="email" placeholder='E-mail' />
                <input onChange={handleInputChange} className='p-[10px]' name='password' type="password" placeholder='Password' />
                <form className='my-0 py-[10px] px-[5px] rounded-[10px]' action="/profile" method="post" enctype="multipart/form-data">
                    <input onChange={uploadImage} type="file" name="image" id='image' className="block w-full text-sm text-gray-900   cursor-pointe rounded-lg dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                </form>
                <button type='submit' className={s.button}>Sign Up</button>
            </form>
            <p>already has an account? <NavLink to="/signin">Sign In</NavLink></p>
        </div>
    )
}

export default SignUp
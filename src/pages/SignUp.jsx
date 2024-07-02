import axios from 'axios'
import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
            const { data } = await axios.post("http://localhost:5000/api/auth/register", newUserData)
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
        const { data } = await axios.post("http://localhost:5000/api/upload-image", formData);
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
                <input onChange={handleInputChange} name='fullName' type="fullName" placeholder='User Name' />
                <input onChange={handleInputChange} name='email' type="email" placeholder='E-mail' />
                <input onChange={handleInputChange} name='password' type="password" placeholder='Password' />
                <form action="/profile" method="post" enctype="multipart/form-data">
                    <input onChange={uploadImage} type="file" name="image" id='image'/>
                </form>
                <button type='submit' className={s.button}>Sign Up</button>
            </form>
            <p>already has an account? <a href="/signin">Sign In</a></p>
        </div>
    )
}

export default SignUp
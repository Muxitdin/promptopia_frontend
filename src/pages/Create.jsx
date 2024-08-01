import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import s from "./styles/Create.module.css"
import { Toast } from '../config/sweetAlert.js'


function Create() {
    const navigate = useNavigate()
    const { auth } = useSelector(state => state.auth)

    const [newPrompt, setNewPrompt] = useState({
        content: "",
        tag: "",
        author: "",
    })

    useEffect(() => {
        setNewPrompt({ ...newPrompt, author: auth?._id })
    }, [auth])

    // console.log(newPrompt)

    const handleCreateNewPrompt = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post("https://promptopia-back.onrender.com/api/prompts", newPrompt)
            console.log(data)
            Toast.fire({
                icon: 'success',
                title: `${data?.message}`
            })
            navigate("/")
        } catch (error) {
            console.log(error)
            console.log(error.response.data)
        }
    }

    const handleGetInputValue = (e) => {
        setNewPrompt({
            ...newPrompt,
            [e.target.name]: e.target.value
        })
    }

    const handleClickCancel = () => {
        navigate("/")
    }

    return (
        <div className={s.wrapper}>
            <p className={s.header1}>Create Post</p>
            <p className={s.header2}>Create and share amazing prompts with the world, and let your imagination run wild.</p>

            <form className="backdrop-blur-sm bg-white/30"> {/* The form here should be agead of the main gradient */}
                <p className={s.p1}>Your Prompt</p>
                <textarea onChange={handleGetInputValue} name="content" placeholder='Write your prompt here...'></textarea>
                <p className={s.p2}>Tag <span>(#webdevelopment, #idea, #web3)</span></p>
                <input onChange={handleGetInputValue} name="tag" type="text" placeholder='tag' />
                <div className={s.btn_wrapper}>
                    <button onClick={handleClickCancel} className={s.cancelbtn}>Cancel</button>
                    <button className={s.createbtn} type='submit' onClick={handleCreateNewPrompt}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default Create
import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import s from "./styles/Create.module.css"
import { getFromLocalStorage, removeFromLocalStorage } from '../config/localstorage.js'
import { updatePrompt } from '../redux/slice/promptSlice.js'

function Update() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { auth } = useSelector(state => state.auth)
    const prompt = JSON.parse(getFromLocalStorage("singlePrompt"))
    const [currentPrompt, setCurrentPrompt] = useState(prompt)

    console.log(currentPrompt)

    // const [putPrompt, setPutPrompt] = useState({
    //     content: "",
    //     tag: "",
    //     author: "",
    // })

    useEffect(() => {
        setCurrentPrompt({ ...currentPrompt, author: auth?._id })
    }, [auth])

    // console.log(putPrompt)

    const handlePutPrompt = async (e) => {
        e.preventDefault()
        try {
            dispatch(updatePrompt(prompt?._id, currentPrompt))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetInputValue = (e) => {
        setCurrentPrompt({
            ...currentPrompt,
            [e.target.name]: e.target.value
        })
    }

    const handleClickCancel = () => {
        removeFromLocalStorage("singlePrompt")
        navigate("/")
    }

    return (
        <div className={s.wrapper}>
            <p className={s.header1}>Edit Post</p>
            <p className={s.header2}>Edit and share amazing prompts with the world, and let your imagination run wild.</p>

            <form className="backdrop-blur-sm bg-white/30">
                <p className={s.p1}>Your Prompt</p>
                <textarea onChange={handleGetInputValue} value={currentPrompt?.content} name="content" placeholder='Write your prompt here...'></textarea>
                <p className={s.p2}>Tag <span>(#webdevelopment, #idea, #web3)</span></p>
                <input onChange={handleGetInputValue} value={currentPrompt?.tag}  name="tag" type="text" placeholder='tag' />
                <div className={s.btn_wrapper}>
                    <button onClick={handleClickCancel} className={s.cancelbtn}>Cancel</button>
                    <button className={s.createbtn} type='submit' onClick={handlePutPrompt}>Edit</button>
                </div>
            </form>
        </div>
    )
}

export default Update;
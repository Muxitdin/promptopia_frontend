import { React, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromts, deletePrompt } from '../redux/slice/promptSlice.js';
import s from "./styles/Home.module.css"
import { useState } from 'react';
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '../config/localstorage.js';

function Home() {
    const dispatch = useDispatch();
    
    const prompt = JSON.parse(getFromLocalStorage("singlePrompt"))

    useEffect(() => {
        removeFromLocalStorage("singlePrompt")
        const fetchPrompts = async () => {
            try {
                dispatch(fetchAllPromts())
            } catch (error) {
                console.log(error)
            }
        };
        fetchPrompts();
    }, [prompt])

    const [search, setSearch] = useState("")

    return (
        <div className={s.wrapper}>
            <div className={s.hero}>
                <h1 className={s.header1}>Discover & Share</h1>
                <h1 className={s.header2}>Prompts</h1>
                <p className={s.text}>Promptopia is an open-source prompting tool for modern world to discover, create and share creative prompts</p>
                <form className={s.searchbar}>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="search for a tag or a username" />
                </form>
            </div>

            <Feed search={search}/>

        </div>
    )
}

export default Home







export function Feed({ search }) {
    const { prompts, isLoading } = useSelector(state => state.prompt)
    const { auth } = useSelector(state => state.auth)
    const [id, setId] = useState("")

    const dispatch = useDispatch();

    useEffect(() => {
        setId(auth?._id)
    }, [auth])

    const [copied, setCopied] = useState("")

    const handleCopy = (content) => {
        setCopied(content)
        navigator.clipboard.writeText(content);
        setTimeout(() => {
            setCopied("");
        }, 1000)
    }

    const handleEdit = (prompt) => {
        return saveToLocalStorage("singlePrompt", JSON.stringify(prompt))
    }

    const handleDelete = (id) => {
        dispatch(deletePrompt(id));
        window.location.reload();
    }

    return (
        <div className={s.feed_wrapper}>
            {isLoading ? (
                <span className={s.loader}></span>
            ) : (
                <>
                    {prompts?.filter((item) => {
                        return search.toLowerCase() === "" ? item : item.tag.toLowerCase().includes(search.toLowerCase()) || item.author?.fullName.toLowerCase().includes(search.toLowerCase());
                    }).map((prompt) => (
                        <div className={s.prompt} key={prompt._id}>
                            <div className={s.user_info}>
                                <img src={prompt.author?.image} alt="USER" />
                                <div>
                                    <h5>{prompt.author?.fullName}</h5>
                                    <h5>{prompt.author?.email}</h5>
                                </div>
                                <div onClick={() => handleCopy(prompt.content)} className={s.copy}>
                                    {copied === prompt.content ? (
                                        <i className="fa-solid fa-check"></i>
                                    ) : (
                                        <i className="fa-regular fa-copy"></i>
                                    )}

                                </div>
                            </div>
                            <p className={s.content}>{prompt.content}</p>
                            <p className={s.tag}>#{prompt.tag}</p>

                            {id === prompt.author?._id && (
                                <div className="mt-5 flex flex-center gap-4 border-t border-gray-200 pt-3">
                                    <a href="/update-prompt" onClick={() => handleEdit(prompt)}> 
                                        <p className="font-inter text-sm green_gradient cursor-pointer" id={s.edit}>Edit</p>
                                    </a>
                                    <p onClick={() => handleDelete(prompt?._id)} className="font-inter text-sm orange_gradient cursor-pointer" id={s.delete}>Delete</p>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

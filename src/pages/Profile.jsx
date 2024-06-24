import React from 'react'
import s from './styles/Profile.module.css'

function Profile() {
    return (
        <div className={s.wrapper}>
            <p className={s.header1}>My Profile</p>
            <p className={s.header2}>Welcome to your personalized profile page</p>
        </div>
  )
}

export default Profile
import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {

    const currentUser = useSelector(state => state.userReducer.currentUser)
    return (
        <div>
        <h1>{currentUser.firstName}</h1>
            
        </div>
    )
}

export default Profile

import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from "../CSScomponents/Header.module.scss"
import { updateUser } from '../redux/userReducer'

function Header() {

    const dispatch = useDispatch()



    const logOut = (e) => {

        dispatch(updateUser(null))
        localStorage.setItem("crownBlogsUser", null)

    }
    return (
        <header className={styles.header} >

            <Link to="/">
                <img src="./favicon.svg" alt="CrownLogo" />
            </Link>

            <nav>
                <Link to="/">HOME</Link>
                <Link to="/messages">MESSAGES</Link>
                <Link to="/" onClick={logOut}>LOG OUT</Link>
                <Link to="/profile">PROFILE</Link>
            </nav>
            
        </header>
    )
}

export default Header

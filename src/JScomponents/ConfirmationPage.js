import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { updateUser } from "../redux/userReducer";
import styles from "../CSScomponents/Confirmation.module.scss"

function ConfirmationPage() {

   

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const [state, setState] = useState(()=> ({
        attemptedConfirmationCode: "",
        serverMessages: {
            success: "",
            error: ""
        }
    }))


    const confirmAccount = (e)=>{

        e.preventDefault()

        fetch(`${process.env.REACT_APP_API}/account/confirmation`, {
            method: "POST",
            mode: "cors",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: currentUser.email,
                attemptedConfirmationCode: state.attemptedConfirmationCode,
                attemptedDate: new Date().getTime()
            })
        }).then(res => {
            if (res.status === 200){
                return res.json()
            }

            else{
                setState(ps => ({
                    ...ps,
                    loading: false,
                    serverMessages: {
                        ...ps.serverMessages,
                        error:"There Has Been An Unexpected Error, Please Try Again"
                    }
                }))

            }
        }).then(data => {

            if (data.user){
                dispatch(updateUser(data.user))
                localStorage.setItem("crownBlogsUser", JSON.stringify(data.user))
            }

            else{
                setState(ps => ({
                    ...ps,
                    loading: false,
                    serverMessages: {
                        ...ps.serverMessages,
                        error: data.message
                    }
                }))
            }
        })
    }

    const resendCode = () => {
        console.log(currentUser)


        fetch(`${process.env.REACT_APP_API}/account/resendConfirmationCode`, {
                method: "POST",
                mode: "cors",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                email: currentUser.email
                })
        }).then(res => {

            if(res.status === 200){
                return res.json()
            }

            else{
                setState(ps => ({
                    ...ps,
                    loading: false,
                    serverMessages: {
                        ...ps.serverMessages,
                        error: "There Has Been An Unexpected Error, Please Try Again"
                    }
                }))
            }
        }).then(data => {

            dispatch(updateUser(data.user))
            setState(ps => ({
                ...ps,
                loading: false,
                serverMessages: {
                    ...ps.serverMessages,
                    success: data.message
                }
            }))
        })
    }

    const valueChange = (e)=>{
        const {name, value} = e.target

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }
    return (
        <div className={styles.container}>


        <div className={styles.formContainer}>

            <h1>Thank You For Creating An Account</h1>
            <p>To Fully Use This Account, Please Confirm The Confirmation Code Sent To The Email: {currentUser.email}</p>

            {state.serverMessages.success ? <p style={{color: "green"}}>{state.serverMessages.success}</p> : false}
            {state.serverMessages.error ? <p style={{color: "red"}}>{state.serverMessages.error}</p> : false}

            <form className={styles.form} onSubmit={confirmAccount} >

                <input type="text" name="attemptedConfirmationCode" placeholder="Confirmation Code" required onChange={valueChange} />
                <button type="submit">CONFIRM</button>

            </form>

            <button className={styles.reSendBtn} onClick={resendCode}>Resend Code</button>
        </div>
            
        </div>
    )
}

export default ConfirmationPage

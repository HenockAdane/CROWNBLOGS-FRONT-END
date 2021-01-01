import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from "../CSScomponents/SignUp.module.scss"
import { updateUser } from '../redux/userReducer'
import Loader from './Loader'


function SignUp() {

    const dispatch = useDispatch()

    const [state, setState] = useState(()=> ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
        loading: false,
        serverMessages: {
            success: "",
            error:""
        }


    }))

    const onSubmit = (e)=> {
        e.preventDefault()

        //tests that only uppercase and lower case letters are allowed
        if (/^[a-zA-Z]+$/.test(state.firstName) && /^[a-zA-Z]+$/.test(state.lastName)){

            if(state.password === state.confirmPassword){


                if (state.password !== state.email){

                    setState(ps => ({
                        ...ps,
                        loading: true
                    }))
            
                    fetch(`${process.env.REACT_APP_API}/account/signUp`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            firstName: state.firstName,
                            lastName: state.lastName,
                            email: state.email,
                            password: state.password,
                            dateOfBirth: state.dateOfBirth,
                            gender: state.gender,
                            createdAt: new Date()
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
                        console.log(data)
            
                        if (data.newUser){
                            console.log("user")
                            dispatch(updateUser(data.newUser))
                            localStorage.setItem("crownBlogsUser", JSON.stringify(data.newUser))
                            setState(ps => ({
                                ...ps,
                                loading: false
                            }))
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
                    }).catch(err => console.log(err))

                    

                }

                else{

                    setState(ps => ({
                        ...ps,
                        serverMessages: {
                            ...ps.serverMessages,
                            error: "Your Password And Email Should Not Match "
                        }
                    }))
                }

            }

            else{

                setState(ps => ({
                    ...ps,
                    serverMessages: {
                        ...ps.serverMessages,
                        error: "Your Password And Confirmed Password Should Be The Same"
                    }
                }))

            }

        }
        
        else{
            setState(ps => ({
                ...ps,
                serverMessages: {
                    ...ps.serverMessages,
                    error: "Your Names Should Only Contain Letters"
                }
            }))
        }

        
    }


    const valueChange = (e)=> {
        const {name, value} = e.target
        console.log(value)

        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    return (
        <div className={styles.container}>


        {state.loading ? <Loader fullScreen={true} /> : false}


            <form className={styles.form} onSubmit={onSubmit}>

            {state.serverMessages.error ? <p style={{color: "red"}}>{state.serverMessages.error}</p> : false}

                <div className={styles.nameContainer}>
                    <input type="text" name="firstName" placeholder="First Name" onChange={valueChange} />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={valueChange} />
                </div>

                <input type="email" name="email" placeholder="Email" onChange={valueChange} />
                <input type="password" name="password" placeholder="Password" onChange={valueChange} value={state.password} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={valueChange} value={state.confirmPassword} />
                    
                    <div className={styles.dateContainer}>
                        <input type="date" name="dateOfBirth" required value={state.dateOfBirth} onChange={valueChange} />
                    </div>



                <div className={styles.genderContainer}>

                    <div className={styles.genderOptions}>
                        <p>Male</p>
                        <input type="radio" name="gender" value="male" required onClick={valueChange} />
                    </div>

                    <div className={styles.genderOptions}>
                        <p>Female</p>
                        <input type="radio" name="gender" value="female" required onClick={valueChange}/>
                    </div>

                    <div className={styles.genderOptions}>
                        <p>Other</p>
                        <input type="radio" name="gender" value="other" required onClick={valueChange}/>
                    </div>

                    
                </div>

                <input style={{cursor: "pointer"}} type="submit" value="SIGN UP" />
            
                <hr/>
                <Link to="/signIn">SIGN IN</Link>
            </form>
            
        </div>
    )
}

export default SignUp

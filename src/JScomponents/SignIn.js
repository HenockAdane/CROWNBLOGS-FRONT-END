import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from "../CSScomponents/SignIn.module.scss"
import { updateUser } from '../redux/userReducer'
import Loader from './Loader'

function SignIn() {

    const dispatch = useDispatch()

    const [state, setState] = useState(()=> ({
        email: "",
        password: "",
        loading: false
    }))
    
    console.log(process.env.REACT_APP_API)

    const onSubmit = (e)=> {
        e.preventDefault()

        setState(ps => ({
            ...ps,
            loading: true
        }))

        fetch(`${process.env.REACT_APP_API}/account/signIn`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: state.email,
                password: state.password
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

            if (data.user){
                console.log(1)
                localStorage.setItem("crownBlogsUser", JSON.stringify(data.user))
                console.log("user")
                setState(ps => ({
                    ...ps,
                    loading: false,
                }))
                dispatch(updateUser(data.user))
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

    const valueChange =(e) => {

        
        //destructuring the name and value properties from the event target and using them to update the respective states with the same property name as the "name" variable value
        const {name, value} = e.target
        setState(ps => ({
            ...ps,
            [name]: value
        }))
    }

    
    return (
        <div className={styles.container}>

        {state.loading ? <Loader fullScreen={true} /> : false}


        <form className={styles.form} onSubmit={onSubmit}>

            <input type="text" name="email" placeholder="Email" value={state.email} required onChange={valueChange} />
            <input type="password" name="password" placeholder="Password" value={state.password} required onChange={valueChange}/>

            <input style={{cursor: "pointer"}} type="submit" value="SIGN IN" />
            
            <hr/>
            <Link to="/signUp">SIGN UP</Link>

        </form>


            
        </div>
    )
}

export default SignIn

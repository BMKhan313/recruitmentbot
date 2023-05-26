import React,{ useContext } from 'react'

import {navigate} from "gatsby";


import loading_gif from "./typing.gif"

// CSS Module
import * as classes from './login.module.css'
// Context Store
import {store} from "src/context/store"

// Node Packages
import Swal from 'sweetalert2'

import { API_URL } from 'src/constants'
import { COMPANY_CODE } from '../../../constants';

const LoginComponent = () => {
    // context variables
    const globalState = useContext(store)
    const { dispatch } = globalState
    // console.log(dispatch)



    const [loader,setLoader] = React.useState(false)
    
    const openRegisterForm = () => {

        // commented code was for fading
        // let form = document.getElementById("login-form");
        // form.classList.remove("show");
        // form.classList.add("hide");
        // setTimeout(()=>{
            // switch to register form context usage
            dispatch({type:'IS_REGISTER_OPEN',payload:true}) 
        // },200)  
    }
    // commented code was for fading
    // useEffect(() => {
        // let form = document.getElementById("login-form");
        // setTimeout(()=>{
            // form.classList.remove("hide");
            // form.classList.add("show");
        // },200)  
    // }, [])

    const on_submit = () => {
       

        let email = document.getElementById('email_input').value
        let password = document.getElementById('password_input').value

        if(email === "" || password === ""){
            Swal.fire({
                icon: 'error',
                title: 'Required Data Missing',
                text: 'Please fill data in all fields',
            })
            return;
        }
        setLoader(true);
       
        fetch(`${API_URL}/recruitment/login`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:email,
                password:password,
                company_code: COMPANY_CODE
            })
        })
        .then(response=>{
            return response.json()
        })
        .then((data)=>{
  
            console.log(data)
            // setLoader(false)
            if(data.success){
                console.log(data)
                // Swal.fire({
                //     position: 'middle',
                //     icon: 'success',
                //     title: data.msg,
                //     showConfirmButton: false,
                //     timer: 1500
                // })
                // dispatch({
                //     type:'USER_LOGGED_IN',payload:{
                //         rec_id:data.user.id,
                //         rec_email:data.user.email,
                //         rec_token:data.token
                //     }}) 
                // navigate(
                //     "/recruitment/chat",
                //     {
                //       state:{
                //         token:data.token,
                //         user:data.user,
                //       }
                //     }
                //   )
            }
            else{
                Swal.fire({
                    position: 'middle',
                    icon: 'error',
                    title: data.error,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })

    }

    return(<React.Fragment>

        <div id="login-form">
            <header>
                <h1 className={classes.h1}>Login Form</h1>
            </header>
            <div className={classes.container}>
                <label className={classes.label} htmlFor="email_input">
                    E-Mail
                    <input type="text" id="email_input" required/>
                </label>
                <label className={classes.label} htmlFor="password_input">
                    Password
                    <input type="password" id="password_input" required/>
                </label>
                {
                    loader === true?
                    <button>
                    <img src={loading_gif} className={classes.loading_gif} alt="loading"/>
                    </button>
                    :
                    <button onClick={on_submit}>Login</button>
                }
                
                <p>
                    <span onClick={openRegisterForm}>Create new Accounthfsjdgsbg</span>
                </p>
            </div>
        </div>  
        </React.Fragment>
    )

}

export default LoginComponent
import React, { useContext } from 'react'
import * as classess from './updated_login.module.css'
import {store} from "src/context/store"
import Swal from 'sweetalert2'
import {navigate} from "gatsby";
import { API_URL } from 'src/constants'
import gif from './typing.gif'
import { COMPANY_CODE } from '../../../constants';
const Login = () =>{
    const globalState = useContext(store)
    const { dispatch } = globalState
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [show,setShow] = React.useState(false)
    const getEmailAddress = (e) =>{
        setEmail(e.target.value)
    }
    const getPassword = (e) =>{
        setPassword(e.target.value)
    }
    
    const HandleSubmit = (e) =>{
        e.preventDefault()
        setShow(true)

        //ANCHOR - Refactored
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
        .then((res)=>{
            // console.log(data)

            const {data} = res
            if(res.success){
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch({
                    type:'USER_LOGGED_IN',payload:{
                        rec_id:data.user.id,
                        rec_email:data.user.email,
                        rec_token:data.token
                    }}) 
                navigate(
                    "/recruitment-bot/recruitment-user-chats",
                    {
                      state:{
                        token:data.token,
                        user:data.user,
                        red_url:window.location.href
                      }
                    }
                  )
                  setPassword('')
                  setEmail('')
            }
            else{
                setShow(false)
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

    const OpenRegisterForm = () =>{
        dispatch({type:'IS_REGISTER_OPEN',payload:true}) 
        document.getElementById('test_footer').style.bottom="-100px";
    }
    return <React.Fragment>
        <div className={`${classess.inline_div} ${classess.adjust_spacing}`}>
            <div className={classess.login_heading}>
                        Login
            </div>
            <div className={classess.login_text}>
            Please log in with your credentials. Remember to never share your password with anyone.
            </div>
        </div>
        <div className={classess.inline_div}>
            <div className={classess.login_form}>
                        <form onSubmit={HandleSubmit}>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Email:
                                </label>
                                <input type="text" name="email" placeholder="Enter Email Address" className={classess.input_styling} value={email} onChange={getEmailAddress} required/>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Password:
                                </label>
                                <input type="password" name="password" placeholder="Enter Password" className={classess.input_styling} value={password} onChange={getPassword} required/>
                            </div>
                            {
                                    show === false? <div className={classess.input_fields}>
                                         <input type="submit" name="login" value="Login"  className={classess.submit_button}/>
                                        </div>
                           :
                            <img src={gif} alt="laoding" className={classess.gif_styling}/>
                                    
                                }
                               
                
                        </form>
                        <div className={classess.new_account} onClick={OpenRegisterForm}>
                            Create New Account
                        </div>
            </div>
        </div>
    </React.Fragment>
}
export default Login
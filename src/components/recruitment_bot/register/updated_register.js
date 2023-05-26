import React, { useContext, useEffect,useReducer } from 'react'
import * as classess from './upated_register.module.css'
import {store} from "src/context/store";
import {initCountryList,handleCountryChange,handleStateChange} from "src/utils"
import Swal from 'sweetalert2'
import { API_URL } from 'src/constants'
import gif from '../login/typing.gif'
const Register = () =>{
    const [email,setEmailAddress] = React.useState('')
    const [mobileNo,setMobileNo] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [confirmPassword,setConfirmPassword] = React.useState('')
    const [companyCode,setComapnyCode] = React.useState('')
    const [cnicNo,setCnicNo] = React.useState('')
    const [show,setShow] = React.useState(false)
    const reducer = (prevState, updatedProperty) => ({
        ...prevState,
        ...updatedProperty,
      })
    const globalState = useContext(store)
    const { dispatch } = globalState
    const initState = {
        Country: "",
        renderCountriesList: [],
        State: "",
        renderStatesList: [],
        City: "",
        renderCitiesList: [],
    }
   
  
    const [state, setState] = useReducer(reducer, initState)
    useEffect(()=>{
        initCountryList(setState)
    },[])
    const openLoginForm = () =>{
        dispatch({type:'IS_REGISTER_OPEN',payload:false}) 
        document.getElementById('test_footer').style.bottom="0px";
    }
    const handleCityChange = e => {
        setState({
        City: e.target.value,
        })
    }
    const getEmailAddress = (e) =>{
            setEmailAddress(e.target.value)
    }
    const getMobileNo = (e) =>{
        setMobileNo(e.target.value)
    }
    const getPassword = (e) =>{
        setPassword(e.target.value)
    }
    const getConfirmPassword = (e) =>{
        setConfirmPassword(e.target.value)
    }
    const getCompanyCode = (e) =>{
        setComapnyCode(e.target.value)
    }
    const getCnicNo = (e) =>{
        setCnicNo(e.target.value)
    }
    const HandleSubmit = async (e) =>{
        e.preventDefault()
        setShow(true)
        let file = document.getElementById('file').value;
        let formData = null;
        if(file !== ''){
            const fileInput = document.querySelector("input[name='cv_uploading']") ;
            formData = new FormData()
            formData.append('file',fileInput.files[0])
        }
        // console.log(formData)
        let user_cnic = cnicNo.replace("-","")
        //default value when user don't enter mobile no
        let mobile_no
        if(mobileNo === ''){
            mobile_no = 12345678910
        }
        else{
            mobile_no = mobileNo
        }

        
        if(password !== confirmPassword){
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: "Password Don't Match",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText:"CLOSE"
            })
        }
        else{
            fetch(`${API_URL}/recruitment/register`,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                    contact_no:mobile_no,
                    country:state.Country,
                    state:state.State,
                    city:state.City,
                    company_code:companyCode,
                    cnic_no:cnicNo,
                })
                
            })
            .then(response=>{
                return response.json()
            })
            .then(async(data)=>{
                // console.log(data)
                if(data.success){
                    if(file!==''){
                        const file_to_upload = await fetch(`${API_URL}/resume-upload?email=${email}`,{
                            method:'POST',
                            headers:{
                                'Accept':'application/json',
                            },
                            body:formData
                        }).then(response=>{
                            return response.json()
                        }).then((data)=>{
                            // console.log(data)
                            if(data['error']){
                                Swal.fire({
                                    icon:'info',
                                    text:'You have successfully been registered but your resume did not upload properly. Please log in with your email and password and upload your resume again.'
                                })
                                setShow(false)
                                openLoginForm()
                            }
                            else{
                                if(data.success === true){
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        // title: data.message,
                                        title: 'Thank you for registering with us. Please login to continue',
                                        showConfirmButton: true,
                                        timer: 2000
                                    })
                                    setShow(false)
                                    openLoginForm()
                                }
                                else{
                                    Swal.fire({
                                        icon:'error',
                                        text:'Something went wrong'
                                    })
                                    setShow(false)
                                }
                            }
                           
                        })
                    }
                    else{
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            // title: data.message,
                            title: 'Thank you for registering with us. Please login to continue',
                            showConfirmButton: true,
                            timer: 2000
                        })
                        openLoginForm()
                    }
                    
                }else{
                    setShow(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: "This email address is already in use.",
                        showConfirmButton: false,
                        showCancelButton: true,
                        cancelButtonColor: '#d33',
                        cancelButtonText:"CLOSE"
                    })
                }
                
            })
        }
    }
    return<React.Fragment>
           <div className={`${classess.inline_div} ${classess.adjust_spacing}`}>
            <div className={classess.login_heading}>
                        Register
            </div>
            <div className={classess.register_text}>
            Welcome! We trust that you are applying for a job, internship or apprenticeship and your organization has shared this link with you as part of the hiring process.
            <br/>
            To get started you need to:
            <ul className={classess.list_styling}>
                <li>
                Register yourself & log in
                </li>
                <li>
                Answer questions generated as accurately as possible till you receive your result
                </li>
            </ul>
            This whole exercise should not take more than 10 min.<br/>Best of luck!
            </div>
        </div>
        <div className={classess.inline_div}>
            <div className={classess.login_form}>
                        <form onSubmit={HandleSubmit}>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Email:
                                </label>
                                <input type="text" name="email" placeholder="Enter Email Address" className={classess.input_styling} required value={email} onChange={getEmailAddress}/>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Mobile No:
                                </label>
                                <input type="number" name="mobile_no" placeholder="Enter Mobile No" className={classess.input_styling}  value={mobileNo} onChange={getMobileNo}/>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    CNIC No:
                                </label>
                                <input type="number" name="cnic_no" placeholder="Enter Your CNIC" className={classess.input_styling} required value={cnicNo} onChange={getCnicNo}/>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Password:
                                </label>
                                <input type="password" name="password" placeholder="Enter Password" className={classess.input_styling}  required value={password} onChange={getPassword}/>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Confirm Password:
                                </label>
                                <input type="password" name="confirm_password" placeholder="Retype Password" className={classess.input_styling} required value={confirmPassword} onChange={getConfirmPassword}/>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Company Code:
                                </label>
                                <select className={classess.input_styling} required value={companyCode} onChange={getCompanyCode}>
                                    <option value="" disabled></option>
                                    <option value="Bot0092">Bot0092-Botnostic Solutions</option>
                                </select>
                                {/* <input type="text" name="comapny_code" placeholder="Enter Company Code" /> */}
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Country:
                                </label>
                                <select className={classess.input_styling}
                                 onChange={(e)=>handleCountryChange(e,setState)}
                                 name="country"
                                 id="countryId"
                                required>
                             <option value="">Select Country</option>
                              {state.renderCountriesList}
                                </select>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    State:
                                </label>
                                <select
                                        className={classess.input_styling}
                                        onChange={(e)=>handleStateChange(e,state,setState)}
                                        required
                                        name="state_sub"
                                        value={state.State}
                                      >
                                        <option value="">Select State</option>
                                        {state.renderStatesList}
                                      </select>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    City:
                                </label>
                                <select
                                        className={classess.input_styling}
                                        onChange={handleCityChange}
                                        required
                                        name="city_sub"
                                        value={state.City}
                                      >
                                        <option value="">Select City</option>
                                        {state.renderCitiesList}
                                      </select>
                            </div>
                            <div className={classess.input_fields}>
                                <label className={classess.label_styling}>
                                    Resume/CV:
                                </label>
                                <input type="file" name="cv_uploading" id="file" className={classess.input_styling_file_uploading}  />
                            </div>
                           
                            
                            {
                                    show === false? <div className={classess.input_fields}>
                                         <input type="submit" name="login" value="Register"  className={classess.submit_button}/>
                                        </div>
                           :
                            <img src={gif} alt="laoding" className={classess.gif_styling}/>
                                    
                                }
                        </form>
                        <div className={classess.new_account}  onClick={openLoginForm} >
                             Already have an account?
                        </div>
            </div>
        </div>
    </React.Fragment>
}
export default Register
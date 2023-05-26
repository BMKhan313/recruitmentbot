import React,{ useContext,useEffect,useReducer } from 'react';

import * as classes from './register.module.css';

import "src/styles/global.css";

import {store} from "src/context/store";

import csc_2 from '../../../data/countrystatecity.json'
import Swal from 'sweetalert2'
import { API_URL } from 'src/constants'
// import { navigate } from 'gatsby';

const RegisterComponent = (props) => {

    // Country State City States Start
    const [Country,setCountry] = React.useState("")
    const [State,setState] = React.useState("")
    const [City,setCity] = React.useState("")

    const [renderCountries,setCountryList] = React.useState([])
    const [renderStates,setStateList] = React.useState([])
    const [renderCities,setCityList] = React.useState([])

    const [stateIndex,setStateIndex] = React.useState("")
    // Country State City States End

    const reducer = (prevState, updatedProperty) => ({
        ...prevState,
        ...updatedProperty,
    });

    const validator_init = {
        isEmail:false,
        isMobile:false,
        isPassword:false,
        isPasswordConfirm:false
    }

    const [validator, setValidator] = useReducer(reducer, validator_init);  

    const globalState = useContext(store)
    const {dispatch} = globalState

    const openLoginForm = () => {
        // let form = document.getElementById("register-form");
        // form.classList.remove("show");
        // form.classList.add("hide");
        // setTimeout(()=>{
            dispatch({type:'IS_REGISTER_OPEN',payload:false}) 
        // },200)  
        
    }

    const on_submit = () => {
        if(validator.isEmail === false || validator.isMobile === false || validator.isPassword === false){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Please Enter Data in All The Required Fields",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText:"CLOSE"
            })
            return;
        }
        if(Country === "" || State === "" || City === ""){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Missing Address",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText:"CLOSE"
            })
            return;
        }
        let email = document.getElementById('email_input').value
        let contact_no = document.getElementById('number_input').value
        let password = document.getElementById('password_input').value
        let password_confirm = document.getElementById('password_confirm_input').value

        if(password !== password_confirm){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Passwords Do Not Match",
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText:"CLOSE"
            })
            return
        }
        //ANCHOR - Refactored - register
        fetch(`${API_URL}/recruitment/register`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                email:email,
                password:password,
                contact_no:contact_no,
                country:Country,
                state:State,
                city:City
            })
        })
        .then(response=>{
            return response.json()
        })
        .then((res)=>{
            const {data} = res
            if(res.success){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    // title: data.message,
                    title: 'Thanks for Registration.Please Login to Continue',
                    showConfirmButton: true,
                    timer: 2000
                })
                openLoginForm()
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "The Email Has Already Been Taken",
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    cancelButtonText:"CLOSE"
                })
            }
            
        })
        
        // console.log(email,contact_no,password,password_confirm,Country,State,City)
    }

    const handleCountryChange = (e) => {
        if(e.target.value === ""){
            setStateList([])
            setCityList([])
            return
        }
        setCountry(e.target.value)
        setStateList([])
        setCityList([])
        let temp = []
        if(csc_2[e.target.selectedIndex-1]["states"] === undefined){
            temp.push(<option key={e.target.value} value={e.target.value} >{e.target.value}</option>)
            setStateList(temp)
            setCityList(temp)
        }else{
            let states_arr = Object.keys(csc_2[e.target.selectedIndex-1]["states"])
            setStateIndex(e.target.selectedIndex-1)
            states_arr.forEach((state,index)=>{
                temp.push(<option key={index}  value={state} >{state}</option>)
            })
            setStateList(temp)
        }
        
        
    }

    const handleStateChange = (e) => {
        if(e.target.value === "" || stateIndex=== ""){
            setState(e.target.value)
            setCity(e.target.value)
            setCityList([])
            return
        }
        setState(e.target.value)
        let temp = []
        let cities = csc_2[parseInt(stateIndex)]["states"][e.target.value]
        // console.log(cities)
        if(cities === undefined){
            let s = []
            s.push(<option key={e.target.value}  value={e.target.value} >{e.target.value}</option>)
            setCityList(s)
        }else{
            cities.forEach((state,index)=>{
                temp.push(<option key={index}  value={state} >{state}</option>)
            })
            setCityList(temp)
        }

        
    }

    const handleContactNumber = (e) => {
        let value = e.target.value
        if(value.indexOf("-") === 0 || value.length > 13 || value.length < 11){
            setValidator({
                isMobile:false
            })
            e.target.style.border = "2px solid red";
        }else{
            setValidator({
                isMobile:true
            })
            e.target.style.border = "2px solid green";
        }
    }

    const handleEmail = (e) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let check = re.test(String(e.target.value).toLowerCase())
        if(!check){
            setValidator({
                isEmail:false
            })
            e.target.style.border = "2px solid red";
        }else{
            setValidator({
                isEmail:true
            })
            e.target.style.border = "2px solid green";
        }
    }

    const handlePassword = (e) => {
        if(e.target.value.length < 4){
            setValidator({
                isPassword:false,
                isPasswordConfirm:false
            })
            e.target.style.border = "2px solid red";
            document.getElementById("password_confirm_input").style.border = "2px solid red";
        }else{
            setValidator({
                isPassword:true
            })
            e.target.style.border = "2px solid green";
            let pass = document.getElementById("password_confirm_input").value
            if(e.target.value !== pass){
                setValidator({
                    isPasswordConfirm:false
                })
                document.getElementById("password_confirm_input").style.border = "2px solid red";
            }else{
                setValidator({
                    isPasswordConfirm:true
                })
                document.getElementById("password_confirm_input").style.border = "2px solid green";
            }
        }
    }
    const handlePasswordConfirm = (e) => {
        let pass = document.getElementById("password_input").value
        if(e.target.value !== pass){
            setValidator({
                isPasswordConfirm:false
            })
            e.target.style.border = "2px solid red";
        }else{
            setValidator({
                isPasswordConfirm:true
            })
            e.target.style.border = "2px solid green";
        }
    }

    useEffect(() => {
        // let countries = csc.getAllCountries()
        // let form = document.getElementById("register-form");
        // setTimeout(()=>{
        //     form.classList.remove("hide");
        //     form.classList.add("show");
        // },200)  
        
        let temp = []
        csc_2.forEach(country=>{
            temp.push(<option key={country.id} value={country.name} id={country.id}>{country.name}</option>)
        })

        setCountryList(temp)

        // const geodata_script = document.createElement("script");
        // geodata_script.src = "https://geodata.solutions/includes/countrystatecity.js";
        // geodata_script.async = true;
        // geodata_script.rel = "preconnect";
        // document.body.appendChild(geodata_script);
    }, [])

    return(
        <div id="register-form" >
            <header>
                <h1 className={classes.h1}>Register Form</h1>
            </header>
            <div className={classes.container}>
                <label className={classes.label} htmlFor="email_input">
                    E-Mail
                    <input onChange={handleEmail} type="text" id="email_input" required/>
                </label>
                <label className={classes.label} htmlFor="number_input">
                    Mobile No
                    <input onChange={handleContactNumber} type="number" id="number_input" required/>
                </label>
                <label className={classes.label} htmlFor="password_input">
                    Password
                    <input onChange={handlePassword} type="password" id="password_input" required/>
                </label>
                <label className={classes.label} htmlFor="password_confirm_input">
                    Confirm Password
                    <input onChange={handlePasswordConfirm} type="password" id="password_confirm_input" required/>
                </label>

                <fieldset>
                    <legend>Address</legend>
                    <select onChange={handleCountryChange} name="country" id="countryId" className="countries">
                        <option value="" >Select Country</option>
                        {renderCountries}
                    </select>
                    <select onChange={handleStateChange} name="state" id="stateId" className="states">
                        <option value="" >Select State</option>
                        {renderStates}
                    </select>
                    <select onChange={(e) => setCity(e.target.value)} name="city" id="cityId" className="cities">
                        <option value="" >Select City</option>
                        {renderCities}
                    </select>
                </fieldset>
                
                <button onClick={on_submit}>Register</button>
                <span onClick={openLoginForm}>Already have an Account?</span>
            </div>
        </div>  
    )

}

export default RegisterComponent
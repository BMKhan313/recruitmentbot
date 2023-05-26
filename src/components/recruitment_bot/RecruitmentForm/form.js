import React, { useContext, useEffect, useReducer } from "react"
import Swal from "sweetalert2"
import swal from "sweetalert"
import { API_URL } from "src/constants"
import * as classess from "./form.module.css"
import * as classes from "./SignUpForm.module.css"
import { navigate } from "gatsby-link"
import { store } from "src/context/store"
import {
  initCountryList,
  handleCountryChange,
  handleStateChange,
} from "src/utils"
import close_button from "./static/close.png"
import ResumeUpload from "../resume_upload/resume_upload"
import { clog } from "../../../utils"
import { COMPANY_CODE } from "../../../constants"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  loginSchema,
  signUpSchema,
  validateEmail,
} from "../../../helpers/FormSchema"
import Loader from "./static/loader1.gif"

const Recruitment_Form = () => {
  const initState = {
    Country: "",
    renderCountriesList: [],
    State: "",
    renderStatesList: [],
    City: "",
    renderCitiesList: [],
  }
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  })
  const [login_email, setLoginEmail] = React.useState("")
  const [login_password, setLoginPassword] = React.useState("")
  const [state, setState] = useReducer(reducer, initState)
  const [showButton, SetShowButton] = React.useState(false)
  const [PerfectAsessment, setPerfectAssessment] = React.useState("perfect")
  const [openform, SetOpenForm] = React.useState([])
  const [formshow, SetFormShow] = React.useState(true)
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [cnic, setCnic] = React.useState("")
  const [loginEmail, getLoginEmail] = React.useState("")
  const [loginPassword, getLoginPassword] = React.useState("")
  const [loading, SetLoading] = React.useState(false)
  const [isLoading, setisLoading] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [resumeFile, setresumeFile] = React.useState("")
  const [resumeData, setresumeData] = React.useState({})

  useEffect(() => {
    initCountryList(setState)
  }, [])
  const HandleSubmit = async values => {
    const { email, phone, cnic, password, confirm_password } = values
    SetLoading(true)

    // let user_cnic = cnic.replace("-", "")

    // console.log({
    //   email: email,
    //   password: password,
    //   contact_no: phone,
    //   country: state.Country,
    //   state: state.State,
    //   city: state.City,
    //   company_code: COMPANY_CODE,
    //   cnic_no: cnic,
    // })
    // let mobile_no
    // if (phone === "") {
    //   mobile_no = 12345678910
    // } else {
    //   mobile_no = phone
    // }

    if (password !== confirm_password) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Password Don't Match",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "CLOSE",
      })
      SetLoading(false)
    } else {
      SetLoading(true)

      //ANCHOR - Refactored - register
      fetch(`${API_URL}/recruitment/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          contact_no: phone,
          country: state.Country,
          state: state.State,
          city: state.City,
          company_code: COMPANY_CODE,
          cnic_no: cnic,
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(async res => {
        const {data} = res
          // console.log(data)
          if (res.success) {
            if (resumeFile !== "") {
              console.log("uploading resume")
              const file_to_upload = await fetch(
                `${API_URL}/resume-upload?email=${email}`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                  },
                  body: resumeData,
                }
              )
                .then(response => {
                  return response.json()
                })
                .then(data => {
                  if (data["error"]) {
       
                    SetFormShow(false)
                    Swal.fire({
                      icon: "info",
                      text:
                        "You have successfully been registered but your resume did not upload properly. Please log in with your email and password and upload your resume again.",
                    })
                    SetLoading(false)
                  } else {
                    if (data.success === true) {
                      console.log("uploaded resume", data)
                      SetFormShow(false)
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        // title: data.message,
                        title:
                          "Thank you for registering with us. Please login to continue",
                        showConfirmButton: true,
                        timer: 2000,
                      })
                      SetLoading(false)
                    } else {
                      SetLoading(false)
                      Swal.fire({
                        icon: "error",
                        text: "Something went wrong",
                      })
                    }
                  }
                })
            } else {
              console.log("resume not uploaded")
              SetFormShow(false)
              Swal.fire({
                position: "center",
                icon: "success",
                // title: data.message,
                title: "You have successfully been registered!",
                text:
                  "But your resume did not upload properly. Please log in with your email and password and upload your resume again.",
                showConfirmButton: true,
                timer: 2000,
              })
              SetLoading(false)
            }
            getLoginEmail(email)
            getLoginPassword(password)
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Registration Failed",
              text: data[0],
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonColor: "#d33",
              cancelButtonText: "CLOSE",
            })
            SetLoading(false)
          }
        })
    }
  }
  const loginUser = values => {
    const { email, password } = values
    // event.preventDefault()
    SetLoading(true)

    //ANCHOR - Refactored - login
    fetch(`${API_URL}/recruitment/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        company_code: COMPANY_CODE,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        // console.log(data)
        const { data } = res
        if (res.success) {
          Swal.fire({
            position: "middle",
            icon: "success",

            showConfirmButton: false,
            timer: 1500,
          })

          navigate("/recruitment-bot/recruitment-user-chats", {
            state: {
              token: res.token,
              user: res.user,
              red_url: window.location.href,
            },
          })
          setLoginEmail("")
          setLoginPassword("")
          // SetLoading(false)
        } else {
          SetLoading(false)
          Swal.fire({
            position: "middle",
            icon: "error",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
      .catch(err => {
        Swal.fire({
          position: "middle",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        })
        SetLoading(false)
      })
  }

  const handleCityChange = e => {
    setState({
      City: e.target.value,
    })
  }

  const getEmail = e => {
    setEmail(e.target.value)
  }
  const handleToggle = e => {
    SetLoading(false)
    let toggle_id = e.target.id
    if (toggle_id === "login_button") {
      document.getElementById("login_button").style.background = "#38c0ca"
      document.getElementById("login_button").style.color = "#ffff"
      document.getElementById("register_button").style.background = "#ffff"
      document.getElementById("register_button").style.color = "#38c0ca"
      SetFormShow(false)
    } else {
      document.getElementById("register_button").style.background = "#38c0ca"
      document.getElementById("register_button").style.color = "#ffff"
      document.getElementById("login_button").style.background = "#ffff"
      document.getElementById("login_button").style.color = "#38c0ca"
      SetFormShow(true)
    }
  }

  const getphone = e => {
    setPhone(e.target.value)
  }
  const getcnic = e => {
    setCnic(e.target.value)
  }
  const OpenForm = e => {
    localStorage.setItem("apply_job_code", e.target.getAttribute("job_code"))

    SetOpenForm(!openform)
  }
  const getPassword = e => {
    setPassword(e.target.value)
  }
  const getConfirmPassword = e => {
    setConfirmPassword(e.target.value)
  }
  const checkLoginEmail = e => {
    getLoginEmail(e.target.value)
  }
  const checkLoginPassword = e => {
    getLoginPassword(e.target.value)
  }
  const uploadResume = e => {
    console.log({ e: e.target.value })
    setresumeFile(e.target.value)
  }
  const handleclose = () => {
    SetLoading(false)
    SetFormShow(true)
    dispatch({ type: "OPEN_FORM" })
  }
  const globalState = useContext(store)
  const { dispatch } = globalState

  const forgot_password = () => {
    if (loginEmail === "") {
      swal("Please provide registered email to reset your password")
      return
    }
    setisLoading(true)
    //TODO -
    fetch(`${API_URL}/recruitment/password/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        url: btoa(window.location.href),
        company_code: COMPANY_CODE,
      }),
    })
      .then(response => {
        setisLoading(false)
        return response.json()
      })
      .catch(function(res) {
        swal(res.data["msg"])
      })
      .then(function(res) {
        swal(res.data["msg"])
      })
  }

  return (
    <React.Fragment>
      {/* .........................................form area ............................. */}
      {globalState.state !== undefined ? (
        globalState.state.openform === true ? (
          <div className={classess.form_div}>
            <div className={classess.translate_btn}>
              <div
                className={classess.login_button}
                id="login_button"
                onClick={handleToggle}
              >
                {" "}
                Login
              </div>
              <div
                className={classess.register_button}
                id="register_button"
                onClick={handleToggle}
              >
                {" "}
                Register{" "}
              </div>
            </div>
            <span className={classess.close} onClick={handleclose}>
              <img src={close_button} loading="lazy"></img>
            </span>

            <div className={classess.form_area}>
              {formshow === true ? (
                <Formik
                  initialValues={{
                    email: "",
                    phone: "",
                    cnic: "",
                    password: "",
                    confirm_password: "",
                    country: "",
                    state: "",
                    city: "",
                  }}
                  validationSchema={signUpSchema}
                  //  onSubmit={values=>console.log({values,{state.Country}})}
                  onSubmit={values => HandleSubmit(values)}
                  //  onSubmit={HandleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form id="register">
                      {/* <div className={classess.inline_input}>
                    <input
                      type="text"
                      name="email"
                      className={classess.div_enter_name}
                      onChange={getEmail}
                      required
                      
                    ></input>
                    <label className={classess.label_setting}>Email</label>
                  </div> */}
                      <br />
                      <>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          validate={validateEmail}
                          // className={classess.inp_input}
                          className={
                            errors.email && touched.email
                              ? classes.inp_input_error
                              : classes.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.email && touched.email ? (
                          <div className={classes.inp_error}>
                            {errors.email}{" "}
                          </div>
                        ) : null}
                      </>
                      {/* <div className={classess.inline_input}>
                    <input
                      type="number"
                      name="phone"
                      className={classess.div_enter_name}
                      onChange={getphone}
                      required
                    ></input>
                    <label className={classess.label_setting}>
                      Contact no.
                    </label>
                  </div> */}
                      <>
                        <Field
                          type="number"
                          name="phone"
                          placeholder="Enter Phone"
                          className={
                            errors.phone && touched.phone
                              ? classes.inp_input_error
                              : classes.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.phone && touched.phone ? (
                          <div className={classes.inp_error}>
                            {errors.phone}{" "}
                          </div>
                        ) : null}
                      </>

                      <>
                        <Field
                          type="number"
                          name="cnic"
                          placeholder="Enter CNIC"
                          className={
                            errors.cnic && touched.cnic
                              ? classes.inp_input_error
                              : classes.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.cnic && touched.cnic ? (
                          <div className={classes.inp_error}>
                            {errors.cnic}{" "}
                          </div>
                        ) : null}
                      </>
                      {/* <div className={classess.inline_input}>
                    <input
                      type="number"
                      name="cnic"
                      className={classess.div_enter_name}
                      onChange={getcnic}
                      required
                    ></input>
                    <label className={classess.label_setting}>CNIC</label>
                  </div> */}
                      <>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                          className={
                            errors.password && touched.password
                              ? classes.inp_input_error
                              : classes.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.password && touched.password ? (
                          <div className={classes.inp_error}>
                            {errors.password}{" "}
                          </div>
                        ) : null}
                      </>
                      <>
                        <Field
                          type="Password"
                          name="confirm_password"
                          placeholder="Confirm Password"
                          className={
                            errors.confirm_password && touched.confirm_password
                              ? classes.inp_input_error
                              : classes.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                          <div className={classes.inp_error}>
                            {errors.confirm_password}{" "}
                          </div>
                        ) : null}
                      </>
                      {/* <div className={classess.inline_input}>
                    <input
                      type="Password"
                      name="password"
                      className={classess.div_enter_name}
                      required
                      onChange={getPassword}
                    ></input>
                    <label className={classess.label_setting}>Password</label>
                  </div> */}
                      {/* <div className={classess.inline_input}>
                    <input
                      type="Password"
                      name="confirm_password"
                      className={classess.div_enter_name}
                      required
                      onChange={getConfirmPassword}
                    ></input>
                    <label className={classess.label_setting}>
                      Confirm Password
                    </label>
                  </div> */}
                      <>
                        <select
                          className={classes.inp_input}
                          onChange={e => handleCountryChange(e, setState)}
                          name="country"
                          id="countryId"
                          required
                        >
                          <option value="" className="options_dropdown">
                            Select Country
                          </option>
                          {state.renderCountriesList}
                        </select>
                      </>
                      <>
                        <select
                          className={classes.inp_input}
                          onChange={e => handleStateChange(e, state, setState)}
                          required
                          name="state_sub"
                          value={state.State}
                        >
                          <option value="" className="options_dropdown">
                            Select State
                          </option>
                          {state.renderStatesList}
                        </select>
                      </>
                      <>
                        <select
                          className={classes.inp_input}
                          onChange={handleCityChange}
                          required
                          name="city_sub"
                          value={state.City}
                        >
                          <option value="" className="options_dropdown">
                            Select City
                          </option>
                          {state.renderCitiesList}
                        </select>
                      </>
                      <br />
                      <br />
                      <ResumeUpload
                        setResumeData={(file, fileInfo) => {
                          setresumeFile(file)
                          setresumeData(fileInfo)
                        }}
                      />
                      {loading === true ? (
                        // <div className={classess.loading_setting}>Loading... </div>
                        <div className={classess.loading_style}>
                          <img src={Loader} style={{ width: "100px" }} />
                        </div>
                      ) : (
                        // <div className={classess.button_register}>
                        //   <input type="submit" name="submit" value="Register" className={classess.input_submit} />
                        // </div>
                        <button type="submit" className={classess.inp_submit}>
                          Register
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginSchema}
                  onSubmit={values => loginUser(values)}
                >
                  {({ errors, touched }) => (
                    <Form id="login">
                      {/* <br /> */}
                      <>
                        <p className={classess.input_label}>Email</p>
                        <Field
                          type="email"
                          name="email"
                          // placeholder="Enter email"
                          validate={validateEmail}
                          onKeyUp={checkLoginEmail}
                          // className={classess.inp_input}
                          className={
                            errors.email && touched.email
                              ? classess.inp_input_error
                              : classess.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.email && touched.email ? (
                          <div className={classess.inp_error}>
                            {errors.email}{" "}
                          </div>
                        ) : null}
                      </>
                      <>
                        <p className={classess.input_label}>Password</p>
                        <Field
                          type="Password"
                          name="password"
                          className={
                            errors.password && touched.password
                              ? classess.inp_input_error
                              : classess.inp_input
                          }
                          autoComplete="off"
                        />
                        {errors.password && touched.password ? (
                          <div className={classess.inp_error}>
                            {errors.password}
                          </div>
                        ) : null}

                        <br />
                      </>

                      {loading === true ? (
                        <div className={classess.loading_setting}>
                          <img src={Loader} style={{ width: "70px" }} />{" "}
                        </div>
                      ) : (
                        // <div className={classess.button_register}>

                        <button type="submit" className={classess.inp_submit}>
                          Submit
                        </button>

                        // </div>
                      )}
                      {isLoading === true ? (
                        // <div className={classess.loading_setting}>Loading... </div>
                        <div className={classess.loading_style}>
                          <img src={Loader} style={{ width: "70px" }} />
                        </div>
                      ) : (
                        <div className={classess.forgot_text_div}>
                          <p
                            className={classess.forgot_text}
                            onClick={forgot_password}
                          >
                            Forgot Password?
                          </p>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        ) : null
      ) : null}
    </React.Fragment>
  )
}

export default Recruitment_Form

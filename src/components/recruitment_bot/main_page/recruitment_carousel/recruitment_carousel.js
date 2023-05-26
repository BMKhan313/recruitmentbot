import React, { useContext, useEffect, useReducer } from "react"

import "react-multi-carousel/lib/styles.css"
// import "react-multi-carousel/lib/styles.css"
import "src/assets/index.css"
import Carousel from "react-multi-carousel"
import * as classess from "./recruitment_carousel.module.css"
import slide1_img from "./static/slide1.png"
import {
  initCountryList,
  handleCountryChange,
  handleStateChange,
} from "src/utils"
import Swal from "sweetalert2"
import swal from "sweetalert"

import computer_img from "./static/computer.png"
import computer_img_webp from "./static/computer.webp"

import meeting_img from "./static/meeting.png"
import meeting_img_webp from "./static/meeting.webp"

import slider_img from "./static/slider_img.png"
import slider_img_webp from "./static/slider_img.webp"

import mobile_slide1 from "./static/mobile_slide1.png"

import { API_URL } from "src/constants"
import { navigate } from "gatsby-link"
import { LazyLoadImage } from "react-lazy-load-image-component"

import { store } from "src/context/store"
import ResumeUpload from "../../resume_upload/resume_upload"
import { COMPANY_CODE } from "../../../../constants"
import { Formik, Form, Field } from "formik"
import {
  loginSchema,
  signUpSchema,
  validateEmail,
} from "../../../../helpers/FormSchema"
import Loader from "./static/loader1.gif"
import * as classes from "./SignUpForm.module.css"

const RecruitmentCarousel = () => {
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [cnic, setCnic] = React.useState("")
  const [login_email, setLoginEmail] = React.useState("")
  const [login_password, setLoginPassword] = React.useState("")
  // const [show,setShow] = React.useState(false)
  const [meeting, SetMeeting] = React.useState([])
  const [loading, SetLoading] = React.useState(false)
  const [isLoading, setisLoading] = React.useState(false)
  const [formshow, SetFormShow] = React.useState(true)
  const [resumeFile, setresumeFile] = React.useState("")
  const [resumeData, setresumeData] = React.useState({})

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
  const forgot_password = () => {
    if (login_email === "") {
      swal("Please provide registered email to reset your password")
      return
    }
    setisLoading(true)
    //REVIEW - Refactored - password-create
    fetch(`${API_URL}/recruitment/password/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login_email,
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
  function headerlogin() {
    SetLoading(false)
    console.log(document.getElementById("login_id"))
    document.getElementById("login_id").style.backgroundColor = "#38C0CA"
    document.getElementById("login_id").style.color = "#ffff"
    document.getElementById("register_id").style.backgroundColor = "#ffff"
    document.getElementById("register_id").style.color = "#38c0ca"
    SetFormShow(false)
  }
  const headerregister = () => {
    SetLoading(false)
    document.getElementById("login_id").style.backgroundColor = "white"
    document.getElementById("login_id").style.color = "#38c0ca"
    document.getElementById("register_id").style.backgroundColor = "#38C0CA"
    document.getElementById("register_id").style.color = "#ffff"
    SetFormShow(true)
  }
  const showMeeting = () => {
    dispatch({ type: "HANDLE_SUBMIT" })
    const head = document.querySelector("head")
    const script = document.createElement("script")
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    )
    head.appendChild(script)
  }
  const OpenForm = e => {
    localStorage.setItem("apply_job_code", e.target.getAttribute("job_code"))
    // sessionStorage.setItem('career_name',e.target.getAttribute('career_name'))
    dispatch({ type: "OPEN_FORM" })
  }

  const getPassword = e => {
    setPassword(e.target.value)
  }
  const getConfirmPassword = e => {
    setConfirmPassword(e.target.value)
  }
  const getEmail = e => {
    setEmail(e.target.value)
  }
  const getphone = e => {
    setPhone(e.target.value)
  }
  const getcnic = e => {
    setCnic(e.target.value)
  }
  const getLoginEmail = e => {
    setLoginEmail(e.target.value)
  }
  const getLoginPassword = e => {
    setLoginPassword(e.target.value)
  }

  const [state, setState] = useReducer(reducer, initState)
  useEffect(() => {
    initCountryList(setState)
    // console.log('abc')
  }, [])

  const handleCityChange = e => {
    setState({
      City: e.target.value,
    })
  }

  const [play, setPlay] = React.useState(true)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

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
                    console.log("resume not uploaded", data["error"])
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
              title: "Registeration Failed!",
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

  const checkLoginEmail = e => {
    setLoginEmail(e.target.value)
  }

  return (
    <React.Fragment>
      <div
        className={classess.main_div}
        id="recruitment_carousel"
        onMouseOver={() => setPlay(false)}
        onMouseOut={() => setPlay(true)}
      >
        <Carousel
          responsive={responsive}
          autoPlay={play}
          centerMode={false}
          focusOnSelect={true}
          minimumTouchDrag={80}
          ssr={true}
          renderButtonGroupOutside={true}
          renderDotsOutside={true}
          keyBoardControl={true}
          swipeable
          removeArrowOnDeviceType={["tablet", "mobile"]}
          autoPlaySpeed={3000}
          showDots={true}
          infinite={true}
        >
          <div
            key="Slide 2"
            onMouseLeave={() => setPlay(true)}
            onMouseEnter={() => setPlay(false)}
            className={classess.slide_2}
          >
            <div className={classess.text_area2}>
              <div className={classess.bold_text}>
                Great talent means great innovation.
                <br />
                {/* <p className={classess.light_text}> You Can't win if you are not prepared</p>  */}
              </div>

              <div className={classess.normal_text}>
                RecruitmentBot lets you handpick exactly the talent that you are
                looking for, so you can hire the most compatible candidates.
              </div>
              <picture>
                <source srcSet={slider_img_webp} type="image/webp" />
                <source srcSet={slider_img_webp} type="image/png" />

                {/*<img
                    srcSet={slider_img_webp}
                    alt="Image"
                    loading="lazy"
                    className={classess.img_styling_slide2}
                 />*/}
                <LazyLoadImage
                  src={slider_img_webp}
                  alt="Image"
                  // loading="lazy"
                  className={classess.img_styling_slide2}
                />
              </picture>
            </div>

            <div className={classess.form_area1}>
              <div className={classess.translate_btn}>
                <div
                  className={classess.login_button}
                  id="login_id"
                  onClick={headerlogin}
                >
                  {" "}
                  Login
                </div>
                <div
                  className={classess.register_button}
                  id="register_id"
                  onClick={headerregister}
                >
                  {" "}
                  Register{" "}
                </div>
              </div>

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
                              errors.confirm_password &&
                              touched.confirm_password
                                ? classes.inp_input_error
                                : classes.inp_input
                            }
                            autoComplete="off"
                          />
                          {errors.confirm_password &&
                          touched.confirm_password ? (
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
                            onChange={e =>
                              handleStateChange(e, state, setState)
                            }
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
                            <img src={Loader} style={{ width: "60px" }} />
                          </div>
                        ) : (
                          // <div className={classess.button_register}>
                          //   <input type="submit" name="submit" value="Register" className={classess.input_submit} />
                          // </div>
                          <button type="submit" className={classes.inp_submit}>
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
                            <img src={Loader} style={{ width: "60px" }} />{" "}
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
                            <img src={Loader} style={{ width: "60px" }} />
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
          </div>
          <div
            key="Slide 1"
            onMouseLeave={() => setPlay(true)}
            onMouseEnter={() => setPlay(false)}
            className={classess.slide_1}
          >
            <div className={classess.image_area}>
              <picture>
                <source srcSet={computer_img_webp} type="image/webp" />
                <source srcSet={computer_img} type="image/png" />

                {/* <img
                  srcSet={computer_img_webp}
                  alt="Image"
                  loading="lazy"
                  className={classess.img_styling}
             />*/}
                <LazyLoadImage
                  src={computer_img_webp}
                  alt="Image"
                  //loading="lazy"
                  className={classess.img_styling}
                />
              </picture>
              {/* <img src={computer_img} alt="Slide 1" className={classess.img_styling} /> */}
            </div>
            <div className={classess.text_area}>
              <div className={classess.bold_text}>CV Screening is dead</div>
              <div className={classess.normal_text}>
                Allow us to introduce you to the latest and most efficient means
                of hiring. The best candidates right at your fingertips.
              </div>
              <div className={classess.buttons_div}>
                <div className={classess.button_one} onClick={showMeeting}>
                  Demo
                </div>
                <div className={classess.button_two} onClick={OpenForm}>
                  Sign Up
                </div>
              </div>
              <picture>
                <source srcSet={meeting_img_webp} type="image/webp" />
                <source srcSet={meeting_img} type="image/png" />
                {/* <img
                  srcSet={meeting_img_webp}
                  alt="Image"
                  loading="lazy"
                  className={classess.meeting_img}
                              />
               */}
                <LazyLoadImage
                  src={meeting_img_webp}
                  alt="Image"
                  // loading="lazy"
                  className={classess.meeting_img}
                />
              </picture>
              {/* <img src={meeting_img} className={classess.meeting_img}/> */}
            </div>
          </div>

          <div
            key="Slide 3"
            onMouseLeave={() => setPlay(true)}
            onMouseEnter={() => setPlay(false)}
            className={classess.slide_3}
          >
            <div className={classess.text_area}>
              <div className={classess.bold_text}>
                Hiring is a race. Its time to speed up.
              </div>
              <div className={classess.normal_text}>
                Allow us to do all the hard work and find you the candidate you
                need.
              </div>
              <div className={classess.buttons_div}>
                <div className={classess.button_one}>Demo</div>
                <div className={classess.button_two}>Sign Up</div>
              </div>
              {/* <div> <img src={background_img} className={classess.slide1_img_setting}/></div> */}
            </div>
            <div className={classess.image_area1}>
              {/*<img
                src={mobile_slide1}
                alt="Slide 1"
                loading="lazy"
                className={classess.img_styling1}
             />*/}
              <LazyLoadImage
                src={mobile_slide1}
                alt="Slide 1"
                // loading="lazy"
                className={classess.img_styling1}
              />
            </div>
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  )
}
export default RecruitmentCarousel

import React, { useEffect, useReducer } from "react"
import "./forgot_password.css"
import swal from "sweetalert"
import Swal from "sweetalert2"
import { Link, navigate } from "gatsby"
import logo from "./static/logo.png"
import { BiLock } from "react-icons/bi"
import { BiUser } from "react-icons/bi"
import { BiLoader } from "react-icons/bi"
import { API_URL, MEEZAN_API_URL } from "src/constants"
import Footer from "../footer/footer"
import loading_gif from "../recruitment_dashboard/general_statistics/static/loading.gif"

//this component allows users to update their passwords if they have forgotten them
const ForgotPassword = () => {
  let red_url = ""
  let base_url = ""
  let company_code = ""
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  })

  const initState = {
    email: "",
    token: "",
    password: "",
    confirm_password: "",
    show_login_loading: true,
    isLoading: false,
    redUrl: "",
    baseUrl: "",
    company_code: "",
  }
  const [state, setState] = useReducer(reducer, initState)

  useEffect(() => {
    let key
    setState({ show_login_loading: true })
    if (typeof window !== "undefined") {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      if (urlParams.has("company_code")) {
        company_code = urlParams.get("company_code")
      }
      if (urlParams.has("url")) {
        red_url = window.atob(urlParams.get("url"))
      }
      if (urlParams.has("fhx")) {
        key = urlParams.get("fhx")
      }

      base_url = red_url.includes("almeezan.botnosticsolutions.ai")
        ? MEEZAN_API_URL
        : API_URL
      setState({
        redUrl: red_url,
        baseUrl: base_url,
        company_code: company_code,
      })
      if (key !== "") {
        fetch(`${base_url}/password/find/${key}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then(response => {
            return response.json()
          })
          .then(function(data) {
            if (data.message === "This password reset token is invalid.") {
              swal(data.message)
              if (red_url !== "") {
                window.location.assign(red_url)
              } else {
                navigate("/recruitment-bot")
              }
            } else {
              setState({
                show_login_loading: false,
                token: data.token,
                email: data.email,
              })
            }
          })
      } else {
        if (red_url !== "") {
          window.location.assign(red_url)
        } else {
          navigate("/recruitment-bot")
        }
      }
    }
  }, [])

  //set password state to user input
  const on_password = e => {
    setState({
      password: e.target.value,
    })
  }

  //set confirm_password state to user input
  const on_confirm_password = e => {
    setState({
      confirm_password: e.target.value,
    })
  }

  //submit funtion of our form
  const on_submit = e => {
    e.preventDefault()
    setState({
      isLoading: true,
    })
    const post_data = {
      email: state.email,
      password: state.password,
      password_confirmation: state.confirm_password,
      token: state.token,
    }
    const regex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
    if ((post_data.password || post_data.password_confirmation) === "") {
      swal("All fields are required!")
      setState({
        isLoading: false,
      })
    } else if (post_data.password !== post_data.password_confirmation) {
      swal("Both passwords must match!")
      setState({
        isLoading: false,
      })
    }
     else if (!regex.test(post_data.password)) {
      swal("Password Must contain 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special case character")
      setState({
        isLoading: false,
      })
    } else {
      fetch(`${state.baseUrl}/recruitment/password/reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: post_data.email,
          password: post_data.password,
          password_confirmation: post_data.password_confirmation,
          token: post_data.token,
          red_url: state.redUrl,
          company_code: state.company_code,
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(function(data) {
          if (
            data.message === "This password reset token is invalid." ||
            data.message === "The given data was invalid."
          ) {
            swal(data.message)
            setState({
              isLoading: false,
            })
            if (state.redUrl !== "") {
              window.location.assign(state.redUrl)
            } else {
              navigate("/recruitment-bot")
            }
          } else {
            Swal.fire({
              icon: "success",
              title: "Your password has been updated!",
              text: "Redirecting to login page...",
              timer: 10000,
              showConfirmButton: false,
            })
            setState({
              isLoading: false,
            })
            if (state.redUrl !== "") {
              window.location.assign(state.redUrl)
            } else {
              navigate("/recruitment-bot")
            }
          }
        })
    }
  }

  return state.show_login_loading ? (
    <div>
      <img
        src={loading_gif}
        alt="Loading"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  ) : (
    <div className="main_container">
      <div className="user_advice_heading_holder">
        <div
          className="user_advice_heading_main"
          style={{ backgroundColor: "#38c0ca" }}
        >
          <div className="user_advice_logo_holder2">
            <Link to="/recruitment-bot">
              <img src={logo} className="chat_logo2" alt="chat logo" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container main_body_container">
        <div className="user_advice_login_holder">
          <div className="user_advice_login_main">
            <form
              onSubmit={on_submit}
              id="short_advice_form_styling2"
              className="login_form_styling"
            >
              <div>
                <div className="form_login_holder_padding">
                  <div className="form_login_holder">
                    <div className="login_form_icon_holder">
                      <div className="login_icon_margin">
                        <BiUser className="login_icon" />
                      </div>
                    </div>
                    <div
                      className="login_form_input_holder"
                      style={{ textAlign: "left" }}
                    >
                      <input
                        className="form-control dropdown-item form_input"
                        type="email"
                        value={state.email}
                        placeholder={`Email Address       `}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="form_login_holder">
                    <div className="login_form_icon_holder">
                      <div className="login_icon_margin">
                        <BiLock className="login_icon" />
                      </div>
                    </div>
                    <div
                      className="login_form_input_holder"
                      style={{ textAlign: "left" }}
                    >
                      <input
                        onChange={on_password}
                        className="form-control dropdown-item form_input"
                        type="password"
                        value={state.password}
                        placeholder={`New Password     `}
                      />
                    </div>
                  </div>
                  <div className="form_login_holder">
                    <div className="login_form_icon_holder">
                      <div className="login_icon_margin">
                        <BiLock className="login_icon" />
                      </div>
                    </div>
                    <div
                      className="login_form_input_holder"
                      style={{ textAlign: "left" }}
                    >
                      <input
                        onChange={on_confirm_password}
                        className="form-control dropdown-item form_input"
                        type="password"
                        value={state.confirm_password}
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                </div>
                <p className="note" ><span  className="note-span" >Note: </span>Password Must contain 8 characters including 1 uppercase, 1 lowercase, 1 number and 1 special case character</p>
                <div className="login_btn_padding">
                  <div className="login_btn_holder">
                    {state.isLoading ? (
                      <img
                        src={loading_gif}
                        alt="Loading"
                        style={{ width: "25px", height: "25px" }}
                      />
                    ) : (
                      <button
                        onSubmit={on_submit}
                        className="btn btn-primary login_button"
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassword

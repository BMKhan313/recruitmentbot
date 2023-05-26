import React, { useEffect, useContext } from "react"
import * as classess from "./header.module.css"
import { Link } from "gatsby"
import { API_URL, PSEB_Redirect, REC_URL } from "src/constants"
import logo from "../../apply_for_job/main_page_header/static/logo.png"
import logo_webp from "../../apply_for_job/main_page_header/static/logo.webp"
import { navigate } from "gatsby"
import { store } from "src/context/store"
import "./register.css"
import UpdatePassword from "../../update_user_password/update_password"
import Swal from "sweetalert2"
const RecruitmentHeader = props => {
  const [show, setShow] = React.useState(true)
  // const [url,getUrl] = React.useState('')
  let url
  const globalState = useContext(store)
  const { dispatch } = globalState

  useEffect(() => {
    // sessionStorage.getItem("company_code")

    if (props.location === "sign_up") {
      setShow(false)
    } else if (props.location === "chat_bot") {
      setShow("chat_bot")
    } else if (props.location === "user_chats") {
      setShow("user_chats")
    } else if (props.location === "recruitment_dashboard") {
      setShow("recruitment_dashboard")
    } else {
      setShow(true)
    }
    url = sessionStorage.getItem("red_url")
    // getUrl(sessionStorage.getItem('red_url'))
  }, [])
  const BackToChatPage = () => {
    dispatch({ type: "HIDE_JOBCODE_PROMPT" })

    window.history.back()
    // navigate("/recruitment-bot/recruitment-user-chats/", {
    //   state: {
    //     token: props.token,
    //     user: props.user_info,
    //     company_code: props.company_code,
    //     red_url: props.red_url,
    //   },
    // })
  }
  const OpenUpdateComponent = () => {
    dispatch({ type: "HANDLE_UPDATE_COMPONENT" })
  }
  const logout = () => {
    let red_url = sessionStorage.getItem("red_url")
    if (props.token) {
      fetch(`${REC_URL}/recruitment/logout`, {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          Authorization: "Bearer" + props.token,
        },
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          if (res.success) {
            Swal.fire({
              icon: "success",
              title: res?.message[0] ?? "Successfully logout!",
              text: "Please login again to continue",
              timer: 1500,
            })

            if (red_url && red_url !== "") {
              window.location.assign(red_url)
            } else {
              window.history.back()
            }
          } else if (res?.message === "Unauthenticated.") {
            Swal.fire({
              icon: "success",
              title: "Logout successfully!",
              text: "Please login again to continue",
              timer: 1500,
            })
            if (red_url && red_url !== "") {
              window.location.assign(red_url)
            } else {
              window.history.back()
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to logout!",
              text: "Please try again",
              timer: 1500,
            })
          }
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Failed to logout, please try again",
            timer: 1500,
          })
        })
    } else {
      if (red_url && red_url !== "") {
        window.location.assign(red_url)
      } else {
        window.history.back()
      }
    }
  }
  return (
    <React.Fragment>
      <div className={classess.main_div}>
        <div className={classess.recruitment_logo}>
          <picture>
            <source srcSet={logo_webp} type="image/webp" />
            <source srcSet={logo} type="image/png" />
            <img
              srcSet={logo_webp}
              alt="Botnostic Solutions"
              className={classess.logo_styling}
            />
          </picture>
          {/* <img src={logo} alt="Botnostic Solutions" className={classess.logo_styling}/> */}
        </div>
        <div className={classess.sign_up_button}>
          <div className={classess.text_div}>
            {show === true ? (
              <Link
                to="/recruitment-bot/sign-up/"
                className={classess.link_style}
              >
                Sign Up
              </Link>
            ) : show === "user_chats" ? (
              <div className={classess.adjust_space}>
                {sessionStorage.getItem("red_url") === `${PSEB_Redirect}` ? (
                  <a
                    //  href={sessionStorage.getItem("red_url")}
                    href={`${PSEB_Redirect}&reference=${sessionStorage.getItem(
                      "referenceID"
                    )}`}
                    className={classess.link_style}
                  >
                    Redirect to PSEB
                  </a>
                ) : (
                  <>
                    <a
                      // href={sessionStorage.getItem("red_url")}
                      className={classess.link_style}
                      onClick={logout}
                    >
                      Logout
                    </a>
                    <span
                      className={`${classess.link_style} ${classess.space_left}`}
                      onClick={OpenUpdateComponent}
                    >
                      Update Password
                    </span>
                  </>
                )}
              </div>
            ) : show === "chat_bot" ? (
              <>
                <a
                  // href={sessionStorage.getItem("red_url")}
                  className={classess.link_style}
                  onClick={() => {
                    sessionStorage.setItem("career_name", "")
                    logout()
                  }}
                >
                  Logout
                </a>
                <span
                  className={`${classess.link_style} ${classess.space}`}
                  onClick={BackToChatPage}
                >
                  Back
                </span>
              </>
            ) : show === "recruitment_dashboard" ? (
              <a className={classess.link_style} onClick={logout}>
                Logout
              </a>
            ) : (
              <Link to="/recruitment-bot/" className={classess.link_style}>
                Back
              </Link>
            )}
          </div>
        </div>
      </div>
      {globalState.state !== undefined ? (
        globalState.state.updateComponent === true ? (
          <UpdatePassword
            token={props.token}
            currentApiUrl={props?.currentApiUrl}
          />
        ) : null
      ) : null}
    </React.Fragment>
  )
}
export default RecruitmentHeader

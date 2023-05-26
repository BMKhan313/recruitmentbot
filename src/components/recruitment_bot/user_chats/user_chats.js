import React, { useEffect, useContext, useState } from "react"
import * as classess from "./user_chats.module.css"
import { REC_URL, PSEB_Redirect, MEEZAN_API_URL } from "src/constants"
import { navigate } from "gatsby"
import RecruitmentHeader from "../main_page/header/header"
import Swal from "sweetalert2"
import { store } from "src/context/store"
import loading_gif from "../recruitment_dashboard/general_statistics/static/loading.gif"
import profileAvatar from "./static/profile_avatar.png"
import Footer from "../main_page/footer/footer"
import SocialPortfolio from "./social_portfolio/social_portfolio"
import { Table, Tag, Space, Alert } from "antd"
import { clog, ShowLoader } from "../../../utils"
import { MEEZAN_COMPANY_CODE } from "../../../constants"

let CURRENT_API_URL = REC_URL
let user_info

const UserChats = props => {
  const globalState = useContext(store)
  const { dispatch } = globalState
  const [wait, setWait] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [chatBoxes, getChatBoxes] = React.useState("")
  const [newChatBoxId, setNewChatBoxId] = React.useState("")
  const [previousAppliedJob, setPreviousApplieddJob] = React.useState("None")
  const [token, setToken] = React.useState("")
  const [userInfo, setUserInfo] = React.useState("")
  const [companyCode, setCompanyCode] = React.useState("")
  const [previousNull, checkPreviousNull] = React.useState(null)
  const [file, setFile] = React.useState("")
  const [profilePicture, setProfilePicture] = React.useState("")
  const [loaingUpdate, setLoadingUpdate] = React.useState(false)
  const [consent, handleConsent] = React.useState(true)
  const [
    profilePictureExistence,
    checkProfilePictureExistence,
  ] = React.useState(true)
  const [imgUrl, setImgUrl] = React.useState("")
  const [upload, showUpload] = React.useState(false)
  const [resumeExpand, setResumeExpand] = React.useState(false)
  const [chatExpand, setChatExpand] = React.useState(false)
  const [resumeUpload, setResumeUpload] = React.useState(false)
  const [compatibilityMsg, setcompatibilityMsg] = React.useState("")
  const [tablePseb, settablePseb] = React.useState(null)
  const [checkPermission, setcheckPermission] = React.useState(null)
  const [userResumes, setuserResumes] = React.useState(null)

  let u_token
  let company_code

  let CompanyCodesList = ["PSEBICT015", "PSEBNICT016", "Zel013", "NBD017"]
  let CompanyCodesPseb = ["PSEBICT015", "PSEBNICT016"]

  async function getting_Resumes(user_token) {
    // console.log("Getting resumes..")

    //ANCHOR - Refactored
    await fetch(
      `${CURRENT_API_URL}/get-user-resume-collection?user_id=${user_info.id}&type=all`,
      {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          Authorization: "Bearer" + user_token,
        },
      }
    )
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res
        if (res.success) {
          setuserResumes(data.resume)
        }
      })
  }

  useEffect(() => {
    // console.log("Inside")
    // Check whether user doen not approach this page directly by passing login .
    // If user access this page by passing login then reedirect it tologin page else store token and user id in their respective states and variable

    //REVIEW - response needs to be reviewed
    async function getting_Permissions(user_token) {
      // console.log("Token: ", user_token)
      let temp = []
      let previous_applied = []
      await fetch(`${CURRENT_API_URL}/get-recruitment-company-permission`, {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          Authorization: "Bearer" + user_token,
        },
      })
        .then(response => {
          return response.json()
        })
        .then(async response => {
          const { data } = response
          const datum = data
          if (response.success) {
            setcheckPermission(datum ? datum.permissions : null)
            _getCompatability(data.permissions)
            //REVIEW -  Response
            await fetch(`${CURRENT_API_URL}/recruitment/get-user-chats-track`, {
              method: "GET",
              headers: {
                Authorization: "Bearer " + u_token,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then(response => {
                return response.json()
              })
              .then(res => {
                const { data } = res
                setNewChatBoxId(data["result"]?.length)
                if (res.success) {
                  if (data["job_codes"].length == 0) {
                    let result = data.result
                    result.map((result, index) => {
                      // console.log(job_codes[result])
                      let chat_no = index + 1

                      return temp.push(
                        <div className={classess.chat_boxes} key={index}>
                          <div
                            className={classess.box_styling}
                            id={parseInt(result)}
                            onClick={() => openUserChat(index)}
                          >
                            Application {chat_no}
                            {/* <div></div> */}
                          </div>
                        </div>
                      )
                    })
                  } else {
                    let job_codes = JSON.parse(data["job_codes"])
                    let result = data.result
                    result.map((result, index) => {
                      let chat_no = index + 1

                      previous_applied.push(job_codes[result]["job_code"])

                      //Jobs will appear only to users of following company codes

                      //  job_codes[result]["chat_status"] !== "complete" ||
                      //  company_code === "PSEBICT015" ||
                      //  company_code === "PSEBNICT016" || company_code === "Zel013"

                      //Showing pseb Redirect button to Pseb users only
                      if (
                        datum.permissions &&
                        datum.permissions.completed_jobs &&
                        sessionStorage.getItem("red_url") === `${PSEB_Redirect}`
                      ) {
                        document.getElementById(
                          "redirectBtn"
                        ).style.visibility = "visible"
                      }
                      // console.log("checkPermission",datum.permissions)

                      if (
                        // datum.permissions && datum.permissions.completed_jobs
                        // (datum.permissions && datum.permissions.completed_jobs) || job_codes[result]["chat_status"] !== "complete"
                        // || CompanyCodesList.includes(company_code)
                        (datum.permissions &&
                          datum.permissions.completed_jobs) ||
                        job_codes[result]["chat_status"] !== "complete"
                      ) {
                        // alert("flag")
                        if (
                          datum.permissions &&
                          datum.permissions.completed_jobs &&
                          job_codes[result]["job_code"] === null
                        ) {
                          // console.log("Flag  ",job_codes[result]["job_code"])
                          //check whether user have any chat id with job code status null in db.If Yes don't show him new application box.Chat with null job id appears as new application
                          checkPreviousNull(true)
                          return temp.push(
                            <div className={classess.new_chat} key={index}>
                              <div
                                // className={classess.box_styling}
                                id={parseInt(result)}
                                onClick={() => openUserChat(index)}
                              >
                                New Application
                              </div>
                            </div>
                          )
                        } else {
                          checkPreviousNull(false)
                          if (job_codes[result]["job_name"]) {
                            return temp.push(
                              <>
                                {/* <div className={classess.box_container}>
                               something */}

                                <div
                                  className={classess.chat_boxes}
                                  key={index}
                                >
                                  <div
                                    className={classess.box_styling}
                                    id={parseInt(result)}
                                    onClick={() => openUserChat(index)}
                                  >
                                    {/* Application {chat_no} */}

                                    {job_codes[result]["job_name"]}
                                    <br />
                                    <span className={classess.box_job_code}>
                                      ({job_codes[result]["job_code"]})
                                    </span>
                                  </div>
                                  {/* <br /> */}
                                  {/* {console.log("Token check",job_codes[result]["job_code"])} */}

                                  {/* Resume Button will appear only to users of company code Zel013 */}
                                  {datum.permissions &&
                                  datum.permissions.allow_resume ? (
                                    <div
                                      className={classess.cvBtn}
                                      onClick={() =>
                                        navigate("/recruitment-bot/resume", {
                                          state: {
                                            token: u_token,
                                            jobCode:
                                              job_codes[result]["job_code"],
                                          },
                                        })
                                      }
                                    >
                                      Resume
                                    </div>
                                  ) : null}

                                  {/* </div> */}
                                </div>
                              </>
                            )
                          }
                        }
                      } else {
                        checkPreviousNull(false)
                      }
                    })
                    dispatch({
                      type: "SET_PREVIOUS_JOB_APPLIED",
                      previousJobApplied: previous_applied,
                    })
                    setPreviousApplieddJob(previous_applied)
                  }

                  getChatBoxes(temp)
                  setLoading(false)
                } else if (data["message"] === "Unauthenticated.") {
                  Swal.fire({
                    icon: "error",
                    title: "Not Authenticated",
                    text: "Please Login First",
                  })
                  navigate("/recruitment-bot/sign-up")
                } else {
                  checkPreviousNull(false)
                  setLoading(false)
                }
              })
          }
          // else {
          //   setcheckPermission({
          //     completed_jobs: 0,
          //     compatibility_message: 0,
          //     allow_resume: 0,

          //   })
          // }
        })
    }

    async function initalRender() {
      if ((props.location.state === null) & (props.location.search === null)) {
        navigate("/recruitment-bot/sign-up")
        Swal.fire({
          icon: "error",
          title: "Not Authenticated",
          text: "Please Login First",
        })
        return
      } else {
        if (props.location.search !== "") {
          let info = window.location.href.split("?==")
          u_token = window.atob(info[1])
          user_info = {
            id: window.atob(info[2]),
            country: info[5],
            consent: info[6] === "null" ? null : info[6],
            profile_picture: info[7] === "null" ? null : info[7],
          }
          company_code = window.atob(info[3])
          setToken(window.atob(info[1]))
          setUserInfo(user_info)
          setCompanyCode(window.atob(info[3]))
          sessionStorage.setItem("red_url", window.atob(info[4]))
          //Switch API_URL FOR mEEZAN
          CURRENT_API_URL =
            company_code == "AlMEZ020" ? MEEZAN_API_URL : REC_URL
          // sessionStorage.setItem("company_code", info[3])
        } else if (props.location.state !== null) {
          u_token = props.location.state.token
          user_info = props.location.state.user
          company_code =
            typeof props.location.state.user !== typeof {}
              ? props.location.state.company_code
              : props.location.state.user.company_code
          setToken(props.location.state.token)
          setUserInfo(props.location.state.user)
          setCompanyCode(
            typeof props.location.state.user !== typeof {}
              ? props.location.state.company_code
              : props.location.state.user.company_code
          )

          sessionStorage.setItem("red_url", props.location.state.red_url)
          //Switch API_URL FOR mEEZAN
          CURRENT_API_URL =
            company_code == "AlMEZ020" ? MEEZAN_API_URL : REC_URL
        }
      }
      if (user_info.consent !== null) {
        handleConsent(false)
      }

      if (user_info["profile_picture"] !== null) {
        checkProfilePictureExistence(true)
        //ANCHOR - Refactored get-profile-picture
        await fetch(`${CURRENT_API_URL}/recruitment/get-profile-picture`, {
          method: "GET",
          headers: {
            Authorization: "Bearer" + u_token,
          },
        })
          .then(response => {
            return response.json()
          })
          .then(res => {
            // setImgUrl(img["img_url"])
            setImgUrl(res.data)
            dispatch({ type: "PROFILE_IMAGE", payload: res.data })
          })
      } else {
        checkProfilePictureExistence(false)
      }
      // This Api will check the number of chats user had done.
      // The chats which reached to advice are marked as completeed and does not visible to user. They can only see those chats that does not reaches to advice.
      // alert(CURRENT_API_URL)
      await getting_Permissions(u_token)
      //  console.log("vefore checkPermission",checkPermission)
      // if (checkPermission && checkPermission.show_resumes){
      await getting_Resumes(u_token)
      // }

      setWait(false)
    }

    initalRender()
  }, [])
  //Open Chat for particular chat index
  const openUserChat = eid => {
    if ((props.location.state === null) & (props.location.search === null)) {
      navigate("/recruitment-bot/sign-up")
      Swal.fire({
        icon: "error",
        title: "Not Authenticated",
        text: "Please Login First",
      })
      return
    } else {
      if (props.location.search !== "") {
        let info = window.location.href.split("?==")
        u_token = window.atob(info[1])
        user_info = {
          id: window.atob(info[2]),
          country: info[5],
          consent: info[6] === "null" ? null : info[6],
          profile_picture: info[7] === "null" ? null : info[7],
        }
        company_code = window.atob(info[3])
      } else if (props.location.state !== null) {
        u_token = props.location.state.token
        company_code =
          typeof props.location.state.user !== typeof {}
            ? props.location.state.company_code
            : props.location.state.user.company_code
        user_info = props.location.state.user
      }
    }
    setWait(true)
    let chat_id = eid
    sessionStorage.setItem("user_chat_id", chat_id.toString())
    // This api checks whether the chat user is opening already exist. If it doesn't add chat id record in database

    fetch(`${CURRENT_API_URL}/recruitment/user-chats-track`, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + u_token,
        Accept: "applciation/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_key: chat_id,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        navigate("/recruitment/chat", {
          state: {
            token: u_token,
            user: user_info,
            company_code: company_code,
          },
        })
        //   setLoading(false)
      })
  }
  const getFile = e => {
    setFile(e.target.value)
    if (e.target.value !== "") {
      //User Resume Uplaoding
      e.preventDefault()
      const fileInput = document.querySelector("input[name='cv_uploading']")
      // console.log(token)
      const formData = new FormData()
      formData.append("file", fileInput.files[0])
      // console.log(formData)
      // setLoadingUpdate(true)
      ShowLoader("Uploading!")
      setResumeUpload(true)
      fetch(`${CURRENT_API_URL}/store-file`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer" + token,
        },
        body: formData,
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          // setLoadingUpdate(false)
          const { data } = res
          if (data["error"]) {
            Swal.fire({
              icon: "error",
              text:
                "Sorry, could not upload your file. Please make sure it is in one of these formats: pdf, doc,docx",
            })
          } else {
            Swal.fire({
              icon: "success",
              text: data["msg"],
            })
            user_info && getting_Resumes(token)
          }

          setFile("")
          setResumeUpload(false)
          // window.location.href = data[0]
        })
    }
  }

  const dataSource = [
    {
      key: "1",
      Jobname: "Senior DevOps Engineer",
      Compatiblity: 5,
    },
    {
      key: "2",
      Jobname: "Bussiness Technical Lead",
      Compatiblity: 7,
    },
  ]

  function _getCompatability(permissions) {
    if (permissions && permissions.compatibility_table) {
      //REVIEW -
      fetch(`${CURRENT_API_URL}/recruitment/user-careers-and-compatibilities`, {
        method: "GET",
        headers: {
          Authorization: "Bearer" + u_token,
          Accept: "applciation/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          const { data } = res
          var jobsArr = []
          if (res.success) {
            Object.keys(res.data).map(function(key, index) {
              jobsArr.push({
                id: index,
                Jobname: key,
                Compatiblity: data[key],
              })
            })

            settablePseb(jobsArr)
          } else {
            setcompatibilityMsg(data.message)
          }
        })
    } else if (permissions && permissions.compatibility_message) {
      fetch(`${CURRENT_API_URL}/recruitment/user-careers-and-compatibilities`, {
        method: "GET",
        headers: {
          Authorization: "Bearer" + u_token,
          Accept: "applciation/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          const { data } = res
          if (res.message === "Unauthenticated.") {
            Swal.fire({
              icon: "error",
              title: "Session Expired",
              text: "Please Login Again",
            })

            let red_back_url = sessionStorage.getItem("red_url")
            if (red_back_url) {
              window.location.assign(red_back_url)
            } else {
              navigate("/recruitment-bot/sign-up/")
            }

            return
          }

          if (permissions && permissions.compatibility_message) {
            if (res.success) {
              var msg = `Your career ${
                Object.keys(data.output)[0]
              }  has achieved compatibility of score ${
                data[Object.keys(data.output)[0]]
              } `
              setcompatibilityMsg(msg)
            } else {
              setcompatibilityMsg(data.message)
            }
          }
        })
    } else {
    }
  }

  const permissionConsent = e => {
    // e.preventDefault()
    let consent_value = e.target.getAttribute("value")
    //ANCHOR -  Refactored -
    fetch(`${CURRENT_API_URL}/recruitment/permission-consent`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify({
        consent: consent_value,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res
        if (res.success) {
          handleConsent(false)
          Swal.fire({
            icon: "success",
            text: data.msg,
          })
        } else {
          handleConsent(false)
          Swal.fire({
            icon: "error",
          })
        }
      })
  }
  const getProfilePicture = e => {
    setProfilePicture(e.target.value)
    if (e.target.value !== "") {
      showUpload(true)
      const profilePicture = document.querySelector(
        "input[name='profile_uploading']"
      )
      const formData = new FormData()
      formData.append("file", profilePicture.files[0])

      //ANCHOR- Refactored
      fetch(`${CURRENT_API_URL}/recruitment/upload-profile-picture`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer" + token,
        },
        body: formData,
      })
        .then(response => {
          return response.json()
        })
        .then(async res => {
          const { data } = res
          if (data["error"]) {
            Swal.fire({
              icon: "error",
              text:
                "Sorry, could not upload your file. Please make sure it is in one of these formats: png, jpg,jpeg",
            })
          } else {
            //ANCHOR - Refactored get-profile-picture
            await fetch(`${CURRENT_API_URL}/recruitment/get-profile-picture`, {
              method: "GET",
              headers: {
                Authorization: "Bearer" + token,
              },
            })
              .then(response => {
                return response.json()
              })
              .then(res => {
                // setImgUrl(img["img_url"])
                setImgUrl(res.data)
                checkProfilePictureExistence(true)
                dispatch({ type: "PROFILE_IMAGE", payload: res.data })
              })
            Swal.fire({
              icon: "success",
              text: data.msg,
            })
          }
          setProfilePicture("")
          showUpload(false)

          // window.location.href = data[0]
        })
    }
  }

  const remove_resume = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1D1E2C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        ShowLoader("Wait..")
        // let id = 9736456

        //ANCHOR - Refactored
        fetch(`${CURRENT_API_URL}/recruitment/delete-resume?id=${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then(response => {
            return response.json()
          })
          .then(async res => {
            if (res.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: res.data,
                timer: 1000,
                // showConfirmButton: false,
              })
            } else {
              Swal.fire({
                icon: "error",
                text: "Unable to Delete Resume",
                timer: 1000,
              })
            }
            await getting_Resumes(token)
          })
      }
    })
  }

  return (
    <div className={classess.main}>
      <div className={classess.header_div}>
        <RecruitmentHeader
          location="user_chats"
          token={token}
          currentApiUrl={CURRENT_API_URL}
        />
      </div>

      {loaingUpdate === true ? (
        <div className={classess.loading_div}>
          <div className={classess.loading_text}>
            <img
              src={loading_gif}
              alt="Loading"
              className={classess.loading_gif_style}
            />
          </div>
        </div>
      ) : null}

      {wait === false ? (
        <>
          <div className={classess.div_holder}>
            <div className={classess.portion_one}>
              <div className={classess.welcome_profile_holder}>
                <div className={classess.profile_holder}>
                  {/* If profile Picture exist in database render user profile picture else show him file uploading form for profile picture uploading  */}
                  <div className={classess.img_placeholder}>
                    {profilePictureExistence === true ||
                    globalState.state.profileImage ? (
                      <img
                        src={globalState?.state?.profileImage}
                        alt="Img"
                        className={classess.profile_styling}
                      />
                    ) : (
                      <>
                        <img
                          src={profileAvatar}
                          alt="Profile Avatar"
                          className={classess.profile_styling_avatar}
                        />
                        <form
                          enctype="multipart/form-data"
                          className={classess.profile_form_styling}
                        >
                          <input
                            type="file"
                            name="profile_uploading"
                            id="file"
                            value={profilePicture}
                            onChange={getProfilePicture}
                            className={classess.pic_upload}
                            required
                            accept="image/png, image/jpg, image/jpeg"
                          />
                        </form>
                        {profilePicture !== "" ? (
                          <>
                            {upload === false ? (
                              <p className={classess.uploading_text}>
                                {profilePicture}
                                <br />
                                Upload
                              </p>
                            ) : (
                              <p className={classess.uploading_text}>
                                Uploading...
                              </p>
                            )}
                          </>
                        ) : (
                          <p className={classess.uploading_text}>
                            Upload Profile Photo
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className={classess.welcome}>
                  <h2 className={classess.bold_text}>Hi, there!</h2>
                  <p className={classess.normal_text}>
                    Welcome to your recruitment dashboard. Apply for your job by
                    clicking below. We wish you best of luck!
                  </p>
                </div>
              </div>
            </div>

            <div className={classess.portion_two}>
              <div className={classess.heading}>Uploads</div>
              <div className={classess.resume_main}>
                <span className={classess.heading_alignment}>Resume</span>
                <div className={classess.resume_form}>
                  {resumeUpload === false ? (
                    <>
                      <form
                        className={classess.resume_form_styling}
                        enctype="multipart/form-data"
                      >
                        <input
                          type="file"
                          name="cv_uploading"
                          onChange={getFile}
                          value={file}
                          className={classess.choose_file_button}
                          accept={".pdf"}
                          required
                        />
                      </form>
                      <div className={classess.upload_styling}>Upload File</div>
                    </>
                  ) : (
                    "Uploading"
                  )}
                </div>
              </div>
              <div className={classess.resume_main}>
                <SocialPortfolio token={token} REC_URL={CURRENT_API_URL} />
              </div>
            </div>
          </div>
          {/* Users Chats Div Starts */}
          {/* resume.split("?response")[0] */}
          {/* {console.log(resume.slice(0,resume.indexOf('.pdf'))+".pdf")} */}

          {/* <h5 className={classess.resume_heading} >Uploaded Resumes</h5> */}

          {checkPermission &&
          checkPermission.show_resumes &&
          userResumes &&
          userResumes.length > 0 ? (
            <>
              <div
                className={classess.label_styling}
                onClick={() => setResumeExpand(!resumeExpand)}
              >
                Uploaded Resumes
                <span className={classess.expand_control_icons}>
                  {resumeExpand === false ? "+" : "-"}
                </span>
                <span className={classess.label_button}>View </span>
              </div>

              {resumeExpand ? (
                <div className={classess.resume_styling}>
                  <div className={classess.resume_div}>
                    {userResumes.map(resume => (
                      <div className={classess.resume_wrap}>
                        <a
                          className={classess.resume_container}
                          title="View Resume"
                          target="_blank"
                          // href={resume.file_url.split(".pdf")[0] + ".pdf"}
                          href={resume.file_url}
                        >
                          <img
                            className={classess.resume}
                            src={require("./static/pdf-icon.png")}
                          />

                          <p>{resume.file_url.split("_")[2] + ".pdf"}</p>
                        </a>
                        <div
                          className={classess.resume_remove}
                          onClick={() => remove_resume(resume.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          <React.Fragment>
            <div
              className={classess.label_styling}
              onClick={() => setChatExpand(!chatExpand)}
            >
              Apply for a job role
              <span className={classess.expand_control_icons}>
                {chatExpand === false ? "+" : "-"}
              </span>
              <span className={classess.label_button}>Apply Now</span>
            </div>
            {chatExpand === true ? (
              <>
                {/* {console.log(companyCode,"Flagg: ",CompanyCodesPseb.includes(companyCode),"array:",CompanyCodesPseb)} */}
                {checkPermission &&
                checkPermission.compatibility_table &&
                tablePseb ? (
                  <div className={classess.mainDiv}>
                    <table className={classess.Compatibiltytable}>
                      <tr>
                        <th>Job Name</th>
                        <th>Compatability</th>
                      </tr>
                      {tablePseb.map(r => (
                        <tr>
                          <td>{r.Jobname}</td>
                          <td>{r.Compatiblity}%</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                ) : (
                  <h4
                    id="id01"
                    style={{ textTransform: "capitalize", color: "#686D76" }}
                  >
                    {compatibilityMsg}
                  </h4>
                )}

                <div className={classess.form_styling}>
                  {chatBoxes}
                  {previousNull === false ? (
                    <div
                      className={classess.new_chat}
                      id={newChatBoxId}
                      onClick={() => openUserChat(newChatBoxId)}
                    >
                      {/* {console.log("Flag 2")} */}
                      {/* new applicatio box visible to user when last chat id of user does not possess null in its j_id column */}
                      New Application
                    </div>
                  ) : companyCode === "0" || companyCode === "Demo" ? (
                    <div
                      className={classess.new_chat}
                      id={newChatBoxId}
                      onClick={() => openUserChat(newChatBoxId)}
                    >
                      {/* {console.log("Flag 3")} */}
                      {/* new application box visible to user when last chat id of user does not possess null in its j_id column except in super admin case*/}
                      New Application
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </React.Fragment>
          {/* https://internships.pseb.org.pk/test/callback?status=true&skills[]=Web%20Development&skills[]=Data%20Science */}
          <a
            href={`${PSEB_Redirect}&reference=${sessionStorage.getItem(
              "referenceID"
            )}`}
            className={classess.redirectBtn}
            id="redirectBtn"
          >
            {" "}
            Redirect to PSEB
          </a>
          {/* User Chat DIv End */}
          {/* { console.log("Permissions Flag: ",checkPermission)} */}
          <div className={classess.footer_div1}>
            {//   Show this consent component if user does not select any permission..

            consent === true ? (
              checkPermission && checkPermission.consent ? (
                <div>
                  <hr className={classess.hr_styling} />
                  {/* Consent Div Start */}
                  <div className={classess.permission_consent_div}>
                    <div className={classess.permission_text}>
                      I would like to share my profile with other organizations
                      for job opportunities.
                    </div>
                    <div
                      className={classess.yes_div}
                      onClick={permissionConsent}
                      value="Yes"
                    >
                      Yes
                    </div>
                    <div
                      className={classess.no_div}
                      onClick={permissionConsent}
                      value="No"
                    >
                      No
                    </div>
                  </div>
                  {/* Consent Div Ends */}
                </div>
              ) : null
            ) : null}
            <div>
              <div
                className={
                  chatExpand !== true && consent !== true
                    ? "fixed-bottom"
                    : window.innerWidth > 1600
                    ? "fixed-bottom"
                    : "fixed-bottom"
                }
              >
                <Footer />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={classess.loading_text}>
          {/* <img
            src={loading_gif}
            alt="Loading"
            className={classess.loading_gif_style}
          /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "65vh",
            }}
          >
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_wwtntc5z.json"
              background="transparent"
              style={{ width: "20%", height: "100%" }}
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      )}
    </div>
  )
}
export default UserChats

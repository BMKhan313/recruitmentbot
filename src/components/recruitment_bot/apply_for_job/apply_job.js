import React, { useContext, useEffect, useReducer } from "react"
import * as classess from "./apply_job.module.css"
import HeaderRecruitmentBot from "./main_page_header/main_page_header.js"
// import testing_img1 from './static/apply_job_img.png'
// import testing_img1_webp from './static/apply_job_img.webp'
import { Link } from "gatsby"
import logo from "./main_page_header/static/logo.png"
import logo_webp from "./main_page_header/static/logo.webp"
import demoJobs from "./demo-jobs"
import close_button from "./static/close.png"
import { store } from "src/context/store"
import Recruitment_Form from "../../recruitment_bot/RecruitmentForm/form"

import Step1 from "./static/step1.png"
import Step2 from "./static/step2.png"
import Step3 from "./static/step3.png"
import Step4 from "./static/step4.png"
import Step5 from "./static/step5.png"
import Step6 from "./static/step6.png"

import Step1_webp from "./static/step1.webp"
import Step2_webp from "./static/step2.webp"
import Step3_webp from "./static/step3.webp"
import Step4_webp from "./static/step4.webp"
import Step5_webp from "./static/step5.webp"
import Step6_webp from "./static/step6.webp"
import Footer from "../footer/footer"

const ApplyJobs = () => {
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
  const globalState = useContext(store)
  const { dispatch } = globalState
  const [state, setState] = useReducer(reducer, initState)
  useEffect(() => {
    const head = document.querySelector("head")
    const script = document.createElement("script")
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    )
    head.appendChild(script)
  }, [])

  const [jobs, getALLJobs] = React.useState("")
  const [searchValue, setSearchValue] = React.useState("")
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
  const openDetailDiv = e => {
    let get_div_id = e.target.getAttribute("targeted_id")
    let div_id = document.getElementById(get_div_id)
    let test = document.querySelectorAll(`div[name='test_class']`)
    let plus_id = document.getElementById("open_" + get_div_id)
    let minus_id = document.getElementById("close_" + get_div_id)
    Object.keys(test).map(testing => {
      let ids_of_div = test[testing].getAttribute("targeted_id")
      if (ids_of_div !== get_div_id) {
        document.getElementById(ids_of_div).style.display = "none"
      } else {
        if (div_id.style.display === "block") {
          div_id.style.display = "none"
          plus_id.style.display = "block"
          minus_id.style.display = "none"
        } else {
          div_id.style.display = "block"
          plus_id.style.display = "none"
          minus_id.style.display = "block"
        }
      }
    })
  }
  useEffect(() => {
    let temp = []
    Object.keys(demoJobs).map((job, index) => {
      return temp.push(
        <>
          <div
            className={classess.bg_color}
            name="test_class"
            key={index + Math.random()}
            targeted_id={demoJobs[job]["job_code"]}
            onClick={openDetailDiv}
          >
            <h4
              className={classess.designation_heading}
              targeted_id={demoJobs[job]["job_code"]}
            >
              {job}
            </h4>
            <p
              className={classess.plus_icon}
              id={"open_" + demoJobs[job]["job_code"]}
              targeted_id={demoJobs[job]["job_code"]}
            >
              +
            </p>
            <p
              className={classess.minus_icon}
              id={"close_" + demoJobs[job]["job_code"]}
              targeted_id={demoJobs[job]["job_code"]}
            >
              -
            </p>
            <p
              className={classess.button_one}
              onClick={OpenForm}
              job_code={demoJobs[job]["job_code"]}
              career_name={demoJobs[job]["career_name"]}
            >
              Apply Now
            </p>
          </div>
          <hr className={classess.hr_line} />
          <div className={classess.jobs_detail} id={demoJobs[job]["job_code"]}>
            <h4 className={classess.detail_heading}>Job Type</h4>
            <p className={classess.place}>{demoJobs[job]["job_type"]}</p>
            <h4 className={classess.detail_heading}>Description</h4>
            <p className={classess.para_setting}>
              {demoJobs[job]["description"]}
            </p>
          </div>
        </>
      )
    })
    getALLJobs(temp)
  }, [])
  const OpenForm = e => {
    localStorage.setItem("apply_job_code", e.target.getAttribute("job_code"))
    dispatch({ type: "OPEN_FORM" })
  }

  const getSearchValue = e => {
    if (e.target.value === "") {
      let temp = []
      Object.keys(demoJobs).map((job, index) => {
        return temp.push(
          <>
            <div
              className={classess.bg_color}
              name="test_class"
              key={index + Math.random()}
              targeted_id={demoJobs[job]["job_code"]}
              onClick={openDetailDiv}
            >
              <h4
                className={classess.designation_heading}
                targeted_id={demoJobs[job]["job_code"]}
              >
                {job}
              </h4>
              <p
                className={classess.plus_icon}
                id={"open_" + demoJobs[job]["job_code"]}
                targeted_id={demoJobs[job]["job_code"]}
              >
                +
              </p>
              <p
                className={classess.minus_icon}
                id={"close_" + demoJobs[job]["job_code"]}
                targeted_id={demoJobs[job]["job_code"]}
              >
                -
              </p>
              <p
                className={classess.button_one}
                onClick={OpenForm}
                job_code={demoJobs[job]["job_code"]}
                career_name={demoJobs[job]["career_name"]}
              >
                Apply Now
              </p>
            </div>
            <hr className={classess.hr_line} />
            <div
              className={classess.jobs_detail}
              id={demoJobs[job]["job_code"]}
            >
              <h4 className={classess.detail_heading}>Job Type</h4>
              <p className={classess.place}>{demoJobs[job]["job_type"]}</p>
              <h4 className={classess.detail_heading}>Description</h4>
              <p className={classess.para_setting}>
                {demoJobs[job]["description"]}
              </p>
            </div>
          </>
        )
      })
      getALLJobs(temp)
      setSearchValue("")
    } else {
      setSearchValue(e.target.value)
    }
  }

  const searchRelativeJob = e => {
    e.preventDefault()
    let temp = []
    let temp1 = []
    Object.keys(demoJobs).map(job => {
      if (job.toLowerCase().includes(searchValue.toLowerCase())) {
        temp.push(job)
      }
    })
    temp.map((sl_job, index) => {
      return temp1.push(
        <>
          <div
            className={classess.bg_color}
            name="test_class"
            key={index + Math.random()}
            targeted_id={demoJobs[sl_job]["job_code"]}
            onClick={openDetailDiv}
          >
            <h4
              className={classess.designation_heading}
              targeted_id={demoJobs[sl_job]["job_code"]}
            >
              {sl_job}
            </h4>
            <p
              className={classess.plus_icon}
              id={"open_" + demoJobs[sl_job]["job_code"]}
              targeted_id={demoJobs[sl_job]["job_code"]}
            >
              +
            </p>
            <p
              className={classess.minus_icon}
              id={"close_" + demoJobs[sl_job]["job_code"]}
              targeted_id={demoJobs[sl_job]["job_code"]}
            >
              -
            </p>
            <p
              className={classess.button_one}
              onClick={OpenForm}
              job_code={demoJobs[sl_job]["job_code"]}
              career_name={demoJobs[sl_job]["career_name"]}
            >
              Apply Now
            </p>
          </div>
          <hr className={classess.hr_line} />
          <div
            className={classess.jobs_detail}
            id={demoJobs[sl_job]["job_code"]}
          >
            <h4 className={classess.detail_heading}>Job Type</h4>
            <p className={classess.place}>{demoJobs[sl_job]["job_type"]}</p>
            <h4 className={classess.detail_heading}>Description</h4>
            <p className={classess.para_setting}>
              {demoJobs[sl_job]["description"]}
            </p>
          </div>
        </>
      )
    })
    if (temp.length === 0) {
      getALLJobs(
        <h2 className={classess.nothing_found}>
          <center>Nothing Found</center>
        </h2>
      )
    } else {
      getALLJobs(temp1)
    }
  }
  return (
    <React.Fragment>
      <HeaderRecruitmentBot />
      <div className={classess.bg_control}>
        <div className={classess.first_div}>
          <div className={classess.fisrt_subdiv}>
            <h3 className={classess.like_heading}>
              Find the Right Job Role for You!
            </h3>
            <p className={classess.like_sub_heading}>
              Choose from thousands of jobs, free of cost, free of hassle!
              Simply create an account and answer some questions. RecruitmentBot
              will assess your skills and compatibility and share your profile
              with employers from all over the world, helping you find the right
              job role for you!{" "}
            </p>
            <div className="container">
              <div className="row">
                <div className="col-lg-2">
                  <center>
                    <picture>
                      <source srcSet={Step1_webp} type="image/webp" />
                      <source srcSet={Step1} type="image/png" />
                      <img
                        srcSet={Step1_webp}
                        alt="Steps"
                        loading="lazy"
                        className={classess.step_styling}
                      />
                    </picture>
                  </center>

                  <div className={classess.icon_text}>Create an Account</div>
                </div>
                <div className="col-lg-2">
                  <center>
                    <picture>
                      <source srcSet={Step2_webp} type="image/webp" />
                      <source srcSet={Step2} type="image/png" />
                      <img
                        srcSet={Step2_webp}
                        alt="Steps"
                        loading="lazy"
                        className={classess.step_styling}
                      />
                    </picture>
                  </center>
                  <div className={classess.icon_text}>Search Job Openings</div>
                </div>
                <div className="col-lg-2">
                  <center>
                    <picture>
                      <source srcSet={Step3_webp} type="image/webp" />
                      <source srcSet={Step3} type="image/png" />
                      <img
                        srcSet={Step3_webp}
                        alt="Steps"
                        loading="lazy"
                        className={classess.step_styling}
                      />
                    </picture>
                  </center>
                  <div className={classess.icon_text}>
                    Answer some questions
                  </div>
                </div>
                <div className="col-lg-2">
                  <center>
                    <picture>
                      <source srcSet={Step4_webp} type="image/webp" />
                      <source srcSet={Step4} type="image/png" />
                      <img
                        srcSet={Step4_webp}
                        alt="Steps"
                        loading="lazy"
                        className={classess.step_styling}
                      />
                    </picture>
                  </center>
                  <div className={classess.icon_text}>
                    RecruitmentBot will access your skills and compatibility
                  </div>
                </div>
                <div className="col-lg-2">
                  <center>
                    <picture>
                      <source srcSet={Step5_webp} type="image/webp" />
                      <source srcSet={Step5} type="image/png" />
                      <img
                        srcSet={Step5_webp}
                        alt="Steps"
                        loading="lazy"
                        className={classess.step_styling}
                      />
                    </picture>
                  </center>
                  <div className={classess.icon_text}>
                    Your Profile will be shared
                  </div>
                </div>
                <div className="col-lg-2">
                  <center>
                    <picture>
                      <source srcSet={Step6_webp} type="image/webp" />
                      <source srcSet={Step6} type="image/png" />
                      <img
                        srcSet={Step6_webp}
                        alt="Steps"
                        loading="lazy"
                        className={classess.step_styling}
                      />
                    </picture>
                  </center>
                  <div className={classess.icon_text}>
                    Recruiters will contact you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ............................................First Main div ends here  ...........................................  */}

      <div className={classess.second_main_div}>
        <h2 className={classess.main_heading}>Open vacancies </h2>
        <div className={classess.punch_line}>
          Thousands of jobs, just one click away
        </div>

        <div className={classess.form_setting}>
          <form className={classess.form_inline} onSubmit={searchRelativeJob}>
            <input
              type="search"
              id="search"
              placeholder="Job title,Skill,Industry "
              name="search"
              value={searchValue}
              onChange={getSearchValue}
              className={classess.input_setting}
              required
            />
            <button type="submit" className={classess.submit_setting}>
              Search Jobs
            </button>
          </form>
        </div>
        {jobs}
      </div>
      {/* .......................................................................form area ............................................. */}
      {globalState.state !== undefined ? (
        globalState.state.openform === true ? (
          <Recruitment_Form />
        ) : null
      ) : null}

      <Footer />
      {/* <div className={classess.footer}>
        <div className={classess.logo_styling}>
          <picture>
            <source srcset={logo_webp} type="image/webp" />
            <source srcset={logo} type="image/png" />
            <Link to="/recruitment-bot">
              {" "}
              <img
                srcset={logo_webp}
                alt="Botnostic Solutions"
                className={classess.logo_styling}
              />
            </Link>
          </picture>
        </div>
        <div className={classess.footer_space}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h5>Contact US:</h5>
                <p>+92302-8557775</p>
              </div>
              <div className="col-lg-4">
                <h5> Address:</h5>
                <p>CIE Building NUST-H12 Islamabad, Pakistan</p>
              </div>
              <div className="col-lg-4">
                <h5 className={classess.email_setting}>Email Us:</h5>
                <div className={classess.email_button}>
                  {" "}
                  <a href="mailto:info@mycareerdreams.com">Email Us</a>
                </div>
              </div>
            </div>
          </div>

          <div className={classess.last_line}>
            <p>{`© ${new Date().getFullYear()} Botnostic Solutions (PVT) Ltd, All Rights Reserved`}</p>
          </div>
        </div>
      </div> */}
      <div className={classess.req1}>
        {globalState.state !== undefined ? (
          globalState.state.meeting === true ? (
            <div id="schedule_form" className={classess.testing}>
              <div
                className={classess.abc + " calendly-inline-widget"}
                data-url="https://calendly.com/botnostic-solutions"
                style={{ minWidth: "100%", height: "640px" }}
              />
              <span className={classess.clendly_close}>
                <img src={close_button} onClick={showMeeting} />
              </span>
            </div>
          ) : null
        ) : null}

        <div className={classess.req}>
          {globalState.state !== undefined ? (
            globalState.state.meeting === true ? (
              <div className={classess.close_meeting} onClick={showMeeting}>
                Close
              </div>
            ) : (
              <div className={classess.request_a_meeting} onClick={showMeeting}>
                Request a meeting
              </div>
            )
          ) : null}
        </div>
      </div>
    </React.Fragment>
  )
}
export default ApplyJobs

import React, { useContext, useEffect, useReducer } from "react"
import Swal from "sweetalert2"
import HeaderRecruitmentBot from "./main_page_header/main_page_header"
import { API_URL } from "src/constants"
import { store } from "src/context/store"
import Footer from "../../recruitment_bot/footer/footer"
import * as classess from "./why_recruitment_bot.module.css"
import {
  initCountryList,
  handleCountryChange,
  handleStateChange,
} from "src/utils"
import testing_img1 from "../main_page/body_items/static/testing_img1.png"
import testing_img1_webp from "../main_page/body_items/static/testing_img1.webp"
import icon1 from "./static/icon1.png"
import icon1_webp from "./static/icon1.webp"

import icon2 from "./static/icon2.png"
import icon2_webp from "./static/icon2.webp"

import icon3 from "./static/icon3.png"
import icon3_webp from "./static/icon3.webp"

import icon4 from "./static/icon4.png"
import icon4_webp from "./static/icon4.webp"

import icon5 from "./static/icon5.png"
import icon5_webp from "./static/icon5.webp"

import icon6 from "./static/icon6.png"
import icon6_webp from "./static/icon6.webp"

import icon7 from "./static/icon7.png"
import icon7_webp from "./static/icon7.webp"

import icon8 from "./static/icon8.png"
import icon8_webp from "./static/icon8.webp"

import outline from "./static/outline.png"

import outline_webp from "./static/outline.webp"
import invest from "./static/invest.png"
import invest_webp from "./static/invest.webp"
import recruiters from "./static/recruiters.png"
import recruiters_webp from "./static/recruiters.webp"
import aligning from "./static/aligning.png"
import aligning_webp from "./static/aligning.webp"

import close_button from "../main_page/body_items/static/close.png"
import { navigate } from "gatsby-link"
import Recruitment_Form from "../../recruitment_bot/RecruitmentForm/form"

const WhyRecruitmentBot = () => {
  const [showButton, SetShowButton] = React.useState(false)
  const [PerfectAsessment, setPerfectAssessment] = React.useState("perfect")

  const globalState = useContext(store)
  const { dispatch } = globalState
  return (
    <React.Fragment>
      <HeaderRecruitmentBot
        demo_url={"https://mycareerdreams.com/recruitment_whitelisting"}
      />

      {/* ..........................................Third Div  ...............................................  */}
      <div className={classess.third_maindiv}>
        <div className={classess.third_subdiv}>
          <div className="container">
            <div className="row">
              <div className=" col-lg-6">
                <div>
                  <h1 className={classess.heading_font2}>
                    Outline the role requirements and RecruitmentBot will give
                    you instant results of the most compatible candidates.
                  </h1>
                </div>
                <div>
                  <p className={classess.paragraph_setting}>
                    Artificial Intelligence is the future of efficient
                    recruitment processes, cutting down the cycle time to a
                    meagre few seconds without compromising on accuracy.
                    RecruitmentBot’s AI instantly skims through thousands of
                    profiles and ranks candidates based on their compatibility
                    with your specified job requirements.{" "}
                  </p>
                </div>
              </div>
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={outline_webp} type="image/webp" />
                  <source srcSet={outline} type="image/png" />
                  <img
                    srcSet={outline_webp}
                    alt="Image"
                    className={classess.outline_img}
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ..........................................Third Div Ends  ...............................................  */}
      {/* ..........................................Fourth Div Ends  ...............................................  */}
      <div className={classess.fourth_maindiv}>
        <div className={classess.fourth_subdiv}>
          <div className="container">
            <div className="row">
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={invest_webp} type="image/webp" />
                  <source srcSet={invest} type="image/png" />
                  <img
                    srcSet={outline_webp}
                    alt="Image"
                    className={classess.img1_setting_desktop}
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className={classess.background_color + " col-lg-6"}>
                <div>
                  <h1 className={classess.heading_font}>
                    Invest in a single, reliable Artificial Intelligence
                    platform to maximize value from multiple talent and sources
                  </h1>
                </div>
                <div>
                  <p className={classess.paragraph_setting}>
                    RecruitmentBot’s Artificial Intelligence powered system
                    helps companies discover and nurture the exact talent they
                    are looking for, while using the best and most diverse
                    resources available. It saves you the hassle of managing
                    various platforms to ensure you hone the perfect talent for
                    the job at hand.{" "}
                  </p>
                </div>
              </div>
              <picture>
                <source srcSet={invest_webp} type="image/webp" />
                <source srcSet={invest} type="image/png" />
                <img
                  srcSet={outline_webp}
                  alt="Image"
                  className={classess.img1_setting_mobile}
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* ..........................................Fourth Div Ends ...............................................  */}

      {/* .......................................... Fifth Div  ...............................................  */}
      <div className={classess.fifth_main_div}>
        <div className={classess.fifth_subdiv}>
          <div className="container">
            <div className="row">
              <div className={classess.background_color + " col-lg-6 "}>
                <h1 className={classess.heading_font}>
                  Start aligning opportunities with your employees’ aspirations{" "}
                </h1>
                <p className={classess.paragraph_setting}>
                  {" "}
                  Employee turnover rate is drastically high when it comes to
                  the top talent; most people leave within two years for better
                  career prospects. RecruitmentBot effectively suggests new and
                  relevant career opportunities to employees so that
                  organizations don’t lose valuable talent and fulfill role
                  requirements from existing employees who are actively seeking
                  avenues to grow. 
                </p>
              </div>
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={aligning_webp} type="image/webp" />
                  <source srcSet={aligning} type="image/png" />
                  <img
                    srcSet={aligning_webp}
                    alt="Image"
                    className={classess.img1_setting}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ..........................................Fifth Div Ends  ...............................................  */}

      {/* ..........................................Second Div  ...............................................  */}
      <div className={classess.second_main_div}>
        <div className={classess.second_subdiv}>
          <div className="container">
            <div className="row">
              <div className={classess.background_color1 + " col-lg-6 "}>
                <h1 className={classess.heading_font2}>
                  It’s time to step up. Today’s recruiter can be tomorrow’s
                  talent advisor{" "}
                </h1>
                <p className={classess.paragraph_setting}>
                  {" "}
                  Top talent, workplace diversity, and an extraordinary
                  candidate experience are all factors that define competitive
                  organizations. RecruitmentBot offers a one-for-all solution by
                  reducing the redundant recruitment process to an apt and
                  precise cycle, reducing bias, being more inclusive, and
                  shortlisting based on candidate compatibility. 
                </p>
              </div>
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={recruiters_webp} type="image/webp" />
                  <source srcSet={recruiters} type="image/png" />
                  <img
                    srcSet={recruiters_webp}
                    alt="Image"
                    className={classess.img1_setting_desktop_recruiter}
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ..........................................Second Div Ends  ...............................................  */}
      {/* ..........................................First Div ...............................................  */}
      <div className={classess.first_main_div}>
        <div className={classess.first_subdiv}>
          <h1 className={classess.heading_font_main}>Why RecruitmentBot? </h1>
          <h3 className={classess.heading_font_sub}>
            Minimize the risk of missing out the right candidate{" "}
          </h3>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon1_webp} type="image/webp" />
              <source srcSet={icon1} type="image/png" />
              <img
                srcSet={icon1_webp}
                alt="Image"
                className={`${classess.icon_setting} ${classess.adjust_space1}`}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              A time efficient method of analyzing and filtering candidates from
              thousands of applications.
            </p>
          </div>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon2_webp} type="image/webp" />
              <source srcSet={icon2} type="image/png" />
              <img
                srcSet={icon2_webp}
                alt="Image"
                className={classess.icon_setting}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Allows you to put aside recruiter bias and make objective
              assessments while shortlisting candidates.
            </p>
          </div>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon3_webp} type="image/webp" />
              <source srcSet={icon3} type="image/png" />
              <img
                srcSet={icon3_webp}
                alt="Image"
                className={classess.icon_setting}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Develops an elaborate database for recruiters to use as a
              reference for future hires.
            </p>
          </div>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon4_webp} type="image/webp" />
              <source srcSet={icon4} type="image/png" />
              <img
                srcSet={icon4_webp}
                alt="Image"
                className={`${classess.icon_setting} ${classess.adjust_space}`}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Calculates candidate’s compatibility to a high degree of accuracy
              hence giving insight for the interviewing stage.
            </p>
          </div>

          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon5_webp} type="image/webp" />
              <source srcSet={icon5} type="image/png" />
              <img
                srcSet={icon5_webp}
                alt="Image"
                className={`${classess.icon_setting} ${classess.adjust_space}`}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Greatly minimizes human error which arises from manually skimming
              through numerous CVs.
            </p>
          </div>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon6_webp} type="image/webp" />
              <source srcSet={icon6} type="image/png" />
              <img
                srcSet={icon6_webp}
                alt="Image"
                className={classess.icon_setting}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Pay as you go’ mechanism creates a cost effective system of use
              for your business regardless of size and usage.
            </p>
          </div>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon7_webp} type="image/webp" />
              <source srcSet={icon7} type="image/png" />
              <img
                srcSet={icon7_webp}
                alt="Image"
                className={classess.icon_setting}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Allows recruiters to save time that they can invest in the
              interviewing process.
            </p>
          </div>
          <div className={classess.box_setting}>
            <picture>
              <source srcSet={icon8_webp} type="image/webp" />
              <source srcSet={icon8} type="image/png" />
              <img
                srcSet={icon8_webp}
                alt="Image"
                className={`${classess.icon_setting} ${classess.adjust_space1}`}
                loading="lazy"
              />
            </picture>

            <hr className={classess.line_setting} />
            <p className={classess.paragraph_setting_boxes}>
              Web based model allows flexibility, accessibility and scalability.
            </p>
          </div>
        </div>
      </div>

      {/* ..........................................First Div Ends ...............................................  */}
      {/* .........................................form area ............................. */}
      {globalState.state !== undefined ? (
        globalState.state.openform === true ? (
          <Recruitment_Form />
        ) : null
      ) : null}

      <Footer />
    </React.Fragment>
  )
}
export default WhyRecruitmentBot

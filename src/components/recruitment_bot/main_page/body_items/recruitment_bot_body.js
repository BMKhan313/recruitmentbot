import React, { useContext } from "react"

import * as classess from "./recruitment_bot_body.module.css"
import testing_img1 from "./static/testing_img.png"
import testing_img3 from "./static/testing_img1.png"
import testing_img2 from "./static/testing_img2.png"
import testing_img1_webp from "./static/testing_img.webp"
import testing_img3_webp from "./static/testing_img1.webp"
import testing_img2_webp from "./static/testing_img2.webp"

import nlp from "./static/nl_img.jpg"
import nlp_webp from "./static/nl_img.webp"
import put_img from "./static/put_candidates_img.png"
import put_img_webp from "./static/put_candidates_img.webp"

import icon from "./static/icon2.svg"
import icon1 from "./static/icon1.png"
import icon2 from "./static/icon2.png"
import icon3 from "./static/icon3.png"
import icon1_webp from "./static/icon1.webp"
import icon2_webp from "./static/icon2.webp"
import icon3_webp from "./static/icon3.webp"
import Parteners from "../../parteners/parteners"
import Footer from "../../footer/footer"

import top_img1 from "./static/top_img1.png"
import top_img2 from "./static/top_img2.png"
import top_img3 from "./static/top_img3.png"
import top_img1_webp from "./static/top_img1.webp"
import top_img2_webp from "./static/top_img2.webp"
import top_img3_webp from "./static/top_img3.webp"

import loxo_img from "./static/loxo_img.png"
import loxo_img_webp from "./static/loxo_img.webp"

import CountUp from "react-countup"
import VisibilitySensor from "react-visibility-sensor"
import { store } from "src/context/store"
import close_button from "./static/close.png"
import work from "./static/work_img.png"
import work_webp from "./static/work_img.webp"

import Recruitment_Form from "../../RecruitmentForm/form"

// import logo from './static/logo.png'
// import logo_webp from './static/logo.webp'

const RecruitmentBody = () => {
  const [showButton, SetShowButton] = React.useState(false)
  const [PerfectAsessment, setPerfectAssessment] = React.useState("perfect")

  const globalState = useContext(store)
  const { dispatch } = globalState

  const setassesment1 = () => {
    setPerfectAssessment("perfect")
    document.getElementById("topfirst").style.background = "#1d1e2c"
    document.getElementById("topfirst1").style.color = "#ffff"
    document.getElementById("topfirst2").style.color = "#ffff"

    document.getElementById("topsecond").style.background = "#ffff"
    document.getElementById("topsecond1").style.color = "#1d1e2c"
    document.getElementById("topsecond2").style.color = "#1d1e2c"

    document.getElementById("topthird").style.background = "#ffff"
    document.getElementById("topthird1").style.color = "#1d1e2c"
    document.getElementById("topthird2").style.color = "#1d1e2c"
  }
  const setassesment2 = () => {
    setPerfectAssessment("second")
    document.getElementById("topfirst").style.background = "#ffff"
    document.getElementById("topfirst1").style.color = "#1d1e2c"
    document.getElementById("topfirst2").style.color = "#1d1e2c"

    document.getElementById("topsecond").style.background = "#1d1e2c"
    document.getElementById("topsecond1").style.color = "#ffff"
    document.getElementById("topsecond2").style.color = "#ffff"

    document.getElementById("topthird").style.background = "#ffff"
    document.getElementById("topthird1").style.color = "#1d1e2c"
    document.getElementById("topthird2").style.color = "#1d1e2c"
  }
  const setassesment3 = () => {
    setPerfectAssessment("third")
    document.getElementById("topfirst").style.background = "#ffff"
    document.getElementById("topfirst1").style.color = "#1d1e2c"
    document.getElementById("topfirst2").style.color = "#1d1e2c"

    document.getElementById("topsecond").style.background = "#ffff"
    document.getElementById("topsecond1").style.color = "#1d1e2c"
    document.getElementById("topsecond2").style.color = "#1d1e2c"

    document.getElementById("topthird").style.background = "#1d1e2c"
    document.getElementById("topthird1").style.color = "#ffff"
    document.getElementById("topthird2").style.color = "#ffff"
  }
  const showMeeting = () => {
    const head = document.querySelector("head")
    const script = document.createElement("script")
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    )
    head.appendChild(script)
    dispatch({ type: "HANDLE_SUBMIT" })

    setTimeout(function() {
      SetShowButton(true)
    }, 2000)
  }
  const showMeeting1 = () => {
    dispatch({ type: "HANDLE_SUBMIT" })

    setTimeout(function() {
      SetShowButton(false)
    }, 100)
  }

  return (
    <React.Fragment>
      {/* ..............................................create high quality assessment........................................... */}
      <div className={classess.scroll_top} id="top_scroll" />
      <div className={classess.high_quality_assesssment} id="WhyRecruitmentBot">
        <div>
          <h4 className={classess.high_quality_assesssment_heading}>
            RecruitmentBot promises you the best recruitment experience,
            allowing employers full control over the hiring process
          </h4>
        </div>{" "}
        <div className={classess.right_side_img1}>
          {PerfectAsessment === "perfect" ? (
            <picture>
              <source srcSet={top_img1_webp} type="image/webp" />
              <source srcSet={top_img1} type="image/png" />
              <img
                srcSet={testing_img1_webp}
                alt="Image"
                loading="lazy"
                className={classess.top_img1_setting}
              />
            </picture>
          ) : PerfectAsessment === "second" ? (
            <picture>
              <source srcSet={top_img2_webp} type="image/webp" />
              <source srcSet={top_img2} type="image/png" />
              <img
                srcSet={testing_img2_webp}
                alt="Image"
                loading="lazy"
                className={classess.top_img1_setting}
              />
            </picture>
          ) : PerfectAsessment === "third" ? (
            <picture>
              <source srcSet={top_img3_webp} type="image/webp" />
              <source srcSet={top_img3} type="image/png" />
              <img
                srcSet={testing_img3_webp}
                alt="Image"
                loading="lazy"
                className={classess.top_img1_setting}
              />
            </picture>
          ) : null}
        </div>
        <div className={classess.left_side_boxes}>
          <div
            className={classess.top_first1}
            onMouseEnter={setassesment1}
            id="topfirst"
          >
            <h3 className={classess.top_first_heading1} id="topfirst1">
              Your top candidate is only a click away thanks to our intelligent
              ranking system
            </h3>
            {PerfectAsessment === "perfect" ? (
              <picture>
                <source srcSet={icon3_webp} type="image/webp" />
                <source srcSet={icon3} type="image/png" />
                <img
                  srcSet={icon3_webp}
                  alt="Image"
                  loading="lazy"
                  className={classess.icon1_setting}
                />
              </picture>
            ) : (
              <img
                src={icon}
                className={classess.icon1_setting}
                loading="lazy"
              />
            )}
            <p className={classess.para_setting1} id="topfirst2">
              {" "}
              Our state of the art filtering system allows employers to find
              their top matches on their own terms, based on their individual
              job requirements.
              {PerfectAsessment === "perfect"
                ? "RecruitmentBot has dozens of different filters that are tailored to your needs so you can shortlist compatible candidates in just a single click. "
                : null}
            </p>
          </div>
          <div
            className={classess.top_first}
            onMouseEnter={setassesment2}
            onClick={setassesment2}
            id="topsecond"
          >
            <h3 className={classess.top_first_heading} id="topsecond1">
              Find the top matches effortlessly through our candidate summary
              system{" "}
            </h3>
            {PerfectAsessment === "second" ? (
              <picture>
                <source srcSet={icon2_webp} type="image/webp" />
                <source srcSet={icon2} type="image/png" />
                <img
                  srcSet={icon2_webp}
                  alt="Image"
                  loading="lazy"
                  className={classess.icon1_setting}
                />
              </picture>
            ) : (
              <img
                src={icon}
                className={classess.icon1_setting}
                loading="lazy"
              />
            )}
            <p className={classess.para_setting} id="topsecond2">
              RecruitmentBot gives you a summary of all the candidates ranked on
              their compatibility with the chosen data.
              {PerfectAsessment === "second"
                ? "The better they match, the higher they get ranked. "
                : null}
            </p>
          </div>

          <div
            className={classess.top_first}
            onMouseEnter={setassesment3}
            id="topthird"
          >
            <h3 className={classess.top_first_heading} id="topthird1">
              No more CV screenings, find all your candidates information with
              just a few clicks
            </h3>
            {PerfectAsessment === "third" ? (
              <picture>
                <source srcSet={icon1_webp} type="image/webp" />
                <source srcSet={icon1} type="image/png" />
                <img
                  srcSet={icon1_webp}
                  alt="Image"
                  loading="lazy"
                  className={classess.icon1_setting}
                />
              </picture>
            ) : (
              <img
                src={icon}
                className={classess.icon1_setting}
                loading="lazy"
              />
            )}
            <p className={classess.para_setting} id="topthird2">
              {" "}
              There are so many aspects to consider if you want to make the
              perfect hire, which is why RecruitmentBot lets you pull out
              individual candidate records so you can view everything there is
              to.
              {PerfectAsessment === "third"
                ? " Whether it’s a candidate’s educational background or their skillset, you have it at your fingertips!"
                : null}{" "}
            </p>
          </div>
        </div>
        <div className={classess.right_side_img}>
          {PerfectAsessment === "perfect" ? (
            <picture>
              <source srcSet={top_img1_webp} type="image/webp" />
              <source srcSet={top_img1} type="image/png" />
              <img
                srcSet={top_img1_webp}
                alt="Image"
                loading="lazy"
                className={classess.top_img1_setting}
              />
            </picture>
          ) : PerfectAsessment === "second" ? (
            <img
              src={top_img2}
              className={classess.top_img1_setting}
              loading="lazy"
            />
          ) : PerfectAsessment === "third" ? (
            <img
              src={top_img3}
              className={classess.top_img1_setting}
              loading="lazy"
            />
          ) : null}
        </div>
      </div>

      {/* ...................................................Get The fastest And Best Matches................................... */}

      <div className={classess.loxo_main_div}>
        <div className={classess.loxo_subDiv}>
          <div className="container">
            <div className="row">
              <div className=" col-lg-6">
                <h1 className={classess.heading_font}>
                  <b>
                    Get the fastest and best matches ranked by compatibility{" "}
                  </b>
                </h1>
                <p className={classess.loxo_paragraph}>
                  Tired of the slow and time-consuming screening process?
                  RecruitmentBot is designed to make the hiring process easier
                  and more efficient for youbased instant ranking of candidates
                  for shortlisting, in line with your requirements.
                </p>
                <div className={classess.demo_button}>
                  <a href="https://mycareerdreams.com/recruitment_whitelisting">
                    View demo
                  </a>
                </div>
              </div>
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={loxo_img_webp} type="image/webp" />
                  <source srcSet={loxo_img} type="image/png" />
                  <img
                    srcSet={loxo_img_webp}
                    alt="Image"
                    className={classess.loxo_img_setting}
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* .....................................................Get The fastest And Best Matches ...................................  */}

      {/* ..............................................Spend more face time Div ........................................................ */}

      <div className={classess.main_div_of_text_img_style}>
        <div className={classess.main_div_of_text_img_style_sub}>
          <div className="container">
            <div className="row">
              <div className={classess.adjustspace + " col-lg-6 "}>
                <h1 className={classess.heading_font}>
                  Spend more face time with only the best candidates{" "}
                </h1>
                <p className={classess.loxo_paragraph}>
                  {" "}
                  Wasting too much time interviewing candidates you know aren’t
                  the right fit for the job? Our top-notch, state of the art
                  screening process ensures only the top candidates make their
                  way to you, so you can invest your time on only the right
                  candidates. 
                </p>
              </div>
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={testing_img1_webp} type="image/webp" />
                  <source srcSet={testing_img1} type="image/png" />
                  <img
                    srcSet={testing_img1_webp}
                    alt="Image"
                    className={classess.img1_setting}
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ......................................Spend more face time Ends Here.......................................     */}

      {/* ...............................Assess your candidates  ........................................ */}

      <div className={classess.natural_language_div}>
        <div className={classess.natural_language_subdiv}>
          <div className="container">
            <div className="row">
              <div className={classess.left_side + " col-lg-6"}>
                <div>
                  <h1 className={classess.heading_font2}>
                    Assess your candidates through casual and natural
                    conversations
                  </h1>
                </div>
                <div>
                  <p className={classess.loxo_paragraph}>
                    Our advanced AI solution ensures that every candidate gets a
                    natural and purely human conversational experience.
                    Candidates will feel at home answering all questions,
                    identifying the right candidates.
                  </p>
                </div>
              </div>
              <div className={classess.right_side + " col-lg-6"}>
                <picture>
                  <source srcSet={nlp_webp} type="image/webp" />
                  <source srcSet={nlp} type="image/jpeg" />
                  <img
                    srcSet={nlp_webp}
                    alt="Image"
                    loading="lazy"
                    className={classess.natural_img}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ................................ Assess your candidates Ends Here ..............................  */}

      {/* ........................ Remove unconscious bias ..................  */}

      <div className={classess.main_div_of_text_img_style2}>
        <div className={classess.main_div_of_text_img_style2_sub}>
          <div className="container">
            <div className="row">
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={testing_img2_webp} type="image/webp" />
                  <source srcSet={testing_img2} type="image/png" />
                  <img
                    srcSet={testing_img2_webp}
                    alt="Image"
                    loading="lazy"
                    className={classess.img2_setting}
                  />
                </picture>
              </div>
              <div className={classess.adjustspace2 + " col-lg-6"}>
                <h1 className={classess.heading_font}>
                  Remove unconscious bias in your hiring process
                </h1>
                <p className={classess.loxo_paragraph}>
                  RecruitmentBot guarantees a recruitment process in which you
                  hire candidates based solely on their compatibility for the
                  job. Our incredibly advanced AI and rule-based modelling
                  minimizes chance of error or bias.
                </p>

                <div className={classess.demo_button}>
                  <a onClick={showMeeting}>Request a demo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ........................ Remove unconscious bias Ends Here..................  */}

      {/* .....................................Offer your candidates.......................................... */}
      <div className={classess.put_candidates_main_div}>
        <div className={classess.put_candidates_sub_div}>
          <div className="container">
            <div className="row">
              <div className={classess.put_right_color + " col-lg-6 "}>
                <div>
                  <h1 className={classess.heading_font}>
                    Offer your candidates a positive recruitment experience{" "}
                  </h1>
                </div>
                <div>
                  <p className={classess.loxo_paragraph}>
                    An efficient screening process is the best way to attract a
                    great candidate. Through customization our professional and
                    effective assessment becomes an extension of your brand
                    personality. RecruitmentBot gives your potential employees,
                    the motivation they need to thrive.
                  </p>
                </div>
              </div>
              <div className=" col-lg-6">
                <picture>
                  <source srcSet={put_img_webp} type="image/webp" />
                  <source srcSet={put_img} type="image/png" />
                  <img
                    srcSet={put_img_webp}
                    alt="Image"
                    loading="lazy"
                    className={classess.img2_setting}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ...................................................Offer your candidates Ends Here..................................... */}

      {/* ............................Go above and beyond...........................    */}

      <div className={classess.main_div_of_text_img_style_put}>
        <div className={classess.main_div_of_text_img_style_sub_put}>
          <div className="container">
            <div className="row">
              <div className={classess.adjustspace3 + " col-lg-6"}>
                <h1 className={classess.heading_font}>
                  Go above and beyond to make your hires diverse and inclusive{" "}
                </h1>
                <p className={classess.loxo_paragraph}>
                  RecruitmentBot’s diversity and inclusivity features help you
                  broaden your scope for diversity while reducing bias to a
                  minimum. 
                </p>
              </div>
              <div className="col-lg-6">
                <picture>
                  <source srcSet={testing_img3_webp} type="image/webp" />
                  <source srcSet={testing_img3} type="image/png" />
                  <img
                    srcSet={testing_img3_webp}
                    alt="Image"
                    loading="lazy"
                    className={classess.img1_setting}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* .........................................Go above and beyond Ends here ....................................     */}

      {/* .............................. Lets Build .................................. */}

      <div className={classess.main_div}>
        <div className={classess.sub_div}>
          <div className="container">
            <div className="row">
              <div className={classess.background_color + " col-lg-6"}>
                <h1 className={classess.font}>
                  LET'S <br />
                  BUILD A <br />{" "}
                  <b className={classess.color_work}>WORKPLACE</b> <br />
                  WHERE
                </h1>
              </div>
              <div className="col-lg-6">
                <picture>
                  <source srcSet={work_webp} type="image/webp" />
                  <source srcSet={work} type="image/png" />
                  <img
                    srcSet={work_webp}
                    alt="Image"
                    className={classess.work_img}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ....................................... Lets Build Ends.......................      */}

      {/* .......................................Statistics About Recruitment.......................      */}

      <div className={classess.main_div}>
        <div className={classess.sub_div}>
          <div className={classess.heading_area}>
            <h1 className={classess.stats_heading}>
              Statistics About Recruitment
            </h1>
          </div>

          <div className={classess.parent_of_white_boxes}>
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className={classess.childs}>
                    <CountUp
                      end={5}
                      redraw={true}
                      suffix="x"
                      className={classess.counter_style}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span
                            ref={countUpRef}
                            className={classess.counter_style}
                          />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    <p className={classess.speed_paragraph}>
                      Companies lacking a consistent pre-employment selection
                      process are 5 times more likely to make a bad hire.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={classess.childs}>
                    <CountUp
                      end={74}
                      redraw={true}
                      suffix="%"
                      className={classess.counter_style}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span
                            ref={countUpRef}
                            className={classess.counter_style}
                          />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    <p className={classess.speed_paragraph}>
                      74 percent of companies who made a poor hire lost an
                      average of $14,900 per poor hire.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className={classess.childs}>
                    <CountUp
                      end={46}
                      redraw={true}
                      suffix="%"
                      className={classess.counter_style}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span
                            ref={countUpRef}
                            className={classess.counter_style}
                          />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                    <p className={classess.speed_paragraph}>
                      46% of all new hires are deemed as a failures by the
                      18-month mark.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* .......................................Statistics About Recruitment Ends.......................      */}
      <div className={classess.main_div1}>
        <Parteners />
        <Footer />
      </div>

      {/* .......................................Footer.......................      */}
      
      {/* .......................................Footer Ends Here.......................      */}

      {/* .......................................Calendly Code .......................      */}
      <div className={classess.req1}>
        {globalState.state !== undefined ? (
          globalState.state.meeting === true ? (
            <div id="schedule_form" className={classess.testing}>
              <div
                className={classess.abc + " calendly-inline-widget"}
                data-url="https://calendly.com/botnostic-solutions"
                style={{ minWidth: "100%", height: "660px" }}
              />
              {showButton === true ? (
                <span className={classess.clendly_close}>
                  <img
                    src={close_button}
                    onClick={showMeeting1}
                    id="close_button"
                    loading="lazy"
                  />
                </span>
              ) : null}
            </div>
          ) : null
        ) : null}

        <div className={classess.req}>
          {globalState.state !== undefined ? (
            globalState.state.meeting === true ? (
              <div className={classess.close_meeting} onClick={showMeeting1}>
                Close
              </div>
            ) : (
              <div className={classess.request_a_meeting} onClick={showMeeting}>
                Book a demo session
              </div>
            )
          ) : null}
        </div>
      </div>

    

      {/* <div className={classess.scroll} >
<span  >
                 <a href="#top_scroll"> <img src={scroll_icon} loading="lazy" /></a>   
                </span>


</div> */}

      {/* .......................................Calendly Code Ends Here .......................      */}

      {/* .........................................form area ............................. */}

      {globalState.state !== undefined ? (
        globalState.state.openform === true ? (
          <Recruitment_Form/>
        ) : null
      ) : null}

{/* <Footer /> */}
    </React.Fragment>
  )
}
export default RecruitmentBody

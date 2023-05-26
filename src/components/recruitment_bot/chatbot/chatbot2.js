import React, { useReducer, useEffect, useContext } from "react"
import { navigate } from "gatsby"
import { store } from "src/context/store"

// CSS FILES
import * as classes from "./css/chatbot.module.css"
import "./css/style.css"
import downward from "./static/dropdown.png"
import upward from "./static/upward.png"

// Images
import left_blob from "src/images/recruitment_left_blob.png"
import right_blob from "src/images/recruitment_right_blob.png"
import star_png from "./static/star.png"
import gif from "./static/typing.gif"

// NPM Components
import Swal from "sweetalert2"
import $ from "jquery"
// import Particles from './particles/particles';
import { REC_URL, MEEZAN_API_URL } from "src/constants"
import RecruitmentHeader from "../main_page/header/header"
import Footer from "../main_page/footer/footer"
import JobPrompt from "./job_code_prompt/job_code_prompt"
import { MEEZAN_COMPANY_CODE } from "../../../constants"

let CURRENT_API_URL = REC_URL

const ChatBot = props => {
  const [show, setShwow] = React.useState(false)
  const globalState = useContext(store)
  const { dispatch } = globalState
  let prompt_flag
  const [showRange, setShowRange] = React.useState(false)
  const [careerName, storeCareerName] = React.useState("")
  const [chat_id, setUserChatId] = React.useState("")
  const [answerFlag, setAnswerFlag] = React.useState(false)
  if (globalState.state !== undefined) {
    prompt_flag = globalState.state.jobCodePrompt
  }
  const [u_token, setToken] = React.useState("")
  const [u_user_id, setUserId] = React.useState("")
  let token = ""
  let user_id = ""
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  })
  const initState = {
    id: "1",
    user: "",
    intent: "name",
    user_input: "",
    option_names: "",
    question_text: "",
    question_type: "",
    option_values: "",
    question_id: "",
    function_state: false,
    chat_record: [],
    checkbox_length: 0,
    disabled: false,
    gif: false,
    show: true,
    radio_chk: false,
    question_records_ids: [],
    question_record: {},
    report: [],
    compatibility: [],
  }

  const [state, setState] = useReducer(reducer, initState)
  const [loading, setLoading] = React.useState(true)

  const salary_expectations = {
    Pakistan: {
      option_name: [
        "Less than PKR 50, 000",
        "PKR 50, 000 - PKR 75, 000",
        "PKR 75, 000 - PKR 100, 000",
        "PKR 100, 000 - PKR 150, 000",
        "PKR 150, 000 & Above",
      ],
    },
    "United States": {
      option_name: [
        "Less than USD 1000",
        "USD 1000 - USD 10,000",
        "USD 10,000 -  USD 50,000",
        "USD 50,000-  USD 100,000",
        "USD 100,000 & Above",
      ],
    },
  }
  // ComponentDidMount
  useEffect(() => {
    // It will checks following things
    // 1. User does not visit this page directly.. Means it must follows the  channel defined to reach to this page.
    // 2. Check whether user applied for any job code for this chat. If it does not show him job prompt to choose job code for this chat.
    // 3. Check for previous chat record by user

    // console.log(props)
    if ((props.location.state === null) & (props.location.search === null)) {
      navigate("/recruitment-bot/")
      Swal.fire({
        icon: "error",
        title: "Not Authenticated",
        text: "Please Login First",
      })
      return
    } else {
      if (props.location.search !== "") {
        let info = props.location.search.split("?==")
        token = info[1]
        user_id = info[2]
        setToken(info[1])
        setUserId(info[2])
      } else if (props.location.state !== null) {
        // console.log(props.location.state)
        token = props.location.state.token
        user_id = props.location.state.user.id
        setToken(props.location.state.token)
        setUserId(props.location.state.user.id)
        
        CURRENT_API_URL =  (props.location.state.company_code  ==  "AlMEZ020") ? MEEZAN_API_URL : REC_URL 

      }
      // console.log(token)
    }

    // else{

    // }

    // console.log(sessionStorage.getItem('user_chat_id'))
    setUserChatId(sessionStorage.getItem("user_chat_id"))
    let id_of_chat = sessionStorage.getItem("user_chat_id")

    async function getCareerName() {
      const career_name = await fetch(
        `${CURRENT_API_URL}/recruitment/check-job-applied`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer" + token,
          },
          body: JSON.stringify({
            user_chat_id: parseInt(id_of_chat),
          }),
        }
      )
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.status === false) {
            document.getElementById("chatbot_wrapper").style.zIndex = -1
            // document.getElementById('recruitment_header').style.zIndex = -1
            dispatch({
              type: "SHOW_JOBCODE_PROMPT",
            })
            // console.log(globalState.state.jobCodePrompt)
          } else {
            document.getElementById("chatbot_wrapper").style.zIndex = 0
            sessionStorage.setItem("career_name", data["career_name"])
            // document.getElementById('recruitment_header').style.zIndex = 0
            sessionStorage.setItem("career_name", data["career_name"])
            storeCareerName(data["career_name"])
            return data["career_name"]
          }
        })
    }
    getCareerName()

    // console.log("user id is: ",props.location.state.user.id)
    fetch(`${CURRENT_API_URL}/recruitment/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (data.message === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: "Please Login Again",
          })
          navigate("/recruitment-bot/sign-up/")
          return
        }
        setState({
          user: data.user.id,
        })
      })
    fetch(`${CURRENT_API_URL}/recruitment/previous?chat_key=${id_of_chat}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log("data returned from /previous: ",data)
        if ("compatibility" in data) {
          setState({
            compatibility: data.compatibility,
          })
          {
            if (Object.keys(data.compatibility) > 0) {
              document.getElementById("input_field_chat").style.display = "none"
            }
          }
        }
        if ("previous_question" in data) {
          setState({
            question_record: {
              id: data.question_record.id,
              text: data.question_record.text,
              question_type: data.question_record.question_type,
              option_name: data.question_record.option_name,
              option_value: data.question_record.option_values,
              intent: data.question_record.intent,
              context: data.question_record.context,
            },
            question_records_ids: [
              ...state.question_records_ids,
              parseInt(data.question_record.id),
            ],
            intent: data.question_record.intent,
            option_values: data.question_record.option_values,
          })
          if (data.question_record.question_type === "sl") {
            setShowRange(true)
          }
          if (
            data.question_record.question_type === "c" ||
            data.question_record.question_type === "r" ||
            data.question_record.question_type === "th" ||
            data.question_record.question_type === "sl"
          ) {
            setState({
              disabled: true,
            })
          }

          if (data.question_record.question_type === "th") {
            document.getElementById("input_field_chat").style.display = "none"
          }
        }
        //
        if ("previous_chat" in data) {
          // console.log("old user")
          setState({
            is_new_user: false,
            prev_data: data,
          })
          $("#chat_container")
            .stop()
            .animate({
              scrollTop: $("#chat_container")[0].scrollHeight,
            })
        } else {
          // console.log("new user")
          setState({
            is_new_user: true,
            chat_record: [
              {
                id: "1",
                type: "question",
                content: "What is your name ?",
                question_type: "t",
                intent: "name",
              },
            ],
          })
        }
        setLoading(false)
      })
  }, [])
  const toggle = e => {
    e.preventDefault()
    setShwow(!show)
    $("#chat_container")
      .stop()
      .animate({
        scrollTop: $("#chat_container")[0].scrollHeight + window.innerHeight,
      })
    //   $('#showonclick').show();

    // SelectType(subjects,SetSelectStore,SetSelectQuestion)
  }
  // const toggle1=(e) =>{
  //     e.preventDefault()
  //     setShwow(!show)
  //     $('#chat_flow').stop ().animate ({
  //         scrollTop: $('#chat_flow')[0].scrollHeight
  //       });
  //       $('#showonclick').hide();

  // }

  const FooterPosition = () => {
    // if (window.innerWidth < 967) {
    //   document.querySelector("div[data-role='footer']").style.display = "none"
    // }
  }

  const change = event => {
    // store user input in state that user enter in from input

    // console.log(event.target.value)
    setState({
      // user_input: event.target.value,
      user_input: event.target.value.replace(/[^a-zA-Z0-9_ ]/g, ""),
    })
  }

  const radio_type = (e, radio_name) => {
    // store user input and radio option vaues in state when question type is radio
    setState({
      user_input: radio_name,
      option_values: e.target.value,
      //    disabled:false
    })
  }

  const checkbox_type = async (
    option_value_index,
    event,
    question_type,
    checkbox_length,
    option_name_length,
    option_name_index
  ) => {
    // store user input and checked checkboxes option vaues in state when question type is checkbox
    let x = document.getElementsByClassName("checked")
    var array_value = []
    var array_name = []
    let string_value
    let string_name
    for (let i = 0; i < x.length; i++) {
      if (x[i].checked === true) {
        array_value.push(x[i].value)

        array_name.push(" " + x[i].id)
        string_value = array_value.toString()
        string_name = array_name.toString()
      }
    }
    //    console.log(string_name)
    setState({
      // user_input: string_name.replace(/[^a-zA-Z0-9_ ]/g, ""),
      user_input: string_name,
      option_values: string_value,
      // disabled:false
    })
    string_value = ""
    string_name = ""
  }

  const handleSubmit = async event => {
    //this function will gathered the required information for chat api. Pass it to the API and get next question to be asked
    event.preventDefault()
    setShwow(false)
    // if (window.innerWidth < 967) {
    //   document.querySelector("div[data-role='footer']").style.display = "block"
    // }
    if (state.option_values === undefined || state.user_input === "") {
      return false
    }

    document.querySelectorAll("input[type='checkbox']").forEach(item => {
      item.setAttribute("disabled", "true")
    })
    $("#chat_container")
      .stop()
      .animate({
        scrollTop: $("#chat_container")[0].scrollHeight,
      })
    let result
    let post_data = {
      user: u_user_id,
      intent: state.intent,
      user_input: state.user_input,
      option_values: state.option_values,
      previous_question: state.question_id,
      chat_key: chat_id,
    }
    // console.log(post_data)
    // console.log(post_data)
    let chat_type_answer = {
      type: "",
      content: "",
    }
    chat_type_answer.type = "answer"
    chat_type_answer.content = state.user_input
    // state.chat_record.push(chat_type_answer)
    setState({
      // chat_record:state.chat_record.push(chat_type_answer),
      chat_record: [...state.chat_record, chat_type_answer],
      gif: true,
    })
    // console.log(props.location.state)
    setAnswerFlag(true)
    fetch(`${CURRENT_API_URL}/recruitment/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + u_token,
      },
      body: JSON.stringify(post_data),
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return console.log("api is not working")
        }
      })
      .then(data => (result = data))
      .then(() => {
        // console.log(result)

        // reached report
        if (result.length === 2) {
          // console.log(typeof result[0])

          // let arr =
          // let b = Object.keys(result[0]).map(items=>{
          //     if(parseInt(result[0][items]) >= 0 ){
          //         return (
          //             <tr key={items}>
          //                 <td><img src={star_png} alt="star" style={{width:'15px'}}/> {items}</td>
          //                 <td>{result[0][items]}%</td>
          //             </tr>
          //         )
          //     }
          // })

          // console.log("arr",arr)
          // console.log(b)

          setState({
            // report:b,
            // question_type:"th",
            disabled: true,
            intent: result[1]["intent"],
            option_values: result[1]["option_values"],
            question_id: result[1]["id"],
            option_names: result[1]["option_name"],
            question_type: result[1]["question_type"],
            question_text: result[1]["text"],
            function_state: true,
          })
          setAnswerFlag(false)
          // document.querySelector("form input[type='text']").setAttribute("disabled","true")
          // document.querySelector("form input[type='submit']").setAttribute("disabled","true")
          document.getElementById("input_field_chat").style.display = "none"
          // document.getElementById("sub_btn").style.display = "none"
          // document.getElementById("final-report").style.display = "block";
        }
        // if(result.question_type !== 'th')
        // {
        setState(
          {
            intent: result["intent"],
            option_values: result["option_values"],
            question_id: result["id"],
            option_names: result["option_name"],
            question_type: result["question_type"],
            question_text: result["text"],
            function_state: true,
          } /*,()=>{console.log(outer_this.state.checkbox_length)}*/
        )
        // }
        // let objDiv = document.getElementById("chat_container");

        // objDiv.scrollTop = objDiv.scrollHeight + 500;

        $("#chat_container")
          .stop()
          .animate({
            scrollTop: $("#chat_container")[0].scrollHeight,
          })

        // console.log(objDiv.scrollTop)
      })
    setShowRange(false)

    // console.log(outer_this.state)
  }

  useEffect(() => {
    // This will check where the user has left the chat previously. If any, store relevant info in relevent states
    if (state.question_text === "") {
      return
    }
    let chat_type_question = {
      id: "",
      type: "",
      content: "",
      question_type: "",
      option_name: "",
      option_value: "",
      intent: "",
    }

    state.question_records_ids.push(state.question_id)
    chat_type_question.id = state.question_id
    chat_type_question.type = "question"
    chat_type_question.question_type = state.question_type

    // if(state.question_type === undefined){
    //     chat_type_question.question_type = "th"
    // }

    chat_type_question.content = state.question_text
    chat_type_question.option_value = state.option_values
    chat_type_question.option_name = state.option_names
    chat_type_question.intent = state.intent

    // state.chat_record.push(chat_type_question)
    setState({
      // chat_record:state.chat_record.push(chat_type_question),
      chat_record: [...state.chat_record, chat_type_question],
      gif: false,
    })
    if (state.question_type === "sl") {
      setShowRange(true)
    }

    if (
      state.question_type === "th" ||
      state.question_type === "r" ||
      state.question_type === "c" ||
      state.question_type === "sl"
    ) {
      setState({
        disabled: true,
        // radio_chk:false,
        // show:true
      })
    } else {
      setState({
        disabled: false,
        // radio_chk:true,
        // show:false
      })
    }
    setState({
      user_input: "",
      option_values: "",
    })
  }, [state.intent])

  const renderPreviousChat = () => {
    // If user had any previous chat and does not reaches to advice then check what is the type of next question to be asked and show it to user in defined manner.
    return state.prev_data.previous_chat.map((rslt, index) => {
      // return hard coded first question
      if (index === 0) {
        return (
          <React.Fragment key={rslt.text}>
            <div className={classes.question_side_main}>
              <div className={classes.question_side}>What is your name ?</div>
              <div className={classes.question_side_empty}></div>
            </div>
            <>
              <div className={classes.position_right}>
                <div className={classes.answer_side_empty}></div>
                <div className={classes.answer_side}>{rslt.text}</div>
              </div>
            </>
          </React.Fragment>
        )
      }
      // last question in array
      else if (index === state.prev_data.previous_chat.length - 1) {
        // console.log(state.prev_data)
        let rslt = state.question_record
        return (
          <React.Fragment>
            {/* return get report button */
            state.question_record.question_type === "thi" ? (
              // <div className={"final_report_div "+classes.question_side}  onClick={showAdvice}>
              //     <button id="get_report_btn">Get Report !</button>
              // </div>
              <React.Fragment>
                change thi to th and uncomment to show get report
              </React.Fragment>
            ) : (
              /* check for questions */
              <div data-question={rslt.id} key={rslt.id}>
                {rslt.question_type === "r" ? (
                  <React.Fragment key={rslt.option_value[index]}>
                    {state.question_records_ids[
                      state.question_records_ids.length - 1
                    ] !== rslt.id ? (
                      <div className={classes.question_side_main}>
                        <div className={classes.question_side}>{rslt.text}</div>
                        <div className={classes.question_side_empty}></div>
                      </div>
                    ) : (
                      <>
                        <div className={classes.question_side_main}>
                          <div className={classes.question_side}>
                            {rslt.text}
                          </div>
                          <div className={classes.question_side_empty}></div>
                        </div>

                        {/* {console.log(rslt.intent)} */}
                        <div className={classes.position_right}>
                          <div className={classes.answer_side_empty}></div>
                          <div className={classes.radio_button_side}>
                            <div
                              className={classes.radio_button}
                              id="test_main_div"
                            >
                              {state.gif === true
                                ? null
                                : (rslt.intent === "opt_field") &
                                  (careerName !== undefined) &
                                  (sessionStorage.getItem("career_name") !==
                                    null)
                                ? rslt.option_name.map((rslt_2, index) => {
                                    if (
                                      rslt_2 === careerName ||
                                      rslt_2 ===
                                        sessionStorage.getItem("career_name")
                                    ) {
                                      // console.log('in if')
                                      return (
                                        <div
                                          key={index}
                                          id="test"
                                          className={`${classes.radio_button}`}
                                        >
                                          <input
                                            type="radio"
                                            name={rslt.intent}
                                            value={rslt.option_value[index]}
                                            id={
                                              rslt_2 === "Chemical Engineering"
                                                ? "chemical"
                                                : rslt_2 ===
                                                  "Mechanical Engineering"
                                                ? "mechanical"
                                                : rslt_2 ===
                                                  "Full Stack Developer"
                                                ? "full_stack_developer"
                                                : rslt_2 ===
                                                  "Electrical Engineering"
                                                ? "electrical_engineering"
                                                : rslt_2 === "Human Resource"
                                                ? "human_resource"
                                                : rslt_2 === "Legal Counsel"
                                                ? "legal_counsel"
                                                : rslt_2 === "Sales executive"
                                                ? "sales_executive"
                                                : rslt_2 === "Android Developer"
                                                ? "android_developer"
                                                : rslt_2 ===
                                                  "Social Media Marketer"
                                                ? "social_media_marketer"
                                                : rslt_2 === "Finance Executive"
                                                ? "finance_executive"
                                                : rslt.option_value[index]
                                            }
                                            className="recruitment"
                                            onChange={e =>
                                              radio_type(e, rslt_2)
                                            }
                                          />
                                          <label
                                            htmlFor={
                                              rslt_2 === "Chemical Engineering"
                                                ? "chemical"
                                                : rslt_2 ===
                                                  "Mechanical Engineering"
                                                ? "mechanical"
                                                : rslt_2 ===
                                                  "Full Stack Developer"
                                                ? "full_stack_developer"
                                                : rslt_2 ===
                                                  "Electrical Engineering"
                                                ? "electrical_engineering"
                                                : rslt_2 === "Human Resource"
                                                ? "human_resource"
                                                : rslt_2 === "Legal Counsel"
                                                ? "legal_counsel"
                                                : rslt_2 === "Sales executive"
                                                ? "sales_executive"
                                                : rslt_2 === "Android Developer"
                                                ? "android_developer"
                                                : rslt_2 ===
                                                  "Social Media Marketer"
                                                ? "social_media_marketer"
                                                : rslt_2 === "Finance Executive"
                                                ? "finance_executive"
                                                : rslt.option_value[index]
                                            }
                                            className={classes.label_styling}
                                          >
                                            {rslt_2}
                                          </label>
                                          <br />
                                        </div>
                                      )
                                    }
                                  })
                                : // Salary Expectation Value Bases On Countries
                                rslt.intent === "salary_expectations"
                                ? salary_expectations[
                                    props.location.state.user.country
                                  ] !== undefined
                                  ? salary_expectations[
                                      props.location.state.user.country
                                    ].option_name.map(
                                      (sal_range, sal_range_index) => {
                                        return (
                                          <div
                                            key={index}
                                            id="test"
                                            className={classes.radio_button}
                                          >
                                            <input
                                              type="radio"
                                              name={rslt.intent}
                                              value={
                                                rslt.option_value[
                                                  sal_range_index
                                                ]
                                              }
                                              id={
                                                rslt.option_value[
                                                  sal_range_index
                                                ]
                                              }
                                              onChange={e =>
                                                radio_type(e, sal_range)
                                              }
                                            />
                                            <label
                                              htmlFor={
                                                rslt.option_value[
                                                  sal_range_index
                                                ]
                                              }
                                            >
                                              {sal_range}
                                            </label>
                                            <br />
                                          </div>
                                        )
                                      }
                                    )
                                  : salary_expectations[
                                      "United States"
                                    ].option_name.map(
                                      (sal_range, sal_range_index) => {
                                        return (
                                          <div
                                            key={index}
                                            id="test"
                                            className={classes.radio_button}
                                          >
                                            <input
                                              type="radio"
                                              name={rslt.intent}
                                              value={
                                                rslt.option_value[
                                                  sal_range_index
                                                ]
                                              }
                                              id={
                                                rslt.option_value[
                                                  sal_range_index
                                                ]
                                              }
                                              onChange={e =>
                                                radio_type(e, sal_range)
                                              }
                                            />
                                            <label
                                              htmlFor={
                                                rslt.option_value[
                                                  sal_range_index
                                                ]
                                              }
                                            >
                                              {sal_range}
                                            </label>
                                            <br />
                                          </div>
                                        )
                                      }
                                    )
                                : rslt.option_name.map((rslt_1, index) => {
                                    return (
                                      <div
                                        key={index}
                                        id="test"
                                        className={classes.radio_button}
                                      >
                                        <input
                                          type="radio"
                                          name={rslt.intent}
                                          value={rslt.option_value[index]}
                                          id={
                                            rslt_1 === "Chemical Engineering"
                                              ? "chemical"
                                              : rslt_1 ===
                                                "Mechanical Engineering"
                                              ? "mechanical"
                                              : rslt_1 ===
                                                "Full Stack Developer"
                                              ? "full_stack_developer"
                                              : rslt_1 ===
                                                "Electrical Engineering"
                                              ? "electrical_engineering"
                                              : rslt_1 === "Human Resource"
                                              ? "human_resource"
                                              : rslt_1 === "Legal Counsel"
                                              ? "legal_counsel"
                                              : rslt_1 === "Sales executive"
                                              ? "sales_executive"
                                              : rslt_1 === "Android Developer"
                                              ? "android_developer"
                                              : rslt_1 ===
                                                "Social Media Marketer"
                                              ? "social_media_marketer"
                                              : rslt_1 === "Finance Executive"
                                              ? "finance_executive"
                                              : rslt.option_value[index]
                                          }
                                          // className ="recruitment"
                                          onChange={e => radio_type(e, rslt_1)}
                                        />
                                        <label
                                          htmlFor={
                                            rslt_1 === "Chemical Engineering"
                                              ? "chemical"
                                              : rslt_1 ===
                                                "Mechanical Engineering"
                                              ? "mechanical"
                                              : rslt_1 ===
                                                "Full Stack Developer"
                                              ? "full_stack_developer"
                                              : rslt_1 ===
                                                "Electrical Engineering"
                                              ? "electrical_engineering"
                                              : rslt_1 === "Human Resource"
                                              ? "human_resource"
                                              : rslt_1 === "Legal Counsel"
                                              ? "legal_counsel"
                                              : rslt_1 === "Sales executive"
                                              ? "sales_executive"
                                              : rslt_1 === "Android Developer"
                                              ? "android_developer"
                                              : rslt_1 ===
                                                "Social Media Marketer"
                                              ? "social_media_marketer"
                                              : rslt_1 === "Finance Executive"
                                              ? "finance_executive"
                                              : rslt.option_value[index]
                                          }
                                        >
                                          {/* {console.log(rslt_1)} */}
                                          {rslt_1}
                                        </label>
                                        <br />
                                      </div>
                                    )
                                  })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </React.Fragment>
                ) : rslt.question_type === "c" ? (
                  <React.Fragment key={rslt.option_name[index]}>
                    {state.question_records_ids[
                      state.question_records_ids.length - 1
                    ] !== rslt.id ? (
                      <div className={classes.question_side_main}>
                        <div className={classes.question_side}>{rslt.text}</div>
                        <div className={classes.question_side_empty}></div>
                      </div>
                    ) : (
                      <>
                        <div className={classes.question_side_main}>
                          <div className={classes.question_side}>
                            {" "}
                            {rslt.text}{" "}
                          </div>
                          <div className={classes.question_side_empty}></div>
                        </div>
                        {state.gif === true ? null : (
                          <>
                            <div className={classes.position_right}>
                              <div className={classes.answer_side_empty}></div>
                              <div
                                className={
                                  show ? classes.right : classes.right_margin
                                }
                                onClick={toggle}
                              >
                                Select {show === false ? "Options" : null}
                                {show === false ? (
                                  <img
                                    className={classes.down}
                                    // onClick={toggle}
                                    src={downward}
                                    alt="dropdown"
                                  />
                                ) : (
                                  <img
                                    // onClick={toggle}
                                    className={classes.down}
                                    src={upward}
                                    alt="upward"
                                  />
                                )}
                                {show === true ? (
                                  <hr className={classes.line_styling} />
                                ) : null}
                              </div>
                            </div>

                            {show === true ? (
                              <div className={classes.position_right}>
                                <div
                                  className={classes.answer_side_empty}
                                ></div>
                                <div className={classes.move_it}>
                                  <>
                                    {rslt.option_name.map((rslt_2, index) => {
                                      return (
                                        <div
                                          key={rslt.option_value[index]}
                                          className={classes.move_right}
                                        >
                                          <input
                                            type="checkbox"
                                            name={rslt.intent}
                                            value={rslt.option_value[index]}
                                            onChange={e =>
                                              checkbox_type(
                                                rslt.option_value[index],
                                                e,
                                                rslt.question_type,
                                                state.checkbox_length,
                                                rslt.option_name.length,
                                                rslt.option_name[index]
                                              )
                                            }
                                            id={rslt.option_name[index]}
                                            className="checked checkbox_styling"
                                          />
                                          <label
                                            htmlFor={rslt.option_name[index]}
                                            className="recruitment checkbox_label"
                                          >
                                            {rslt_2}
                                          </label>
                                          <br />

                                          <br />
                                        </div>
                                      )
                                    })}
                                  </>
                                </div>
                              </div>
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                  </React.Fragment>
                ) : rslt.question_type === "t" ? (
                  <div className={classes.question_side_main}>
                    <div className={classes.question_side}>{rslt.text}</div>
                    <div className={classes.question_side_empty}></div>
                  </div>
                ) : rslt.question_type === "sl" ? (
                  <React.Fragment>
                    <div className={classes.question_side_main}>
                      <div className={classes.question_side}>{rslt.text}</div>
                      <div className={classes.question_side_empty}></div>
                    </div>

                    {showRange === true ? (
                      <div className={classes.position_right}>
                        <div className={classes.answer_side_empty}></div>
                        <div className={classes.radio_button1}>
                          <input
                            type="range"
                            name="age_range"
                            min={0}
                            max={100}
                            className="recruitment range_slider"
                            onChange={change}
                          />
                        </div>
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : rslt.question_type === "th" ? (
                  <div className={classes.question_side_main}>
                    <div className={classes.question_side}> {rslt.text}</div>
                    <div className={classes.question_side_empty}></div>
                  </div>
                ) : null}
              </div>
            )}
          </React.Fragment>
        )
      }
      // follow normal flow
      if (rslt.type === "answer") {
        return (
          <div className={classes.position_right}>
            <div className={classes.answer_side_empty}></div>
            <div className={classes.answer_side}>{rslt.text}</div>
          </div>
        )
      } else {
        return (
          <div className={classes.question_side_main}>
            <div className={classes.question_side}>{rslt.text}</div>
            <div className={classes.question_side_empty}></div>
          </div>
        )
      }
    })
  }

  const renderchat = () => {
    // The real time chat  operation is managed by this function. It get the data of next question to be asked. checked its question type and show it to user in defined manner

    return state.chat_record.map((rslt, index) => {
      if (rslt.type === "answer") {
        return (
          <React.Fragment key={rslt.content}>
            <div className={classes.position_right}>
              <div className={classes.answer_side_empty}></div>
              <div className={classes.answer_side}>{rslt.content}</div>
              {/* <div className={classes.answer_side} >
                                
                                {rslt.content} 
                              </div> */}
            </div>
          </React.Fragment>
        )
      }
      // {setQuestionId state.server_question}
      else {
        return (
          <React.Fragment>
            {rslt.question_type === "thi" ? (
              // <div className={"final_report_div "+classes.question_side}  onClick={showAdvice}>
              //     <button id="get_report_btn">Get Report !</button>
              // </div>

              <React.Fragment>
                change thi to th and uncomment to show get report
              </React.Fragment>
            ) : rslt.content !== undefined ? (
              <React.Fragment>
                <div className={classes.position_left}>
                  <div
                    // className={state.question_type === "thi"?"final_report_div "+classes.question_side:classes.question_side}
                    data-question={rslt.id}
                  >
                    {rslt.question_type === "r" ? (
                      <React.Fragment>
                        {state.question_records_ids[
                          state.question_records_ids.length - 1
                        ] !== rslt.id ? (
                          <div className={classes.question_side_main}>
                            <div className={classes.question_side}>
                              {rslt.content}
                            </div>
                            <div className={classes.question_side_empty}></div>
                          </div>
                        ) : (
                          <>
                            <div className={classes.question_side_main}>
                              <div className={classes.question_side}>
                                {rslt.content}
                              </div>
                              <div
                                className={classes.question_side_empty}
                              ></div>
                            </div>
                            <div className={classes.position_right}>
                              <div className={classes.answer_side_empty}></div>
                              <div className={classes.radio_button_side}>
                                {" "}
                                <div
                                  className={classes.radio_button}
                                  id="test_main_div"
                                >
                                  {state.gif === true
                                    ? null
                                    : (rslt.intent === "opt_field") &
                                      (careerName !== undefined) &
                                      (sessionStorage.getItem("career_name") !==
                                        null)
                                    ? rslt.option_name.map((rslt_1, index) => {
                                        if (
                                          rslt_1 === careerName ||
                                          rslt_1 ===
                                            sessionStorage.getItem(
                                              "career_name"
                                            )
                                        ) {
                                          return (
                                            <div
                                              key={index}
                                              id="test"
                                              className={`${classes.radio_button}`}
                                            >
                                              <input
                                                type="radio"
                                                name={rslt.intent}
                                                value={rslt.option_value[index]}
                                                id={
                                                  rslt_1 ===
                                                  "Chemical Engineering"
                                                    ? "chemical"
                                                    : rslt_1 ===
                                                      "Mechanical Engineering"
                                                    ? "mechanical"
                                                    : rslt_1 ===
                                                      "Full Stack Developer"
                                                    ? "full_stack_developer"
                                                    : rslt_1 ===
                                                      "Electrical Engineering"
                                                    ? "electrical_engineering"
                                                    : rslt_1 ===
                                                      "Human Resource"
                                                    ? "human_resource"
                                                    : rslt_1 === "Legal Counsel"
                                                    ? "legal_counsel"
                                                    : rslt_1 ===
                                                      "Sales executive"
                                                    ? "sales_executive"
                                                    : rslt_1 ===
                                                      "Android Developer"
                                                    ? "android_developer"
                                                    : rslt_1 ===
                                                      "Social Media Marketer"
                                                    ? "social_media_marketer"
                                                    : rslt_1 ===
                                                      "Finance Executive"
                                                    ? "finance_executive"
                                                    : rslt.option_value[index]
                                                }
                                                className="recruitment"
                                                onChange={e =>
                                                  radio_type(e, rslt_1)
                                                }
                                              />
                                              <label
                                                htmlFor={
                                                  rslt_1 ===
                                                  "Chemical Engineering"
                                                    ? "chemical"
                                                    : rslt_1 ===
                                                      "Mechanical Engineering"
                                                    ? "mechanical"
                                                    : rslt_1 ===
                                                      "Full Stack Developer"
                                                    ? "full_stack_developer"
                                                    : rslt_1 ===
                                                      "Electrical Engineering"
                                                    ? "electrical_engineering"
                                                    : rslt_1 ===
                                                      "Human Resource"
                                                    ? "human_resource"
                                                    : rslt_1 === "Legal Counsel"
                                                    ? "legal_counsel"
                                                    : rslt_1 ===
                                                      "Sales executive"
                                                    ? "sales_executive"
                                                    : rslt_1 ===
                                                      "Android Developer"
                                                    ? "android_developer"
                                                    : rslt_1 ===
                                                      "Social Media Marketer"
                                                    ? "social_media_marketer"
                                                    : rslt_1 ===
                                                      "Finance Executive"
                                                    ? "finance_executive"
                                                    : rslt.option_value[index]
                                                }
                                              >
                                                {rslt_1}
                                              </label>
                                              <br />
                                            </div>
                                          )
                                        }
                                      })
                                    : // Salary Expectation Value Bases on Country
                                    rslt.intent === "salary_expectations"
                                    ? salary_expectations[
                                        props.location.state.user.country
                                      ] !== undefined
                                      ? salary_expectations[
                                          props.location.state.user.country
                                        ].option_name.map(
                                          (sal_range, sal_range_index) => {
                                            return (
                                              <div
                                                key={index}
                                                id="test"
                                                className={classes.radio_button}
                                              >
                                                <input
                                                  type="radio"
                                                  name={rslt.intent}
                                                  value={
                                                    rslt.option_value[
                                                      sal_range_index
                                                    ]
                                                  }
                                                  id={
                                                    rslt.option_value[
                                                      sal_range_index
                                                    ]
                                                  }
                                                  onChange={e =>
                                                    radio_type(e, sal_range)
                                                  }
                                                />
                                                <label
                                                  htmlFor={
                                                    rslt.option_value[
                                                      sal_range_index
                                                    ]
                                                  }
                                                >
                                                  {sal_range}
                                                </label>
                                                <br />
                                              </div>
                                            )
                                          }
                                        )
                                      : salary_expectations[
                                          "United States"
                                        ].option_name.map(
                                          (sal_range, sal_range_index) => {
                                            return (
                                              <div
                                                key={index}
                                                id="test"
                                                className={classes.radio_button}
                                              >
                                                <input
                                                  type="radio"
                                                  name={rslt.intent}
                                                  value={
                                                    rslt.option_value[
                                                      sal_range_index
                                                    ]
                                                  }
                                                  id={
                                                    rslt.option_value[
                                                      sal_range_index
                                                    ]
                                                  }
                                                  onChange={e =>
                                                    radio_type(e, sal_range)
                                                  }
                                                />
                                                <label
                                                  htmlFor={
                                                    rslt.option_value[
                                                      sal_range_index
                                                    ]
                                                  }
                                                >
                                                  {sal_range}
                                                </label>
                                                <br />
                                              </div>
                                            )
                                          }
                                        )
                                    : rslt.option_name.map((rslt_1, index) => {
                                        return (
                                          <div
                                            key={index}
                                            id="test"
                                            className={classes.radio_button}
                                          >
                                            <input
                                              type="radio"
                                              name={rslt.intent}
                                              value={rslt.option_value[index]}
                                              id={
                                                rslt_1 ===
                                                "Chemical Engineering"
                                                  ? "chemical"
                                                  : rslt_1 ===
                                                    "Mechanical Engineering"
                                                  ? "mechanical"
                                                  : rslt_1 ===
                                                    "Full Stack Developer"
                                                  ? "full_stack_developer"
                                                  : rslt_1 ===
                                                    "Electrical Engineering"
                                                  ? "electrical_engineering"
                                                  : rslt_1 === "Human Resource"
                                                  ? "human_resource"
                                                  : rslt_1 === "Legal Counsel"
                                                  ? "legal_counsel"
                                                  : rslt_1 === "Sales executive"
                                                  ? "sales_executive"
                                                  : rslt_1 ===
                                                    "Android Developer"
                                                  ? "android_developer"
                                                  : rslt_1 ===
                                                    "Social Media Marketer"
                                                  ? "social_media_marketer"
                                                  : rslt_1 ===
                                                    "Finance Executive"
                                                  ? "finance_executive"
                                                  : rslt.option_value[index]
                                              }
                                              className="recruitment"
                                              onChange={e =>
                                                radio_type(e, rslt_1)
                                              }
                                            />
                                            <label
                                              htmlFor={
                                                rslt_1 ===
                                                "Chemical Engineering"
                                                  ? "chemical"
                                                  : rslt_1 ===
                                                    "Mechanical Engineering"
                                                  ? "mechanical"
                                                  : rslt_1 ===
                                                    "Full Stack Developer"
                                                  ? "full_stack_developer"
                                                  : rslt_1 ===
                                                    "Electrical Engineering"
                                                  ? "electrical_engineering"
                                                  : rslt_1 === "Human Resource"
                                                  ? "human_resource"
                                                  : rslt_1 === "Legal Counsel"
                                                  ? "legal_counsel"
                                                  : rslt_1 === "Sales executive"
                                                  ? "sales_executive"
                                                  : rslt_1 ===
                                                    "Android Developer"
                                                  ? "android_developer"
                                                  : rslt_1 ===
                                                    "Social Media Marketer"
                                                  ? "social_media_marketer"
                                                  : rslt_1 ===
                                                    "Finance Executive"
                                                  ? "finance_executive"
                                                  : rslt.option_value[index]
                                              }
                                            >
                                              {rslt_1}
                                            </label>
                                            <br />
                                          </div>
                                        )
                                      })}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </React.Fragment>
                    ) : rslt.question_type === "c" ? (
                      <React.Fragment>
                        {state.question_records_ids[
                          state.question_records_ids.length - 1
                        ] !== rslt.id ? (
                          <div className={classes.question_side_main}>
                            <div className={classes.question_side}>
                              {rslt.content}
                            </div>
                            <div className={classes.question_side_empty}></div>
                          </div>
                        ) : (
                          <>
                            <div className={classes.question_side_main}>
                              <div className={classes.question_side}>
                                {" "}
                                {rslt.content}{" "}
                              </div>
                              <div
                                className={classes.question_side_empty}
                              ></div>
                            </div>

                            {state.gif === true ? null : (
                              <>
                                <div className={classes.position_right}>
                                  <div
                                    className={classes.answer_side_empty}
                                  ></div>
                                  <div
                                    className={
                                      show
                                        ? classes.right
                                        : classes.right_margin
                                    }
                                    onClick={toggle}
                                  >
                                    Select {show === false ? "Options" : null}
                                    {show === false ? (
                                      <img
                                        className={classes.down}
                                        // onClick={toggle}
                                        src={downward}
                                        alt="dropdown"
                                      />
                                    ) : (
                                      <img
                                        // onClick={toggle}
                                        className={classes.upward_img}
                                        src={upward}
                                        alt="upward"
                                      />
                                    )}
                                    {show === true ? (
                                      <hr className={classes.line_styling} />
                                    ) : null}
                                  </div>
                                </div>
                                {show === true ? (
                                  <div className={classes.position_right}>
                                    <div
                                      className={classes.answer_side_empty}
                                    ></div>
                                    <div className={classes.move_it}>
                                      <>
                                        {/* {rslt.content} */}
                                        {rslt.option_name.map(
                                          (rslt_2, index) => {
                                            return (
                                              <div
                                                key={rslt.option_value[index]}
                                                className={classes.move_right}
                                              >
                                                <input
                                                  type="checkbox"
                                                  name={rslt.intent}
                                                  value={
                                                    rslt.option_value[index]
                                                  }
                                                  onChange={e =>
                                                    checkbox_type(
                                                      rslt.option_value[index],
                                                      e,
                                                      rslt.question_type,
                                                      state.checkbox_length,
                                                      rslt.option_name.length,
                                                      rslt.option_name[index]
                                                    )
                                                  }
                                                  id={rslt.option_name[index]}
                                                  className="checked checkbox_styling"
                                                />
                                                <label
                                                  htmlFor={
                                                    rslt.option_name[index]
                                                  }
                                                  className="recruitment checkbox_label"
                                                >
                                                  {rslt_2}
                                                </label>
                                                <br />

                                                <br />
                                              </div>
                                            )
                                          }
                                        )}
                                      </>
                                    </div>
                                  </div>
                                ) : null}
                              </>
                            )}
                          </>
                        )}
                      </React.Fragment>
                    ) : rslt.question_type === "t" ? (
                      <div className={classes.question_side_main}>
                        <div className={classes.question_side}>
                          {rslt.content}
                        </div>
                        <div className={classes.question_side_empty}></div>
                      </div>
                    ) : rslt.question_type === "sl" ? (
                      <React.Fragment>
                        <div className={classes.question_side_main}>
                          <div className={classes.question_side}>
                            {rslt.content}
                          </div>
                          <div className={classes.question_side_empty}></div>
                        </div>

                        {state.gif === true ? null : showRange === true ? (
                          <div className={classes.position_right}>
                            <div className={classes.answer_side_empty}></div>
                            <div className={classes.radio_button1}>
                              <input
                                type="range"
                                name="age_range"
                                min={0}
                                max={100}
                                className="recruitment range_slider"
                                onChange={change}
                              />
                            </div>
                          </div>
                        ) : null}
                      </React.Fragment>
                    ) : rslt.question_type === "th" ? (
                      <div className={classes.question_side_main}>
                        <div className={classes.question_side}>
                          {rslt.content}
                        </div>
                        <div className={classes.question_side_empty}></div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        )
      }
    })
  }

  const showAdvice = () => {
    document.getElementById("final-report").style.display = "block"
  }

  const closeModal = () => {
    document.getElementById("final-report").style.display = "none"
  }

  const logout = () => {
    navigate("/recruitment-bot")
  }

  const mapThroughCareers = () => {
    // console.log(state.compatibility)
    let arr = Object.keys(state.compatibility)
    return arr.map(items => {
      if (parseInt(state.compatibility[items]) >= 0) {
        return (
          <tr key={items}>
            <td>
              <img src={star_png} alt="star" style={{ width: "15px" }} />{" "}
              {items}
            </td>
            <td>{state.compatibility[items]}%</td>
          </tr>
        )
      }
    })
  }

  return (
    <div className={classes.height_control} id="chat_bot_selectors">
      {/* blobs */}
      {/* <img src={left_blob} alt ="left_blob" className="left_blob"/> 
            <img src={right_blob} alt="right_blob" className="right_blob"/> */}

      {/* logout btn */}

      {/* show JobPrompt if user has not selected any job code for the chat  */}
      {prompt_flag === true ? (
        <JobPrompt
          token={props.location.state.token}
          REC_URL={CURRENT_API_URL}
          chat_id={chat_id}
          red_url={sessionStorage.getItem("red_url")}
        />
      ) : null}

      {/* {console.log(props)} */}

      {props.location.state !== undefined ? (
        <div className={classes.header}>
          <RecruitmentHeader
            location="chat_bot"
            token={props.location.state.token}
            user_info={props.location.state.user}
            company_code={props.location.state.company_code}
            red_url={sessionStorage.getItem("red_url")}
            id="recruitment_header"
          />
        </div>
      ) : null}

      {/* <button id="logout_btn" onClick={logout} >LOGOUT</button> */}

      {/* Chatbot Wrapper */}
      <div id="chatbot_wrapper" className={classes.chatbot_wrapper}>
        {/* <h1 className="h1">Talk To Us</h1> */}
        {/* Chatbot Container */}
        <div id="chat_container" className={classes.main_div}>
          {/* {
                    // rendered through previous chat
                    Object.keys(state.compatibility).length > 0?
                    <div id="final-report" style={{display:'block'}}>
                            <h1 className="h1">Your Compatibility Report</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Career</th>
                                        <th>Compatibility Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mapThroughCareers()}
                                </tbody>
                            </table>
                            <button onClick={closeModal}>CLOSE</button>
                        </div>
                    :""
                } */}

          {/* Hidden Div, Visible when user reaches report current chat  */}

          {/* {
                    
                    state.report.length > 0?
                        <div id="final-report">
                            <h1 className="h1">Your Compatibility Report</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Career</th>
                                        <th>Compatibility Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.report}
                                </tbody>
                            </table>
                            <button onClick={closeModal}>CLOSE</button>
                        </div>
                    :""
                } */}
          <div className={classes.chat_flow_div} id="chat_flow">
            {loading === true ? "Loading" : null}
            {/* Condition for new user */}
            {(state.function_state === true || state.report.length === 0) &&
            state.is_new_user === true
              ? renderchat()
              : ""}
            {/* If user is old then first execute renderPreviousChat function to get previous chat history related data and then execute render chat function to handle normal chat follow  */}
            {state.is_new_user === false ? (
              <>
                {renderPreviousChat()}
                {renderchat()}
              </>
            ) : (
              ""
            )}
            {state.gif === true ? (
              <img src={gif} alt="Loading" className={classes.gifstyle} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {state.intent === "ending_notess" ? null : (
        <form id="input_field_chat" className={classes.input_form}>
          <input
            type="text"
            name="text_input"
            id="sub_text"
            placeholder="Enter here"
            onChange={change}
            value={state.user_input}
            className={classes.text_field_styling}
            disabled={state.disabled}
            onFocus={FooterPosition}
            required
          />
          <input
            type="submit"
            name="submit"
            id="sub_btn"
            value="Submit"
            className={classes.submit_button_styling}
            onClick={handleSubmit}
            disabled={state.gif === true ? true : false}
          />
        </form>
      )}

      {/*<div className={(classes.footer_div, "fixed-bottom")} data-role="footer">
        <Footer />
          </div>*/}
    </div>
  )
}

export default ChatBot

// store.js
import React, { createContext, useReducer } from "react"

const initialState = {
  email: "",
  isRegisterOpen: false,
  isUrdu: "vn_english",
  isPakistan: false,
  rec_user_id: "",
  rec_email: "",
  rec_token: "",
  rec_isRegisterOpen: false,
  reportDiv: false,
  jobCodePrompt: false,
  previousJobApplied: [],
  updateComponent: false,
  meeting: false,
  openform: false,
  footerControl: false,
  profileImage: null,
}
const store = createContext(initialState)

const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "UPDATE_EMAIL":
        // console.log(action.type,action.payload)
        return {
          ...state,
          email: action.payload,
        }
      case "REGISTER_IS_OPEN":
        return {
          ...state,
          isRegisterOpen: true,
        }
      case "CHANGE_LANGUAGE":
        return {
          ...state,
          isUrdu: state.isUrdu === "vn_urdu" ? "vn_english" : "vn_urdu",
        }
      case "SET_LANGUAGE":
        return {
          ...state,
          isUrdu: action.payload,
        }
      case "IS_PAKISTAN":
        return {
          ...state,
          isPakistan: action.payload,
        }
      case "SET_ADMIN":
        return {
          ...state,
          adminInstitute: action.payload,
        }
      case "IS_REGISTER_OPEN":
        return {
          ...state,
          isRegisterOpen: action.payload,
        }
      case "USER_LOGGED_IN":
        return {
          ...state,
          rec_user_id: action.payload.id,
          rec_email: action.payload.email,
          rec_token: action.payload.token,
        }
      case "USER_LOGGED_OUT":
        return {
          ...state,
          rec_user_id: "",
          rec_email: "",
          rec_token: "",
        }
      case "OPEN_REPORT_DIV":
        return {
          ...state,
          reportDiv: true,
        }
      case "CLOSE_REPORT_DIV":
        return {
          ...state,
          reportDiv: false,
        }
      case "SHOW_JOBCODE_PROMPT":
        return {
          ...state,
          jobCodePrompt: true,
        }
      case "HIDE_JOBCODE_PROMPT":
        return {
          ...state,
          jobCodePrompt: false,
        }
      case "SET_PREVIOUS_JOB_APPLIED":
        return {
          ...state,
          previousJobApplied: action.previousJobApplied,
        }
      case "HANDLE_UPDATE_COMPONENT":
        return {
          ...state,
          updateComponent: !state.updateComponent,
        }
      case "HANDLE_SUBMIT":
        return {
          ...state,
          meeting: !state.meeting,
        }
      case "OPEN_FORM":
        return {
          ...state,
          openform: !state.openform,
        }
      case "FOOTER_CONTROL":
        return {
          ...state,
          footerControl: !state.footerControl,
        }
      case "PROFILE_IMAGE":
        return {
          ...state,
          profileImage: action.payload,
        }

      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }

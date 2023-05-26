import React, { useEffect, useReducer, useContext, useRef } from "react"
import * as classess from "./general_statistics.module.css"
import Swal from "sweetalert2"
import { navigate } from "gatsby"
import { REC_URL, MEEZAN_API_URL } from "src/constants"
import {
  initCountryList,
  handleCountryChange,
  handleStateChange,
  compatibilityDesigns,
} from "src/utils"
import { store } from "src/context/store"
import male_avatar from "./static/male_avatar.jpg"
import female_avatar from "./static/female_avatar.png"
import RecruitmentHeader from "../../main_page/header/header"
import arrow from "./static/dropdown.png"
import loading_gif from "./static/loading.gif"
import jobCodesDescription from "./static/job_description"
import UserReportCard from "../user_report_card/user_report_card.js"
import {
  MEEZAN_CODE,
  MEEZAN_COMPANY_CODE,
  NORTHBAY_CODE,
} from "../../../../constants"
import { clog } from "../../../../utils"
import LoadingComp from "../../LoadingComp/LoadingComp"

let CURRENT_API_URL = REC_URL
let users_resume_collection = []
const GeneralStatistics = props => {
  const inputRef = useRef(null)
  const globalState = useContext(store)
  const { dispatch } = globalState
  let report_div
  if (globalState.state !== undefined) {
    report_div = globalState.state.reportDiv
  }
  let information
  let selection_status
  let user_token
  const [loaingUpdate, setLoadingUpdate] = React.useState(false)
  const [loadSelectionStatus, setLoadSelectionStatus] = React.useState(false)
  const [token, setToken] = React.useState("")
  const [tokenExpiry, settokenExpiry] = React.useState("")
  const [companyCode, setCompanyCode] = React.useState("")
  const [minAge, setMinAge] = React.useState("None")
  const [maxAge, setMaxAge] = React.useState("None")
  const [gender, setGender] = React.useState("None")
  const [educationLevel, setEducationLevel] = React.useState("None")
  const [speceficDegree, setSpeceficDegree] = React.useState("None")
  const [bachelorsDegree, setBachelorsDegree] = React.useState("None")
  const [mastersDegree, setMastersDegree] = React.useState("None")
  const [phdDegree, setPhdDegree] = React.useState("None")
  const [workPreference, setWorkPreference] = React.useState("None")
  const [optField, setOptField] = React.useState("None")
  const [optFieldFilter, setOptFieldFilter] = React.useState(false)
  const [minCompt, setMinCompt] = React.useState("None")
  const [maxCompt, setMaxCompt] = React.useState("None")
  const [salaryRange, setSalaryRange] = React.useState("None")
  const [workExperience, setWorkExperience] = React.useState("None")
  const [jobType, setJobType] = React.useState("None")
  const [careerNames, setCareerNames] = React.useState("None")
  const [startDate, setStartDate] = React.useState("None")
  const [endDate, setEndDate] = React.useState("None")
  const [jobCode, setJobCode] = React.useState("None")
  const [JobCodesReceived, setJobCodeReceived] = React.useState("None")
  const [CampusNames, setCampusNames] = React.useState("None")
  const [UniversityNames, setUniversityNames] = React.useState("None")
  const [UniversityData, setUniversityData] = React.useState("None")
  const [selectedUniversity, setSelectedUniversity] = React.useState("None")
  const [selectedCampus, setSelectedCampus] = React.useState("None")
  const [selectedSource, setSelectedSource] = React.useState("None")
  const [sourceArray, setSourceArray] = React.useState("None")
  const [SelectionStatusCode, setSelectionStatusCode] = React.useState("None")
  const [CompatibilityLevel, setCompatibilityLevel] = React.useState("None")
  const [countResult, setCountResult] = React.useState("")
  const [userRecord, setUserRecord] = React.useState("")
  const [userRecordInfo, setUserRecordInfo] = React.useState("")
  const [recordFetched, setRecordFetched] = React.useState("")
  const [show, setShow] = React.useState("")
  const [speceficUserRecord, setSpeceficUserRecord] = React.useState("")
  const [bioInformation, setBioInformation] = React.useState("")
  const [contactInformation, setContactInformation] = React.useState("")
  const [educationaInformation, setEducationalInformation] = React.useState("")
  const [
    careerRelatedInformation,
    setCareerRelatedInformation,
  ] = React.useState("")
  const [
    workPreferencesInformation,
    setWorkPreferencesInformation,
  ] = React.useState("")
  const [
    WorkExperiencePlaceHolderText,
    setWorkExperienePlaceholderText,
  ] = React.useState("")
  const [
    WorkPreferencePlaceHolderText,
    setWorkPreferencePlaceholderText,
  ] = React.useState("")
  const [GenderPlaceHolderText, setGenderPlaceHolderText] = React.useState("")
  const [
    SpeceficDegreePlaceHolderText,
    setSpeceficDegreePlaceHolderText,
  ] = React.useState("")
  const [
    BachelorsDegreePlaceholderText,
    setBachelorsDegreePlaceholderText,
  ] = React.useState("")
  const [
    MastersDegreePlaceholderText,
    setMastersDegreePlaceholderText,
  ] = React.useState("")
  const [
    PhdDegreePlaceholderText,
    setPhdDegreePlaceholderText,
  ] = React.useState("")
  const [optFieldPlaceHolderText, setoptFieldPlaceholderText] = React.useState(
    ""
  )
  const [jobTypePlaceHolderText, setJobTypePlaceholderText] = React.useState("")
  const [
    SalaryRangePlaceHolderText,
    setSalaryRangePlaceholderText,
  ] = React.useState("")
  const [
    EducationLevelPlaceHolderText,
    setEducationPlaceholderText,
  ] = React.useState("")
  const [jobCodePlaceHolderText, setJobCodePlaceHolderText] = React.useState("")
  const [avatargender, setAvatarGender] = React.useState("")
  const [selectionStatus, setSelectionStatus] = React.useState("")
  const [
    SelectionStatusPlaceHolderText,
    setSelectionStatusPlaceHolderText,
  ] = React.useState("")
  const [
    CompatibilityLevelPlaceHolderText,
    setCompatibilityLevelPlaceHolderText,
  ] = React.useState("")
  const [userInformation, setUserInformation] = React.useState("")
  const [resumeDownloading, setResumeDownloading] = React.useState(false)
  const [downlaodingButton, setDownloadingButton] = React.useState("")
  const [usdSalaries, showUsdSalaries] = React.useState(false)
  const [imgUrl, setImgUrl] = React.useState("")
  const [jobDescription, viewJobDescription] = React.useState(false)
  const [jobDescriptionContent, setJobDescriptionContent] = React.useState("")
  const [selectionStatusField, setSelectionStatusField] = React.useState("")
  const [employeLifeCycle, getEmployeLifeCycle] = React.useState("")
  const [relocation_value, getRelocation] = React.useState("None")
  const [
    relocationPlaceHolderText,
    setRelocationPlaceHolderText,
  ] = React.useState("")
  const initState = {
    Country: "None",
    renderCountriesList: [],
    State: "None",
    renderStatesList: [],
    City: "None",
    renderCitiesList: [],
  }
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  })
  const [state, setState] = useReducer(reducer, initState)

  // Trigger when User Select Country from dropdown
  useEffect(() => {
    // Redirect to login if directly place link
    if ((props.location.state === null) & (props.location.search === "")) {
      Swal.fire({
        icon: "error",
        title: "Not Authenticated",
        text: "Please Login First",
        timer: 1500,
      })
      navigate("/recruitment-bot/admin")
      return
    } else {
      if (props.location.state !== null) {
        CURRENT_API_URL =
          props.location.state.company_code == MEEZAN_COMPANY_CODE
            ? MEEZAN_API_URL
            : REC_URL
      } else if (props.location.search !== "") {
        let info = window.location.href.split("?==")
        sessionStorage.setItem("red_url", window.atob(info[4]))
        CURRENT_API_URL =
          window.atob(info[2]) == MEEZAN_COMPANY_CODE ? MEEZAN_API_URL : REC_URL
      }
    }

    //By default and when user select Pakistan as Country show him only PKR Salaries otherwise show admin  $Salaries of applicants.
    if ((state.Country !== "None") & (state.Country !== "Pakistan")) {
      showUsdSalaries(true)
    } else {
      showUsdSalaries(false)
    }
  }, [state.Country])

  function handleUniversityChange(val) {
    // console.log("SV:",val )
    setSelectedUniversity(val)
    let storeCampus = []

    const filteredResult = UniversityData.find(e => e.name == val)
    filteredResult.campus.map((campuss, index) => {
      storeCampus.push(
        <option key={index} value={campuss}>
          {campuss}
        </option>
      )
    })
    // console.log("filteredResult: ", filteredResult);
    setCampusNames(storeCampus)
    // console.log(UniversityData.val)
  }

  function initUniversity() {
    let storeUniversity = []
    let storeUniversityObject = []

    let temp_token = user_token ? user_token : token
    clog({ user_token, token, temp_token })

    //REVIEW - - Refactored - get-filter-data
    fetch(`${CURRENT_API_URL}/recruitment/get-filter-data`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
        Authorization: "Bearer" + temp_token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res?.message === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            title: "Not Authenticated",
            text: "Please Login First",
            timer: 1500,
          })
          window.history.back()
          return
        }
        const { data } = res
        const universitydata = data.universities
        Object.keys(universitydata).map((uni, index) => {
          storeUniversityObject.push({
            name: uni,
            campus: universitydata[uni]["campuses"],
          })
          storeUniversity.push(
            <option key={index} value={uni}>
              {uni}
            </option>
          )
        })
        setUniversityData(storeUniversityObject)
        setUniversityNames(storeUniversity)
      })
  }

  function initSourceNames() {
    let storeSource = []
    //ANCHOR - Refactored -get-filter-data
    fetch(`${CURRENT_API_URL}/recruitment/get-filter-data`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
        // Authorization: "Bearer" + props.location.state.token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res?.message === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            title: "Not Authenticated",
            text: "Please Login First",
            timer: 1500,
          })
          window.history.back()
          return
        }
        const { data } = res
        const sourcedata = data.options.source
        sourcedata.map((source, index) => {
          storeSource.push(
            <option key={index} value={source}>
              {source}
            </option>
          )
        })

        setSourceArray(storeSource)
      })
  }

  useEffect(() => {
    initCountryList(setState)
    //new conditionif ((props.location.state === null) & (props.location.search === "")) {
    if ((props.location.state === null) & (props.location.search === null)) {
      Swal.fire({
        icon: "error",
        title: "Not Authenticated",
        text: "Please Login First",
        timer: 1500,
      })
      navigate("/recruitment-bot/admin")

      return
    } else {
      if (props.location.search !== "") {
        let info = window.location.href.split("?==")
        user_token = window.atob(info[1])
        setToken(window.atob(info[1]))
        setCompanyCode(window.atob(info[2]))
        settokenExpiry(window.atob(info[3]))
        getApisData(
          window.atob(info[1]),
          window.atob(info[2]),
          window.atob(info[3])
        )
        // console.log({ token, companyCode, tokenExpiry })
      } else if (props.location.state !== null) {
        user_token = props.location.state.token
        setToken(props.location.state.token)
        setCompanyCode(props.location.state.company_code)
        settokenExpiry(props.location.state.token_expiry)
        getApisData(
          props.location.state.token,
          props.location.state.company_code,
          props.location.state.token_expiry
        )
      }
    }
  }, [])
  const getApisData = (_token, _companyCode, _tokenExpiry) => {
    let storeJobCode = []
    let storejobName = []

    //ANCHOR - Refactored - company-job-code
    fetch(`${CURRENT_API_URL}/recruitment/company-job-code`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
        Authorization: "Bearer" + _token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res?.message === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            title: "Not Authenticated",
            text: "Please Login First",
            timer: 1500,
          })
          window.history.back()
          return
        }
        const { data } = res
        const job_codes = data
        job_codes.map((job_info, index) => {
          return storeJobCode.push(
            <React.Fragment key={index}>
              <input
                type="checkbox"
                id={"opt_" + job_info["job_code"]}
                name={job_info["job_name"]}
                value={job_info["job_code"]}
                className={"job_code_checkbox " + classess.checkbox_styling}
                onChange={getJobCode}
              />
              <label
                htmlFor={"opt_" + job_info["job_code"]}
                className={classess.label_styling}
              >
                {job_info["job_code"]} {job_info["job_name"]}
              </label>
              <br />
            </React.Fragment>
          )
        })
        setJobCodeReceived(storeJobCode)
      })

    initUniversity()
    if (_companyCode === MEEZAN_COMPANY_CODE) {
      initSourceNames()
    }

    //ANCHOR - Refactored - user
    fetch(`${CURRENT_API_URL}/recruitment/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + _token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res?.message === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            title: "Not Authenticated",
            text: "Please Login First",
            timer: 1500,
          })
          window.history.back()
          return
        }
        const { data } = res
        if (data["message"] === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            text: "Please Login to Continue",
          })
          navigate("/recruitment-bot/admin/")
        }
      })
    clearInterval(_token, _tokenExpiry)
  }

  const getMinAge = e => {
    setMinAge(e.target.value)
    if (e.target.value !== "") {
      document.getElementById("age").style.borderBottom = "2px solid red"
    } else if ((e.target.value === "") & (maxAge === "")) {
      document.getElementById("age").style.borderBottom = "2px solid #60a8be"
    } else {
      document.getElementById("age").style.borderBottom = "2px solid #60a8be"
    }
  }

  const getMaxAge = e => {
    setMaxAge(e.target.value)

    if (e.target.value !== "") {
      document.getElementById("age").style.borderBottom = "2px solid red"
    } else if ((e.target.value === "") & (minAge === "")) {
      document.getElementById("age").style.borderBottom = "2px solid #60a8be"
    } else {
      document.getElementById("age").style.borderBottom = "2px solid #60a8be"
    }
  }

  const genderValue = e => {
    let checboxes = document.getElementsByClassName("gender_checkbox") //gender filter
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }

    setGender(array_to_string)
    if (array_to_string !== undefined) {
      setGenderPlaceHolderText(array_to_string)
      document.getElementById("gender").style.borderBottom = "2px solid red"
    } else {
      setGenderPlaceHolderText(<React.Fragment>Gender</React.Fragment>)
      document.getElementById("gender").style.borderBottom = "2px solid #60a8be"
    }
  }

  const EducationLevelValue = e => {
    let checboxes = document.getElementsByClassName("education_level_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setEducationLevel(array_to_string)
    if (array_to_string !== undefined) {
      setEducationPlaceholderText(array_to_string)
      document.getElementById("education_level").style.borderBottom =
        "2px solid red"
    } else {
      setEducationPlaceholderText(
        <React.Fragment>Education Level</React.Fragment>
      )
      document.getElementById("education_level").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const SpeceficDegreeValue = e => {
    let checboxes = document.getElementsByClassName("specefic_degree_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setSpeceficDegree(array_to_string)
    if (array_to_string !== undefined) {
      setSpeceficDegreePlaceHolderText(array_to_string)
      document.getElementById("specefic_degree").style.borderBottom =
        "2px solid red"
    } else {
      setSpeceficDegreePlaceHolderText(
        <React.Fragment>Degree Discipline</React.Fragment>
      )
      document.getElementById("specefic_degree").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const BachelorsDegreeValue = e => {
    let checboxes = document.getElementsByClassName("bachelors_degree_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setBachelorsDegree(array_to_string)
    if (array_to_string !== undefined) {
      setBachelorsDegreePlaceholderText(array_to_string)
    } else {
      setBachelorsDegreePlaceholderText(<React.Fragment>Select</React.Fragment>)
    }
  }

  const MastersDegreeValue = e => {
    let checboxes = document.getElementsByClassName("masters_degree_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setMastersDegree(array_to_string)
    if (array_to_string !== undefined) {
      setMastersDegreePlaceholderText(array_to_string)
    } else {
      setMastersDegreePlaceholderText(<React.Fragment>Select</React.Fragment>)
    }
  }

  const PhdDegreeValue = e => {
    let checboxes = document.getElementsByClassName("phd_degree_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setPhdDegree(array_to_string)
    if (array_to_string !== undefined) {
      setPhdDegreePlaceholderText(array_to_string)
    } else {
      setPhdDegreePlaceholderText(<React.Fragment>Select</React.Fragment>)
    }
  }

  const WorkExperienceValue = () => {
    let radio = document.getElementsByClassName("work_exp_radio")
    let array_value = []
    let array_to_string
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked === true) {
        array_value.push(radio[i].value)
        array_to_string = array_value.toString()
      }
    }
    setWorkExperience(array_to_string)
    if (array_to_string !== undefined) {
      setWorkExperienePlaceholderText(array_to_string)
      document.getElementById("work_exp").style.borderBottom = "2px solid red"
    } else {
      setWorkExperienePlaceholderText(
        <React.Fragment>Work Experience</React.Fragment>
      )
      document.getElementById("work_exp").style.borderBottom =
        "2px solid #60a8be"
    }
  }

  const RelocationValue = () => {
    let radio = document.getElementsByClassName("relocation_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked === true) {
        array_value.push(radio[i].value)
        array_to_string = array_value.toString()
      }
    }
    getRelocation(array_to_string)
    if (array_to_string !== undefined) {
      setRelocationPlaceHolderText(array_to_string)
      document.getElementById("relocation").style.borderBottom = "2px solid red"
    } else {
      setRelocationPlaceHolderText(<React.Fragment>Relocation</React.Fragment>)
      document.getElementById("relocation").style.borderBottom =
        "2px solid #60a8be"
    }
  }

  const handleCityChange = e => {
    setState({
      City: e.target.value,
    })
    document.getElementById("dashboard_cityId").style.borderBottom =
      "2px solid red"
  }

  const OptFieldValue = e => {
    let checboxes = document.getElementsByClassName("opt_degree_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setOptField(array_to_string)
    if (array_to_string !== undefined) {
      setoptFieldPlaceholderText(array_to_string)
      document.getElementById("opt_field").style.borderBottom = "2px solid red"
    } else {
      setoptFieldPlaceholderText(<React.Fragment>Career Field</React.Fragment>)
      document.getElementById("opt_field").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const getMinCompatibility = e => {
    setMinCompt(e.target.value)
    if (e.target.value !== "") {
      document.getElementById("compatibility").style.borderBottom =
        "2px solid red"
    } else if ((e.target.value === "") & (maxCompt === "")) {
      document.getElementById("compatibility").style.borderBottom =
        "2px solid #60a8be"
    } else {
      document.getElementById("compatibility").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const getMaxCompatibility = e => {
    setMaxCompt(e.target.value)
    if (e.target.value !== "") {
      document.getElementById("compatibility").style.borderBottom =
        "2px solid red"
    } else if ((e.target.value === "") & (minCompt === "")) {
      document.getElementById("compatibility").style.borderBottom =
        "2px solid #60a8be"
    } else {
      document.getElementById("compatibility").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const ComptibilityLevelValue = e => {
    let checboxes = document.getElementsByClassName(
      "compatibility_level_checkbox"
    )
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setCompatibilityLevel(array_to_string)
    if (array_to_string !== undefined) {
      setCompatibilityLevelPlaceHolderText(array_to_string)
      document.getElementById("compatibility_level").style.borderBottom =
        "2px solid red"
    } else {
      setCompatibilityLevelPlaceHolderText(
        <React.Fragment>Compatibility Level</React.Fragment>
      )
      document.getElementById("compatibility_level").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const JobTypeValue = e => {
    let checboxes = document.getElementsByClassName("job_type_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setJobType(array_to_string)
    if (array_to_string !== undefined) {
      setJobTypePlaceholderText(array_to_string)
      document.getElementById("job_type").style.borderBottom = "2px solid red"
    } else {
      setJobTypePlaceholderText(<React.Fragment>Job Type</React.Fragment>)
      document.getElementById("job_type").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const WorkPreferencesValue = e => {
    let radio = document.getElementsByClassName("work_pref_radio")
    let array_value = []
    let array_to_string
    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked === true) {
        array_value.push(radio[i].value)
        array_to_string = array_value.toString()
      }
    }
    setWorkPreference(array_to_string)
    if (array_to_string !== undefined) {
      setWorkPreferencePlaceholderText(array_to_string)
      document.getElementById("work_pref").style.borderBottom = "2px solid red"
    } else {
      setWorkPreferencePlaceholderText(
        <React.Fragment>Work Preferences</React.Fragment>
      )
      document.getElementById("work_pref").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const SalaryRangeValue = e => {
    let checboxes = document.getElementsByClassName("salary_range_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setSalaryRange(array_to_string)
    if (array_to_string !== undefined) {
      setSalaryRangePlaceholderText(array_to_string)
      document.getElementById("salary_range").style.borderBottom =
        "2px solid red"
    } else {
      setSalaryRangePlaceholderText(
        <React.Fragment>Salary Expectations</React.Fragment>
      )
      document.getElementById("salary_range").style.borderBottom =
        "2px solid #60a8be"
    }
  }

  const getStartDate = e => {
    setStartDate(e.target.value)
    if (e.target.value !== "") {
      document.getElementById("date").style.borderBottom = "2px solid red"
    } else if ((e.target.value === "") & (startDate === "")) {
      document.getElementById("date").style.borderBottom = "2px solid #60a8be"
    } else {
      document.getElementById("date").style.borderBottom = "2px solid #60a8be"
    }
  }

  const getEndDate = e => {
    setEndDate(e.target.value)
    if (e.target.value !== "") {
      document.getElementById("date").style.borderBottom = "2px solid red"
    } else if ((e.target.value === "") & (endDate === "")) {
      document.getElementById("date").style.borderBottom = "2px solid #60a8be"
    } else {
      document.getElementById("date").style.borderBottom = "2px solid #60a8be"
    }
  }
  const getJobCode = e => {
    let checboxes = document.getElementsByClassName("job_code_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setJobCode(array_to_string)
    if (array_to_string !== undefined) {
      setJobCodePlaceHolderText(array_to_string)
      document.getElementById("job_code").style.borderBottom = "2px solid red"
    } else {
      setJobCodePlaceHolderText(<React.Fragment>Job Code</React.Fragment>)
      document.getElementById("job_code").style.borderBottom =
        "2px solid #60a8be"
    }
  }

  const SelectionStatusValue = e => {
    let checboxes = document.getElementsByClassName("selection_status_checkbox")
    let array_value = []
    let array_to_string
    for (let i = 0; i < checboxes.length; i++) {
      if (checboxes[i].checked === true) {
        array_value.push(checboxes[i].value)
        array_to_string = array_value.toString()
      }
    }
    setSelectionStatusCode(array_to_string)
    if (array_to_string !== undefined) {
      setSelectionStatusPlaceHolderText(array_to_string)
      document.getElementById("selection_status").style.borderBottom =
        "2px solid red"
    } else {
      setSelectionStatusPlaceHolderText(
        <React.Fragment>Selction Status</React.Fragment>
      )
      document.getElementById("selection_status").style.borderBottom =
        "2px solid #60a8be"
    }
  }
  const closeReportDiv = () => {
    setAvatarGender("")
    viewJobDescription(false)
    setSelectionStatusField("")
    getEmployeLifeCycle("")
    // return [updateUserRecord(),
    // dispatch({ type: 'CLOSE_REPORT_DIV' })
    // ]
    return dispatch({ type: "CLOSE_REPORT_DIV" })
  }
  const openJobDescripion = e => {
    let code = e.target.getAttribute("code")
    setJobDescriptionContent(
      jobCodesDescription["jobCode"][code]["description"]
    )
    viewJobDescription(true)
  }
  // function compatibilityDesigns(user_compatibility) {
  //     let bars = []
  //     let colour_bars
  //     if(user_compatibility === "Very Low"){
  //         colour_bars = 2
  //     }
  //     else if(user_compatibility === "Low"){
  //         colour_bars = 4
  //     }
  //     else if(user_compatibility === "Medium"){
  //         colour_bars = 6
  //     }
  //     else if(user_compatibility === "High"){
  //         colour_bars = 8
  //     }
  //     else {
  //         colour_bars = 10
  //     }
  //     for(let i=0;i<10;i++){
  //             bars.push(<div className={classess.bar_design} style={i<colour_bars===true?{backgroundColor:'#38c0ca'}:null}>
  //                 a
  //              </div>)

  //     }
  //    return bars
  // }

  const GetResult = e => {
    let min_age_value = minAge === undefined ? "None" : minAge
    let max_age_value = maxAge === undefined ? "None" : maxAge
    let gender_value = gender === undefined ? "None" : gender
    let education_level = educationLevel === undefined ? "None" : educationLevel
    let work_experience_value =
      workExperience === undefined ? "None" : workExperience
    let country_value = state.Country === undefined ? "None" : state.Country
    let state_value = state.State === undefined ? "None" : state.State
    let city_value = state.City === undefined ? "None" : state.City
    let opt_field_value = optField === undefined ? "None" : optField
    let min_compt_value = minCompt === undefined ? "None" : minCompt
    let max_compt_value = maxCompt === undefined ? "None" : maxCompt
    let job_type_value = jobType === undefined ? "None" : jobType
    let work_preference_value =
      workPreference === undefined ? "None" : workPreference
    let bachelors_degree_value =
      bachelorsDegree === undefined ? "None" : bachelorsDegree
    let masters_degre_value =
      mastersDegree === undefined ? "None" : mastersDegree
    let phd_value = phdDegree === undefined ? "None" : phdDegree
    let salary_range = salaryRange === undefined ? "None" : salaryRange
    let start_date = startDate === undefined ? "None" : startDate
    let end_date = endDate === undefined ? "None" : endDate
    let specefic_degree = speceficDegree === undefined ? "None" : speceficDegree
    let job_code = jobCode === undefined ? "None" : jobCode
    let selection_status_code =
      SelectionStatusCode === undefined ? "None" : SelectionStatusCode
    let compatibility_level =
      CompatibilityLevel === undefined ? "None" : CompatibilityLevel
    let relocationValue =
      relocation_value === undefined ? "None" : relocation_value
    let info
    let show_compt

    if (opt_field_value !== "None") {
      setOptFieldFilter(true)
      show_compt = true
    } else if (job_code !== "None") {
      setOptFieldFilter(true)
      show_compt = true
    } else if (compatibility_level !== "None") {
      setOptFieldFilter(true)
      show_compt = true
    } else {
      setOptFieldFilter(false)
      show_compt = false
    }

    if (
      (parseInt(min_age_value) > parseInt(max_age_value)) &
      (max_age_value !== "None") &
      (min_age_value !== "None")
    ) {
      Swal.fire({
        icon: "error",
        text: "Max Age must be greater than Min Age",
      })
    } else if (
      (parseInt(min_compt_value) > parseInt(max_compt_value)) &
      (max_compt_value !== "None") &
      (min_compt_value !== "None")
    ) {
      Swal.fire({
        icon: "error",
        text: "Max Compatibility must be greater than Minimum Compatibility",
      })
    } else if (
      (start_date > end_date) &
      (end_date !== "None") &
      (start_date !== "None")
    ) {
      Swal.fire({
        icon: "error",
        text: "End date must be greater than start date",
      })
    } else {
      let data_format = {
        min_age: min_age_value,
        max_age: max_age_value,
        gender: gender_value,
        education_level: education_level,
        work_experience: work_experience_value,
        country: country_value,
        state: state_value,
        city: city_value,
        opt_field: opt_field_value,
        min_compt: min_compt_value,
        max_compt: max_compt_value,
        job_type: job_type_value,
        work_preference: work_preference_value,
        bachelors_degree: bachelors_degree_value,
        masters_degree: masters_degre_value,
        phd_degree: phd_value,
        salary_range: salary_range,
        start_date: start_date,
        end_date: end_date,
        specefic_degree: specefic_degree,
        job_code: job_code,
        selection_status: selection_status_code,
        compatibility_level: compatibility_level,
        relocation: relocationValue,
        university: selectedUniversity,
        campus: selectedCampus,
        source: selectedSource,
      }
      setShow(false)
      //REVIEW -
      fetch(`${CURRENT_API_URL}/recruitment_users/general-stats`, {
        method: "POST",
        headers: {
          Authorization: "Bearer" + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_format),
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          // const {output} = res
          users_resume_collection = []
          const data = res.output
          setUserRecordInfo(data["user_data"])
          if (Object.keys(data).length === 0) {
            setRecordFetched(0)
            setShow(true)
            // navigate('/recruitment-bot/admin/')
          } else if (data["message"] === "Unauthenticated.") {
            Swal.fire({
              icon: "error",
              text: "Please Login to Continue",
            })
            navigate("/recruitment-bot/admin/")
          } else {
            let temp = []
            let temp1 = []
            // setUserRecordInfo('test')

            if (data["count"] && data["count"].length !== 0) {
              data["count"].map((info, index) => {
                Object.keys(info).map((key, index1) => {
                  return temp.push(
                    <React.Fragment key={index1}>
                      <div className={classess.inline_div}>
                        <div className={classess.count_number}>{info[key]}</div>
                        <div className={classess.count_type}>{key}</div>
                      </div>
                    </React.Fragment>
                  )
                })
              })
              setRecordFetched(data["count"][0]["filter_result"])
            }
            if (data["user_data"]) {
              Object.keys(data["user_data"]).map((user_id, index) => {
                Object.keys(data["user_data"][user_id]).map(
                  (record, index1) => {
                    users_resume_collection.push(user_id)
                    return temp1.push(
                      <React.Fragment>
                        <tr key={index}>
                          <td>{user_id}</td>
                          <td name="chat_id_class" chat_id={record}>
                            <span
                              className={classess.id_for_click}
                              title="Click to View Detail Info"
                              id={user_id + "_" + record}
                              chat_id={record}
                              user_id={user_id}
                              onClick={openRelevantReord}
                            >
                              {data["user_data"][user_id][record]["name"] !==
                              undefined
                                ? companyCode === "Demo"
                                  ? `Demo_${user_id}`.length > 30
                                    ? `Demo_${user_id}`.slice(0, 29)
                                    : `Demo_${user_id}`
                                  : data["user_data"][user_id][record]["name"]
                                      .length > 30
                                  ? data["user_data"][user_id][record][
                                      "name"
                                    ].slice(0, 29)
                                  : data["user_data"][user_id][record]["name"]
                                : "Not Available"}
                            </span>
                          </td>
                          {show_compt === true ? (
                            <>
                              <td
                                value={
                                  data["user_data"][user_id][record][
                                    "aptitude"
                                  ][opt_field_value] !== undefined
                                    ? parseInt(
                                        data["user_data"][user_id][record][
                                          "aptitude"
                                        ][opt_field_value]
                                      )
                                    : parseInt(
                                        Object.values(
                                          data["user_data"][user_id][record][
                                            "aptitude"
                                          ]
                                        )[0]
                                      )
                                }
                              >
                                {/* {console.log(Object.values(data['user_data'][user_id][record]['aptitude'])[0])} */}
                                {data["user_data"][user_id][record]["aptitude"][
                                  opt_field_value
                                ] !== undefined
                                  ? data["user_data"][user_id][record][
                                      "aptitude"
                                    ][opt_field_value] + "%"
                                  : Object.values(
                                      data["user_data"][user_id][record][
                                        "aptitude"
                                      ]
                                    )[0] + "%"}
                              </td>
                              <td
                                name="comp_level"
                                title={
                                  data["user_data"][user_id][record][
                                    "compatibility_level"
                                  ] !== undefined
                                    ? data["user_data"][user_id][record][
                                        "compatibility_level"
                                      ]
                                    : null
                                }
                              >
                                {data["user_data"][user_id][record][
                                  "compatibility_level"
                                ] !== undefined
                                  ? compatibilityDesigns(
                                      Object.values(
                                        data["user_data"][user_id][record][
                                          "aptitude"
                                        ]
                                      )[0]
                                    )
                                  : "Not Available"}
                              </td>
                            </>
                          ) : null}
                          <td>
                            {data["user_data"][user_id][record]["age"] !==
                            undefined
                              ? data["user_data"][user_id][record]["age"]
                              : "Not Available"}
                          </td>
                          <td>
                            {data["user_data"][user_id][record]["email"] !==
                            undefined
                              ? companyCode === "Demo"
                                ? `Demo_${user_id}@email.com`
                                : data["user_data"][user_id][record]["email"]
                              : "Not Available"}
                          </td>
                          <td
                            name="gender"
                            value={
                              data["user_data"][user_id][record]["gender"] ===
                              "Male"
                                ? 1
                                : 2
                            }
                          >
                            {data["user_data"][user_id][record]["gender"] !==
                            undefined
                              ? data["user_data"][user_id][record]["gender"]
                              : "Not Available"}
                          </td>
                          <td
                            value={
                              data["user_data"][user_id][record][
                                "past_experience"
                              ] === "Yes"
                                ? 1
                                : 2
                            }
                            title={
                              data["user_data"][user_id][record][
                                "past_experience"
                              ]
                            }
                          >
                            {data["user_data"][user_id][record][
                              "past_experience"
                            ] !== undefined ? (
                              data["user_data"][user_id][record][
                                "past_experience"
                              ] === "Yes" ? (
                                <span style={{ color: "#60a8be" }}>
                                  &#x2714;
                                </span>
                              ) : (
                                <span style={{ color: "#f4b63f" }}>
                                  &#x2716;
                                </span>
                              )
                            ) : (
                              "Not Available"
                            )}
                          </td>
                          <td>
                            {data["user_data"][user_id][record]["job_code"] !==
                            null
                              ? data["user_data"][user_id][record]["job_code"]
                              : "Not Available"}
                          </td>
                          <td
                            value={
                              data["user_data"][user_id][record]["job_type"] ===
                              "Full-time"
                                ? 1
                                : data["user_data"][user_id][record][
                                    "job_type"
                                  ] === "Part-time"
                                ? 2
                                : 3
                            }
                          >
                            {data["user_data"][user_id][record]["job_type"] !==
                            undefined
                              ? data["user_data"][user_id][record]["job_type"]
                              : "Not Available"}
                          </td>
                          <td
                            value={
                              data["user_data"][user_id][record][
                                "salary_expectations"
                              ] === "Less than PKR 50, 000"
                                ? 1
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "PKR 50, 000 - PKR 75, 000"
                                ? 2
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "PKR 75, 000 - PKR 100, 000"
                                ? 3
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "PKR 100, 000 - PKR 150, 000"
                                ? 4
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "PKR 150, 000 & Above"
                                ? 5
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "Less than USD 1000"
                                ? 6
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "USD 1000 - USD 10,000"
                                ? 7
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "USD 10,000 - USD 50,000"
                                ? 8
                                : data["user_data"][user_id][record][
                                    "salary_expectations"
                                  ] === "USD 50,000- USD 100,000"
                                ? 9
                                : 10
                            }
                          >
                            {data["user_data"][user_id][record][
                              "salary_expectations"
                            ] !== undefined
                              ? data["user_data"][user_id][record][
                                  "salary_expectations"
                                ]
                              : "Not Available"}
                          </td>

                          <td>
                            {data["user_data"][user_id][record][
                              "last_updated"
                            ] !== undefined
                              ? data["user_data"][user_id][record][
                                  "last_updated"
                                ]
                              : "Not Available"}
                          </td>
                          <td
                            value={
                              data["user_data"][user_id][record][
                                "selection_status"
                              ] === "Shortlisted"
                                ? 1
                                : data["user_data"][user_id][record][
                                    "selection_status"
                                  ] === "Interviewed"
                                ? 2
                                : data["user_data"][user_id][record][
                                    "selection_status"
                                  ] === "Offered"
                                ? 3
                                : data["user_data"][user_id][record][
                                    "selection_status"
                                  ] === "Declined"
                                ? 4
                                : data["user_data"][user_id][record][
                                    "selection_status"
                                  ] === "Rejected"
                                ? 5
                                : 6
                            }
                          >
                            {data["user_data"][user_id][record][
                              "selection_status"
                            ] === null
                              ? "Not Available"
                              : data["user_data"][user_id][record][
                                  "selection_status"
                                ]}
                          </td>
                        </tr>
                        {/* <div className={classess.inline_div} key={index} >
                        <div className={classess.user_box} id={user_id}>
                            User {user_id}
                        </div>
                    </div> */}
                      </React.Fragment>
                    )
                  }
                )
              })
              info = data["user_data"]
              information = data["user_data"]
            }

            setCountResult(temp)
            setShow(true)
            setUserRecord(temp1)

            if (show_compt === true) {
              InitalSortOnComptBases()
            }
          }
        })
      // setUserRecordInfo(info)
      // let dropDowmIdsArray = ['work_exp_dropdown','work_pref_dropdown','gender_dropdown','education_level_dropdown','bachelors_degree_dropdown','masters_degree_dropdown','phd_degree_dropdown','opt_field_dropdown','job_type_dropdown','salary_range_dropdown','age_dropdown','compt_dropdown','date_dropdown','specefic_degree_dropdown']
      let dropDowmIdsArray = [
        "work_exp_dropdown",
        "work_pref_dropdown",
        "gender_dropdown",
        "education_level_dropdown",
        "opt_field_dropdown",
        "job_type_dropdown",
        "salary_range_dropdown",
        "age_dropdown",
        "compt_dropdown",
        "date_dropdown",
        "specefic_degree_dropdown",
        "job_code_dropdown",
        "selection_status_dropdown",
        "compatibility_level_dropdown",
        "relocation_dropdown",
      ]
      dropDowmIdsArray.forEach(id => {
        document.getElementById(id).style.display = "none"
      })

      return information
    }
  }

  const InitalSortOnComptBases = () => {
    var table, rows, switching, i, x, y, shouldSwitch
    table = document.getElementById("table")
    if (table !== null) {
      table.style.display = "none"
      switching = true
      /* Make a loop that will continue until
       no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false
        rows = table.rows
        /* Loop through all table rows (except the
                first, which contains table headers): */
        for (i = 1; i < rows.length - 1; i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false
          /* Get the two elements you want to compare,
                    one from current row and one from the next: */

          x = rows[i].getElementsByTagName("TD")[2].getAttribute("value")
          // console.log(x.getAttribute('value'))
          y = rows[i + 1].getElementsByTagName("TD")[2].getAttribute("value")
          // Check if the two rows should switch place:
          // console.log(x,y)
          if (parseFloat(x) < parseFloat(y)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true
            break
          }
        }
        // console.log(shouldSwitch)
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
                    and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
          switching = true
        }
        table.style.display = "block"
      }
    }
  }

  const openRelevantReord = async e => {
    setLoadingUpdate(true)
    let user_id = e.target.id
    let open_record_id = document
      .getElementById(user_id)
      .getAttribute("user_id")
    open_record_id = open_record_id.toString()
    let chat_id = document.getElementById(user_id).getAttribute("chat_id")
    let count_of_api
    let url_proflie = ""

    // APi to get profile picture
    await fetch(
      `${CURRENT_API_URL}/recruitment_users/get-profile-picture?id=${user_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res
        if (res.success) {
          setImgUrl(data["img_url"])
          url_proflie = data["img_url"]
        } else {
          setImgUrl(null)
          url_proflie = ""
        }
      })

    // APi to get Relevent Chat Record of User
    const result = await fetch(
      //TODO -
      `${CURRENT_API_URL}/recruitment/get-selection-status?user_id=${open_record_id}&user_chat_id=${chat_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res
        if (res.success) {
          count_of_api = count_of_api + 1

          if (data.emp_life_cycle && data.emp_life_cycle.length !== 0) {
            let temp = []
            data.emp_life_cycle.map((info, key) => {
              temp.push(
                <tr key={key}>
                  <td>{info["status"]}</td>
                  <td>{info["updated_at"]}</td>
                </tr>
              )
            })
            getEmployeLifeCycle(temp)
          }

          return data.result
          // return data
        } else {
          return null
        }
      })
    const resume_found = await fetch(
      `${CURRENT_API_URL}/check-resume?user_id=${open_record_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        return response.json()
      })
      .then(res => {
        return res.data.user_resume
      })
    let user_info = information[open_record_id][parseInt(chat_id)]
    let info = []
    let orderly_store_info = {
      name: "",
      age: "",
      gender: "",
      email: "",
      contact_no: "",
      cninc_SSN_passport_no: "",
      country: "",
      state: "",
      city: "",
      company_code: "",
      educational_qualification: "",
      bachelors_degree: "",
      masters_degree: "",
      phd_degree: "",
      work_preference: "",
      salary_expectations: "",
      job_type: "",
      job_name: "",
      job_code: "",
      opt_field: "",
      aptitude: {},
      compatibility_level: "",
      past_experience: "",
      previous_companies: "",
      experience_stream: "",
      career_reason: "",
      selection_status: "",
      img_url: "",
      current_salary: "",
      portfolio_links: "",
      job_relocation: "",
      total_job_experience: "",
      additional_skills: "",
      options_chosen: "",
      options_not_chosen: "",
      resume_exist: resume_found,
    }
    let bio_info = []
    let contact_info = []
    let educational_info = []
    let work_preferences_info = []
    let job_related_info = []
    let downloadind_buttons = []
    // console.log(information[open_record_id])
    let gender_type = information[open_record_id][chat_id]["gender"]
    if (imgUrl !== null) {
      setAvatarGender("profile_picture")
    } else {
      if (gender_type === "Male") {
        setAvatarGender("Male")
      } else {
        setAvatarGender("Female")
      }
    }

    Object.keys(user_info).map((key, index) => {
      orderly_store_info[key] = user_info[key]
    })
    Object.keys(orderly_store_info).map((key, index) => {
      let key_name = key.replace("_", " ")
      if (
        key === "name" ||
        key === "age" ||
        key === "gender" ||
        key === "country" ||
        key === "state" ||
        key === "city" ||
        key === "company_code" ||
        key === "cninc_SSN_passport_no"
      ) {
        if (
          (orderly_store_info[key] !== null) &
          (orderly_store_info[key] !== "")
        ) {
          bio_info.push(
            <React.Fragment>
              <div className={classess.attribute_name_small}>
                {/* {key_name} */}
                {key === "cninc_SSN_passport_no"
                  ? "Cnic/ SSN/ Passport No"
                  : key_name}
              </div>
              <div className={classess.value_from_info_small}>
                {(companyCode === "Demo") & (key === "name")
                  ? `Demo_${open_record_id}`
                  : (companyCode === "Demo") & (key === "company_code")
                  ? "Demo"
                  : orderly_store_info[key]}

                {/* {orderly_store_info[key]} */}
              </div>
            </React.Fragment>
          )
        }
      } else if (key === "email" || key === "contact_no") {
        if (
          (orderly_store_info[key] !== null) &
          (orderly_store_info[key] !== "")
        ) {
          contact_info.push(
            <React.Fragment>
              <div className={classess.attribute_name_small}>{key_name}</div>
              <div className={classess.value_from_info_small}>
                {(companyCode === "Demo") & (key === "email")
                  ? `Demo_${open_record_id}@email.com`
                  : (companyCode === "Demo") & (key === "contact_no")
                  ? 123456789
                  : orderly_store_info[key]}
                {/* {orderly_store_info[key]} */}
              </div>
            </React.Fragment>
          )
        }
      } else if (
        key === "educational_qualification" ||
        key === "bachelors_degree" ||
        key === "masters_degree" ||
        key === "phd_degree"
      ) {
        if (
          (orderly_store_info[key] !== null) &
          (orderly_store_info[key] !== "")
        ) {
          educational_info.push(
            <React.Fragment>
              <div className={classess.attribute_name}>{key_name}</div>
              <div className={classess.value_from_info}>
                {orderly_store_info[key]}
              </div>
            </React.Fragment>
          )
        }
      } else if (
        key === "work_preference" ||
        key === "salary_expectations" ||
        key === "job_type" ||
        key === "current_salary" ||
        key === "portfolio_links"
      ) {
        if (
          (orderly_store_info[key] !== null) &
          (orderly_store_info[key] !== "")
        ) {
          work_preferences_info.push(
            <React.Fragment>
              <div className={classess.attribute_name}>{key_name}</div>
              <div className={classess.value_from_info}>
                {orderly_store_info[key]}
              </div>
            </React.Fragment>
          )
        }
      } else if (
        key === "job_name" ||
        key === "job_code" ||
        key === "opt_field" ||
        key === "past_experience" ||
        key === "previous_companies" ||
        key === "experience_stream" ||
        key === "experience_stream" ||
        key === "additional_skills" ||
        key === "options_not_chosen" ||
        key === "options_chosen"
      ) {
        if (
          (orderly_store_info[key] !== null) &
          (orderly_store_info[key] !== "")
        ) {
          job_related_info.push(
            <React.Fragment>
              <div className={classess.attribute_name}>
                {key_name === "opt field"
                  ? "Choosen Career Field"
                  : key_name === "experience stream"
                  ? "Field of Previous Experience"
                  : key_name === "past experience"
                  ? "Past Experience in the chosen Field"
                  : key_name}
              </div>
              <div className={classess.value_from_info}>
                {user_info[key]}
                {key === "job_code" ? (
                  <span
                    className={classess.control_description}
                    onClick={openJobDescripion}
                    code={user_info[key]}
                  >
                    View Job Description
                  </span>
                ) : null}

                {/* {user_info[key]} */}
              </div>
            </React.Fragment>
          )
        }
      } else if (key === "aptitude") {
        Object.keys(orderly_store_info[key]).map((career_comp, index1) => {
          return job_related_info.push(
            <React.Fragment>
              <div className={classess.attribute_name}>
                Compatibility in {career_comp}
              </div>
              <div className={classess.value_from_info}>
                {orderly_store_info[key][career_comp]}%
              </div>
            </React.Fragment>
          )
        })
      } else if (
        key.includes("additional_actions_") === true &&
        key.includes("additional_actions_associate_architect") === false &&
        key.includes("skills_botnostic_software_engineer") === true
      ) {
        orderly_store_info["additional_skills"] = user_info[key]
      } else if (key === "compatibility_level") {
        if (
          (orderly_store_info[key] !== null) &
          (orderly_store_info[key] !== "")
        ) {
          job_related_info.push(
            <React.Fragment>
              <div className={classess.attribute_name}>{key_name}</div>
              <div className={classess.value_from_info}>
                {orderly_store_info[key]}
              </div>
            </React.Fragment>
          )
        }
      } else if (key === "selection_status") {
        job_related_info.push(
          <React.Fragment>
            <div className={classess.attribute_name}>{key_name}</div>
            <div className={classess.value_from_info}>
              <select
                onChange={getSelectionStatus}
                defaultValue={result}
                id="select_selection"
                ref={inputRef}
              >
                <option value="">Select Status</option>
                <option value="Viewed">Viewed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Recommended">Recommended</option>
                <option value="Offered">Offered</option>
                <option value="Declined">Declined</option>
                <option value="Rejected">Rejected</option>
                <option value="Accepted">Accepted</option>
              </select>
              <span
                className={classess.upate_selection_status}
                onClick={updateStatus}
                id={open_record_id}
                chat_id={chat_id}
              >
                Update
              </span>
            </div>
            {setSelectionStatusField(
              <>
                <select
                  onChange={getSelectionStatus}
                  defaultValue={result}
                  id="select_selection"
                  ref={inputRef}
                >
                  <option value="">Select Status</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Offered">Offered</option>
                  <option value="Declined">Declined</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
                <span
                  className={classess.upate_selection_status}
                  onClick={updateStatus}
                  id={open_record_id}
                  chat_id={chat_id}
                >
                  Update
                </span>
              </>
            )}
          </React.Fragment>
        )
        // if(orderly_store_info[key] !== null){
        //         job_related_info.push(
        //             <React.Fragment>
        //             <div className={classess.attribute_name}>
        //             {key_name}
        //         </div>
        //         <div className={classess.value_from_info}>
        //             {user_info[key]}
        //         </div>

        //     </React.Fragment>
        //         )
        //     }
        //     else{
        //         job_related_info.push(
        //                     <React.Fragment>
        //                     <div className={classess.attribute_name}>
        //                     {key_name}
        //                 </div>
        //                 <div className={classess.value_from_info} >
        //                     <select onChange={getSelectionStatus} defaultValue={result} id="select_selection" ref={inputRef}>
        //                         <option value="">Select Status</option>
        //                         <option value="Shortlisted">Shortlisted</option>
        //                         <option value="Interviewed">Interviewed</option>
        //                         <option value="Offered">Offered</option>
        //                         <option value="Declined">Declined</option>
        //                         <option value="Rejected">Rejected</option>
        //                     </select>
        //                     <span className={classess.upate_selection_status} onClick={updateStatus} id={open_record_id}>Update</span>
        //                 </div>

        //             </React.Fragment>
        //                 )
        //     }
      } else if (key === "img_url") {
        orderly_store_info[key] = url_proflie
      }
    })
    if (resume_found === true) {
      downloadind_buttons.push(
        <React.Fragment>
          <div
            user_id={open_record_id}
            type="all"
            onClick={DownloadSpeceficUserResume}
            className={classess.download_styling}
          >
            Download All Resumes
          </div>
          <div
            user_id={open_record_id}
            type="latest"
            onClick={DownloadSpeceficUserResume}
            className={classess.download_styling}
          >
            Download Latest Resume
          </div>
        </React.Fragment>
      )
    }
    setUserInformation(orderly_store_info)
    setSpeceficUserRecord(info)
    setBioInformation(bio_info)
    setContactInformation(contact_info)
    setEducationalInformation(educational_info)
    setWorkPreferencesInformation(work_preferences_info)
    setCareerRelatedInformation(job_related_info)
    setDownloadingButton(downloadind_buttons)
    setLoadingUpdate(false)
    dispatch({ type: "OPEN_REPORT_DIV" })
  }

  const DownloadSpeceficUserResume = async e => {
    setLoadingUpdate(true)
    let user_id = e.target.getAttribute("user_id")
    let download_type = e.target.getAttribute("type")
    let file_name = null
    let url

    await fetch(
      `${CURRENT_API_URL}/recruitment/download-user-resume?user_id=${user_id}&type=${download_type}`,
      {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res

        if (res.success) {
          // if (CURRENT_API_URL === "https://api.mycareerdreams.com/api") {
          // if (
          //   CURRENT_API_URL === "https://api.mycareerdreams.com/api" ||
          //   CURRENT_API_URL === "https://staging-api.mycareerdreams.com/api" ||
          //   CURRENT_API_URL === "https://rec-staging-api.mycareerdreams.com/api" ||
          //   CURRENT_API_URL === "https://mzcpapi.mycareerdreams.com/api"
          // ) {
          //   url =
          //     data["url"].includes("https") !== true
          //       ? data["url"].replace("http", "https")
          //       : data["url"]
          //   // console.log(url)
          // }
          // else {
          //     url = data['url']
          // }

          url =
            data["url"].includes("https") !== true
              ? data["url"].replace("http", "https")
              : data["url"]
          window.location.href = url

          file_name = data["file_name"]
        }
        setLoadingUpdate(false)
      })
      .catch(error => {
        setLoadingUpdate(false)
      })
    if ((file_name !== null) & (download_type === "all")) {
      fetch(`${CURRENT_API_URL}/delete-zip?file_name=${file_name}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          setLoadingUpdate(false)
          Swal.fire({
            icon: "success",
            text: "Resume Downloaded Successfully",
          })
        })
    }
    setLoadingUpdate(false)
  }
  useEffect(() => {
    if (inputRef.current !== null) {
      let index = document.querySelector(
        `#select_selection option[value="${selectionStatus}"]`
      ).index
      inputRef.current.selectedIndex = index
    }
  }, [selectionStatus])
  const getSelectionStatus = e => {
    // document.getElementById('select_selection').selectedIndex = index
    setSelectionStatus(e.target.value)
    // console.log(e.target.value)
    // selection_status = e.target.value
  }
  const updateStatus = async e => {
    // console.log('Coming Soon')
    let selection = document.getElementById("select_selection").value
    // console.log(selectionStatus)
    let user_id = e.target.id
    let chat_id = document.getElementById(user_id).getAttribute("chat_id")

    //ANCHOR - Refactored - selection-job-status
    await fetch(`${CURRENT_API_URL}/recruitment/selection-job-status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
      body: JSON.stringify({
        user_id: user_id,
        user_chat_id: chat_id,
        selection_status: selection,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res

        if (res.success) {
          if (data.emp_life_cycle.length !== 0) {
            let temp = []
            data.emp_life_cycle.map((info, key) => {
              temp.push(
                <tr key={key}>
                  <td>{info["status"]}</td>
                  <td>{info["updated_at"]}</td>
                </tr>
              )
            })
            getEmployeLifeCycle(temp)
          }
          Swal.fire({
            icon: "success",
            text: "Status Updated Successfully",
          })
          updateUserRecord()
        } else {
          Swal.fire({
            icon: "error",
            text: data[0],
          })
        }
      })
  }
  const logOut = e => {
    setToken("")
    navigate("/recruitment-bot/admin")
  }
  const clearFilters = e => {
    let show_compt
    let data_format = {
      min_age: "None",
      max_age: "None",
      gender: "None",
      education_level: "None",
      work_experience: "None",
      country: "None",
      state: "None",
      city: "None",
      opt_field: "None",
      min_compt: "None",
      max_compt: "None",
      job_type: "None",
      work_preference: "None",
      bachelors_degree: "None",
      masters_degree: "None",
      phd_degree: "None",
      salary_range: "None",
      start_date: "None",
      end_date: "None",
      specefic_degree: "None",
      job_code: "None",
      selection_status: "None",
      compatibility_level: "None",
      relocation: "None",
      university: "None",
      campus: "None",
      source: "None",
    }
    setShow(false)
    //REVIEW -
    users_resume_collection = []
    fetch(`${CURRENT_API_URL}/recruitment_users/general-stats`, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_format),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const data = res.output
        setUserRecordInfo(data["user_data"])
        if (Object.keys(data).length === 0) {
          Swal.fire({
            icon: "error",
            text: "Please Login to Continue",
          })
          navigate("/recruitment-bot/admin/")
        } else if (data["message"] === "Unauthenticated.") {
          Swal.fire({
            icon: "error",
            text: "Please Login to Continue",
          })
          navigate("/recruitment-bot/admin/")
        } else {
          let temp = []
          let temp1 = []
          // setUserRecordInfo('test')
          if (data["count"] && data["count"].length !== 0) {
            data["count"].map((info, index) => {
              Object.keys(info).map((key, index1) => {
                return temp.push(
                  <React.Fragment key={index1}>
                    <div className={classess.inline_div}>
                      <div className={classess.count_number}>{info[key]}</div>
                      <div className={classess.count_type}>{key}</div>
                    </div>
                  </React.Fragment>
                )
              })
            })
            setRecordFetched(data["count"][0]["filter_result"])
          }
          if (data["user_data"]) {
            Object.keys(data["user_data"]).map((user_id, index) => {
              Object.keys(data["user_data"][user_id]).map((record, index1) => {
                users_resume_collection.push(user_id)
                return temp1.push(
                  <React.Fragment>
                    <tr key={index}>
                      <td>{user_id}</td>
                      <td>
                        <span
                          className={classess.id_for_click}
                          title="Click to View Detail Info"
                          id={user_id + "_" + record}
                          chat_id={record}
                          user_id={user_id}
                          onClick={openRelevantReord}
                        >
                          {data["user_data"][user_id][record]["name"] !==
                          undefined
                            ? companyCode === "Demo"
                              ? `Demo_${user_id}`.length > 30
                                ? `Demo_${user_id}`.slice(0, 29)
                                : `Demo_${user_id}`
                              : data["user_data"][user_id][record]["name"]
                                  .length > 30
                              ? data["user_data"][user_id][record][
                                  "name"
                                ].slice(0, 29)
                              : data["user_data"][user_id][record]["name"]
                            : "Not Available"}
                        </span>
                      </td>
                      <td>
                        {data["user_data"][user_id][record]["age"] !== undefined
                          ? data["user_data"][user_id][record]["age"]
                          : "Not Available"}
                      </td>
                      <td>
                        {data["user_data"][user_id][record]["email"] !==
                        undefined
                          ? companyCode === "Demo"
                            ? `Demo_${user_id}@email.com`
                            : data["user_data"][user_id][record]["email"]
                          : "Not Available"}
                      </td>
                      <td
                        name="gender"
                        value={
                          data["user_data"][user_id][record]["gender"] ===
                          "Male"
                            ? 1
                            : 2
                        }
                      >
                        {data["user_data"][user_id][record]["gender"] !==
                        undefined
                          ? data["user_data"][user_id][record]["gender"]
                          : "Not Available"}
                      </td>
                      <td
                        value={
                          data["user_data"][user_id][record][
                            "past_experience"
                          ] === "Yes"
                            ? 1
                            : 2
                        }
                        title={
                          data["user_data"][user_id][record]["past_experience"]
                        }
                      >
                        {data["user_data"][user_id][record][
                          "past_experience"
                        ] !== undefined ? (
                          data["user_data"][user_id][record][
                            "past_experience"
                          ] === "Yes" ? (
                            <span style={{ color: "#60a8be" }}>&#x2714;</span>
                          ) : (
                            <span style={{ color: "#f4b63f" }}>&#x2716;</span>
                          )
                        ) : (
                          "Not Available"
                        )}
                      </td>
                      <td>
                        {data["user_data"][user_id][record]["job_code"] !== null
                          ? data["user_data"][user_id][record]["job_code"]
                          : "Not Available"}
                      </td>
                      <td
                        value={
                          data["user_data"][user_id][record]["job_type"] ===
                          "Full-time"
                            ? 1
                            : data["user_data"][user_id][record]["job_type"] ===
                              "Part-time"
                            ? 2
                            : 3
                        }
                      >
                        {data["user_data"][user_id][record]["job_type"] !==
                        undefined
                          ? data["user_data"][user_id][record]["job_type"]
                          : "Not Available"}
                      </td>
                      <td
                        value={
                          data["user_data"][user_id][record][
                            "salary_expectations"
                          ] === "Less than PKR 50, 000"
                            ? 1
                            : data["user_data"][user_id][record][
                                "salary_expectations"
                              ] === "PKR 50, 000 - PKR 75, 000"
                            ? 2
                            : data["user_data"][user_id][record][
                                "salary_expectations"
                              ] === "PKR 75, 000 - PKR 100, 000"
                            ? 3
                            : data["user_data"][user_id][record][
                                "salary_expectations"
                              ] === "PKR 100, 000 - PKR 150, 000"
                            ? 4
                            : 5
                        }
                      >
                        {data["user_data"][user_id][record][
                          "salary_expectations"
                        ] !== undefined
                          ? data["user_data"][user_id][record][
                              "salary_expectations"
                            ]
                          : "Not Available"}
                      </td>
                      <td>
                        {data["user_data"][user_id][record]["last_updated"] !==
                        undefined
                          ? data["user_data"][user_id][record]["last_updated"]
                          : "Not Available"}
                      </td>
                      <td
                        value={
                          data["user_data"][user_id][record][
                            "selection_status"
                          ] === "Shortlisted"
                            ? 1
                            : data["user_data"][user_id][record][
                                "selection_status"
                              ] === "Interviewed"
                            ? 2
                            : data["user_data"][user_id][record][
                                "selection_status"
                              ] === "Offered"
                            ? 3
                            : data["user_data"][user_id][record][
                                "selection_status"
                              ] === "Declined"
                            ? 4
                            : data["user_data"][user_id][record][
                                "selection_status"
                              ] === "Rejected"
                            ? 5
                            : data["user_data"][user_id][record][
                                "selection_status"
                              ] === "Recommended"
                            ? 6
                            : 7
                        }
                      >
                        {data["user_data"][user_id][record][
                          "selection_status"
                        ] === null
                          ? "Not Available"
                          : data["user_data"][user_id][record][
                              "selection_status"
                            ]}
                      </td>
                    </tr>
                    {/* <div className={classess.inline_div} key={index} >
                           <div className={classess.user_box} id={user_id}>
                               User {user_id}
                           </div>
                       </div> */}
                  </React.Fragment>
                )
              })
            })
            information = data["user_data"]
          }

          setCountResult(temp)
          setUserRecord(temp1)
          setShow(true)

          setOptFieldFilter(false)
        }
      })
    let inputs = document.querySelectorAll("input")
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "checkbox" || inputs[i].type === "radio") {
        document.getElementById(inputs[i].id).checked = false
      }
    }
    setWorkExperience("None")
    setMinAge("None")
    setMaxAge("None")
    setGender("None")
    setJobType("None")
    setWorkPreference("None")
    setOptField("None")
    setBachelorsDegree("None")
    setMastersDegree("None")
    setPhdDegree("None")
    setMinCompt("None")
    setMaxCompt("None")
    setSalaryRange("None")
    setStartDate("None")
    setEndDate("None")
    setEducationLevel("None")
    setStartDate("None")
    setEndDate("None")
    setSpeceficDegree("None")
    setJobCode("None")
    setSelectionStatusCode("None")
    setCompatibilityLevel("None")
    getRelocation("None")
    setUniversityNames("None")
    setCampusNames("None")
    setSelectedSource("None")
    initUniversity()

    setOptFieldFilter(false)
    setState({
      Country: "None",
      State: "None",
      City: "None",
    })

    setWorkExperienePlaceholderText(
      <React.Fragment>Work Experience</React.Fragment>
    )
    setWorkPreferencePlaceholderText(
      <React.Fragment>Work Preferences</React.Fragment>
    )
    setGenderPlaceHolderText(<React.Fragment>Gender</React.Fragment>)
    setEducationPlaceholderText(
      <React.Fragment>Education Level</React.Fragment>
    )
    setSpeceficDegreePlaceHolderText(
      <React.Fragment>Degree Discipline</React.Fragment>
    )
    setBachelorsDegreePlaceholderText(<React.Fragment>Select</React.Fragment>)
    setMastersDegreePlaceholderText(<React.Fragment>Select</React.Fragment>)
    setPhdDegreePlaceholderText(<React.Fragment>Select</React.Fragment>)
    setoptFieldPlaceholderText(<React.Fragment>Career Field</React.Fragment>)
    setJobTypePlaceholderText(<React.Fragment>Job Type</React.Fragment>)
    setSalaryRangePlaceholderText(
      <React.Fragment>Salary Expectations</React.Fragment>
    )
    setJobCodePlaceHolderText(<React.Fragment>Job Code</React.Fragment>)
    setSelectionStatusPlaceHolderText(
      <React.Fragment>Selection Status</React.Fragment>
    )
    setCompatibilityLevelPlaceHolderText(
      <React.Fragment>Compatibility Level</React.Fragment>
    )
    setRelocationPlaceHolderText(<React.Fragment>Relocation</React.Fragment>)

    // let dropDowmIdsArray = ['work_exp_dropdown','work_pref_dropdown','gender_dropdown','education_level_dropdown','bachelors_degree_dropdown','masters_degree_dropdown','phd_degree_dropdown','opt_field_dropdown','job_type_dropdown','salary_range_dropdown','age_dropdown','compt_dropdown','date_dropdown','specefic_degree_dropdown']
    let dropDowmIdsArray = [
      "work_exp_dropdown",
      "work_pref_dropdown",
      "gender_dropdown",
      "education_level_dropdown",
      "opt_field_dropdown",
      "job_type_dropdown",
      "salary_range_dropdown",
      "age_dropdown",
      "compt_dropdown",
      "date_dropdown",
      "specefic_degree_dropdown",
      "job_code_dropdown",
      "selection_status_dropdown",
      "compatibility_level_dropdown",
      "relocation_dropdown",
    ]
    dropDowmIdsArray.forEach(id => {
      document.getElementById(id).style.display = "none"
    })
    let fieldColorIds = [
      "age",
      "compatibility",
      "date",
      "gender",
      "work_exp",
      "work_pref",
      "opt_field",
      "job_type",
      "salary_range",
      "education_level",
      "dashboard_countryId",
      "dashboard_stateId",
      "dashboard_cityId",
      "specefic_degree",
      "job_code",
      "selection_status",
      "compatibility_level",
      "relocation",
    ]
    fieldColorIds.forEach(id => {
      document.getElementById(id).style.borderBottom = "2px solid #60a8be"
    })
  }
  const DealsWithDropDown = e => {
    switch (e.target.id) {
      case "age":
        // document.getElementById('work_exp_dropdown').style.display = 'none'
        if (document.getElementById("age_dropdown").style.display === "block") {
          document.getElementById("age_dropdown").style.display = "none"
        } else {
          document.getElementById("age_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "compatibility":
        // document.getElementById('work_exp_dropdown').style.display = 'none'
        if (
          document.getElementById("compt_dropdown").style.display === "block"
        ) {
          document.getElementById("compt_dropdown").style.display = "none"
        } else {
          document.getElementById("compt_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "work_exp":
        // document.getElementById('work_exp_dropdown').style.display = 'none'
        if (
          document.getElementById("work_exp_dropdown").style.display === "block"
        ) {
          document.getElementById("work_exp_dropdown").style.display = "none"
        } else {
          document.getElementById("work_exp_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "work_pref":
        if (
          document.getElementById("work_pref_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("work_pref_dropdown").style.display = "none"
        } else {
          document.getElementById("work_pref_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "gender":
        if (
          document.getElementById("gender_dropdown").style.display === "block"
        ) {
          document.getElementById("gender_dropdown").style.display = "none"
        } else {
          document.getElementById("gender_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "education_level":
        if (
          document.getElementById("education_level_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("education_level_dropdown").style.display =
            "none"
        } else {
          document.getElementById("education_level_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "specefic_degree":
        if (
          document.getElementById("specefic_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("specefic_degree_dropdown").style.display =
            "none"
        } else {
          document.getElementById("specefic_degree_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "bachelors_degree":
        if (
          document.getElementById("bachelors_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("bachelors_degree_dropdown").style.display =
            "none"
        } else {
          document.getElementById("bachelors_degree_dropdown").style.display =
            "block"
        }
        break
      case "masters_degree":
        if (
          document.getElementById("masters_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("masters_degree_dropdown").style.display =
            "none"
        } else {
          document.getElementById("masters_degree_dropdown").style.display =
            "block"
        }
        break
      case "phd_degree":
        if (
          document.getElementById("phd_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("phd_degree_dropdown").style.display = "none"
        } else {
          document.getElementById("phd_degree_dropdown").style.display = "block"
        }
        break
      case "opt_field":
        if (
          document.getElementById("opt_field_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("opt_field_dropdown").style.display = "none"
        } else {
          document.getElementById("opt_field_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "job_type":
        if (
          document.getElementById("job_type_dropdown").style.display === "block"
        ) {
          document.getElementById("job_type_dropdown").style.display = "none"
        } else {
          document.getElementById("job_type_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "salary_range":
        if (
          document.getElementById("salary_range_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("salary_range_dropdown").style.display =
            "none"
        } else {
          document.getElementById("salary_range_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "date":
        if (
          document.getElementById("date_dropdown").style.display === "block"
        ) {
          document.getElementById("date_dropdown").style.display = "none"
        } else {
          document.getElementById("date_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "job_code":
        if (
          document.getElementById("job_code_dropdown").style.display === "block"
        ) {
          document.getElementById("job_code_dropdown").style.display = "none"
        } else {
          document.getElementById("job_code_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "selection_status":
        if (
          document.getElementById("selection_status_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("selection_status_dropdown").style.display =
            "none"
        } else {
          document.getElementById("selection_status_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "compatibility_level_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "compatibility_level":
        if (
          document.getElementById("compatibility_level_dropdown").style
            .display === "block"
        ) {
          document.getElementById(
            "compatibility_level_dropdown"
          ).style.display = "none"
        } else {
          document.getElementById(
            "compatibility_level_dropdown"
          ).style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "relocation_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "relocation":
        if (
          document.getElementById("relocation_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("relocation_dropdown").style.display = "none"
        } else {
          document.getElementById("relocation_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
    }
  }

  const ArrowDealing = e => {
    switch (e.target.id) {
      case "age_arrow":
        // document.getElementById('work_exp_dropdown').style.display = 'none'
        if (document.getElementById("age_dropdown").style.display === "block") {
          document.getElementById("age_dropdown").style.display = "none"
        } else {
          document.getElementById("age_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "compatibility_arrow":
        // document.getElementById('work_exp_dropdown').style.display = 'none'
        if (
          document.getElementById("compt_dropdown").style.display === "block"
        ) {
          document.getElementById("compt_dropdown").style.display = "none"
        } else {
          document.getElementById("compt_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "work_exp_arrow":
        // document.getElementById('work_exp_dropdown').style.display = 'none'
        if (
          document.getElementById("work_exp_dropdown").style.display === "block"
        ) {
          document.getElementById("work_exp_dropdown").style.display = "none"
        } else {
          document.getElementById("work_exp_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "work_pref_arrow":
        if (
          document.getElementById("work_pref_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("work_pref_dropdown").style.display = "none"
        } else {
          document.getElementById("work_pref_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "gender_arrow":
        if (
          document.getElementById("gender_dropdown").style.display === "block"
        ) {
          document.getElementById("gender_dropdown").style.display = "none"
        } else {
          document.getElementById("gender_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "education_level_arrow":
        if (
          document.getElementById("education_level_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("education_level_dropdown").style.display =
            "none"
        } else {
          document.getElementById("education_level_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "specefic_degree_arrow":
        if (
          document.getElementById("specefic_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("specefic_degree_dropdown").style.display =
            "none"
        } else {
          document.getElementById("specefic_degree_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "bachelors_degree_arrow":
        if (
          document.getElementById("bachelors_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("bachelors_degree_dropdown").style.display =
            "none"
        } else {
          document.getElementById("bachelors_degree_dropdown").style.display =
            "block"
        }
        break
      case "masters_degree_arrow":
        if (
          document.getElementById("masters_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("masters_degree_dropdown").style.display =
            "none"
        } else {
          document.getElementById("masters_degree_dropdown").style.display =
            "block"
        }
        break
      case "phd_degree_arrow":
        if (
          document.getElementById("phd_degree_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("phd_degree_dropdown").style.display = "none"
        } else {
          document.getElementById("phd_degree_dropdown").style.display = "block"
        }
        break
      case "opt_field_arrow":
        if (
          document.getElementById("opt_field_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("opt_field_dropdown").style.display = "none"
        } else {
          document.getElementById("opt_field_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "job_type_arrow":
        if (
          document.getElementById("job_type_dropdown").style.display === "block"
        ) {
          document.getElementById("job_type_dropdown").style.display = "none"
        } else {
          document.getElementById("job_type_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "salary_range_arrow":
        if (
          document.getElementById("salary_range_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("salary_range_dropdown").style.display =
            "none"
        } else {
          document.getElementById("salary_range_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "date_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "date_arrow":
        if (
          document.getElementById("date_dropdown").style.display === "block"
        ) {
          document.getElementById("date_dropdown").style.display = "none"
        } else {
          document.getElementById("date_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "job_code_arrow":
        if (
          document.getElementById("job_code_dropdown").style.display === "block"
        ) {
          document.getElementById("job_code_dropdown").style.display = "none"
        } else {
          document.getElementById("job_code_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "selection_status_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "selection_status_arrow":
        if (
          document.getElementById("selection_status_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("selection_status_dropdown").style.display =
            "none"
        } else {
          document.getElementById("selection_status_dropdown").style.display =
            "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "compatibility_level_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "compatibility_level_arrow":
        if (
          document.getElementById("compatibility_level_dropdown").style
            .display === "block"
        ) {
          document.getElementById(
            "compatibility_level_dropdown"
          ).style.display = "none"
        } else {
          document.getElementById(
            "compatibility_level_dropdown"
          ).style.display = "block"
          let dropDowmIdsArray = [
            "relocation_dropdown",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
      case "relocation_arrow":
        if (
          document.getElementById("relocation_dropdown").style.display ===
          "block"
        ) {
          document.getElementById("relocation_dropdown").style.display = "none"
        } else {
          document.getElementById("relocation_dropdown").style.display = "block"
          let dropDowmIdsArray = [
            "compatibility_level_arrow",
            "work_exp_dropdown",
            "work_pref_dropdown",
            "gender_dropdown",
            "education_level_dropdown",
            "opt_field_dropdown",
            "job_type_dropdown",
            "salary_range_dropdown",
            "age_dropdown",
            "compt_dropdown",
            "specefic_degree_dropdown",
            "job_code_dropdown",
            "selection_status_dropdown",
          ]
          dropDowmIdsArray.forEach(id => {
            document.getElementById(id).style.display = "none"
          })
        }
        break
    }
  }
  function sort(e) {
    // console.log(e)
    let filter_type =
      e === undefined ? "sort_by_compatibility_desc" : e.target.value
    var table, rows, switching, i, x, y, shouldSwitch
    table = document.getElementById("table")
    switching = true
    switch (filter_type) {
      case "sort_by_age_asec":
        let column_value_no
        if (optFieldFilter === true) {
          column_value_no = 4
        } else {
          column_value_no = 2
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsAgeAsec = Array.from(table.querySelectorAll("tr"))
        tableRowsAgeAsec.sort((x, y) => {
          const xValue = x.cells[column_value_no].textContent
          const yValue = y.cells[column_value_no].textContent

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsAgeAsec) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_age_desc":
        let column_value_no_age
        if (optFieldFilter === true) {
          column_value_no_age = 4
        } else {
          column_value_no_age = 2
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsAgeDesc = Array.from(table.querySelectorAll("tr"))
        tableRowsAgeDesc.sort((x, y) => {
          const xValue = x.cells[column_value_no_age].textContent
          const yValue = y.cells[column_value_no_age].textContent

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum > yNum) {
            return yNum - xNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsAgeDesc) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_date_asec":
        /* Make a loop that will continue until
            no switching has been done: */
        let column_value
        if (optFieldFilter === true) {
          column_value = 11
        } else {
          column_value = 9
        }
        while (switching) {
          // Start by saying: no switching is done:
          switching = false
          rows = table.rows

          /* Loop through all table rows (except the
                    first, which contains table headers): */
          for (i = 1; i < rows.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false
            /* Get the two elements you want to compare,
                        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[column_value]
            y = rows[i + 1].getElementsByTagName("TD")[column_value]

            // Check if the two rows should switch place:

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true
              break
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
                        and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
          }
        }

        break
      case "sort_by_date_desc":
        /* Make a loop that will continue until
            no switching has been done: */
        let column_value_no_date_desc
        if (optFieldFilter === true) {
          column_value_no_date_desc = 11
        } else {
          column_value_no_date_desc = 9
        }
        while (switching) {
          // Start by saying: no switching is done:
          switching = false
          rows = table.rows

          /* Loop through all table rows (except the
                    first, which contains table headers): */
          for (i = 1; i < rows.length - 1; i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false
            /* Get the two elements you want to compare,
                        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[column_value_no_date_desc]
            y = rows[i + 1].getElementsByTagName("TD")[
              column_value_no_date_desc
            ]

            // Check if the two rows should switch place:

            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true
              break
            }
          }
          if (shouldSwitch) {
            /* If a switch has been marked, make the switch
                        and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
          }
        }

        break

      case "sort_by_gender":
        let column_value_no_gender
        if (optFieldFilter === true) {
          column_value_no_gender = 6
        } else {
          column_value_no_gender = 4
        }
        let tableRows = Array.from(table.querySelectorAll("tr"))
        tableRows.sort((x, y) => {
          const xValue = x.cells[column_value_no_gender].getAttribute("value")
          const yValue = y.cells[column_value_no_gender].getAttribute("value")

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRows) {
          table.tBodies[0].appendChild(row)
        }
        /* Make a loop that will continue until
                no switching has been done: */

        break
      case "sort_by_job_type":
        let column_value_no_job_type
        if (optFieldFilter === true) {
          column_value_no_job_type = 9
        } else {
          column_value_no_job_type = 7
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsJobType = Array.from(table.querySelectorAll("tr"))
        tableRowsJobType.sort((x, y) => {
          const xValue = x.cells[column_value_no_job_type].getAttribute("value")
          const yValue = y.cells[column_value_no_job_type].getAttribute("value")

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsJobType) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_salary_range_asec":
        let column_value_no_salary_range_asec
        if (optFieldFilter === true) {
          column_value_no_salary_range_asec = 10
        } else {
          column_value_no_salary_range_asec = 8
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsSalaryRangeAsec = Array.from(table.querySelectorAll("tr"))
        tableRowsSalaryRangeAsec.sort((x, y) => {
          const xValue = x.cells[
            column_value_no_salary_range_asec
          ].getAttribute("value")
          const yValue = y.cells[
            column_value_no_salary_range_asec
          ].getAttribute("value")

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsSalaryRangeAsec) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_salary_range_desc":
        let column_value_no_salary_range_desc
        if (optFieldFilter === true) {
          column_value_no_salary_range_desc = 10
        } else {
          column_value_no_salary_range_desc = 8
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsSalaryRangeDesc = Array.from(table.querySelectorAll("tr"))
        tableRowsSalaryRangeDesc.sort((x, y) => {
          const xValue = x.cells[
            column_value_no_salary_range_desc
          ].getAttribute("value")
          const yValue = y.cells[
            column_value_no_salary_range_desc
          ].getAttribute("value")

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum > yNum) {
            return yNum - xNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsSalaryRangeDesc) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_past_experience":
        let column_value_no_past_experience
        if (optFieldFilter === true) {
          column_value_no_past_experience = 7
        } else {
          column_value_no_past_experience = 5
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsSalaryPastExperience = Array.from(
          table.querySelectorAll("tr")
        )
        tableRowsSalaryPastExperience.sort((x, y) => {
          const xValue = x.cells[column_value_no_past_experience].getAttribute(
            "value"
          )
          const yValue = y.cells[column_value_no_past_experience].getAttribute(
            "value"
          )

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsSalaryPastExperience) {
          table.tBodies[0].appendChild(row)
        }
        break

      case "sort_by_compatibility_asec":
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsSalaryCompAsec = Array.from(table.querySelectorAll("tr"))
        tableRowsSalaryCompAsec.sort((x, y) => {
          const xValue = x.cells[2].getAttribute("value")
          const yValue = y.cells[2].getAttribute("value")

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsSalaryCompAsec) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_compatibility_desc":
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsSalaryCompDesc = Array.from(table.querySelectorAll("tr"))
        tableRowsSalaryCompDesc.sort((x, y) => {
          const xValue = x.cells[2].getAttribute("value")
          const yValue = y.cells[2].getAttribute("value")

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum > yNum) {
            return yNum - xNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsSalaryCompDesc) {
          table.tBodies[0].appendChild(row)
        }
        break
      case "sort_by_selection_status":
        let column_value_no_selection_status
        if (optFieldFilter === true) {
          column_value_no_selection_status = 12
        } else {
          column_value_no_selection_status = 10
        }
        /* Make a loop that will continue until
                no switching has been done: */
        let tableRowsSelectionStatus = Array.from(table.querySelectorAll("tr"))
        tableRowsSelectionStatus.sort((x, y) => {
          const xValue = x.cells[column_value_no_selection_status].getAttribute(
            "value"
          )
          const yValue = y.cells[column_value_no_selection_status].getAttribute(
            "value"
          )

          const xNum = parseFloat(xValue)
          const yNum = parseFloat(yValue)
          if (xNum < yNum) {
            return xNum - yNum
          }
          // return ascending ? ( xNum - yNum ) : ( yNum - xNum );
        })

        for (let row of tableRowsSelectionStatus) {
          table.tBodies[0].appendChild(row)
        }
        break
    }
  }

  function exportTableToCSV() {
    var csv = []
    let filename = "records.csv"
    var rows = document.querySelectorAll("table tr")

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th")

      for (var j = 0; j < cols.length; j++) {
        let text = cols[j].innerText

        if (text === "Less than PKR 50, 000") {
          text = "Less than PKR 50000"
        } else if (text === "PKR 50, 000 - PKR 75, 000") {
          text = "PKR 50000 - PKR 75000"
        } else if (text === "PKR 75, 000 - PKR 100, 000") {
          text = "PKR 75000 - PKR 100000"
        } else if (text === "PKR 100, 000 - PKR 150, 000") {
          text = "PKR 100000 - PKR 150000"
        } else if (text === "PKR 150, 000 & Above") {
          text = "PKR 150000 & Above"
        } else if (text === "USD 1000 - USD 10,000") {
          text = "USD 1000 - USD 10000"
        } else if (text === "USD 10,000 - USD 50,000") {
          text = "USD 10000 - USD 50000"
        } else if (text === "USD 50,000- USD 100,000") {
          text = "USD 50000- USD 100000"
        } else if (text === "USD 100,000 & Above") {
          text = "USD 100000 & Above"
        }

        if (text === "aaaaaaaaaa") {
          text = cols[j].getAttribute("title")
        }

        // if (text === "âœ”") {
        //   console.log("âœ”=Yes")
        // } else if (text === "&#x2716") {
        //   console.log("&#x2716=No")
        // }
        if (text === "✔") {
          text = "Yes"
        } else if (text === "✖") {
          text = "No"
        }
        row.push(text)
      }

      csv.push(row.join(","))
    }

    // Download CSV file
    csv = csv.join("\n")
    var csvFile
    var downloadLink

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" })

    // Download link
    downloadLink = document.createElement("a")

    // File name
    downloadLink.download = filename

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile)

    // Hide download link
    downloadLink.style.display = "none"

    // Add the link to DOM
    document.body.appendChild(downloadLink)

    // Click download link
    downloadLink.click()
  }
  function exportEmailDataToCSV() {
    var csv = []
    let filename = "email_data.csv"
    var rows = document.querySelectorAll("table tr")
    let email_column_no
    if (optFieldFilter === true) {
      email_column_no = 5
    } else {
      email_column_no = 3
    }

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th")

      let user_name = cols[1].innerText
      let user_email = cols[email_column_no].innerText

      row.push(user_name)
      row.push(user_email)

      csv.push(row.join(","))
    }

    // Download CSV file
    csv = csv.join("\n")
    var csvFile
    var downloadLink

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" })

    // Download link
    downloadLink = document.createElement("a")

    // File name
    downloadLink.download = filename

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile)

    // Hide download link
    downloadLink.style.display = "none"

    // Add the link to DOM
    document.body.appendChild(downloadLink)

    // Click download link
    downloadLink.click()
  }
  const countryBorder = e => {
    handleCountryChange(e, setState)
    document.getElementById("dashboard_countryId").style.borderBottom =
      "2px solid red"
  }
  const StateBorder = e => {
    handleStateChange(e, state, setState)
    document.getElementById("dashboard_stateId").style.borderBottom =
      "2px solid red"
  }
  const updateUserRecord = e => {
    setLoadingUpdate(true)

    //ANCHOR - Refactored
    fetch(`${CURRENT_API_URL}/recruitment_users/update-record`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
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
            text: "Please Login to Continue",
          })
          navigate("/recruitment-bot/admin/")
        } else {
          if (res.success) {
            setLoadingUpdate(false)
            if (data["msg"]) {
              Swal.fire({
                icon: "success",
                text: data.msg,
              })
              GetResult()
            } else {
              if (Object.keys(data.result).length == 1) {
                if (data.result.count === 0) {
                  Swal.fire({
                    text: "User records are up to date",
                  })
                  GetResult()
                } else {
                  Swal.fire({
                    icon: "success",
                    text: "Records Updated Successfully",
                  })
                  GetResult()
                }
              } else {
                Swal.fire({
                  icon: "success",
                  text: "Records Updated Successfully",
                })
                GetResult()
              }
            }
          } else {
            setLoadingUpdate(false)
            Swal.fire({
              icon: "error",
              text: "Something went wrong while updating the record",
            })
          }
        }
      })
  }
  const DownloadResume = async e => {
    // alert("----------{}----------")
    if (users_resume_collection.length > 100) {
      Swal.fire({
        icon: "info",
        text:
          "Total records can't be greater than 100 to download resumes. Please apply filter.",
      })
      return
    }

    let file_name = null
    let url
    setLoadingUpdate(true)

    await fetch(`${CURRENT_API_URL}/download-resumes`, {
      method: "POST",
      headers: {
        Authorization: "Bearer" + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users_resume_collection),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res
        if (res.success) {
          // if (CURRENT_API_URL === "https://api.mycareerdreams.com/api") {
          // if (
          //   CURRENT_API_URL === "https://staging-api.mycareerdreams.com/api"
          // ) {
          //   url = data["url"].replace("http", "https")
          // } else {
          //   url = data["url"]
          // }
          url =
            data["url"].includes("https") !== true
              ? data["url"].replace("http", "https")
              : data["url"]
          window.location.href = url
          file_name = data["file_name"]
        }
      })
    if (file_name !== null) {
      fetch(`${CURRENT_API_URL}/delete-zip?file_name=${file_name}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          // console.log(data)
          setLoadingUpdate(false)
          Swal.fire({
            icon: "success",
            text: "Resume Downloaded Successfully",
          })
        })
    } else {
      setLoadingUpdate(false)
      Swal.fire({
        text: "No Resume Found For Downloading",
      })
    }
  }

  //main return
  return (
    <div className={classess.main_div}>
      <RecruitmentHeader location="recruitment_dashboard" token={token} />
      {/* <div className={classess.logout_button} onClick={logOut}>
                   Logout
               </div> */}
      {companyCode === "0" ? (
        <center>
          <div className={classess.update_user_data} onClick={updateUserRecord}>
            Update User Records
          </div>
          {loaingUpdate === true ? (
            // <div className={classess.loading_div}>
            //   <div className={classess.loading_text}>
            //     <img
            //       src={loading_gif}
            //       alt="Loading"
            //       className={classess.loading_gif_style}
            //     />
            //   </div>
            // </div>
            <LoadingComp />
          ) : null}
        </center>
      ) : null}

      <div className={classess.filters_div}>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Age</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="age"
          >
            Age
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="age_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStylingInputs} id="age_dropdown">
            <div className={classess.inline_input}>
              <input
                type="number"
                placeholder="Min"
                value={minAge}
                min={0}
                onChange={getMinAge}
                className={classess.inline_inputs_style}
              />
            </div>
            <div className={classess.inline_input}>
              <input
                type="number"
                placeholder="Max"
                value={maxAge}
                min={0}
                onChange={getMaxAge}
                className={classess.inline_inputs_style}
              />
            </div>
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Gender</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="gender"
          >
            {GenderPlaceHolderText === "" ? (
              <React.Fragment>Gender</React.Fragment>
            ) : (
              GenderPlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="gender_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStyling} id="gender_dropdown">
            <input
              type="checkbox"
              id="Male"
              name="Male"
              value="Male"
              className={"gender_checkbox " + classess.checkbox_styling}
              onChange={genderValue}
            />
            <label htmlFor="Male" className={classess.label_styling}>
              Male{" "}
            </label>
            <br />
            <input
              type="checkbox"
              id="Female"
              name="Female"
              value="Female"
              className={"gender_checkbox " + classess.checkbox_styling}
              onChange={genderValue}
            />
            <label htmlFor="Female" className={classess.label_styling}>
              Female
            </label>
          </div>
        </div>

        <div className={classess.inline_div}>
          <select
            className={classess.input_styling}
            onChange={countryBorder}
            name="country"
            id="dashboard_countryId"
            value={state.Country}
          >
            <option value="">Country</option>
            {state.renderCountriesList}
          </select>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>State</p> */}
          <select
            className={classess.input_styling}
            onChange={StateBorder}
            name="state_sub"
            id="dashboard_stateId"
            value={state.State}
          >
            <option value="">State</option>
            {state.renderStatesList}
          </select>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>City</p> */}
          <select
            className={classess.input_styling}
            onChange={handleCityChange}
            name="city_sub"
            id="dashboard_cityId"
            value={state.City}
          >
            <option value="">City</option>
            {state.renderCitiesList}
          </select>
        </div>
        {/* //NBD017 on staging */}
        {// (companyCode == "NBS001")
        companyCode == NORTHBAY_CODE ? (
          // companyCode == "NBD017" ? (
          <>
            <div className={classess.inline_div}>
              <select
                className={classess.input_styling}
                onChange={event => handleUniversityChange(event.target.value)}
                name="university"
                id="dashboard_universityId"
                // value={state.Country}
              >
                <option value="None">University</option>
                {UniversityNames}
              </select>
            </div>
            <div className={classess.inline_div}>
              <select
                className={classess.input_styling}
                onChange={event => setSelectedCampus(event.target.value)}
                name="university"
                id="ddashboard_campusId"
                // value={state.Country}
              >
                <option value="None">Campus</option>
                {CampusNames}
              </select>
            </div>
          </>
        ) : null}
        {/* {companyCode == "AlMEZ020" ? ( */}
        {companyCode == MEEZAN_COMPANY_CODE ? (
          <div className={classess.inline_div}>
            <select
              className={classess.input_styling}
              onChange={event => setSelectedSource(event.target.value)}
              name="source"
              id="dashboard_sourceId"
              value={selectedSource}
            >
              <option value="None" disabled selected hidden>
                Source
              </option>
              {sourceArray}
              {/* <option value="Email">Email</option>
              <option value="Facebook">Facebook</option>
              <option value="Linkedin">Linkedin</option>
              <option value="Colleague/Friend">Colleague/Friend</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Directly from our website">Directly from our website</option> */}

              {/* {CampusNames} */}
            </select>
          </div>
        ) : null}

        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Education Level </p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="education_level"
          >
            {EducationLevelPlaceHolderText === "" ? (
              <React.Fragment>Education Level</React.Fragment>
            ) : (
              EducationLevelPlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="education_level_arrow"
              />
            </span>
          </div>
          <div
            className={classess.dropDownStyling}
            id="education_level_dropdown"
          >
            <input
              type="checkbox"
              id="Matric"
              name="Matric"
              value="Matric"
              className={
                "education_level_checkbox " + classess.checkbox_styling
              }
              onChange={EducationLevelValue}
            />
            <label htmlFor="Matric" className={classess.label_styling}>
              Matric{" "}
            </label>
            <br />
            <input
              type="checkbox"
              id="Intermediate"
              name="Intermediate"
              value="Intermediate"
              className={
                "education_level_checkbox " + classess.checkbox_styling
              }
              onChange={EducationLevelValue}
            />
            <label htmlFor="Intermediate" className={classess.label_styling}>
              Intermediate
            </label>
            <br />
            <input
              type="checkbox"
              id="Bachelors"
              name="Bachelors"
              value="Bachelors"
              className={
                "education_level_checkbox " + classess.checkbox_styling
              }
              onChange={EducationLevelValue}
            />
            <label htmlFor="Bachelors" className={classess.label_styling}>
              Bachelors
            </label>
            <br />
            <input
              type="checkbox"
              id="Masters"
              name="Masters"
              value="Masters"
              className={
                "education_level_checkbox " + classess.checkbox_styling
              }
              onChange={EducationLevelValue}
            />
            <label htmlFor="Masters" className={classess.label_styling}>
              Masters
            </label>
            <br />
            <input
              type="checkbox"
              id="Ph.D"
              name="Ph.D"
              value="Ph.D"
              className={
                "education_level_checkbox " + classess.checkbox_styling
              }
              onChange={EducationLevelValue}
            />
            <label htmlFor="Ph.D" className={classess.label_styling}>
              Ph.D
            </label>
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Degree Discipline</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="specefic_degree"
          >
            {SpeceficDegreePlaceHolderText === "" ? (
              <React.Fragment>Degree Discipline</React.Fragment>
            ) : (
              SpeceficDegreePlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="specefic_degree_arrow"
              />
            </span>
          </div>

          <div className={classess.checkbox_div}>
            <div
              className={classess.dropDownStyling}
              id="specefic_degree_dropdown"
            >
              <input
                type="checkbox"
                id="Specefic_Medicine_Health_Care_Nursing"
                name="Medicine/Health Care/Nursing"
                value="Medicine/Health Care/Nursing"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Medicine_Health_Care_Nursing"
                className={classess.label_styling}
              >
                Medicine/Health Care/Nursing
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Engineering"
                name="Engineering"
                value="Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Engineering"
                className={classess.label_styling}
              >
                Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Law"
                name="Law"
                value="Law"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label htmlFor="Specefic_Law" className={classess.label_styling}>
                Law
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Computers_IT_Software_Engineering"
                name="Computers/ IT/ Software Engineering"
                value="Computers/ IT/ Software Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Computers_IT_Software_Engineering"
                className={classess.label_styling}
              >
                Computers/ IT/ Software Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Business_Management"
                name="Business Management"
                value="Business Management"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Business_Management"
                className={classess.label_styling}
              >
                Business Management
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Public_Administration"
                name="Public Administration"
                value="Public Administration"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Public_Administration"
                className={classess.label_styling}
              >
                Public Administration
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Education_Teaching_and_Training"
                name="Education, Teaching and Training"
                value="Education, Teaching and Training"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Education_Teaching_and_Training"
                className={classess.label_styling}
              >
                Education, Teaching and Training
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Media_Mass_Communication_Public_Relations"
                name="Media, Mass Communication & Public Relations"
                value="Media, Mass Communication & Public Relations"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Media_Mass_Communication_Public_Relations"
                className={classess.label_styling}
              >
                Media, Mass Communication & Public Relations
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Finance_Accounting"
                name="Finance & Accounting"
                value="Finance & Accounting"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Finance_Accounting"
                className={classess.label_styling}
              >
                Finance & Accounting
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Architecture_Construction_Civil_Engineering"
                name="Architecture & Construction/ Civil Engineering"
                value="Architecture & Construction/ Civil Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Architecture_Construction_Civil_Engineering"
                className={classess.label_styling}
              >
                Architecture & Construction/ Civil Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Mechanical_Engineering"
                name="Mechanical Engineering"
                value="Mechanical Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Mechanical_Engineering"
                className={classess.label_styling}
              >
                Mechanical Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Electrical_Engineering"
                name="Electrical Engineering"
                value="Electrical Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Electrical_Engineering"
                className={classess.label_styling}
              >
                Electrical Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Human_Resource"
                name="Human Resources"
                value="Human Resources"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Human_Resource"
                className={classess.label_styling}
              >
                Human Resources
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Chemical_Engineering"
                name="Chemical Engineering"
                value="Chemical Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Chemical_Engineering"
                className={classess.label_styling}
              >
                Chemical Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Data_Engineering"
                name="Data Engineering"
                value="Data Engineering"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Data_Engineering"
                className={classess.label_styling}
              >
                Data Engineering
              </label>
              <br />
              <input
                type="checkbox"
                id="Specefic_Project_Manager"
                name="Project Manager"
                value="Project Manager"
                className={
                  "specefic_degree_checkbox " + classess.checkbox_styling
                }
                onChange={SpeceficDegreeValue}
              />
              <label
                htmlFor="Specefic_Project_Manager"
                className={classess.label_styling}
              >
                Project Manager
              </label>
              <br />
            </div>
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Job Type</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="job_type"
          >
            {jobTypePlaceHolderText === "" ? (
              <React.Fragment>Job Type</React.Fragment>
            ) : (
              jobTypePlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="job_type_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStyling} id="job_type_dropdown">
            <input
              type="checkbox"
              id="opt_full_time"
              name="Full-time"
              value="Full-time"
              className={"job_type_checkbox " + classess.checkbox_styling}
              onChange={JobTypeValue}
            />
            <label htmlFor="opt_full_time" className={classess.label_styling}>
              Full-time
            </label>
            <br />
            <input
              type="checkbox"
              id="opt_part_time"
              name="Part-time"
              value="Part-time"
              className={"job_type_checkbox " + classess.checkbox_styling}
              onChange={JobTypeValue}
            />
            <label htmlFor="opt_part_time" className={classess.label_styling}>
              Part-time
            </label>
            <br />
            <input
              type="checkbox"
              id="opt_remote"
              name="Remote"
              value="Remote"
              className={"job_type_checkbox " + classess.checkbox_styling}
              onChange={JobTypeValue}
            />
            <label htmlFor="opt_remote" className={classess.label_styling}>
              Remote
            </label>
            <br />
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Work Experience</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="relocation"
          >
            {relocationPlaceHolderText === "" ? (
              <React.Fragment>Relocation</React.Fragment>
            ) : (
              relocationPlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="relocation_arrow"
              />
            </span>
          </div>

          <div className={classess.dropDownStyling} id="relocation_dropdown">
            <input
              type="checkbox"
              id="relocation_yes"
              name="Relocation Yes "
              value="Yes"
              className={"relocation_checkbox " + classess.radio_styling}
              onChange={RelocationValue}
            />
            <label htmlFor="relocation_yes" className={classess.label_styling}>
              Yes
            </label>
            <br />
            <input
              type="checkbox"
              id="work_experience_no"
              name="Relocation No"
              value="No"
              className={"relocation_checkbox " + classess.radio_styling}
              onChange={RelocationValue}
            />
            <label
              htmlFor="work_experience_no"
              className={classess.label_styling}
            >
              No
            </label>
            <br />
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Salary Expectations</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="salary_range"
          >
            {SalaryRangePlaceHolderText === "" ? (
              <React.Fragment>Salary Expectations</React.Fragment>
            ) : (
              SalaryRangePlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="salary_range_arrow"
              />
            </span>
          </div>
          <div className={classess.checkbox_div}>
            <div
              className={classess.dropDownStyling}
              id="salary_range_dropdown"
            >
              {usdSalaries === false ? (
                <>
                  <input
                    type="checkbox"
                    id="tier1"
                    name="Less than PKR 50, 000"
                    value="Less than PKR 50, 000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier1" className={classess.label_styling}>
                    Less than PKR 50, 000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier2"
                    name="PKR 50, 000 - PKR 75, 000"
                    value="PKR 50, 000 - PKR 75, 000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier2" className={classess.label_styling}>
                    PKR 50, 000 - PKR 75, 000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier3"
                    name="PKR 75, 000 - PKR 100, 000"
                    value="PKR 75, 000 - PKR 100, 000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier3" className={classess.label_styling}>
                    PKR 75, 000 - PKR 100, 000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier4"
                    name="PKR 100, 000 - PKR 150, 000"
                    value="PKR 100, 000 - PKR 150, 000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier4" className={classess.label_styling}>
                    PKR 100, 000 - PKR 150, 000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier5"
                    name="PKR 150, 000 & Above"
                    value="PKR 150, 000 & Above"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier5" className={classess.label_styling}>
                    PKR 150, 000 & Above
                  </label>
                  <br />
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    id="tier6"
                    name="Less than USD 1000"
                    value="Less than USD 1000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier6" className={classess.label_styling}>
                    Less than USD 1000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier7"
                    name="USD 1000 - USD 10,000"
                    value="USD 1000 - USD 10,000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier7" className={classess.label_styling}>
                    USD 1000 - USD 10,000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier8"
                    name="USD 10,000 - USD 50,000"
                    value="USD 10,000 - USD 50,000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier8" className={classess.label_styling}>
                    USD 10,000 - USD 50,000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier9"
                    name="USD 50,000 - USD 100,000"
                    value="USD 50,000 - USD 100,000"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier9" className={classess.label_styling}>
                    USD 50,000- USD 100,000
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    id="tier10"
                    name="USD 100,000 & Above"
                    value="USD 100,000 & Above"
                    className={
                      "salary_range_checkbox " + classess.checkbox_styling
                    }
                    onChange={SalaryRangeValue}
                  />
                  <label htmlFor="tier10" className={classess.label_styling}>
                    USD 100,000 & Above
                  </label>
                  <br />
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Work Experience</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="work_exp"
          >
            {WorkExperiencePlaceHolderText === "" ? (
              <React.Fragment>Work Experience</React.Fragment>
            ) : (
              WorkExperiencePlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="work_exp_arrow"
              />
            </span>
          </div>

          <div className={classess.dropDownStyling} id="work_exp_dropdown">
            <input
              type="checkbox"
              id="work_experience_yes"
              name="Work Experience Yes "
              value="Yes"
              className={"work_exp_radio " + classess.radio_styling}
              onChange={WorkExperienceValue}
            />
            <label
              htmlFor="work_experience_yes"
              className={classess.label_styling}
            >
              Yes
            </label>
            <br />
            <input
              type="checkbox"
              id="work_experience_no"
              name="Work Experience No"
              value="No"
              className={"work_exp_radio " + classess.radio_styling}
              onChange={WorkExperienceValue}
            />
            <label
              htmlFor="work_experience_no"
              className={classess.label_styling}
            >
              No
            </label>
            <br />
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Work Preferences</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="work_pref"
          >
            {WorkPreferencePlaceHolderText === "" ? (
              <React.Fragment>Work Preferences</React.Fragment>
            ) : (
              WorkPreferencePlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="work_pref_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStyling} id="work_pref_dropdown">
            <input
              type="checkbox"
              id="work_preferences_alone"
              name="Work Preferences Alone "
              value="Alone"
              className={"work_pref_radio " + classess.radio_styling}
              onChange={WorkPreferencesValue}
            />
            <label
              htmlFor="work_preferences_alone"
              className={classess.label_styling}
            >
              Alone
            </label>
            <br />
            <input
              type="checkbox"
              id="work_preferences_group"
              name="Work Preferences Group"
              value="Group"
              className={"work_pref_radio " + classess.radio_styling}
              onChange={WorkPreferencesValue}
            />
            <label
              htmlFor="work_preferences_group"
              className={classess.label_styling}
            >
              Group
            </label>
            <br />
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Date Span</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="date"
          >
            Date Span{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="date_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStylingInputs} id="date_dropdown">
            <div className={classess.inline_input}>
              <input
                type="date"
                name="start_date"
                placeholder="Start date"
                value={startDate}
                onChange={getStartDate}
                className={classess.inline_inputs_style}
              />
            </div>
            <div className={classess.inline_input}>
              <input
                type="date"
                name="end_date"
                placeholder="End date"
                value={endDate}
                onChange={getEndDate}
                className={classess.inline_inputs_style}
              />
            </div>
          </div>
        </div>

        {/* <div className={classess.inline_div}>
                        <p className={classess.filter_name}>Bachelors Degree</p>
                        <div className={classess.dropDownDiv} onClick={DealsWithDropDown} id="bachelors_degree">
                              {BachelorsDegreePlaceholderText === ''?<React.Fragment>Select Bachelors Degree </React.Fragment>:BachelorsDegreePlaceholderText}  <span className={classess.dropDownArrow}><img src={arrow} alt="dropdown" className={classess.dropdown_arrow_styling}/></span>
                        </div>
                       
                        <div className={classess.checkbox_div}> 
                        <div className={classess.dropDownStyling} id="bachelors_degree_dropdown">
                            <input type="checkbox" id = "Bachelors_Medicine_Health_Care_Nursing" name = "Medicine/Health Care/Nursing" value = "Medicine/Health Care/Nursing" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Medicine_Health_Care_Nursing"  className={classess.label_styling}>Medicine/Health Care/Nursing</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Engineering" name = "Engineering" value = "Engineering" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Engineering"  className={classess.label_styling}>Engineering</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Law" name = "Law" value = "Law" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Law"  className={classess.label_styling}>Law</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Computers_IT_Software_Engineering" name = "Computers/ IT/ Software Engineering" value = "Computers/ IT/ Software Engineering" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Computers_IT_Software_Engineering"  className={classess.label_styling}>Computers/ IT/ Software Engineering</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Business_Management" name = "Business Management" value = "Business Management" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Business_Management"  className={classess.label_styling}>Business Management</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Public_Administration" name = "Public Administration" value = "Public Administration" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Public_Administration"  className={classess.label_styling}>Public Administration</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Education_Teaching_and_Training" name = "Education, Teaching and Training" value = "Education, Teaching and Training" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Education_Teaching_and_Training"  className={classess.label_styling}>Education, Teaching and Training</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Media_Mass_Communication_Public_Relations" name = "Media, Mass Communication & Public Relations" value = "Media, Mass Communication & Public Relations" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Media_Mass_Communication_Public_Relations"  className={classess.label_styling}>Media, Mass Communication & Public Relations</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Finance_Accounting" name = "Finance & Accounting" value = "Finance & Accounting" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Finance_Accounting"  className={classess.label_styling}>Finance & Accounting</label> 
                            <br/>
                            <input type="checkbox" id = "Bachelors_Architecture_Construction_Civil_Engineering" name = "Architecture & Construction/ Civil Engineering" value = "Architecture & Construction/ Civil Engineering" className={"bachelors_degree_checkbox "+classess.checkbox_styling} onChange={BachelorsDegreeValue}/>
                            <label htmlFor="Bachelors_Architecture_Construction_Civil_Engineering"  className={classess.label_styling}>Architecture & Construction/ Civil Engineering</label> 
                            <br/>
                        </div>
                        </div>
                    </div> */}
        {/* <div className={classess.inline_div}>
                        <p className={classess.filter_name}>Masters Degree</p>
                        <div className={classess.dropDownDiv} onClick={DealsWithDropDown} id="masters_degree">
                              {MastersDegreePlaceholderText === ''?<React.Fragment>Select Masters Degree </React.Fragment>:MastersDegreePlaceholderText}   <span className={classess.dropDownArrow}><img src={arrow} alt="dropdown" className={classess.dropdown_arrow_styling}/></span>
                        </div>
                       
                        
                        <div className={classess.checkbox_div}> 
                        <div className={classess.dropDownStyling} id="masters_degree_dropdown">
                            <input type="checkbox" id = "Masters_Medicine_Health_Care_Nursing" name = "Medicine/Health Care/Nursing" value = "Medicine/Health Care/Nursing" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Medicine_Health_Care_Nursing"  className={classess.label_styling}>Medicine/Health Care/Nursing</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Engineering" name = "Engineering" value = "Engineering" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Engineering"  className={classess.label_styling}>Engineering</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Law" name = "Law" value = "Law" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Law"  className={classess.label_styling}>Law</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Computers_IT_Software_Engineering" name = "Computers/ IT/ Software Engineering" value = "Computers/ IT/ Software Engineering" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Computers_IT_Software_Engineering"  className={classess.label_styling}>Computers/ IT/ Software Engineering</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Business_Management" name = "Business Management" value = "Business Management" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Business_Management"  className={classess.label_styling}>Business Management</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Public_Administration" name = "Public Administration" value = "Public Administration" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Public_Administration"  className={classess.label_styling}>Public Administration</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Education_Teaching_and_Training" name = "Education, Teaching and Training" value = "Education, Teaching and Training" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Education_Teaching_and_Training"  className={classess.label_styling}>Education, Teaching and Training</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Media_Mass_Communication_Public_Relations" name = "Media, Mass Communication & Public Relations" value = "Media, Mass Communication & Public Relations" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Media_Mass_Communication_Public_Relations"  className={classess.label_styling}>Media, Mass Communication & Public Relations</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Finance_Accounting" name = "Finance & Accounting" value = "Finance & Accounting" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Finance_Accounting"  className={classess.label_styling}>Finance & Accounting</label> 
                            <br/>
                            <input type="checkbox" id = "Masters_Architecture_Construction_Civil_Engineering" name = "Architecture & Construction/ Civil Engineering" value = "Architecture & Construction/ Civil Engineering" className={"masters_degree_checkbox "+classess.checkbox_styling} onChange={MastersDegreeValue}/>
                            <label htmlFor="Masters_Architecture_Construction_Civil_Engineering"  className={classess.label_styling}>Architecture & Construction/ Civil Engineering</label> 
                            <br/>
                        </div>
                        </div>
                    </div> */}
        {/* <div className={classess.inline_div}>
                        <p className={classess.filter_name}>Ph.D Degree</p>
                        <div className={classess.dropDownDiv} onClick={DealsWithDropDown} id="phd_degree">
                              {PhdDegreePlaceholderText === ''?<React.Fragment>Select Phd Degree </React.Fragment>:PhdDegreePlaceholderText}  <span className={classess.dropDownArrow}><img src={arrow} alt="dropdown" className={classess.dropdown_arrow_styling}/></span>
                        </div>
                        <div className={classess.checkbox_div}> 
                        <div className={classess.dropDownStyling} id="phd_degree_dropdown">
                            <input type="checkbox" id = "phd_Medicine_Health_Care_Nursing" name = "Medicine/Health Care/Nursing" value = "Medicine/Health Care/Nursing" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Medicine_Health_Care_Nursing"  className={classess.label_styling}>Medicine/Health Care/Nursing</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Engineering" name = "Engineering" value = "Engineering" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Engineering"  className={classess.label_styling}>Engineering</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Law" name = "Law" value = "Law" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Law"  className={classess.label_styling}>Law</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Computers_IT_Software_Engineering" name = "Computers/ IT/ Software Engineering" value = "Computers/ IT/ Software Engineering" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Computers_IT_Software_Engineering"  className={classess.label_styling}>Computers/ IT/ Software Engineering</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Business_Management" name = "Business Management" value = "Business Management" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Business_Management"  className={classess.label_styling}>Business Management</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Public_Administration" name = "Public Administration" value = "Public Administration" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Public_Administration"  className={classess.label_styling}>Public Administration</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Education_Teaching_and_Training" name = "Education, Teaching and Training" value = "Education, Teaching and Training" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Education_Teaching_and_Training"  className={classess.label_styling}>Education, Teaching and Training</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Media_Mass_Communication_Public_Relations" name = "Media, Mass Communication & Public Relations" value = "Media, Mass Communication & Public Relations" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Media_Mass_Communication_Public_Relations"  className={classess.label_styling}>Media, Mass Communication & Public Relations</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Finance_Accounting" name = "Finance & Accounting" value = "Finance & Accounting" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Finance_Accounting"  className={classess.label_styling}>Finance & Accounting</label> 
                            <br/>
                            <input type="checkbox" id = "phd_Architecture_Construction_Civil_Engineering" name = "Architecture & Construction/ Civil Engineering" value = "Architecture & Construction/ Civil Engineering" className={"phd_degree_checkbox "+classess.checkbox_styling} onChange={PhdDegreeValue}/>
                            <label htmlFor="phd_Architecture_Construction_Civil_Engineering"  className={classess.label_styling}>Architecture & Construction/ Civil Engineering</label> 
                            <br/>
                            </div>
                        </div>
                    </div> */}

        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Career Field</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="opt_field"
          >
            {optFieldPlaceHolderText === "" ? (
              <React.Fragment>Career Field</React.Fragment>
            ) : (
              optFieldPlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="opt_field_arrow"
              />
            </span>
          </div>
          <div className={classess.checkbox_div}>
            <div className={classess.dropDownStyling} id="opt_field_dropdown">
              <input
                type="radio"
                id="opt_Medicine"
                name="opt_field_careers"
                value="Medicine"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label htmlFor="opt_Medicine" className={classess.label_styling}>
                Medicine
              </label>
              <br />
              <input
                type="radio"
                id="opt_Engineering"
                name="opt_field_careers"
                value="Engineering"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Engineering"
                className={classess.label_styling}
              >
                Engineering
              </label>
              <br />
              <input
                type="radio"
                id="opt_Law"
                name="opt_field_careers"
                value="Law"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label htmlFor="opt_Law" className={classess.label_styling}>
                Law
              </label>
              <br />
              <input
                type="radio"
                id="opt_Computer_Science"
                name="opt_field_careers"
                value="Computer Science"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Computer_Science"
                className={classess.label_styling}
              >
                Computer Science
              </label>
              <br />
              <input
                type="radio"
                id="opt_Business_Management"
                name="opt_field_careers"
                value="Business Management"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Business_Management"
                className={classess.label_styling}
              >
                Business Management
              </label>
              <br />
              <input
                type="radio"
                id="opt_Accounting_Finance"
                name="opt_field_careers"
                value="Accounting / Finance"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Accounting_Finance"
                className={classess.label_styling}
              >
                Accounting / Finance
              </label>
              <br />
              <input
                type="radio"
                id="opt_Teaching"
                name="opt_field_careers"
                value="Teaching"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label htmlFor="opt_Teaching" className={classess.label_styling}>
                Teaching
              </label>
              <br />
              <input
                type="radio"
                id="opt_Architecture"
                name="opt_field_careers"
                value="Architecture"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Architecture"
                className={classess.label_styling}
              >
                Architecture
              </label>
              <br />
              <input
                type="radio"
                id="opt_technical_sales"
                name="opt_field_careers"
                value="Technical Sales"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_technical_sales"
                className={classess.label_styling}
              >
                Technical Sales
              </label>
              <br />
              <input
                type="radio"
                id="opt_marketing"
                name="opt_field_careers"
                value="Marketing"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label htmlFor="opt_marketing" className={classess.label_styling}>
                Marketing
              </label>
              <br />
              <input
                type="radio"
                id="opt_chemical_engineering"
                name="opt_field_careers"
                value="Chemical Engineering"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_chemical_engineering"
                className={classess.label_styling}
              >
                Chemical Engineering
              </label>
              <br />
              <input
                type="radio"
                id="opt_software_engineerig"
                name="opt_field_careers"
                value="Software Engineering"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_software_engineerig"
                className={classess.label_styling}
              >
                Software Engineering
              </label>
              <br />
              <input
                type="radio"
                id="opt_hr_recruiter"
                name="opt_field_careers"
                value="Human Resource Recruiter"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_hr_recruiter"
                className={classess.label_styling}
              >
                Human Resource Recruiter
              </label>
              <br />
              <input
                type="radio"
                id="opt_mechanical_engineering"
                name="opt_field_careers"
                value="Mechanical Engineering"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_mechanical_engineering"
                className={classess.label_styling}
              >
                Mechanical Engineering
              </label>
              <br />
              <input
                type="radio"
                id="opt_full_stack_developers"
                name="opt_field_careers"
                value="Full Stack Developer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_full_stack_developers"
                className={classess.label_styling}
              >
                Full Stack Developer
              </label>
              <br />
              <input
                type="radio"
                id="opt_electrical_engineering"
                name="opt_field_careers"
                value="Electrical Engineering"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_electrical_engineering"
                className={classess.label_styling}
              >
                Electrical Engineering
              </label>
              <br />
              <input
                type="radio"
                id="opt_Human_Resource"
                name="opt_field_careers"
                value="Human Resource"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Human_Resource"
                className={classess.label_styling}
              >
                Human Resource
              </label>
              <br />
              <input
                type="radio"
                id="opt_Community_Executive"
                name="opt_field_careers"
                value="Community Executive"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Community_Executive"
                className={classess.label_styling}
              >
                Community Executive
              </label>
              <br />
              <input
                type="radio"
                id="opt_Graphic_Design"
                name="opt_field_careers"
                value="Graphic Design"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Graphic_Design"
                className={classess.label_styling}
              >
                Graphic Design
              </label>
              <br />
              <input
                type="radio"
                id="opt_Legal_Counsel"
                name="opt_field_careers"
                value="Legal Counsel"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Legal_Counsel"
                className={classess.label_styling}
              >
                Legal Counsel
              </label>
              <br />
              <input
                type="radio"
                id="opt_Welder"
                name="opt_field_careers"
                value="Welder"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label htmlFor="opt_Welder" className={classess.label_styling}>
                Welder
              </label>
              <br />
              <input
                type="radio"
                id="opt_Network_Administrator"
                name="opt_field_careers"
                value="Network Administrator"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Network_Administrator"
                className={classess.label_styling}
              >
                Network Administrator
              </label>
              <br />
              <input
                type="radio"
                id="opt_Data_Engineering"
                name="opt_field_careers"
                value="Data Engineering"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Data_Engineering"
                className={classess.label_styling}
              >
                Data Engineering
              </label>
              <br />
              <input
                type="radio"
                id="opt_Associate_Project_Manager"
                name="opt_field_careers"
                value="Associate Project Managers"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Associate_Project_Manager"
                className={classess.label_styling}
              >
                Associate Project Managers
              </label>
              <br />
              <input
                type="radio"
                id="opt_Lead_Data_Engineer"
                name="opt_field_careers"
                value="Lead Data Engineer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Lead_Data_Engineer"
                className={classess.label_styling}
              >
                Lead Data Engineer
              </label>
              <br />
              <input
                type="radio"
                id="opt_Senior_Accountant"
                name="opt_field_careers"
                value="Senior Accountant"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Senior_Accountant"
                className={classess.label_styling}
              >
                Senior Accountant
              </label>
              <br />
              <input
                type="radio"
                id="opt_Junior_Accountant"
                name="opt_field_careers"
                value="Junior Accountant"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Junior_Accountant"
                className={classess.label_styling}
              >
                Junior Accountant
              </label>
              <br />
              <input
                type="radio"
                id="opt_Senior_Software_Engineer"
                name="opt_field_careers"
                value="Senior Software Engineer (.Net & Database)"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Senior_Software_Engineer"
                className={classess.label_styling}
              >
                Senior Software Engineer (.Net & Database)
              </label>
              <br />
              <input
                type="radio"
                id="opt_Technical_Project_Manager"
                name="opt_field_careers"
                value="Technical Project Manager"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Technical_Project_Manager"
                className={classess.label_styling}
              >
                Technical Project Manager
              </label>
              <br />
              <input
                type="radio"
                id="opt_data_engineer"
                name="opt_field_careers"
                value="Data Engineer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_data_engineer"
                className={classess.label_styling}
              >
                Data Engineer
              </label>
              <br />
              <input
                type="radio"
                id="opt_assocaite_architect"
                name="opt_field_careers"
                value="Associate Architect"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_assocaite_architect"
                className={classess.label_styling}
              >
                Associate Architect
              </label>
              <br />
              <input
                type="radio"
                id="opt_software_architect"
                name="opt_field_careers"
                value="Team Lead - Software Architect"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_software_architect"
                className={classess.label_styling}
              >
                Team Lead - Software Architect
              </label>
              <br />
              <input
                type="radio"
                id="opt_assitant_manager_hr"
                name="opt_field_careers"
                value="Assistant Manager HR"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_assitant_manager_hr"
                className={classess.label_styling}
              >
                Assistant Manager HR
              </label>
              <br />
              <input
                type="radio"
                id="opt_software_engineer"
                name="opt_field_careers"
                value="Software Engineer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_software_engineer"
                className={classess.label_styling}
              >
                Software Engineer
              </label>
              <br />
              <input
                type="radio"
                id="opt_sales_associate"
                name="opt_field_careers"
                value="Sales Associate"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_sales_associate"
                className={classess.label_styling}
              >
                Sales Associate
              </label>
              <br />
              <input
                type="radio"
                id="opt_apm"
                name="opt_field_careers"
                value="Associate Project Manager (APM)"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label htmlFor="opt_apm" className={classess.label_styling}>
                Associate Project Manager (APM)
              </label>
              <br />
              <input
                type="radio"
                id="opt_software_developer"
                name="opt_field_careers"
                value="Software Developer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_software_developer"
                className={classess.label_styling}
              >
                Software Developer
              </label>
              <br />
              <input
                type="radio"
                id="opt_videographer"
                name="opt_field_careers"
                value="Videographer and Editor"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_videographer"
                className={classess.label_styling}
              >
                Videographer and Editor
              </label>
              <br />
              <input
                type="radio"
                id="opt_sales_execuitve"
                name="opt_field_careers"
                value="Sales executive"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_sales_execuitve"
                className={classess.label_styling}
              >
                Sales executive
              </label>
              <br />
              <input
                type="radio"
                id="opt_Social_Media_Marketer"
                name="opt_field_careers"
                value="Social Media Marketer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Social_Media_Marketer"
                className={classess.label_styling}
              >
                Social Media Marketer
              </label>
              <br />
              <input
                type="radio"
                id="opt_Finance_Executive"
                name="opt_field_careers"
                value="Finance Executive"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Finance_Executive"
                className={classess.label_styling}
              >
                Finance Executive
              </label>
              <br />
              <input
                type="radio"
                id="opt_Android_Developer"
                name="opt_field_careers"
                value="Android Developer"
                className={"opt_degree_checkbox " + classess.checkbox_styling}
                onChange={OptFieldValue}
              />
              <label
                htmlFor="opt_Android_Developer"
                className={classess.label_styling}
              >
                Android Developer
              </label>
            </div>
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Compatibility</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="compatibility"
          >
            Compatibility
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="compatibility_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStylingInputs} id="compt_dropdown">
            <div className={classess.inline_input}>
              <input
                type="number"
                name="min_compt"
                placeholder="Min"
                min={0}
                value={minCompt}
                onChange={getMinCompatibility}
                className={classess.inline_inputs_style}
              />
            </div>
            <div className={classess.inline_input}>
              <input
                type="number"
                name="max_compt"
                placeholder="Max"
                min={0}
                value={maxCompt}
                onChange={getMaxCompatibility}
                className={classess.inline_inputs_style}
              />
            </div>
          </div>
        </div>
        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Salary Expectations</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="compatibility_level"
          >
            {CompatibilityLevelPlaceHolderText === "" ? (
              <React.Fragment>Compatibility Level</React.Fragment>
            ) : (
              CompatibilityLevelPlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="compatibility_level_arrow"
              />
            </span>
          </div>
          <div className={classess.checkbox_div}>
            <div
              className={classess.dropDownStyling}
              id="compatibility_level_dropdown"
            >
              <input
                type="checkbox"
                id="Mismatch"
                name="Mismatch"
                value="Very Low"
                className={
                  "compatibility_level_checkbox " + classess.checkbox_styling
                }
                onChange={ComptibilityLevelValue}
              />
              <label htmlFor="Mismatch" className={classess.label_styling}>
                Very Low
              </label>
              <br />
              <input
                type="checkbox"
                id="Low"
                name="Low"
                value="Low"
                className={
                  "compatibility_level_checkbox " + classess.checkbox_styling
                }
                onChange={ComptibilityLevelValue}
              />
              <label htmlFor="Low" className={classess.label_styling}>
                Low
              </label>
              <br />
              <input
                type="checkbox"
                id="Medium"
                name="Medium"
                value="Medium"
                className={
                  "compatibility_level_checkbox " + classess.checkbox_styling
                }
                onChange={ComptibilityLevelValue}
              />
              <label htmlFor="Medium" className={classess.label_styling}>
                Medium
              </label>
              <br />
              <input
                type="checkbox"
                id="Good"
                name="Good"
                value="High"
                className={
                  "compatibility_level_checkbox " + classess.checkbox_styling
                }
                onChange={ComptibilityLevelValue}
              />
              <label htmlFor="Good" className={classess.label_styling}>
                High
              </label>
              <br />
              <input
                type="checkbox"
                id="High"
                name="High"
                value="Very High"
                className={
                  "compatibility_level_checkbox " + classess.checkbox_styling
                }
                onChange={ComptibilityLevelValue}
              />
              <label htmlFor="High" className={classess.label_styling}>
                Very High
              </label>
              <br />
            </div>
          </div>
        </div>

        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Job Code</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="job_code"
          >
            {jobCodePlaceHolderText === "" ? (
              <React.Fragment>Job Code</React.Fragment>
            ) : (
              jobCodePlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="job_code_arrow"
              />
            </span>
          </div>
          <div className={classess.dropDownStyling} id="job_code_dropdown">
            {JobCodesReceived}
          </div>
        </div>

        <div className={classess.inline_div}>
          {/* <p className={classess.filter_name}>Salary Expectations</p> */}
          <div
            className={classess.dropDownDiv}
            onClick={DealsWithDropDown}
            id="selection_status"
          >
            {SelectionStatusPlaceHolderText === "" ? (
              <React.Fragment>Selection Status</React.Fragment>
            ) : (
              SelectionStatusPlaceHolderText
            )}{" "}
            <span className={classess.dropDownArrow}>
              <img
                src={arrow}
                alt="dropdown"
                className={classess.dropdown_arrow_styling}
                onClick={ArrowDealing}
                id="selection_status_arrow"
              />
            </span>
          </div>
          <div className={classess.checkbox_div}>
            <div
              className={classess.dropDownStyling}
              id="selection_status_dropdown"
            >
              <input
                type="checkbox"
                id="Viewed"
                name="Viewed"
                value="Viewed"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Viewed" className={classess.label_styling}>
                Viewed
              </label>
              <br />
              <input
                type="checkbox"
                id="Shortlisted"
                name="Shortlisted"
                value="Shortlisted"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Shortlisted" className={classess.label_styling}>
                Shortlisted
              </label>
              <br />
              <input
                type="checkbox"
                id="Interviewed"
                name="Interviewed"
                value="Interviewed"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Interviewed" className={classess.label_styling}>
                Interviewed
              </label>
              <br />
              <input
                type="checkbox"
                id="Recommended"
                name="Recommended"
                value="Recommended"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Recommended" className={classess.label_styling}>
                Recommended
              </label>
              <br />
              <input
                type="checkbox"
                id="Offered"
                name="Offered"
                value="Offered"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Offered" className={classess.label_styling}>
                Offered
              </label>
              <br />
              <input
                type="checkbox"
                id="Declined"
                name="Declined"
                value="Declined"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Declined" className={classess.label_styling}>
                Declined
              </label>
              <br />
              <input
                type="checkbox"
                id="Accepted"
                name="Accepted"
                value="Accepted"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Accepted" className={classess.label_styling}>
                Accepted
              </label>
              <br />
              <input
                type="checkbox"
                id="Rejected"
                name="Rejected"
                value="Rejected"
                className={
                  "selection_status_checkbox " + classess.checkbox_styling
                }
                onChange={SelectionStatusValue}
              />
              <label htmlFor="Rejected" className={classess.label_styling}>
                Rejected
              </label>
              <br />
            </div>
          </div>
        </div>

        <div>
          <div onClick={GetResult} className={classess.get_result_button}>
            Get Result
          </div>
          <div onClick={clearFilters} className={classess.clear_filter_button}>
            Clear All Filters
          </div>
        </div>
      </div>

      {(show === true) & (recordFetched !== 0) ? (
        <div className={classess.count_result}>
          <div className={classess.record_fetch_heading}>
            Total Record Fetched:{" "}
            <span className={classess.record_fetch_number}>
              {recordFetched}
            </span>
          </div>

          <div className={classess.table_div}>
            <div className={classess.csv_div} onClick={exportTableToCSV}>
              Export As CSV
            </div>
            <div
              className={classess.email_data_div}
              onClick={exportEmailDataToCSV}
            >
              Export for Mail Merge
            </div>
            <div className={classess.download_reume} onClick={DownloadResume}>
              Download Resumes
            </div>

            <div className={classess.sort_div}>
              <select onChange={sort} className={classess.sort_select_styling}>
                <option>Select Sort Type</option>
                <optgroup label="Sort By Age">
                  <option value="sort_by_age_asec">Sort Age A-Z</option>
                  <option value="sort_by_age_desc">Sort Age Z-A</option>
                </optgroup>
                <optgroup label="Sorty By Date">
                  <option value="sort_by_date_asec">Sort Date A-Z</option>
                  <option value="sort_by_date_desc">Sort Date Z-A</option>
                </optgroup>
                <optgroup label="Sort By Salary Range">
                  <option value="sort_by_salary_range_asec">
                    Sort Salary Range A-Z
                  </option>
                  <option value="sort_by_salary_range_desc">
                    Sort Salary Range Z-A
                  </option>
                </optgroup>
                <option value="sort_by_gender">Sort By Gender</option>
                <option value="sort_by_job_type">Sort By Job Type</option>

                <option value="sort_by_past_experience">
                  Sort By Job Experience
                </option>
                {optFieldFilter === true ? (
                  <optgroup label="Sort By Compatibility">
                    <option value="sort_by_compatibility_asec">
                      Sort Compatibility A-Z
                    </option>
                    <option value="sort_by_compatibility_desc">
                      Sort Compatibility Z-A
                    </option>
                  </optgroup>
                ) : null}
                <option value="sort_by_selection_status">
                  Sort By Selection Status
                </option>
              </select>
            </div>

            <center>
              <div className={classess.table_alignment}>
                <table className={`${classess.table_styling}`} id="table">
                  <tr>
                    <th className={classess.table_heading_styling}>User Id</th>
                    <th className={classess.table_heading_styling}>Name</th>
                    {optFieldFilter === true ? (
                      <>
                        <th className={classess.table_heading_styling}>
                          Compatibility
                        </th>
                        <th className={classess.table_heading_styling}>
                          Compatibility Level
                        </th>
                      </>
                    ) : null}
                    <th className={classess.table_heading_styling}>Age</th>
                    <th className={classess.table_heading_styling}>Email</th>
                    <th className={classess.table_heading_styling}>Gender</th>
                    <th className={classess.table_heading_styling}>
                      Past Experience
                    </th>
                    <th className={classess.table_heading_styling}>Job Code</th>
                    <th className={classess.table_heading_styling}>Job Type</th>
                    <th className={classess.table_heading_styling}>
                      Salary Expectations
                    </th>

                    <th className={classess.table_heading_styling}>
                      Updated at
                    </th>
                    <th className={classess.table_heading_styling}>
                      Selection Status
                    </th>
                  </tr>
                  <tbody>{userRecord}</tbody>
                </table>
              </div>
            </center>
          </div>
          {/* <div onClick={openRelevantReord}>
                      {userRecord}
                    </div> */}
        </div>
      ) : show === false ? (
        "Loading.."
      ) : (show === true) & (recordFetched == 0) ? (
        "No Record Found"
      ) : null}
      {report_div === true ? (
        <div className={classess.user_info_div}>
          <UserReportCard
            user={userInformation}
            resume_buttons={downlaodingButton}
            selection_status={selectionStatusField}
            employe_life_cycle={employeLifeCycle}
            close_report={closeReportDiv}
          />

          {/* <div className={classess.close} onClick={closeReportDiv}>
                    Close
                </div>
                <div className={classess.user_data}>
                    <div className={classess.avatar_div}>
                        {
                            imgUrl !== null ?
                                <img src={imgUrl} alt="Male" className={classess.profile_styling} />
                                : avatargender === 'Male' ? <img src={male_avatar} alt="Male" className={classess.avatar_styling} />
                                    :
                                    <img src={female_avatar} alt="Female" className={classess.avatar_styling} />
                        }
                        <center>
                            {downlaodingButton}
                        </center>
                        <div>
                            <div className={classess.heading}>
                                Basic Information
                            </div>
                            {bioInformation}
                            <hr />
                            <div className={classess.heading}>
                                Contact Information
                            </div>
                            {contactInformation}
                            {
                                jobDescription === true ? <>
                                    <hr />
                                    <div className={classess.heading}>
                                        Educational Information
                             </div>
                                    <div className={classess.left_spacing}>
                                        {educationaInformation}
                                    </div>

                                    <hr />
                                    <div className={classess.heading}>
                                        Work Preferences
                             </div>
                                    <div className={classess.left_spacing}>
                                        {workPreferencesInformation}
                                    </div>

                                    <hr />
                                    <div className={classess.heading}>
                                        Career Related Information
                             </div>
                                    <div className={classess.left_spacing}>
                                        {careerRelatedInformation}
                                    </div>
                                </> : null
                            }



                        </div>


                    </div>
                    <div className={classess.info_of_user}>
                        {
                            jobDescription === true ? <>
                                <div className={classess.heading_2}>
                                    Job Description
                             </div>
                             <div className={classess.job_description}>
                                    {jobDescriptionContent} <span className={classess.control_description} onClick={()=>viewJobDescription(false)}>Hide </span>
                             </div>
                            </> :
                                <>
                                    <div className={classess.heading_2}>
                                        Educational Information
                             </div>
                                    {educationaInformation}
                                    <hr />
                                    <div className={classess.heading_2}>
                                        Work Preferences
                             </div>
                                    {workPreferencesInformation}
                                    <hr />
                                    <div className={classess.heading_2}>
                                        Career Related Information
                             </div>
                                    {careerRelatedInformation}
                                </>
                        }


 
                      
                    </div>

                </div> */}
        </div>
      ) : null}
    </div>
  )
}
export default GeneralStatistics

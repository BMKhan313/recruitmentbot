import * as React from "react"
import { useReducer, useContext } from "react"
import * as classess from "./social_portfolio.module.css"
// import { API_URL } from "src/constants"
import Swal from "sweetalert2"
import { store } from "src/context/store"
import { clog, ShowLoader } from "../../../../utils"

const SocialPortfolio = props => {
  const globalState = useContext(store)
  const { dispatch } = globalState
  const formValue = React.useRef(null)
  const [updatedValue, getUpdatedValue] = React.useState("")
  const all_states = {
    formCount: 0,
    addPortfolio: "",
    portFolioLinks: [],
    portFolioDiv: false,
    addToggle: true,
  }
  const reducer = (prevProperty, updatedProperty) => ({
    ...prevProperty,
    ...updatedProperty,
  })
  const [state, setState] = useReducer(reducer, all_states)

  let REC_URL  = props.REC_URL 
  React.useEffect(() => {

    //ANCHOR - Refactored - get-portfolio
    fetch(`${REC_URL}/recruitment/get-portfolio`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + props.token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const {data} = res
        if (res.success) {
          setState({
            portFolioLinks: data["links"],
          })
        }
      })
  }, [])
  React.useEffect(() => {
    createForm()
  }, [state.formCount])
  const createForm = () => {
    let temp = []
    for (let i = 0; i < state.formCount; i++) {
      temp.push(
        <>
          <form onSubmit={PortfolioSubmission} key={Math.random()}>
            <div className={classess.inputs_main}>
              <input
                type="url"
                placeholder="Your Portfolio Link"
                name="Social Portfolio"
                ref={formValue}
                className={classess.input_styling}
                required
              />
              <input
                type="submit"
                name="submit"
                value="Submit"
                className={classess.submit_button}
              />
            </div>
          </form>
          {state.addToggle === false ? (
            <span onClick={removeHide} className={classess.close_button}>
              Remove
            </span>
          ) : null}
        </>
      )
    }
    setState({
      addPortfolio: temp,
    })
    // addPortfolio(temp)
  }
  const PortfolioSubmission = e => {
    e.preventDefault()
    setState({
      formCount: state.formCount - 1,
      // portFolioLinks:[...state.portFolioLinks,updatedValue],
      addToggle: true,
      addPortfolio: "",
    })
    ShowLoader("Submitting...")
    //ANCHOR - Refactored - add-portfolio
    fetch(`${REC_URL}/recruitment/add-portfolio`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer" + props.token,
      },
      body: JSON.stringify({
        p_link: formValue.current.value,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(async res => {
        const {data} = res
        if (res.success) {
          Swal.fire({
            icon: "success",
            text: data["msg"],
          })

          //ANCHOR - Refactored - get-portfolio
          await fetch(`${REC_URL}/recruitment/get-portfolio`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer" + props.token,
            },
          })
            .then(response => {
              return response.json()
            })
            .then(res => {
              const {data} = res
              if (res.success) {
                setState({
                  portFolioLinks: data["links"],
                })
              }
            })
        } else {
          Swal.fire({
            icon: "error",
            text: data["msg"],
          })
        }
      })
  }
  const addHide = () => {
    setState({
      formCount: state.formCount + 1,
      addToggle: false,
    })
    dispatch({ type: "FOOTER_CONTROL" })
  }
  const removeHide = () => {
    setState({
      formCount: state.formCount - 1,
      addToggle: true,
    })
    dispatch({ type: "FOOTER_CONTROL" })
  }
  const toggleToEdit = e => {
    e.preventDefault()
    let get_list_id = e.target.getAttribute("list_id")
    let get_form_id = e.target.getAttribute("form_id")
    let list_id = document.getElementById(get_list_id)
    let form_id = document.getElementById(get_form_id)
    list_id.style.display = "none"
    form_id.style.display = "block"
  }
  const UpdatetheValue = e => {
    getUpdatedValue(e.target.value)
  }
  function updatePortfolioLink(e) {
    e.preventDefault()
    let p_id = parseInt(e.target.getAttribute("link_id"))
    let get_list_id = e.target.getAttribute("list_id")
    let get_form_id = e.target.getAttribute("form_id")
    let list_id = document.getElementById(get_list_id)
    let form_id = document.getElementById(get_form_id)
    ShowLoader("Updating...")
    //ANCHOR - Refactored - update-portfolio
    fetch(`${REC_URL}/recruitment/update-portfolio`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + props.token,
      },
      body: JSON.stringify({
        id: p_id,
        updated_link: updatedValue,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(async res => {
        const {data} = res
        if (res.success) {

          //ANCHOR - Refactored - get-portfolio
          await fetch(`${REC_URL}/recruitment/get-portfolio`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer" + props.token,
            },
          })
            .then(response => {
              return response.json()
            })
            .then(res => {
              const {data} = res
              if (res.success) {
                setState({
                  portFolioLinks: data["links"],
                })
              }
            })
          Swal.fire({
            icon: "success",
            text: data["msg"],
          })
          list_id.style.display = "block"
          form_id.style.display = "none"
        } else {
          Swal.fire({
            icon: "error",
            text: data["msg"],
          })
        }
      })
  }
  const DeletePortfolio = e => {
    let list_id = parseInt(e.target.getAttribute("link_id"))
    ShowLoader("Deleting...")
    //ANCHOR - Refactored - delete-portfolio
    fetch(`${REC_URL}/recruitment/delete-portfolio?id=${list_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + props.token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(async res => {
        const {data} = res
        if (res.success) {
          //ANCHOR -  - get-portfolio
          await fetch(`${REC_URL}/recruitment/get-portfolio`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer" + props.token,
            },
          })
            .then(response => {
              return response.json()
            })
            .then(res => {
              const {data} = res
              if (data["status"] === true) {
                setState({
                  portFolioLinks: data["links"],
                })
              } else {
                setState({
                  portFolioLinks: data["links"],
                })
              }
            })
          Swal.fire({
            icon: "success",
            text: data["msg"],
          })
        } else {
          Swal.fire({
            icon: "error",
            message: data["msg"],
          })
        }
      })
  }
  return (
    <React.Fragment>
      <div className={classess.main_div}>
        <div className={classess.link_button_main}>
          <div className={classess.heading_setting}>Portfolio Links</div>
          {state.addToggle === true ? (
            <span onClick={addHide} className={classess.add_button}>
              Add Links
            </span>
          ) : null}
        </div>

        <div className={classess.width}>
          {/* {clog({flasg:state.portFolioLinks})} */}
          {(state.portFolioLinks && state.portFolioLinks !== [] )  ? (
            <>
              {Object.keys(state.portFolioLinks).map((links, index) => {
                return (
                  <>
                    <div
                      key={index}
                      id={"portfolio_" + index}
                      className={classess.link_text_main}
                    >
                      <p className={classess.link_text}>
                        {state.portFolioLinks[links]}
                      </p>
                      <div className={classess.buttons_main}>
                        <span
                          list_id={"portfolio_" + index}
                          form_id={"form_" + index}
                          className={classess.edit_button}
                          onClick={toggleToEdit}
                        >
                          Edit
                        </span>{" "}
                        <span
                          className={classess.close_button}
                          link_id={links}
                          onClick={DeletePortfolio}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                    <form
                      className={classess.form_visibility}
                      id={"form_" + index}
                      list_id={"portfolio_" + index}
                      link_id={links}
                      form_id={"form_" + index}
                      onSubmit={updatePortfolioLink}
                    >
                      <div className={classess.inputs_main}>
                        <input
                          type="url"
                          defaultValue={state.portFolioLinks[links]}
                          onChange={UpdatetheValue}
                          className={classess.input_styling}
                          required
                        />
                        <input
                          type="submit"
                          name="submit"
                          value="Update"
                          className={classess.submit_button}
                        />
                      </div>
                    </form>
                  </>
                )
              })}
            </>
          ) : null}

          {state.addPortfolio}
        </div>
      </div>
    </React.Fragment>
  )
}
export default SocialPortfolio

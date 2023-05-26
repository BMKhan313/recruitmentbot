import React, { useContext, useReducer } from "react"
import * as classess from "./update_password.module.css"
import { store } from "src/context/store"
import { API_URL } from "src/constants"
import Swal from "sweetalert2"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginSchema, signUpSchema, updatePasswordSchema, validateEmail } from "../../../helpers/FormSchema"
import * as classes from "./SignUpForm.module.css"

const UpdatePassword = props => {
  let CURRENT_API_URL = props?.currentApiUrl ?? API_URL
  const globalState = useContext(store)
  const { dispatch } = globalState
  const initialState = {
    newPassword: "",
    confirmNewPassword: "",
    show_buttons: true,
  }
  const reducer = (prevState, updateState) => ({
    ...prevState,
    ...updateState,
  })
  const [state, setState] = useReducer(reducer, initialState)
  const CloseUpdateComponent = () => {
    dispatch({ type: "HANDLE_UPDATE_COMPONENT" })
  }
  const getNewPassword = e => {
    setState({
      newPassword: e.target.value,
    })
  }
  const getConfirmPassword = e => {
    setState({
      confirmNewPassword: e.target.value,
    })
    if (state.newPassword !== e.target.value) {
      document.getElementById("confirm_new_password").style.borderColor = "red"
    } else {
      document.getElementById("confirm_new_password").style.borderColor =
        "#60a8be"
    }
  }
  const UpdatePasswordValue = async (values) => {

    const { password } = values

    setState({
      show_buttons: false,
    })
    //ANCHOR - Refactored - update-password
    await fetch(`${CURRENT_API_URL}/recruitment/update-password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer" + props.token,
      },
      body: JSON.stringify({
        updated_password: password,
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        const { data } = res
        if (res.success) {
          setState({
            show_buttons: true,
          })
          Swal.fire({
            icon: "success",
            title: data["msg"],
          })
        } else {
          setState({
            show_buttons: true,
          })
          Swal.fire({
            icon: "error",
            text: data["msg"],
          })
        }
      })
      .catch(error => {
        setState({
          show_buttons: true,
        })
      })
    setState({
      newPassword: "",
      confirmNewPassword: "",
    })

  }

  return (
    <div className={classess.main_div}>
      <div className={classess.sub_div}>
        <div className={classess.update_text}>Update Password</div>
        <br />
        <Formik
          initialValues={{
            password: '',
            confirm_password: '',
          }}
          validationSchema={updatePasswordSchema}
          //  onSubmit={values=>console.log({values,{state.Country}})}
          onSubmit={values => UpdatePasswordValue(values)}
        //  onSubmit={HandleSubmit}
        >
          {({ errors, touched }) =>
            <Form >
              <>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className={errors.password && touched.password ? classes.inp_input_error : classes.inp_input}
                  autoComplete="off"
                />
                {errors.password && touched.password ? <div className={classes.inp_error} >{errors.password} </div> : null}
              </>

              <>
                <Field
                  type="Password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className={errors.confirm_password && touched.confirm_password ? classes.inp_input_error : classes.inp_input}
                  autoComplete="off"
                />
                {errors.confirm_password && touched.confirm_password ? <div className={classes.inp_error} >{errors.confirm_password} </div> : null}
              </>



              <br />

              {state.show_buttons === true ? (
                <div className={classess.buttons_div}>
                  <div className={classess.update}>
                    <input
                      type="submit"
                      value="Update"
                      name="Update Password"
                      className={classess.submit_button}
                    />
                  </div>
                  <div className={classess.close} onClick={CloseUpdateComponent}>
                    Close
                  </div>
                </div>
              ) : (
                "Please wait"
              )}
            </Form>
          }
        </Formik>
      </div>
    </div>
  )
}
export default UpdatePassword

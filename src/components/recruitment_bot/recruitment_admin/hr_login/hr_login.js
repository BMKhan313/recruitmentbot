import React from "react"
import * as classess from "./hr_login.module.css"
import { REC_URL } from "src/constants"
import Swal from "sweetalert2"
import { navigate } from "gatsby"
import { Formik, Form, Field } from 'formik';
import { loginSchema, validateEmail } from '../../../../helpers/FormSchema'
import Admin_Pic from "../static/admin.png"
import Loader from "../static/loader1.gif"

const HRLogin = () => {
  const [loading, setLoading] = React.useState(false)

  
  const formSubmission =(values) => {
    // e.preventDefault()
    const {email,password} = values
    setLoading(true)

    //ANCHOR - Refactored - login
    fetch(`${REC_URL}/recruitment/login`, {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        // 'access-control-allow-origin' : '*',
        // 'Authorization': "Bearer" + "9ad818b0-2eef-4514-b32b-c7b24a3c5476",
        // Token: "9ad818b0-2eef-4514-b32b-c7b24a3c5476",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        // company_code: "0"
        company_code: "Bot0092"

        // email: "alpha@botnostictest.com",
        // password: "mcdTest@123"
      }),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        // console.log(data)

        if (data.error === "Unauthorized") {
          Swal.fire({
            icon: "error",
            text: "Unauthorized",
          })
          setLoading(false)
        }
        if (data.success === true && data.user && data.user.type=="hradmin") {
          Swal.fire({
            icon: "success",
            text: "Successfully logged in",
            timer: 1500,
          })
          sessionStorage.setItem("red_url", window.location.href)
          navigate("/recruitment-bot/hr-admin/hr-dashboard", {
            state: {
              token: data.token,
              // token_expiry:data.expires,
              company_code:data.user.company_code
            },
          })
          setLoading(false)
        } else {
          Swal.fire({
            icon: "error",
            text: "Unable to Login",
          })
          setLoading(false)
        }
      })
      .catch(err => console.log({ err }))
  }
  return  (
    <div className={classess.body_div} >
     <h1 className={classess.body_heading}>HR ADMIN LOGIN</h1>
     <div className={classess.main_div}>
         <img src={Admin_Pic} className={classess.img_div} />
        
         <Formik
             initialValues={{
                 email: '',
                 password: ''
             }}
             validationSchema={loginSchema}
             onSubmit={values => formSubmission(values)}
             // onSubmit={values => console.log(values)}
 
         >
             {({ errors, touched }) => (
                 <Form id="login" >
                     <br />
                     <>
                         <p className={classess.input_label}>Email</p>
                         <Field
                             type="email"
                             name="email"
                             // placeholder="Enter email"
                             validate={validateEmail}
                             className={errors.email && touched.email ? classess.inp_input_error : classess.inp_input}
                             autoComplete="off"
                         />
                         {errors.email && touched.email ? <div className={classess.inp_error} >{errors.email} </div> : null}
                     </>
                     <>
                         <p className={classess.input_label}>Password</p>
                         <Field
                             type="Password"
                             name="password"
                             className={errors.password && touched.password ? classess.inp_input_error : classess.inp_input}
                             autoComplete="off"
                         />
                         {errors.password && touched.password ? <div className={classess.inp_error} >{errors.password}</div> : null}
 
                         <br />
                     </>
 
                     {
                         loading === false ? <input type="submit" name="submit" value="Login" className={classess.inp_submit} /> :
                         <div className={classess.loading_setting}><img src={Loader} style={{width:"100px"}} /> </div>
                     }
                 </Form>)}
         </Formik>
     </div>
     </div>
     )
}
export default HRLogin

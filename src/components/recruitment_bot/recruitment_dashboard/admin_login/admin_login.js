import React from 'react'
import * as classess from './admin_login.module.css'
import { REC_URL } from 'src/constants'
import Swal from 'sweetalert2'
import { navigate } from 'gatsby'
import { Formik, Form, Field } from 'formik';
import { loginSchema, validateEmail } from '../../../../helpers/FormSchema'
import Admin_Pic from "../static/admin.png"
import Loader from "../static/loader1.gif"

const AdminLogin = () => {
    // const [email, setEmail] = React.useState('')
    // const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    // const getEmail = (e) => {
    //     setEmail(e.target.value)
    // }
    // const getPassword = (e) => {
    //     setPassword(e.target.value)
    // }
    const formSubmission = (values) => {
        // e.preventDefault()
        const {email,password} = values
        setLoading(true)
        //ANCHOR - Refactored - login
        fetch(`${REC_URL}/recruitment/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                company_code: "0"
            })
        }).then(response => {
            return response.json()
        }).then((res) => {
            // console.log(data)
            const{data} =res 
            if (res.code == 401) {
                Swal.fire({
                    icon: 'error',
                    text: 'Wrong Credentials'
                })
                setLoading(false)
            }
            else {
                let user_type = res.user.type !== undefined ? res.user.type : 'null'
                if (user_type === 'admin') {
                    if (res.code && res.code == 401) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Wrong Credentials'
                        })
                        setLoading(false)
                    }
                    else {
                        Swal.fire({
                            icon: 'success',
                            text: 'Done'
                        })
                        sessionStorage.setItem('red_url', window.location.href)
                        navigate('/recruitment-bot/general-statistics', {
                            state: {
                                token: res.token,
                                token_expiry: res.expires,
                                company_code: res.user.company_code
                            }
                        })
                    }


                }
                else {
                    Swal.fire({
                        icon: 'error',
                        text: "Sorry! You don't have access."
                    })
                    setLoading(false)
                }
            }

        })
    }
    return (
   <div className={classess.body_div} >
    <h1  data-aos="fade-right" data-aos-duration={2500} className={classess.body_heading}>ADMIN LOGIN</h1>
    <div className={classess.main_div}>
        <img  src={Admin_Pic} className={classess.img_div} />
        {/* <form onSubmit={formSubmission}>
            <div className={classess.input_fields}>
                <label className={classess.label_styling}>
                    Email
                </label>
                <input type="text" name="email" placeholder="Enter Email Address" onChange={getEmail} value={email} className={classess.input_styling} />
            </div>
            <div className={classess.input_fields}>
                <label className={classess.label_styling}>
                    Password:
                </label>
                <input type="password" name="password" placeholder="Enter Password" onChange={getPassword} value={password} className={classess.input_styling} />
            </div>
            {
                loading === false ? <input type="submit" name="submit" value="Login" className={classess.submit_button} /> : 'Loading'
            }

        </form> */}
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginSchema}
            onSubmit={values => formSubmission(values)}

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
export default AdminLogin
import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2"
import { navigate } from "gatsby"
import loadingIcon from "./static/login_loading.gif"
// import * as classes from "./pseb.module.css"
// import svg1 from "./download.webp"
// import svg2 from "./download2.webp"
// import { API_URL } from 'src/constants'
import { API_URL, PSEB_Redirect } from "src/constants"

function Pseb({ location }) {
    // const [token, settoken] = useState("")
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [isLoading, setisLoading] = useState(false)
    // const [companyCode, setcompanyCode ] = useState("")
    // var companyCode = ""
    // var token = ""

    useEffect(() => {
setisLoading(true)
        initialRender2()


    }, [])

    function getUserCredential(token,companyCode,getReference){
        fetch(`https://resume.brightspyre.com/api/v1/user`, {
            method: "GET",
            headers: {
                //   Accept: "*/*",
                //   "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then(response => response.json())
            .then(data => {
                //   console.log(data)
                // userData = data.username;
                if (data.code !== 401) {
                    PsebLogin(data.username,companyCode,getReference)
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: "Please Login Again",
                    })
                    return
                }  
            })
    }


    function PsebLogin(userEmail,companyCode,getReference) {
        fetch(`${API_URL}/recruitment/pseb-login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userEmail,
                company_code: companyCode
            })
        })
            .then(response => {
                return response.json()
            })
            .then((data) => {
                // console.log(data)
                // setLoader(false)
                if (data.status) {
                    setisLoading(false)
                    // u_token = data.token;
                    // console.log(data)
                    Swal.fire({
                        position: 'middle',
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const uToken = data.token

                    fetch(`${API_URL}/recruitment/user`, {
                        method: "GET",
                        headers: {
                            //   Accept: "*/*",
                            //   "Content-Type": "application/json",
                            "Authorization": "Bearer " + uToken,
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            navigate(
                                "/recruitment-bot/recruitment-user-chats",
                                {
                                    state: {
                                        token: uToken,
                                        user: data.user,
                                        // red_url: window.location.href
                                        red_url:  `${PSEB_Redirect}`
                                    }
                                }
                            )
                            sessionStorage.setItem("referenceID",getReference)
                            // var directories = window.location.href.split("/");
                            // console.log("---------------------",directories[4])
                            // alert(`Refernce Id: ${sessionStorage.getItem('referenceID')}`)
                            // console.log("Refernce Id:",sessionStorage.getItem('referenceID'));
                        })

           
                }
                else {
                    Swal.fire({
                        position: 'middle',
                        icon: 'error',
                        title: data.error,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // http://localhost:8000/recruitment-bot/pseb?school=abc&inf=okj&tokn=123456
    async function initialRender2() {
        const getToken = new URLSearchParams(window.location.search).get("token");
        const getType = new URLSearchParams(window.location.search).get("type");
        const getReference = new URLSearchParams(window.location.search).get("reference");
        if (!getToken) {
            // navigate("/recruitment-bot/")
            // console.log("Token false: ", getToken)
            Swal.fire({
                icon: "error",
                title: "Not Authenticated",
                text: "Invalid Token",
            })
            return
        }
        if (!getType) {
            // navigate("/recruitment-bot/")
            // console.log("Token false: ", getToken)
            Swal.fire({
                icon: "error",
                title: "Not Authenticated",
                text: "Invalid Type",
            })
            return
        }
        if (!getReference) {
            // navigate("/recruitment-bot/")
            // console.log("Token false: ", getToken)
            Swal.fire({
                icon: "error",
                title: "Not Authenticated",
                text: "Invalid Reference ID",
            })
            return
        }
        else {
            // console.log("Token true: ", getType)
            // var company_code = (getType === "ict") ? 'PSEBICT015' : 'PSEBNICT016'
            var companyCode = (getType === "ict") ? 'PSEBICT015' : 'PSEBNICT016'
            // token = getToken
            getUserCredential(getToken,companyCode,getReference)
            // setcompanyCode(company_code)
            // settoken(getToken)

        }

    }




    // function submit() {
    //     alert(`Username: ${username}, Password: ${password}`)
    //     if (username === "" || password === "") {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Required Data Missing',
    //             text: 'Please fill data in all fields',
    //         })
    //         return;
    //     }
    // }

    return (
        <>
        {/* <h1>Welcome</h1> */}
        {(isLoading) ?  <img
  src={loadingIcon}
  style={{width:"100px",height:"100px",marginTop:"200px"}}
/> : null }
       
</>
        // <div className={classes.bg} >



        // </div>
    )
}

export default Pseb;




{/* <img src={svg1} alt='pic' className={classes.svg1} />
            <img src={svg2} alt='pic' className={classes.svg2} />
            <div className={classes.background}>
                <div className={classes.circle1}></div>
                <div className={classes.circle2}></div>
            </div>
            <form>
                <h3>Login</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" onChange={(e) => setusername(e.target.value)} />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={(e) => setpassword(e.target.value)} />

                <button onClick={() => submit()} >Log In</button>

            </form> */}






// async function initalRender() {
//     if (location.search === "") {
//         // navigate("/recruitment-bot/")
//         Swal.fire({
//             icon: "error",
//             title: "Not Authenticated",
//             text: "Please Login First",
//         })
//         //   return
//     }
//     else {
//         // let info = window.location.href.split("?==")
//         // settoken(info[1])

//         // var query = window.location.search.substring(1);
//         // console.log("Query: ",query)
//         // var url = "http://www.example.com/index.php?myParam=384&login=admin"; // or window.location.href for current url

//         // var url = location.search; // or window.location.href for current url
//         // var captured = /token=([^&]+)/.exec(url)[1];
//         // console.log("Query: ", captured)
//     }

//     const getToken = new URLSearchParams(window.location.search).get("token");
//     console.log("Token: ", getToken)
// }




         // console.log("Token: ",u_token)


                    // navigate(
                    //     "/recruitment-bot/recruitment-user-chats",
                    //     {
                    //         state: {
                    //             token: data.token,
                    //             user: data.user,
                    //             red_url: window.location.href
                    //         }
                    //     }
                    // )

                    // dispatch({
                    //     type:'USER_LOGGED_IN',payload:{
                    //         // rec_id:data.user.id,
                    //         rec_id:data.user.id,

                    //         rec_email:data.user.email,
                    //         rec_token:data.token
                    //     }}) 
                    // navigate(
                    //     "/recruitment/chat",
                    //     {
                    //       state:{
                    //         token:data.token,
                    //         user:data.user,
                    //       }
                    //     }
                    //   )
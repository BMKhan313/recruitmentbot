import React, { useContext } from "react"

// import Login from '../login/login.js';
import Login from "../login/updated_login"
// import Register from '../register/register.js';
import Register from "../register/updated_register"

import { store } from "src/context/store"

import left_blob from "src/images/recruitment_left_blob.png"
import right_blob from "src/images/recruitment_right_blob.png"
import * as classes from "./index.module.css"

// import * as classes from 'src/styles/global.css';
import RecruitmentHeader from "../main_page/header/header"
import Footer from "../main_page/footer/footer"
const MainPageComponent = props => {
  const globalState = useContext(store)
  let register_open = false
  if (globalState.state !== undefined) {
    register_open = globalState.state.isRegisterOpen
    // if(Object.keys(globalState.state).length !== 0){
    //     register_open = globalState.state.isRegisterOpen
    // }
  }

  return (
    <React.Fragment>
      <RecruitmentHeader location="sign_up" />
      {/* <img src={left_blob} alt ="left_blob" className="left_blob"/> 
            <img src={right_blob} alt="right_blob" className="right_blob"/> */}
      <div className={classes.main_div}>
        {register_open === false ? <Login /> : <Register />}
      </div>

      {/* <footer>
                <span>
                {`© ${new Date().getFullYear()} Botnostic Solutions (PVT) Ltd, All Rights Reserved`}
                </span>
                
            </footer> */}
      <div className={classes.footer_div} id="test_footer">
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default MainPageComponent
// animate={globalState.state.isRegisterOpen === false ?"hide":"show"}

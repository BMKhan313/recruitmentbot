import React, {Component} from 'react';
import {navigate} from "gatsby"
import './error_screen.css';

import error_logo from './static/error_logo.webp';
import lost_png from "./static/lost.png"

//Error page design
class ErrorScreen extends Component {
  
  componentDidMount(){
    document.querySelector(".error-text button").addEventListener("click",()=>{
      navigate("/")
    })
  }

  render(){
    return(
        <div className="container" id="error-screen">
          <div className="error-text">
            <div>
              <h1>Uh oh!</h1>
              <span>404</span>
              <img src={lost_png} alt="looks like you are lost"/>
              <button>Go back to main page</button>
            </div>
            <div></div>
          </div>
          
          <div className="error_img">
            <div></div>
            <img src={error_logo} alt="Error 404" className="error-img-style"/>
          </div>
        </div>
    )
  }
}

export default ErrorScreen;

import React,{ useContext,useEffect,useReducer } from 'react'
import { Link } from 'gatsby'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import * as classess from './main_page_header.module.css'
import logo from './static/logo.png'
import logo_webp from './static/logo.webp'
import dropdownicon from'./static/dropdownarrow.png'
import {store} from "src/context/store"

const HeaderRecruitmentBot = () => {
  const [show,setShow] = React.useState(false)
 
 
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
});
  const globalState = useContext(store)
    const {dispatch} = globalState
 
    const OpenForm = (e) => {
      localStorage.setItem('apply_job_code', e.target.getAttribute('job_code'))
      
      dispatch({type:'OPEN_FORM'}) 
    }

const showMeeting=() =>{
     
  dispatch({type:'HANDLE_SUBMIT'}) 
   const head = document.querySelector('head');
   const script = document.createElement('script');
   script.setAttribute('src','https://assets.calendly.com/assets/external/widget.js');
   head.appendChild(script);
  
  
} 

 
  return <React.Fragment>

      {/* .........................Body Navbar................................................ */}
     
        <nav className={classess.bg_color + " navbar navbar-expand-lg navbar-light "}>
<a className="navbar-brand" href="#">
<picture>
          <source srcset={logo_webp} type="image/webp" />
          <source srcset={logo} type="image/png" />
          <Link to="/recruitment-bot"> <img srcset={logo_webp} alt="Botnostic Solutions" className={classess.logo_styling} /></Link> 
        </picture>
</a>
<button id ="collapse_navbar_btn" className="navbar-toggler" type="button" data-toggle="collapse"  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
  <span className="navbar-toggler-icon"></span>
</button>
<div
    
    className="navbar_holder"
  >
    <div className="navbar_main">
    <div className="collapse navbar-collapse" id="navbarNav"  >
    <ul className={classess.adjustspace_navbar + " navbar-nav mr-auto"} >
    <li className={classess.navbar_spacing + " nav-item active " }>
        <a className="nav-link" >
       <Link to="/recruitment-bot/#WhyRecruitmentBot">Why RecruitmentBot</Link> </a>
      </li>
      <li className={classess.navbar_spacing + " nav-item active " }>
    <Link to ="/recruitment-bot/announcements"><a className="nav-link" >
       Announcements</a></Link>    
      </li>
      <li className={classess.navbar_spacing1 + " nav-item active " } >
        <a className={classess.adjust_mobile_space +  " nav-link our_mission"} href="#ourMission"  onMouseEnter={()=>setShow(true) } onClick={()=>setShow(!show)} >Resources <span><img src={dropdownicon} style={{width:'30px',height:'auto'}}/></span></a>
        {
            show === true?
             <ul className={classess.list_styling} onMouseLeave={()=>setShow(false)}>
          <li>
               
            </li> <br/>
            <li>
          <a href="http://blogs.mycareerdreams.com/" className={classess.item_setting}>  Blogs</a>  
            </li> <br/>
           
        </ul>:null
        }
       
      </li>
      <li className={classess.navbar_spacing + " nav-item active " } >
        <a className="nav-link" onClick={OpenForm}>Login</a>
      </li>
      <li className={classess.navbar_spacing + " nav-item active " } onClick={showMeeting}>
        <a className="nav-link" > Demo</a>
      </li>
      <li className={classess.navbar_spacing4 + " nav-item active " } onClick={showMeeting}>
        <a className="nav-link">
               Contact sales </a>
      </li>
      <li className={classess.navbar_spacing3 + " nav-item active " } onClick={showMeeting}>
        <a className="nav-link">
               Contact sales </a>
      </li>
      </ul>  </div>
    </div>
</div>

</nav>
            
            {/* ..................................Body Navbar Ends Here............................. */}

  </React.Fragment>
}
export default HeaderRecruitmentBot
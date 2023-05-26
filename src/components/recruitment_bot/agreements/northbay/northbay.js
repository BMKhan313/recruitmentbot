import React,{ useContext} from 'react';
import * as classess from '../agreement_styling.module.css'
import MainPageHeader from '../../main_page/main_page_header/main_page_header'
import Footer from '../../announcements/footer/footer'
import northbay from './static/image.png'
import northbay_webp from './static/image.webp'
import close_button from '../../announcements/static/close.png'
import {store} from "src/context/store"
const Northbay =() => {
    const [showButton,SetShowButton] =React.useState(false)    
    
        const globalState = useContext(store)
        const {dispatch} = globalState
        const showMeeting=() =>{
            const head = document.querySelector('head');
             const script = document.createElement('script');
             script.setAttribute('src','https://assets.calendly.com/assets/external/widget.js');
             head.appendChild(script);
             dispatch({type:'HANDLE_SUBMIT'}) 
           
             setTimeout(function() {
               
                SetShowButton(true)
             } ,2000 );
            
            
         }  
         const showMeeting1=() =>{
            
            dispatch({type:'HANDLE_SUBMIT'}) 
           
            setTimeout(function() {
              
               SetShowButton(false)
            } ,100 );
           
           
        }
   return <React.Fragment>
   <MainPageHeader/>
       <div className={classess.main_div}>
        <div className={classess.subdiv}>
        <h1 className={classess.heading_one}>
        Agreement signing ceremony with NorthBay Solutions
            </h1>
        <center>
                <picture>
                    <source srcSet={northbay_webp} type="imgae/webp" />
                    <source srcSet={northbay} type="image/png" />
                    <img srcSet={northbay_webp} alt="Sub" loading="lazy" className={classess.main_image_styling} />
                </picture>
            </center>
            <div className={classess.content_styling}>
            We are proud to announce that Botnostic Solutions has formed a partnership with NorthBay Solutions - an incredibly fast-growing Amazon Web Services (AWS) Premier Partner with expertise in all that is digital. Under the arrangement, NorthBay will resell AI-driven solutions of Botnostic Solutions including Career Advisory Service, Recruitment Services, and Career Progression Planning Services. The new avenues which will unfold with this alliance are both exciting as well as promising, which is why we are thrilled to get the opportunity to work with such a reputed firm. Botnostic’s AI proficiency with NorthBay’s digital prowess has formed an invigorating combination!
             </div>
             {/* <div className={classess.content_styling}>
             RecruitmentBot offers and efficient, accurate and optimized recruitment experience to organisations by prescreening candidates for them, and reaching out to all candidates promptly with the final outcomes.
              </div>
             <div className={classess.content_styling}>
             Farouk Shaikh (ACA, ACCA), Co-Founder HarAik commented; “With this collaboration, our HR services offering is well complemented and we hope to address the issue of personality bias when screening candidates. Given the speed at which technology is disrupting the traditional processes, this collaboration comes at the right time for us"
             </div>
             <div className={classess.content_styling}>
             Ramsha Khuram CEO Botonostic Solutions commented "In the current day and age, clients want access to a wide range of services and with this collaboration, we can offer a wider suite of services. In addition, this collaboration will enable us to focus on some of our key international strategic markets".
             </div> */}
          
        </div>
       </div>
              {/* .......................................Calendly Code .......................      */}
              <div className={classess.req1}  >
    
    {	 
         globalState.state !== undefined ?

         globalState.state.meeting===true ? 
         <div id="schedule_form" className={classess.testing}>
             
             <div className={classess.abc + " calendly-inline-widget" } data-url="https://calendly.com/botnostic-solutions" style={{minWidth:'100%',height:'660px'}} />
             {
                 showButton===true ? <span className={classess.clendly_close} >
                 <img src={close_button} onClick={showMeeting1} id="close_button" loading="lazy"/>
             </span>  :null
             }
              
        </div> 
        :null
        :null
    }
   

<div className={classess.req} >
{
	globalState.state !== undefined ?
   globalState.state.meeting === true ?<div className={classess.close_meeting} onClick={showMeeting1}>
        Close
    </div>
    :
<div className={classess.request_a_meeting} onClick={showMeeting}>
             Request a meeting
    </div>
    :null
}

</div>
</div> 

 {/* .......................................Calendly Code Ends Here.......................      */}
   <Footer/>
   </React.Fragment>
}
export default Northbay;
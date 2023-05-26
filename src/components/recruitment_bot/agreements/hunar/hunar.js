import React,{ useContext} from 'react';
import * as classess from '../agreement_styling.module.css'
import MainPageHeader from '../../main_page/main_page_header/main_page_header'
import Footer from '../../announcements/footer/footer'
import hunar from './static/hunar.png'
import hunar_webp from './static/hunar.webp'
import close_button from '../../announcements/static/close.png'
import {store} from "src/context/store"
const AgreementHunar =() => {
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
        Agreement signing ceremony with The Hunar Foundation
            </h1>
        <center>
                <picture>
                    <source srcSet={hunar_webp} type="imgae/webp" />
                    <source srcSet={hunar} type="image/png" />
                    <img srcSet={hunar_webp} alt="Sub" loading="lazy" className={classess.main_image_styling} />
                </picture>
            </center>
            <div className={classess.content_styling}>
            We are excited to announce the partnership between The Hunar Foundation (THF) and Botnostic Solutions. The Hunar Foundation is an institution founded with the aim of equipping young adults with the vocational skills they need to survive and thrive in today’s competitive job market. With campuses all across the country, the foundation has given Botnostic Solutions the privilege of assisting them in their honorable aim.
             </div>
             <div className={classess.content_styling}>
             Mr. Aslam Khaliq, CEO of The Hunar Foundation (THF), stated: ’’Botnostic Solutions will help us guide and groom our students and will help open up employment opportunities for our students in the local market as well as in the middle east. It will help us identify and pick out the best candidates for different vocations.”
              </div>
             <div className={classess.content_styling}>
             Ramsha Khurram, CEO of Botnostic Solutions commented, ’’We are excited to be part of Hunar Foundation’s initiative to train and groom the youth of this country to be able to help them in finding employment. It is our endeavor to help and guide the youth towards careers more suited to their talent.”
             </div>
          
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
export default AgreementHunar;
import React,{ useContext} from 'react';
import * as classess from '../agreement_styling.module.css'
import MainPageHeader from '../../main_page/main_page_header/main_page_header'
import Footer from '../../announcements/footer/footer'
import analytics from './static/analytics.png'
import analytics_webp from './static/analytics.webp'
import close_button from '../../announcements/static/close.png'
import {store} from "src/context/store"
const AgreementAnalytics =() => {
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
        Agreement signing ceremony with Analytics
            </h1>
        <center>
                <picture>
                    <source srcSet={analytics_webp} type="imgae/webp" />
                    <source srcSet={analytics} type="image/png" />
                    <img srcSet={analytics_webp} alt="Sub" loading="lazy" className={classess.main_image_styling} />
                </picture>
            </center>
            <div className={classess.content_styling}>
            We are pleased to announce that analytics has signed up with Botnostic Solutions for its AI based recruitment service RecruitmentBot. An efficient solution for shortlisting candidates for different positions based on their relative compatibility. With a proven track record of successfully delivering high impact and complex projects, Analytics works with organizations around the globe to help explore and execute on ‘data’ opportunities, whether you want to shape products and services, improve customer experience, or are looking to optimize costs.
             </div>
             <div className={classess.content_styling}>
             Qazafi Qayyum, CEO Analytics; “Maintaining efficient hiring cycles can be increasingly difficult due to a variety of factors. With the integration of RecruitmentBot, I am confident that our recruitment process will be more transparent with reduced human bias, while maintaining high recruitment standards we expect from our HR.”
              </div>
             <div className={classess.content_styling}>
             RecruitmentBot enables organizations of varying sizes to have a seamless recruitment experience by helping them reach out to the right talent efficiently and effectively.
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
export default AgreementAnalytics;
import React,{ useContext } from 'react';
import * as classess from '../agreement_styling.module.css'
import MainPageHeader from '../../main_page/main_page_header/main_page_header'
import Footer from '../../announcements/footer/footer'
import daftarkhwan from './static/image.png'
import daftarkhwan_webp from './static/image.webp'
import close_button from '../../announcements/static/close.png'
import {store} from "src/context/store"
const AgreementDaftarkhwan =() => {
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
    Agreement signing ceremony with daftarkhwan
        </h1>
    <center>
            <picture>
                <source srcSet={daftarkhwan_webp} type="imgae/webp" />
                <source srcSet={daftarkhwan} type="image/png" />
                <img srcSet={daftarkhwan_webp} alt="Sub" loading="lazy" className={classess.main_image_styling} />
            </picture>
        </center>
        <div className={classess.content_styling}>
        We are excited to announce that daftarkhwan has signed up with RecruitmentBot, an AI-based service for efficient shortlisting of candidates based on their relative compatibility for different positions. daftarkhwan is one of the largest networks of co-working spaces in Pakistan that fosters a community of professionals and entrepreneurs pursuing diverse career paths. Our team at Botnostic Solutions is excited to help our customers get the right talent. 
         </div>
         <div className={classess.content_styling}>
         RecruitmentBot promises organizations the optimum recruitment experience by helping them shortlist candidates efficiently and reaching out to candidates promptly with the final outcomes. 
          </div>
         <div className={classess.content_styling}>
         Ahmad H., Co-Founder daftarkhwan commented; “Using RecruitmentBot has significantly reduced our hiring cycle, and helped us identify the right potential candidates for interviewing and selection. A particularly helpful feature was that it enabled us to also reach out to candidates not selected, to close the loop.
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
export default AgreementDaftarkhwan;








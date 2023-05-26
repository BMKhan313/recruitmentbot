import React from 'react'
import * as classess from './about_service.module.css'
import dummy from  './static/mobile_dummy.png'
import dummy_webp from  './static/mobile_dummy.webp'

const AboutServices = () =>{
    return<div className={classess.main_div}>
    <div className={`${classess.inline_div} ${classess.width_50}`}>
        <div className={classess.content}>
           <h1 className={classess.heading_text}>Find out which candidates are compatible for the job opening</h1>
           <div className={classess.lines}>
           Designed by career advisors and industry professionals, our recruitment bot interactively assesses the disposition of a candidate towards the career field they aim to pursue. This is done by asking the candidate a series of questions relating  to the career field and determining a career compatibility score. This score determines how well the candidates are suited towards a career- a perfect indicator for recruiters to shortlist who to interview during the recruitment process. Better yet, you can further assess certain capabilities of the shortlisted candidates through specific questions based on our data analytics.

          <br/>   <br/>   <br/>  
          Get access to data analytics of your candidate pool, filter out the ones who are a better match for the job and speed up your recruitment process.
           </div>
           <div className={classess.view_whitelisting}>
               <a href="https://mycareerdreams.com/recruitment_whitelisting/" className={classess.anchor_link_styling}>View Whitelisting</a>  
          </div>
       </div>
    </div>
    <div className={`${classess.inline_div} ${classess.width_30}`}>
                  <picture>
                    <source srcSet={dummy_webp} type="image/webp" />
                    <source srcSet={dummy} type="image/png" />
                    <img srcSet={dummy_webp} alt="" className={classess.img_styling}/>
                </picture>
            {/* <img src={dummy} alt="Dummy" className={classess.img_styling}/> */}
    </div>
    </div>
}
export default AboutServices
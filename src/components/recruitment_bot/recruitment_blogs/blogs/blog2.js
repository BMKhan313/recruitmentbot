import React from 'react'
import * as classess from '../static/blog2.module.css'
import HeaderRecruitmentBot from '../../main_page/main_page_header/main_page_header.js'
import main_image from '../static/images/main_img1.jpeg'
import image1 from '../static/images/img_1.jpeg'
import image2 from '../static/images/img_2.jpeg'
import image3 from '../static/images/img_3.jpeg'
import small_img from '../static/images/small_img.jpeg'

const Blog2 =() => {

  return <React.Fragment>
     <HeaderRecruitmentBot/>
      <div className={classess.main_div}>
          <div className={classess.sub_div}>
              <h5 className={classess.assistant_setting}>The Assistant</h5>   
              <h1 className={classess.main_heading}>A community to imagine the future of work.</h1>  
          </div>
 
          <div className={classess.heading_text_div}>
                 <div className=" container">
                     <div className=" row">
                         <div className=" col-lg-6">
                             <img src={main_image} className={classess.main_image_setting} alt="this is first image " />
                         </div>
                         <div className=" col-lg-6">
                         <div className={classess.all_recruiting}>
                                News
                            </div>
                            <h3 className={classess.heading_below_news}>Paradox Partners with Global Ambassadors to Deepen Pursuit of Exploring the Art and Science of Exceptional Teams</h3>
                            <h6 className={classess.date_setting }>March 6,2021</h6><img src={small_img} className={classess.small_img_setting}/>
                            <h6 className={classess.olivia}> By Olivia</h6>
                            
                         </div>
                         

                     </div>

                 </div>
          </div>

</div>
          <div className={classess.three_cols_area}>
            
                     <div className={classess.bg_setting  }>
                      <img src={image1} className={classess.image1_setting} />
                      <h4 className={classess.medium_heading}>What it's like working at one of Forbes' best startup employers</h4>
                      <h6 className={classess.date_setting }>March 6,2021</h6><p className={classess.all_recruiting2}>
                                Blog
                            </p>
                            <h6 className={classess.olivia}> By Olivia</h6>
                     </div>
                     <div className={classess.bg_setting }>
                     <img src={image2} className={classess.image1_setting} />
                      <h4 className={classess.medium_heading}>What it's like working at one of Forbes' best startup employers</h4>
                      <h6 className={classess.date_setting }>March 6,2021</h6><p className={classess.all_recruiting3}>
                                News
                            </p>
                            <h6 className={classess.olivia}> By Olivia</h6>

                     </div>
                     <div className={classess.bg_setting  }>
                     <img src={image3} className={classess.image1_setting} />
                      <h4 className={classess.medium_heading}>What it's like working at one of Forbes' best startup employers</h4>
                      <h6 className={classess.date_setting }>March 6,2021</h6><p className={classess.all_recruiting2}>
                                Blog
                            </p>
                            <h6 className={classess.olivia}> By Olivia</h6>
                     </div>

              
</div>

<div className={classess.three_cols_area2}>
            
            <div className={classess.bg_setting  }>
             <img src={image1} className={classess.image1_setting} />
             <h4 className={classess.medium_heading}>What it's like working at one of Forbes' best startup employers</h4>
             <h6 className={classess.date_setting }>March 6,2021</h6><p className={classess.all_recruiting2}>
                       Blog
                   </p>
                   <h6 className={classess.olivia}> By Olivia</h6>
            </div>
            <div className={classess.bg_setting }>
            <img src={image2} className={classess.image1_setting} />
             <h4 className={classess.medium_heading}>What it's like working at one of Forbes' best startup employers</h4>
             <h6 className={classess.date_setting }>March 6,2021</h6><p className={classess.all_recruiting3}>
                       News
                   </p>
                   <h6 className={classess.olivia}> By Olivia</h6>

            </div>
            <div className={classess.bg_setting  }>
            <img src={image3} className={classess.image1_setting} />
             <h4 className={classess.medium_heading}>What it's like working at one of Forbes' best startup employers</h4>
             <h6 className={classess.date_setting }>March 6,2021</h6><p className={classess.all_recruiting2}>
                       Blog
                   </p>
                   <h6 className={classess.olivia}> By Olivia</h6>
            </div>

     
</div>
         

    
  </React.Fragment>

}
export default Blog2
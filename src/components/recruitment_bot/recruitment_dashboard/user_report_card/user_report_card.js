import React from 'react'
import * as classess from './user_report_card.module.css'
import profile_pic from './static/profile_pic.jpg'
import line from './static/line.png'
import bars from './static/bars.png'
import jobCodesDescription from '../general_statistics/static/job_description'
import close from './static/close.png'
import { compatibilityDesigns } from "src/utils"
import { Link } from 'gatsby'

const UserReportCard = (props) => {
    // console.log(props)
    const [jobDescription, openJobDescripion] = React.useState(false)
    const [jobDescriptionContent, getJobDescriptionContent] = React.useState('')

    const getJobDescription = (e) => {
        let job_code = e.target.getAttribute('job_code');
        getJobDescriptionContent(jobCodesDescription['jobCode'][job_code]['description'])
        openJobDescripion(true)
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

    return <React.Fragment>
        <div className={classess.main_div}>
            <div className={classess.left_area}>
                {
                    jobDescription === true ? <>
                        <div className={classess.heading_description}>
                            <p>Job Description</p>
                        </div>
                        <div className={classess.jobDescriptionContent}>
                            {jobDescriptionContent}
                        </div>
                        <center>
                            {/* <p className={classess.closeDescriptionButton} onClick={() => openJobDescripion(false)}>Close</p> */}
                            <img src={close} alt="Close" className={classess.close_icon} onClick={() => openJobDescripion(false)}/>
                        </center>

                    </>
                        :
                        <>
                            <div className={classess.image_container}>
                                {props.user.img_url !== "" ? <img src={props.user.img_url} /> : <img src={profile_pic} />}

                            </div>
                            <div className={classess.name}>
                                <h4>{props.user.name} </h4>
                            </div>
                            <div className={classess.compatibilty_bars} title={props.user.compatibility_level}>
                                {compatibilityDesigns(props.user.aptitude[props.user.opt_field])}
                            </div>


                            <div className={classess.compatibiltiy_score}>
                                <img src={bars} className={classess.bar_setting} />
                                <span>  : {props.user.aptitude[props.user.opt_field]}% </span> <br />
                                <img src={line} className={classess.line_setting} />

                            </div>
                            {
                                props.user.portfolio_links.length !== 0?props.user.portfolio_links.map((links,index)=>{
                                    return <p>
                                              {/* <a href={links} className={classess.anchor_styling} target="_blank" key={index}>{links}</a>
                                             {alert(links)} */}
                                             {/* {console.log(links,":   URL Valid -",validURL(links))} */}
                                             {validURL(links)? <Link to={links} className={classess.anchor_styling} target="_blank">{links}</Link> 
                                             : <><a href={links} className={classess.anchor_styling} target="_blank" disabled key={index}>{links}</a> <span className={classess.inValid_url} >(Not Valid)</span></>
                                             }
                                              
                                        </p>
                                }):null
                            }
                            {
                                props.user.resume_exist === true ? <div>
                                    {props.resume_buttons}
                                </div> : null
                            }
                        </>
                }



                {/* <div className={classess.resume_button}>
                                Download All Resumes
                 </div>
                 <div className={classess.resume_button}>
                                Download Latest Resumes
                 </div> */}
            </div>
            <div className={classess.right_area}>
                <div className="container">
                    <div className=" row">
                        <div className=" col-lg-6">
                            <div className={classess.heading}>
                                <p>Basic Information</p>
                            </div>
                            <div className={classess.information_area}>
                                <p className={classess.info_right}>Age: {props.user.age}</p> <br />
                                <p className={classess.info_right}>Gender: {props.user.gender}</p> <br />
                                <p className={classess.info_right}>CNIC/SSN/Passport Number: {props.user.cninc_SSN_passport_no}</p> <br />
                                <p className={classess.info_right}>Contact No: { props.user.contact_no ? props.user.contact_no[0] !== '0' ? <>0{props.user.contact_no }</> : props.user.contact_no : " "}</p> <br />
                                <p className={classess.info_right}>Email: {props.user.email}</p> <br />
                                <p className={classess.info_right}>Country: {props.user.country}</p> <br />
                                <p className={classess.info_right}>State: {props.user.state}</p> <br />
                                <p className={classess.info_right}>City: {props.user.city}</p> <br />
                                <p className={classess.info_right}>Company: {props.user.company_code}</p> <br />

                            </div>
                            <div className={classess.heading}>
                                <p>Educational Information</p>
                            </div>
                            <div className={classess.information_area}>
                                <p className={classess.info_right}>Qualification: {props.user.educational_qualification}</p> <br />
                                {(props.user.additional_info &&  props.user.additional_info["university"] && props.user.additional_info["university"] !== "" ) ? <> <p className={classess.info_right}>University: {props.user.additional_info["university"]}, {props.user.additional_info["campus"]} </p> <br /> </> : null} 
                                {props.user.bachelors_degree !== "" ? <p className={classess.info_right}>Bachelors: {props.user.bachelors_degree} </p> : null} <br />
                                {props.user.masters_degree !== "" ? <p className={classess.info_right}>Masters: {props.user.masters_degree} </p> : null} <br />
                                {props.user.phd_degree !== "" ? <p className={classess.info_right}>PhD: {props.user.phd_degree} </p> : null} <br />
                                {/* <p className={classess.info_right}>University: UET, Peshawar</p> <br/> */}
{/* {console.log("University: ",props.user.additional_info["university"])} */}


                            </div>

                        </div>
                        <div className={classess.adjust_layout_print + " col-lg-6"}>

                            <div className={classess.heading}>
                                <p>Work Preferences</p>
                            </div>
                            <div className={classess.information_area}>
                                <p className={classess.info_right}>Preference: {props.user.work_preference}</p> <br />
                                {props.user.job_relocation !== ''?<><p className={classess.info_right}>Relocate: {props.user.job_relocation}</p><br /></>:null} 
                                <p className={classess.info_right}>Salary Expectations: {props.user.salary_expectations} </p> <br />
                                <p className={classess.info_right}>Job Type: {props.user.job_type}</p> <br />
                                <p className={classess.info_right}>Job Code: {props.user.job_code} <span className={classess.view_job_description} onClick={getJobDescription} job_code={props.user.job_code}>View Job Description</span></p> <br />


                            </div>
                            <div className={classess.heading}>
                                <p>Career Related Information</p>
                            </div>
                            <div className={classess.information_area}>
                                <p className={classess.info_right}>Chosen Field: {props.user.opt_field}</p> <br />
                                <p className={classess.info_right}>Compatibility: {props.user.aptitude[props.user.opt_field]}%</p> <br />
                                <p className={classess.info_right}>Level: {props.user.compatibility_level}</p> <br />
                                {props.user.additional_skills !== null ?<><p className={classess.info_right}>Skills Present: <ul className={classess.list_styling}>
                                    
                                    {props.user.additional_skills.split(",").map((skill_name,index)=>{
                                    return <li key={index}>
                                        {skill_name}
                                    </li> 
                                })}
                                </ul>
                                </p> <br /></> : null}
                                {
                                    props.user.options_chosen.length > 0?<>
                                        <p className={classess.info_right}>Options Chosen: <ul className={classess.list_styling}>
                                                    {
                                                        props.user.options_chosen.map((option,index)=>{
                                                            return <li key={index}>
                                                                {option}
                                                            </li>
                                                        })
                                                    }
                                        </ul>
                                        </p>
                                    </>
                                    : null
                                }
                                 {
                                    props.user.options_not_chosen.length > 0?<>
                                        <p className={classess.info_right}>Options Not Chosen: <ul className={classess.list_styling}>
                                                    {
                                                        props.user.options_not_chosen.map((option,index)=>{
                                                            return <li key={index}>
                                                                {option}
                                                            </li>
                                                        })
                                                    }
                                        </ul>
                                        </p>
                                    </>
                                    : null
                                }
                                <p className={classess.info_right}>Past Experience: {props.user.past_experience}</p> <br />
                                {props.user.past_experience === "Yes" & props.user.total_job_experience !== '' ?<><p className={classess.info_right}>Total Experience: {props.user.total_job_experience}</p> <br /> </> : null}
                                {props.user.past_experience === "Yes" & props.user.total_job_experience !== '' ?<><p className={classess.info_right}>Previous Companies: {props.user.previous_companies}</p> <br /> </> : null}
                                <p className={classess.info_right}>{props.user.current_salary !== ''?<>Current Salary: {props.user.current_salary} <br /></>:null}</p>
                                <p className={`${classess.info_right} ${classess.handle_selection}`}>Selection Status: {props.selection_status}</p> <br />


                            </div>
                            
                            {
                                props.employe_life_cycle !== ''?<>
                                <div className={classess.heading}>
                                     <p>Employee Status</p>
                                </div>
                                <div className={classess.information_area}>
                                    <table>
                                        <tr>
                                            <th>
                                                Status
                                            </th>
                                            <th>
                                                Updated At
                                            </th>
                                        </tr>
                                        {props.employe_life_cycle}
                                    </table>
                                </div>
                                </>
                                :
                                null
                            }
                            <div className={classess.close_button} onClick={props.close_report}>
                                Close
                           </div>
                           <div className={classess.close_button} onClick={()=>window.print()}>
                                Print
                           </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    </React.Fragment>
}
export default UserReportCard
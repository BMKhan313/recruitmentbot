
import React,{useState,useEffect} from 'react'
import Swal from "sweetalert2"
// import * as classes from "./resume.module.scss"
import { API_URL } from "src/constants.js"

import * as classes from "./resume.module.scss"
import resume from "./static/resume.png"
import globe from "./static/svg2.png"
import arrow from "./static/arrow1.png"
import portfolio from "./static/portfolio.png"
import loader from "./static/loader.gif"
import logo from "./static/logo.png"
import avatar from "./static/avatar.png"

function Resume({location}) {
    const [userData, setuserData] = useState(null)
    
    useEffect(() => {
        // console.log("Resume Page Mounted",location.state.jobCode)
        const jobCode = location.state.jobCode;
        const u_token = location.state.token;

        //REVIEW - resume-generation
        fetch(`${API_URL}/recruitment/resume-generation`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + u_token,
            },
          })
            .then(response => {
              return response.json()
            })
            .then(function(res) {
                // console.log("API Response",data[`${jobCode}`])
                    const {data} = res
                if (data[`${jobCode}`]){
                   
                    const temp = {
                        personal_info : data.personal_info,
                        others : data[`${jobCode}`]
                    }
                    setuserData(temp)
                }
                else{

                    // Check either chat is completed
                    Swal.fire({
                        icon: "info",
                        title: "Not Available",
                        text: "Please Complete chat First to generate Resume",
                      })
                      window.history.back()
                    //   return

                }
               
                // setuserData(temp)
            })


    }, [])



    // function onClickPrint() {
     
    //   };

    // useEffect(() => {
    //     AOS.init();
    // }, [])

    function BasicInformation(){
        // console.log("Personal Info: ",userData)
        const {age , gender } = userData.others;
        const { cnic_no, contact_no, email, country, state, city, company_code  } = userData.personal_info
        return(
        <div className={classes.basicInformation} >
            <div  className={classes.headerStrip}>
                <h4>Basic Information </h4>
            </div>
            <div  data-aos-duration={2500} className={classes.info} >
                <p>Age: &nbsp; {age}</p>
                <p>Gender: &nbsp; {gender} </p>
                <p>CNIC: &nbsp; {cnic_no}</p>
                <p>Contact No: &nbsp; {contact_no} </p>
                <p>Email: &nbsp; {email} </p>
                <p>Country: &nbsp; {country} </p>
                <p>State: &nbsp; {state} </p>
                <p>City: &nbsp; {city}  </p>
                <p>Company: &nbsp; {company_code} </p>
            </div>
        </div>
        )
    }

    function EducationalInfo(){
        return(
        <div className={classes.basicInformation} >
            <div className={classes.headerStrip}>
                <h4>Educational Information </h4>
            </div>
            <div className={classes.info} >
                <p>UCLA: &nbsp; &nbsp;&nbsp; &nbsp; MSc in Statistics &nbsp; &nbsp;&nbsp; &nbsp; 2012-2015 </p>
                <p>UET Lahore: &nbsp; &nbsp;&nbsp; &nbsp; Computer Science &nbsp; &nbsp;&nbsp; &nbsp; 2010-2012</p>
            
                
            </div>
        </div>
        )
    }

    function WorkPreference(){
        const { work_preference, job_relocation, job_type   } = userData.others;
        return(
        <div className={classes.basicInformation} >
            <div data-aos="fade-left" data-aos-duration={2500} className={classes.headerStrip}>
                <h4>Work Preference </h4>
            </div>
            <div className={classes.info} >
                <p>Preference: &nbsp; {work_preference} </p>
                <p>Relocate: &nbsp; {job_relocation} </p>
                <p>Job Type: &nbsp; {job_type} </p>
                
            </div>
        </div>
        )
    }
    
    function CareerRelatedInfo(){
         const { past_experience, career_experience  } = userData.others;
        return(
        <div className={classes.basicInformation} >
            <div data-aos="fade-left" data-aos-duration={2500}  className={classes.headerStrip}>
                <h4>Career Related Information </h4>
            </div>
            <div  className={classes.info} >
                <p>Past Experince: &nbsp; {past_experience} </p>
                {(past_experience!="No") ?   <p>Total Experince &nbsp; {userData.others.total_job_experience} Years </p> : null }
                {(past_experience!="No") ?   <p>Previous Companies: &nbsp; {userData.others.previous_companies} </p> : null }
                
            </div>
        </div>
        )
    }
    
    if(!userData){
        // console.log("No data")
        return(
            <div className={classes.LoadingConatiner} >
                {/* <h1>Loading..</h1> */}
                <img src={loader} alt="Loading.."   />
            </div>
        )
    }

    return (
        <div className={classes.backContainer}>

            {/* Header */}
            <div className={classes.header} >
                <img src={logo} alt="Recruitment Bot"   />
                {/* <h3>Resume Builder</h3> */}
                <p onClick={() => window.history.back()} >Back</p>
            </div>

            {/* <h1>Resume</h1> */}
            <div className={classes.resumeContainer} >
                <div className={classes.sidebar}>
                    <div className={classes.imgContainer} >
                    {/* <img src="https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg" alt="Girl in a jacket"  /> */}
                   {(userData.personal_info.profile_picture) ? <img src={userData.personal_info.profile_picture} alt="Person" /> : 
                   <img src={avatar} alt="Profile Pic"  /> }
                    </div>
                    <div  className={classes.sidebarContent}>
                    <h4>Machine Learning</h4>
                    <div className={classes.myProgress}>
                        <div className={classes.myBar}>70%</div>
                    </div>
                    <h4>Problem Solving</h4>
                    <div className={classes.myProgress}>
                        <div className={classes.myBar}>90%</div>
                    </div>
                    <h4>Data Visualisation</h4>
                    <div className={classes.myProgress}>
                        <div className={classes.myBar}>60%</div>
                    </div>
                    </div>
                </div>
                <div  className={classes.content}>
                    <div className={classes.introDiv} >
                            <h1>{userData.others.name}</h1>
                            <h2>{userData.others.job_name}</h2>
                    </div>
                
                {BasicInformation()}
                {EducationalInfo()}
                {WorkPreference()}
                {CareerRelatedInfo()}
                   
                </div>
            </div>

            <div 
             onClick={() => window.print()} 
            // onClick={() =>onClickPrint()}
            className={classes.printBtn} >
                <p>Print Resume</p>
            </div>
            {/* <img src={resume} className="resume" alt="resume" /> */}
            
            {/* <img src={arrow} className={classes.arrow} alt="globe" />
            <div className="animate__animated animate__bounce animate__infinite animate__slower" >
          
            <img src={globe} className={classes.globe} alt="globe" />
            </div> */}
          
            {/* <img src={portfolio} className="portfolio" alt="portfolio" /> */}
        </div>
    )
}


export default Resume

import React, { useEffect,useContext } from 'react'
import * as classess from './job_code_prompt.module.css'
// import { API_URL } from 'src/constants'
import {store} from "src/context/store";
import Swal from 'sweetalert2';
import { navigate,Link } from "gatsby";
import { clog } from '../../../../utils';
const JobPrompt = (props) =>{
    const globalState = useContext(store);
    const { dispatch } = globalState
    const [jobCodeDropDown,setJobCodeDropDown] = React.useState('')
    const [jobCode,setJobCode] = React.useState('')
    const [allAppliedPrompt,showAllAppliedPrompt] = React.useState(null)
    let token_value

    let REC_URL  = props.REC_URL 
    useEffect(()=>{
         //Get Company Code For Prompt
         const temp = []
        //  console.log(props)
         token_value = props.token
         let applied_job_name = globalState.state.previousJobApplied
         var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 
            
            if(mm<10) 
            {
                mm='0'+mm;
            } 
            today = yyyy+'-'+mm+'-'+dd;
            //REVIEW - Message
         fetch(`${REC_URL}/recruitment/company-job-code`,{
            method:'GET',
            headers:{
                'Accept':'Application/json',
                'Content-Type':'Application/json',
                'Authorization':"Bearer" + token_value
            }
        }).then(response=>{
                return response.json()
        }).then((res)=>{
            const {data} = res
            if(data["message"]==="Unauthenticated."){
                Swal.fire({
                    icon:'error',
                    text:'Session Expire.'
                })
                navigate('/recruitment-bot/sign-up/')
            }
            else{
                const job_codes = data
                job_codes.map((job_info,index)=>{
                        if(applied_job_name.includes(job_info['job_code']) === false & job_info['expiry_date'].split(" ")[0]>today ){
                         
                                // console.log(job_info['expiry_date'].split(" ")[0])
                                return temp.push(<React.Fragment key={index}>
                                    <option value={job_info['job_code']}>
                                        {job_info['job_code']} {job_info['job_name']}
                                    </option>
                            </React.Fragment>)
                        
                          
                                
                      
                        }
               
                
                })
                if(temp.length === 0){
                    showAllAppliedPrompt(true)
                }
                else{
                    showAllAppliedPrompt(false)
                }
                setJobCodeDropDown(temp)
            }
        
        })
    },[token_value])
    const getJobCode = (e)  =>{
        setJobCode(e.target.value)
    }
    const submitJobCode = (e) =>{
        if(jobCode ===''){
            alert('Please Select Job Code to continue')
            // Swal.fire({
            //     icon:'error',
            //     text:"Please Select Job Code to continue"
            // })
        }
        else{
            //ANCHOR - Refactored- apply-for-job
            fetch(`${REC_URL}/recruitment/apply-for-job`,{
                method:'POST',
                headers:{
                    'Accept':'Application/json',
                    'Content-Type':'Application/json',
                    'Authorization':'Bearer' + props.token
                },
                body:JSON.stringify({
                    user_chat_id:props.chat_id,
                    job_code:jobCode
                })
            }).then(response=>{
                return response.json()
            }).then((res)=>{
                const {data} = res
                if(res.success){
                    document.getElementById('chatbot_wrapper').style.zIndex = 0
                    Swal.fire({
                        icon:'success',
                        text:data.message
                    })
                    sessionStorage.setItem('career_name',data["career name"])
                    dispatch({type:'HIDE_JOBCODE_PROMPT'})
                    
                }
                else{
                    Swal.fire({
                        icon:'error',
                        text:data.message
                    })
                }
            })
        }
            
            
    }
    const logOut = () =>{
        // dispatch({
        //     type:'SET_PREVIOUS_JOB_APPLIED',
        //     previousJobApplied:null

        // })
        dispatch({type:'HIDE_JOBCODE_PROMPT'})
        token_value = ''
        // navigate('/recruitment-bot/sign-up/',{
        //     token:props.token
        // })
        // red_url={sessionStorage.getItem("red_url")}
           navigate(`${props.red_url}`,{
            token:props.token
        })
        // window.location.reload()
       

    }
    return<div className={classess.main_div}>
                <div className={classess.job_code_prompt}>
                            <div className={classess.job_code_heading}>
                                Job Code
                            </div>
                            <div className={classess.drop_down_div}>
                                <select className={classess.select_styling} value={jobCode} onChange={getJobCode} required>
                                        <option value="">
                                          {allAppliedPrompt === true?'No new job openings available ' : allAppliedPrompt === false?'Select Job Code':'Loading'}  
                                          {/* Select Job code */}
                                        </option>
                                        {jobCodeDropDown}
                                </select>
                            </div>
                            <center>
                                {
                                    allAppliedPrompt === true?<div className={classess.submit_job_code} onClick={logOut}>
                                      {/* <Link to="/recruitment-bot/sign-up/">LogOut</Link> */}
                                      LogOut
                                </div>
                                :
                                allAppliedPrompt === false?
                                <div className={classess.submit_job_code} onClick={submitJobCode}>
                                    Submit
                                </div>
                                :
                                null
                                }
                                {/* <div className={classess.submit_job_code} onClick={submitJobCode}>
                                    Submit
                                </div> */}
                            </center>
                            
                        </div>
                 </div>  
            
}
export default JobPrompt
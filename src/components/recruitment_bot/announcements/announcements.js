import React, { useContext, useEffect } from 'react';
import * as classess from './announcements.module.css'

import MainPageHeader from '../main_page/main_page_header/main_page_header'

import Footer from '../footer/footer'
import close_button from './static/close.png'
import { store } from "src/context/store"
import Recruitment_Form from '../../recruitment_bot/RecruitmentForm/form'
import AllAnouncements from './all_annoucements';
import {Link} from 'gatsby'
const Announcements = () => {
    const [showButton, SetShowButton] = React.useState(false)
    const [announcements,getAnnouncements] = React.useState('')
    const [wait,setWait] = React.useState(true)

    const globalState = useContext(store)
    const { dispatch } = globalState
    useEffect(()=>{
        let temp = []
        Object.keys(AllAnouncements).map((announcement_name,index)=>{
            return temp.push(<div className={classess.inline_div} key={index}>
                <div className={classess.img_div}>
                    <picture>
                        <source srcSet={AllAnouncements[announcement_name]['webp_image']} type="image/webp"/>
                        <source srcset={AllAnouncements[announcement_name]['default_image']} type="image/png"/>
                        <img srcSet={AllAnouncements[announcement_name]['webp_image']} alt={announcement_name} loading="lazy" className={classess.img_sizing}/>
                    </picture>
                </div>
                <div className={classess.info_div}>
                    <div className={classess.date}>
                        {AllAnouncements[announcement_name]['signing_date']}
                    </div>
                    <div className={classess.navigate_to_detail}>
                        <Link to = {AllAnouncements[announcement_name]['page_path']} className={classess.link_styling}>
                            Partnership
                        </Link>
                    </div>
                    <div className={classess.announcement_heading}>
                        {announcement_name}
                    </div>
                    <Link to = {AllAnouncements[announcement_name]['page_path']} className="link_styling">
                        <div className={classess.learn_more_button}>
                            Learn More
                        </div>
                    </Link>
                </div>
            </div>)
        })
        getAnnouncements(temp)
        setWait(false)
    },[])
    const showMeeting = () => {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head.appendChild(script);
        dispatch({ type: 'HANDLE_SUBMIT' })

        setTimeout(function () {

            SetShowButton(true)
        }, 2000);


    }
    const showMeeting1 = () => {

        dispatch({ type: 'HANDLE_SUBMIT' })

        setTimeout(function () {

            SetShowButton(false)
        }, 100);


    }
    return <React.Fragment>
        {
            wait===false?<>
                    <MainPageHeader />
        <div className={classess.main_div}>
            <div className={classess.heading_setting}>Announcements</div>
            {announcements}

        </div>

        {/* .......................................Calendly Code .......................      */}
        <div className={classess.req1}  >

            {
                globalState.state !== undefined ?

                    globalState.state.meeting === true ?
                        <div id="schedule_form" className={classess.testing}>

                            <div className={classess.abc + " calendly-inline-widget"} data-url="https://calendly.com/botnostic-solutions" style={{ minWidth: '100%', height: '660px' }} />
                            {
                                showButton === true ? <span className={classess.clendly_close} >
                                    <img src={close_button} onClick={showMeeting1} id="close_button" loading="lazy" />
                                </span> : null
                            }

                        </div>
                        : null
                    : null
            }


            <div className={classess.req} >
                {
                    globalState.state !== undefined ?
                        globalState.state.meeting === true ? <div className={classess.close_meeting} onClick={showMeeting1}>
                            Close
                        </div>
                            :
                            <div className={classess.request_a_meeting} onClick={showMeeting}>
                                Request a meeting
                            </div>
                        : null
                }

            </div>
        </div>
        {globalState.state !== undefined ?
            globalState.state.openform === true ?
                <Recruitment_Form />

                : null : null}

        {/* .......................................Calendly Code Ends Here.......................      */}
        <Footer />
            </>
            :null
        }

    </React.Fragment>
}
export default Announcements;
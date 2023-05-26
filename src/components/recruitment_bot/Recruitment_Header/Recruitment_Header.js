import React, { useContext } from 'react';
import * as cs from "./Recruitment_Header.module.css"
import { Link } from 'gatsby'
import {store} from "src/context/store"

import logo from './static/logo.png'
import logo_webp from './static/logo.webp'
import { parentPath } from '../../../constants';

const Recruitment_Header = () => {

    const [show, setShow] = React.useState(false)
    const [meeting, SetMeeting] = React.useState([])
    const reducer = (prevState, updatedProperty) => ({
        ...prevState,
        ...updatedProperty,
    });
    const globalState = useContext(store)
    const { dispatch } = globalState


    const OpenForm = (e) => {
        localStorage.setItem('apply_job_code', e.target.getAttribute('job_code'))
        // sessionStorage.setItem('career_name',e.target.getAttribute('career_name'))
        dispatch({ type: 'OPEN_FORM' })

    }
    const showMeeting = () => {

        dispatch({ type: 'HANDLE_SUBMIT' })
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
        head.appendChild(script);
    } 

    return (
        <>
            <header className={cs.Rec_header} >
                <div className={cs.container}>
                    <input type="checkbox" className={cs.chk} name="" id="check" />

                    {/* <div className={cs.logo_container}>
                        <h3 className={cs.logo}>Recruitment<span>Bot</span></h3>
                    </div> */}
                    <div className={cs.logo_container}>
                    <picture>
                        <source srcSet={logo_webp} type="image/webp" />
                        <source srcSet={logo} type="image/png" />
                        <Link to="/recruitment-bot"> <img srcSet={logo_webp} alt="Botnostic Solutions" className={cs.logo_styling} /></Link>
                    </picture>
                    </div>

                    <div className={cs.nav_btn}>
                        <div className={cs.nav_links}>
                            <ul className={cs.nav_list}>


                                <li className={cs.nav_link} >
                                   <Link to="/recruitment-bot/apply-for-job"> Apply Now</Link> 
                                </li>
                                <li className={cs.nav_link} >
                                    <a onClick={showMeeting} >Contact Sales</a>
                                </li>

                                <li className={cs.nav_link} >
                                    <a >Resources</a>
                                    <div className={cs.dropdown}>
                                        <ul className={cs.nav_list} >
                                            <li className={cs.dropdown_link}>
                                                <Link to ="/recruitment-bot/announcements" > <a> Announcements </a></Link>
                                            </li>
                                            <li className={cs.dropdown_link}>
                                                <a href="http://blogs.mycareerdreams.com/">Blogs</a>
                                            </li>

                                            <div className={cs.arrow}></div>
                                        </ul>
                                    </div>
                                </li>
                                <li className={cs.nav_link} >
                                    <Link className={cs.nav_item} to ="/recruitment-bot/why-recruitment-bot">Why Recruitment<br/>Bot</Link> 


                                </li>
                                <li className={cs.nav_link} >
                                    <Link to={`https://mycareer.${parentPath}/`} >Career Progression <br/> Services</Link>


                                </li>

                            </ul>
                        </div>

                        <div className={cs.log_sign} >
                            <a  onClick={OpenForm} className={cs.btn_transparent}>Login</a>
                            <div onClick={showMeeting} className={cs.btn_solid}>Book a Demo</div>
                        </div>
                    </div>

                    <div className={cs.hamburger_menu_container}>
                        <div className={cs.hamburger_menu}>
                            <div></div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <main>
                <section>
                    <div className={cs.overlay}></div>
                </section>
            </main> */}
        </>
    );
};


export default Recruitment_Header;

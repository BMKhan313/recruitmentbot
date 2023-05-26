import React from "react"

import Layout from '../../components/recruitment_bot/layout'
import Component from '../../components/recruitment_bot/chatbot/chatbot';
import SEO from "../../components/gatsby/seo.js";
export default ({location}) => (
    <Layout>
        <SEO title="RecruitmentBot - Career Compatibility Assessment | Botnostic Solutions" 
        description="RecruitmentBot, designed by industry professionals, uses state-of-the-art technology to prescreen candidates that apply for a job. Learn more!"
        url="/recruitment/chat"
        image="https://mycareerdreams.com/blogs/botnostic_background.jpg"
        /> 
        <Component location={location}/>
    </Layout>
)

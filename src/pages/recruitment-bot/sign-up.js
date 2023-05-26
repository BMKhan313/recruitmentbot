import React from "react";


import Layout from '../../components/recruitment_bot/layout'
import Component from '../../components/recruitment_bot/index/index'
import SEO from "../../components/gatsby/seo.js";

// import SEO from "../components/gatsby/seo.js";
// import seo_icon from "src/images/fbpreview.png";

export default () => (
    <Layout>
         <SEO title="RecruitmentBot - Career Compatibility Assessment | Botnostic Solutions" 
        description="RecruitmentBot, designed by industry professionals, uses state-of-the-art technology to prescreen candidates that apply for a job. Learn more!"
        url="/recruitment-bot/sign-up/"
        image="https://mycareerdreams.com/blogs/botnostic_background.jpg"
        /> 
        <Component/>
    </Layout>
)

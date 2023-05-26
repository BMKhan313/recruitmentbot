import React from "react";


import Layout from '../components/recruitment_bot/layout'
import RecruitmentIndex from '../components/recruitment_bot/main_page/index'
import SEO from "../components/gatsby/seo.js";



// import SEO from "../components/gatsby/seo.js";
// import seo_icon from "src/images/fbpreview.png";

export default () => (

    <Layout>
        <SEO title="RecruitmentBot | Botnostic Solutions" 
        description="Designed by career advisors and industry professionals, our RecruitmentBot interactively assesses the disposition of a candidate towards the career field they aim to pursue"
        url="/"
        image="https://mycareerdreams.com/blogs/botnostic_background.jpg"
        /> 
        <RecruitmentIndex/>
    </Layout>
)

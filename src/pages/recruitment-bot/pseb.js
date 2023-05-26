import React from "react";
import Pseb from "../../components/recruitment_bot/pseb";


import Layout from '../../components/recruitment_bot/layout'
// import UserChats from '../../components/recruitment_bot/user_chats/user_chats.js'
// import SEO from "../../components/gatsby/seo.js";



// import SEO from "../components/gatsby/seo.js";
// import seo_icon from "src/images/fbpreview.png";

export default ({ children, location }) => (
    <Layout>
        {/* <SEO title="RecruitmentBot - Career Compatibility Assessment | Botnostic Solutions" 
        description="RecruitmentBot, designed by industry professionals, uses state-of-the-art technology to prescreen candidates that apply for a job. Learn more!"
        url="/recruitment-bot/"
        image="https://mycareerdreams.com/blogs/botnostic_background.jpg"
        />  */}
        <Pseb location={location} />
       
    </Layout>
)

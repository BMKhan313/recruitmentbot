import React from "react"
import Comp from "../../components/recruitment_bot/forgot_password/forgot_password"
import SEO from "../../components/gatsby/seo.js"
import seo_icon from "src/images/fbpreview.png"

// import { Location } from '@reach/router';

const Layout = ({ children, location }) => {
  // console.log(location)
  return (
    <React.Fragment>
      <SEO
        title="Recover Password"
        description="Recruitment Bot | Recover"
        url="/recover"
        image={seo_icon}
      />
      <Comp location={location} />
    </React.Fragment>
  )
}

export default Layout

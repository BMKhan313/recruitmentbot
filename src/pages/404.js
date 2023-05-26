import React from "react"

// import Layout from "../components/layout"
import SEO from "src/components/gatsby/seo"
import ErrorScreen from "src/components/error_screen/error_screen.js";

const NotFoundPage = () => (
  <React.Fragment>
    <SEO title="404: Not found"
      url="/404"
      description="Looks like you are lost!"
    />
    <ErrorScreen/>
  </React.Fragment>
)

export default NotFoundPage

// /**
//  * Layout component that queries for data
//  * with Gatsby's useStaticQuery component
//  *
//  * See: https://www.gatsbyjs.org/docs/use-static-query/
//  */

// import React from "react"
// // import {connect} from "react-redux"
// import PropTypes from "prop-types"
// // import { useStaticQuery, graphql } from "gatsby"
// // import {Provider} from "react-redux"
// // import store from "../store"

// // import favicon from '../images/favicon.ico'
// // import Helmet from 'react-helmet'

// // Helmet>
// //       <link rel="icon" href={favicon} />
// //     </Helmet>

// // import Header from "./header"
// // import "./layout.css"

// const Layout = ({ children }) => {
//   // const data = useStaticQuery(graphql`
//   //   query SiteTitleQuery {
//   //     site {
//   //       siteMetadata {
//   //         title
//   //       }
//   //     }
//   //   }
//   // `)

//   return (
    
//     <>
    
//       {/* <Header siteTitle={data.site.siteMetadata.title} />
//       <div
//         style={{
//           margin: `0 auto`,
//           maxWidth: 960,
//           padding: `0px 1.0875rem 1.45rem`,
//           paddingTop: 0,
//         }}
//       > */}
//         {/* <main> */}
//           {children}
//           {/* </main> */}
//         {/* <footer>
//           © {new Date().getFullYear()}, Built with
//           {` `}
//           <a href="https://www.gatsbyjs.org">Gatsby</a>
//         </footer>
//       </div> */}
//     </>
//   )
// }

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

// export default Layout


import React from "react";
// import 'bootstrap/dist/css/bootstrap.css';
export default ({ children }) => (
  <>
    {children}
  </>
)

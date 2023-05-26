import React from "react"
export default ({ children }) => (
  <React.Fragment>
    {/* style={{margin:'3rem auto',maxWidth:650,padding:'0 1rem'}} > */}
    {/* <div className="wrapper"> */}
    <div className="form-setting">{children}</div>

    {/* <span className="padding-div"></span> */}
    {/* <footer>
            <span>
            {`© ${new Date().getFullYear()} Botnostic Solutions (PVT) Ltd, All Rights Reserved`}
            </span>
        </footer> */}
    {/* </div> */}
  </React.Fragment>
)

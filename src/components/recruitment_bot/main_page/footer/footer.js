import React from "react"
import * as classess from "./footer.module.css"

const Footer = () => {
  return (
    <div className={classess.main_div}>
      {`© ${new Date().getFullYear()} Botnostic Solutions (PVT) Ltd, All Rights Reserved`}
    </div>
  )
}
export default Footer

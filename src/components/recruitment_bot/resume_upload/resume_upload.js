import React from "react"
import * as classess from "./resume_upload.module.css"

const ResumeUpload = ({ setResumeData }) => {
  const resumeHandler = () => {
    let file = document.getElementById("cv_upload").value
    let formData = null
    if (file !== "") {
      const fileInput = document.querySelector("input[name='cv_upload']")
      formData = new FormData()
      formData.append("file", fileInput.files[0])
    }
    setResumeData(file, formData)
  }
  return (
    <div className={classess.inline_input}>
      <label className={classess.label_styling}>Resume/CV:</label>
      <input
        type="file"
        name="cv_upload"
        id="cv_upload"
        className={classess.resume_input_setting}
        onChange={resumeHandler}
        accept=".pdf,.doc, .docx , .txt"
      />
    </div>
  )
}
export default ResumeUpload

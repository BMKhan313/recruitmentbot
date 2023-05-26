import React, { useEffect } from "react"
import loadable from "@loadable/component"
import "src/components/App.css"
import Recruitment_Header from "../Recruitment_Header/Recruitment_Header"

// import HeaderRecruitmentBot from "./main_page_header/main_page_header"
// import RecruitmentCarousel from "./recruitment_carousel/recruitment_carousel"
// import RecruitmentBody from "./body_items/recruitment_bot_body"
// import Scroll from "./scroll/scroll"

const HeaderRecruitmentBot = loadable(
  () => import("./main_page_header/main_page_header"),
  { fallback: <div>loading...</div> }
)
const RecruitmentCarousel = loadable(() =>
  import("./recruitment_carousel/recruitment_carousel")
)
const RecruitmentBody = loadable(() =>
  import("./body_items/recruitment_bot_body")
)
const Scroll = loadable(() => import("./scroll/scroll"))
const RecruitmentIndex = () => {
  // useEffect(()=>{
  //    document.querySelector(`link[rel="icon"]`).href='src/images/cross.png'
  //    console.log(document.querySelector(`link[rel="icon"]`).href)
  // },[])
  return (
    <React.Fragment>
      <Scroll showBelow={250} />
      {/* <HeaderRecruitmentBot /> */}
      <Recruitment_Header />
      <RecruitmentCarousel />
      <RecruitmentBody />
    </React.Fragment>
  )
}
export default RecruitmentIndex

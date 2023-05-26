import React, { useEffect } from "react"
import * as classess from "./footer.module.css"
import logo from "./static/logo.png"
import logo_webp from "./static/logo.webp"
import { Link } from "gatsby"

const Footer = () => {
  const config = {
    root: null,
    rootMargin: "0px 0px 50px 0px",
    threshold: [0, 0.8, 0.7, 0.9],
  }
  const preloadImage = elem => {
    let src = elem.getAttribute("data-srcSet")

    if (elem.tagName === "SOURCE") {
      elem.removeAttribute("data-srcSet")
      if (src !== null) {
        elem.setAttribute("srcSet", src)
      }
    }
    // else if(elem.getAttribute("data-check")){
    //   elem.removeAttribute("data-srcset");
    //   elem.setAttribute("src",r);
    // }
    else if (elem.tagName === "IMG") {
      // get first srcset elem
      if (elem.parentNode.children[0].getAttribute("srcSet") === null) {
        if (src !== null) {
          elem.parentNode.children[0].removeAttribute("data-srcSet")
          elem.parentNode.children[0].setAttribute("srcSet", src)
        }
      }
      // get second srcset elem
      if (elem.parentNode.children[1].getAttribute("srcSet") === null) {
        if (src !== null) {
          elem.parentNode.children[1].removeAttribute("data-srcSet")
          elem.parentNode.children[1].setAttribute("srcSet", src)
        }
      }
    } else {
      if (window.document.documentMode !== undefined) {
        elem.setAttribute("src", src)
      }
    }
  }
  useEffect(() => {
    let observer = new IntersectionObserver(function(entries, self) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.75) {
          preloadImage(entry.target)

          self.unobserve(entry.target)
        }
      })
    }, config)

    const imgs = document.querySelectorAll("[data-srcSet]")
    imgs.forEach(img => {
      observer.observe(img)
    })
  }, [])
  return (
    <div className={classess.footer}>
      <div className={classess.logo_styling}>
        <picture>
          <source data-srcSet={logo_webp} type="image/webp" />
          <source data-srcSet={logo} type="image/png" />
          <Link to="/recruitment-bot">
            {" "}
            <img
              srcset={logo_webp}
              alt="Botnostic Solutions"
              className={classess.logo_styling}
            />
          </Link>
        </picture>
      </div>
      <div className={classess.footer_space}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h5>Contact Us:</h5>
              <p>+92302-8557775</p>
            </div>
            <div className="col-lg-4">
              <h5> Address:</h5>
              <p>Plot 94, 7 street, I 10/3, 44800, Islamabad, Pakistan</p>
            </div>
            <div className="col-lg-4">
              {/* <h5 className={classess.email_setting}>Email Us:</h5> */}
              <div className={classess.email_button}>
                {" "}
                <a href="mailto:info@mycareerdreams.com">Email Us</a>
              </div>
            </div>
          </div>
        </div>

        <div className={classess.last_line}>
          <p>{`© ${new Date().getFullYear()} Botnostic Solutions (PVT) Ltd, All Rights Reserved`}</p>
        </div>
      </div>
    </div>
  )
}
export default Footer

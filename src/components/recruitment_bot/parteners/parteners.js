import React from "react"

import logo1 from "./static/daftarkhwan.webp"
import logo2 from "./static/har_aik.webp"
import logo3 from "./static/hunar.webp"
import logo4 from "./static/analytics.webp"
import logo5 from "./static/master_trainers.webp"

import logo1_png from "./static/daftarkhwan.png"
import logo2_png from "./static/har_aik.png"
import logo3_png from "./static/hunar.png"
import logo4_png from "./static/analytics.png"
import logo5_png from "./static/master_trainers.png"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import * as classes from "./parteners.module.css"
import "./parteners.css"
const logos = [
  {
    webpLogo: logo1,
    pngLogo: logo1_png,
    alt: "DAFTARKHWAN",
    small: false,
  },

  {
    webpLogo: logo2,
    pngLogo: logo2_png,
    alt: "HAR AIK",
    small: false,
  },
  {
    webpLogo: logo3,
    pngLogo: logo3_png,
    alt: "HUNAR",
    small: false,
  },
  {
    webpLogo: logo4,
    pngLogo: logo4_png,
    alt: "ANALYTICS",
    small: false,
  },
  {
    webpLogo: logo5,
    pngLogo: logo5_png,
    alt: "MASTER TRAINERS",
    small: true,
  },
]

//Logos of our parteners
const Parteners = () => {
  var settings = {
    infinite: true,
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variablewidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 478,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className={classes.parteners_main_div}>
      <h1 className={classes.partener_heading}>Our Partners</h1>
      <div className={classes.logos_div}>
        <Slider {...settings} className={classes.slick_slider}>
          {logos.map((logo, index) => (
            <picture key={index}>
              <source srcSet={logo.webpLogo} type="image/webp" />
              <source srcSet={logo.pngLogo} type="image/png" />
              <img
                srcSet={logo.webpLogo}
                className={logo.small ? classes.logo_sm : classes.logo}
                alt={logo.alt}
              />
            </picture>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Parteners

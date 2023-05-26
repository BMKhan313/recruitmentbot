/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import './node_modules/bootstrap/dist/css/bootstrap.css';
// import 'typeface-montserrat'
// import 'typeface-oxygen'
// import 'typeface-prompt'
// import 'typeface-amiri'

import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.min'

// import 'src/fonts.css';



// import 'core-js/modules/es6.set';
// import { polyfill } from "es6-promise";

import React from "react"
import { StateProvider } from "./src/context/store"


export const onClientEntry = async () => {
  // if (typeof window !== 'undefined' && window.Proxy === undefined) {
    // window.location.replace('/not_supported.html') // this presumes you set up an ie.html 
  // }

  // await import('typeface-montserrat')
  // await import('typeface-oxygen')
  // await import('typeface-prompt')
  // await import('typeface-amiri')
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
    // await import("./src/ie11CustomProperties")
  }
}
export const wrapRootElement = ({ element }) => (
  <StateProvider>{element}</StateProvider>
)

// export const onInitialClientRender = async () => {
//   await import('bootstrap/dist/css/bootstrap.css');
// }

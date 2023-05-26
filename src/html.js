import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no,user-scalable=0, minimal-ui=1"
        ></meta>
        <meta name="theme-color" content="#000000"></meta>

        <meta property="fb:app_id" content="1649178008744807"></meta>

        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <meta name="robots" content="index, follow"></meta>
        <meta name="language" content="English"></meta>

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          as="style"
          crossOrigin="anonymous"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        ></link>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />

        <div id="no_support" />
        <script
          key={`no_support`}
          dangerouslySetInnerHTML={{
            __html: `
              if(typeof window !== 'undefined' && typeof window.Proxy === 'undefined' ){
                let r = "<h1>This Browser is Not Supported</h1><p>Please Download a Modern Browser</p><a href='https://www.google.com/chrome/'>Download Google Chrome</a>"
                document.querySelector("body").innerHTML = r
              }
          `,
          }}
        />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T9TKJHM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {props.postBodyComponents}
        
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
        <script>AOS.init();</script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

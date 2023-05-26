require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `My Career Dreams`,
    description: `A Career Counselling Chatbot`,
    author: `@Botnostic_Solutions`,
    siteUrl: `https://mycareerdreams.com`,
  },

  plugins: [
    // `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Oxygen`,
    //         variants: [`400`, `700`]
    //       }
    //     ],
    //   },
    // }
    // ,
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        exclude: [`/404`, `404.html`, `/admin`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-root-import`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
        displayName: true,
        fileName: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },

    //`gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://mycareerdreams.com`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        // bucketName: "www.mycareerdreams.com",
        bucketName: "staging-fe.mycareerdreams.com",
        protocol: "https",
        hostname: "www.mycareerdreams.com",
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Montserrat", "Oxygen", "Amiri", "Prompt"],
          fontDisplay: "swap",
        },
      },
    },

    `gatsby-plugin-perf-budgets`,

    // {
    //   resolve: `gatsby-plugin-webfonts`,
    //   options: {
    //     fonts: {
    //       google: [
    //         {
    //           family: "Montserrat",
    //           variants: ["300", "400", "500"],
    //           //subsets: ['latin']
    //           //text: 'Hello'
    //           fontDisplay: 'swap',
    //           //strategy: 'selfHosted' // 'base64' || 'cdn'
    //         },
    //         {
    //           family: "Oxygen",
    //           variants: ["300", "400", "500"],
    //           fontDisplay: 'swap',
    //         },
    //         {
    //           family: "Amiri",
    //           variants: ["300", "400", "500"],
    //           fontDisplay: 'swap',
    //         },
    //         {
    //           family: "Prompt",
    //           variants: ["300", "400", "500"],
    //           fontDisplay: 'swap',
    //         }
    //       ],
    //     },
    //     formats: ['woff2', 'woff'],
    //     useMinify: true,
    //     usePreload: true,
    //     //usePreconnect: false,
    //   },
    // },

    `gatsby-plugin-client-side-redirect`, // keep it in last in list

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

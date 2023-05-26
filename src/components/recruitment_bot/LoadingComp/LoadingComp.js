//import liraries
import React, { Component } from 'react';
import loading_gif from "./static/loading.gif"
import * as classess from "./loadingcomp.module.css"

const LoadingComp = () => {
    return (
      
        <div className={classess.loading_div}>
        <div className={classess.loading_text}>
          <img
            src={loading_gif}
            alt="Loading"
            className={classess.loading_gif_style}
          />
        </div>
      </div>
    );
};

export default LoadingComp;

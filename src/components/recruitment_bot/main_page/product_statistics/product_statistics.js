import { DefsElement } from 'canvg'
import React, { useEffect } from 'react'
import * as classess from './product_statistics.module.css'
import demo from './static/demo.jpg'
import demo_webp from './static/demo.webp'
import CountUp from "react-countup";
import VisibilitySensor from 'react-visibility-sensor';
const ProductStatistics = () =>{
    const [line,showline] = React.useState(false)
    useEffect(()=>{
        if(window.innerWidth<500){
            showline(true)
        }
        else{
            showline(false)
        }
    },[])
    return<div className={classess.main_div}>
        <h1 className={classess.heading}>
         Statistics About Recruitment
        </h1>
        {/* <div className={classess.punch_line}>
        Companies lacking a consistent pre-employment selection process are five times more likely to make a bad hire. 
        </div> */}
        {/* <ul className={classess.list_styling}>
            <li>
                <div className={classess.stats_line}>
                CareerBuilder says 74 percent of companies who made a poor hire lost an average of $14,900 per poor hire.
                </div>
                <div className={classess.stats_graph}>
                    <div className={classess.graph_style}>
                        Graph
                    </div>
                </div>
            </li>
        </ul> */}
        <div className={classess.test_inline}>
                  {/* <picture>
                    <source srcSet={demo_webp} type="image/webp" />
                    <source srcSet={demo} type="image/png" />
                    <img srcSet={demo_webp} alt="" className={classess.img_styling}/>
                </picture> */}
                <CountUp end={5} redraw={true} suffix = "x" className={classess.counter_style}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} className={classess.counter_style}/>
                            </VisibilitySensor>
                        )}
                </CountUp>
        {/* <img src={demo} alt="demo" className={classess.img_styling}/> */}
        <div>
        Companies lacking a consistent pre-employment selection process are 5 times more likely to make a bad hire. 
        </div>
 
        </div>
        {
            line === true ?<div className={classess.line_div}></div> : null
        }
        <div className={classess.test_inline}>
                {/* <picture>
                    <source srcSet={demo_webp} type="image/webp" />
                    <source srcSet={demo} type="image/png" />
                    <img srcSet={demo_webp} alt="" className={classess.img_styling} />
                </picture> */}
                <CountUp end={74} redraw={true} suffix = "%" className={classess.counter_style}>
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} className={classess.counter_style} />
                            </VisibilitySensor>
                        )}
                </CountUp>
            {/* <img src={demo} alt="demo" className={classess.img_styling}/> */}
            <div>
           74 percent of companies who made a poor hire lost an average of $14,900 per poor hire.
            </div>
        
        </div>
        {
            line === true ?<div className={classess.line_div}></div> : null
        }
        <div className={classess.test_inline}>
                 {/* <picture>
                    <source srcSet={demo_webp} type="image/webp" />
                    <source srcSet={demo} type="image/png" />
                    <img srcSet={demo_webp} alt="" className={classess.img_styling}/>
                </picture> */}
                <CountUp end={46} redraw={true} suffix = "%" >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} className={classess.counter_style} />
                            </VisibilitySensor>
                        )}
                </CountUp>
        {/* <img src={demo} alt="demo" className={classess.img_styling}/> */}
          <div>
        46% of all new hires are deemed failures by the 18-month mark
          </div>

        </div>
    </div>
}
export default ProductStatistics
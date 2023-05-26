// this file contains helper functions
import React from "react"

import * as d3 from "d3"
import { API_URL } from "src/constants.js"
import Swal from 'sweetalert2'
// json file country state city
// import csc from "src/data/countrystatecity.json"
// create meter chart 
// add elem with class .chart-gauge and run this function & remember to check for svg in div so that chart does not render multiple times on state update
// used in detailed advice & individual report
 export const drawAtitudeBar = (atitude) => {
  let green = document.getElementById('green-fg')
  let orange = document.getElementById('orange-fg')
  let red = document.getElementById('red-fg')
  let slider = document.getElementById('chart-slider')

  if (atitude > 1.5 && atitude <= 2){
      
      setTimeout(() => {
        let height = red.offsetHeight
        red.className += ' red-on'
        orange.className += ' orange-on'
        green.className += ' green-on'
        slider.animate([{ transform: 'translate(0, -'+ height*3 +'px)' }], 
        { duration: 1500, iterations: 1, fill: "forwards"})
      }, 700)
      document.getElementById('apt-text-good').className += " set-apt-text-good"

  }else if (atitude > 1 && atitude <= 1.5){
      
      setTimeout(() => {
        let height = red.offsetHeight
        red.className += ' red-on'
        orange.className += ' orange-on'
        slider.animate([{ transform: 'translate(0, -'+ height*2 +'px)' }], 
        { duration: 1000, iterations: 1, fill: "forwards"})
      }, 700)
      document.getElementById('apt-text-fair').className += " set-apt-text-fair"
  }else{
    document.getElementById('chart-container').className = "chart-gauge chart-container-red"
    // document.getElementById('chart-container').style.gridTemplateColumns = "2.5rem 30px auto"     
      setTimeout(() => {
        let height = red.offsetHeight
        
        red.className += ' red-on'
        slider.animate([{ transform: 'translate(0, -'+ height +'px)' }], 
        { duration: 500, iterations: 1, fill: "forwards"})
      }, 700)
      document.getElementById('apt-text-bad').className += " set-apt-text-bad"
  }
}


export const drawAtitudeChart = (atitude,width=160,height=160) => {
    let Needle,
      arc,
      arcEndRad,
      arcStartRad,
      barWidth,
      chart,
      chartInset,
      degToRad,
      el,
      endPadRad,
      // height,
      margin,
      needle,
      numSections,
      padRad,
      percToDeg,
      percToRad,
      percent,
      radius,
      sectionIndx,
      sectionPerc,
      startPadRad,
      svg,
      totalPercent,
      // width,
      _i

    // percent = .65;

    // percent = state.atitude

    barWidth = 20

    numSections = 3

    sectionPerc = 1 / numSections / 2

    padRad = 0.05

    chartInset = 10

    totalPercent = 0.75

    el = d3.select(".chart-gauge")

    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 20,
    }

    // width = 160

    // height = 160

    radius = Math.min(width, height) / 2

    percToDeg = function(perc) {
      return perc * 360
    }

    percToRad = function(perc) {
      return degToRad(percToDeg(perc))
    }

    degToRad = function(deg) {
      return (deg * Math.PI) / 180
    }

    svg = el
      .append("svg")
      .attr("width", "250")
      .attr("height", "115")

    // 95,120

    if (atitude === 1) {
      percent = 0.2
      el.append("p")
        .text("Needs Improvement")
        .style("color", "#e3433b")
    } else if (atitude > 1 && atitude < 3) {
      percent = 0.55
      el.append("p")
        .text("Neutral")
        .style("color", "#fc9842")
    } else if (atitude === 3) {
      percent = 0.98
      el.append("p")
        .text("Positive")
        .style("color", "#82f029")
    } else {
      percent = 0.0
      el.append("p")
        .text("Needs Improvement")
        .style("color", "#e3433b")
    }

    chart = svg
      .append("g")
      .attr(
        "transform",
        "translate(" +
          122 +
          ", " +
          (height + margin.top) / 2 +
          ")"
      )

    for (
      sectionIndx = _i = 1;
      1 <= numSections ? _i <= numSections : _i >= numSections;
      sectionIndx = 1 <= numSections ? ++_i : --_i
    ) {
      arcStartRad = percToRad(totalPercent)
      arcEndRad = arcStartRad + percToRad(sectionPerc)
      totalPercent += sectionPerc
      startPadRad = sectionIndx === 0 ? 0 : padRad / 2
      endPadRad = sectionIndx === numSections ? 0 : padRad / 2
      arc = d3
        .arc()
        .outerRadius(radius - chartInset)
        .innerRadius(radius - chartInset - barWidth)
        .startAngle(arcStartRad + startPadRad)
        .endAngle(arcEndRad - endPadRad)
      chart
        .append("path")
        .attr("class", "arc chart-color" + sectionIndx)
        .attr("d", arc)
    }

    Needle = (function() {
      function Needle(_at_len, _at_radius) {
        this.len = _at_len
        radius = _at_radius
      }

      Needle.prototype.drawOn = function(el, perc) {
        el.append("circle")
          .attr("class", "needle-center")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", radius)
        return el
          .append("path")
          .attr("class", "needle")
          .attr("d", this.mkCmd(perc))
      }

      Needle.prototype.animateOn = function(el, perc) {
        //     var self;
        //     self = this;
        return el
          .transition()
          .delay(500)
          .duration(3000)
          .selectAll(".needle")
          .tween("progress", function() {
            return function(percentOfPercent) {
              var progress
              progress = percentOfPercent * perc

              var centerX,
                centerY,
                leftX,
                leftY,
                rightX,
                rightY,
                thetaRad,
                topX,
                topY
              thetaRad = percToRad(progress / 2)
              centerX = 0
              centerY = 0
              topX = centerX - 24 * Math.cos(thetaRad)
              topY = centerY - 24 * Math.sin(thetaRad)
              leftX = centerX - 5 * Math.cos(thetaRad - Math.PI / 2)
              leftY = centerY - 5 * Math.sin(thetaRad - Math.PI / 2)
              rightX = centerX - 5 * Math.cos(thetaRad + Math.PI / 2)
              rightY = centerY - 5 * Math.sin(thetaRad + Math.PI / 2)
              let result =
                "M " +
                leftX +
                " " +
                leftY +
                " L " +
                topX +
                " " +
                topY +
                " L " +
                rightX +
                " " +
                rightY
              return d3.select(this).attr("d", result)
            }
          })
      }

      Needle.prototype.mkCmd = function(perc) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY
        thetaRad = percToRad(perc / 2)
        centerX = 0
        centerY = 0
        topX = centerX - this.len * Math.cos(thetaRad)
        topY = centerY - this.len * Math.sin(thetaRad)
        leftX = centerX - radius * Math.cos(thetaRad - Math.PI / 2)
        leftY = centerY - radius * Math.sin(thetaRad - Math.PI / 2)
        rightX = centerX - radius * Math.cos(thetaRad + Math.PI / 2)
        rightY = centerY - radius * Math.sin(thetaRad + Math.PI / 2)
        return (
          "M " +
          leftX +
          " " +
          leftY +
          " L " +
          topX +
          " " +
          topY +
          " L " +
          rightX +
          " " +
          rightY
        )
      }

      return Needle
    })()

    needle = new Needle(28, 5)

    needle.drawOn(chart, 0)

    needle.animateOn(chart, percent)

}

// Counrty, State, City dropdowns population
// used in header.js & register.js

//ANCHOR - Refactored - countries
export const initCountryList = (setState,Category="") => {
    let temp = []
    fetch(`${API_URL}/countries_r`,{
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    }).then(res=>res.json())
    .then(res=>{
      const {data} = res
        Object.values(data[0]).forEach(country => {
            temp.push(
            <option key={country} value={country} className="options_dropdown">
                {country}
            </option>
            )
        })
        if(Category !== ""){
            setState({
                heading: Category,
                renderCountriesList: temp,
            })
        }
        setState({
            renderCountriesList: temp,
        })
        // return temp
    })
}

//ANCHOR - Refactored - states
export const handleCountryChange = (e,setState) => {
    let temp = []
    let postfix = e.target.name === "country" ? "":"_sub"
    let value = e.target.value
    setState({
      renderStatesList:[]
    })
    // document.querySelector(`select[name='state${postfix}']`).options[0].innerText = "loading States..."
    fetch(`${API_URL}/states_r`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            country:value
        })
    }).then(res=>res.json())
    .then(res=>{
      const {data} = res
        Object.values(data[0]).forEach(states => {
            temp.push(
            <option key={states} value={states} className="options_dropdown" >
                {states}
            </option>
            )
        })

        setState({
            Country:value,
            renderStatesList:temp,
            renderCitiesList:[]
        })
        // document.getElementById('dashboard_countryId').style.border = '2px solid red'
        // document.querySelector(`select[name='state${postfix}']`).options[0].innerText = "Select State"

        // return temp
    })
}

//ANCHOR - Refactored - cities
export const handleStateChange = (e,state,setState) => {
    let temp = []
    let postfix = e.target.name === "state" ? "":"_sub"
    let value = e.target.value
    setState({
      renderCitiesList:[]
    })
    // document.querySelector(`select[name='city${postfix}']`).options[0].innerText = "loading Cities..."
    fetch(`${API_URL}/cities_r`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            country:state.Country,
            state:value
        })
    }).then(res=>res.json())
    .then(res=>{
      const {data} = res
        Object.values(data[0]).forEach(cities => {
            temp.push(
            <option key={cities} value={cities} id="test_city" className="options_dropdown" >
                {cities}
            </option>
            )
        })

        setState({
            State:value,
            renderCitiesList:temp
        })
        // document.getElementById('dashboard_stateId').style.border = '2px solid red'
        // document.querySelector(`select[name='city${postfix}']`).options[0].innerText = "Select City"

        // return temp
    })
}
export function compatibilityDesigns(compatibility){
  let bars = []
  let colour_bars 

  if(compatibility <= 0){
      colour_bars = 0
  }
  else if(compatibility > 0 & compatibility <= 20){
      colour_bars = 1
  }
  else if(compatibility > 20 & compatibility <= 30){
    colour_bars = 2
}
else if(compatibility > 30 & compatibility <= 40){
      colour_bars = 3
  }
  else if(compatibility > 40 & compatibility <=50){
    colour_bars = 4
  }
  else if(compatibility > 50 & compatibility <= 60){
    colour_bars = 5
  }
  else if(compatibility > 60 & compatibility <= 70){
    colour_bars = 6
  }
  else if(compatibility > 70 & compatibility <= 80){
    colour_bars = 7
  }
  else if(compatibility > 80 & compatibility <= 90){
    colour_bars = 8
  }
  else if(compatibility > 90 & compatibility <100){
    colour_bars = 9
  }
  else if(compatibility >= 100){
    colour_bars = 10
  }
  for(let i=0;i<10;i++){
          bars.push(<div className="bar_design" style={i<colour_bars===true?{backgroundColor:'#38c0ca'}:null}>
              a
           </div>)
    
  }
 return bars
} 


//Export Loader 
export function ShowLoader(props) {
    Swal.fire({
        text: props
   });
   Swal.showLoading();
}

export function clog(props) {
  // console.log("Current Environment: ",process.env.NODE_ENV)
  if(process.env.NODE_ENV=="development"){
    console.log(props)
  }
} 

// export function clog(desc,data) {
//   console.log("Current Environment: ",process.env.NODE_ENV)
//   if(process.env.NODE_ENV){
//     console.log(desc,data)
//   }
// }
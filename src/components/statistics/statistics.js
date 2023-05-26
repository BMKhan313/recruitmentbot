import React, { Component } from "react"

// data
import data from "./record.js"

// css
import "./style.css"
import * as classes from './styling.module.css'
// import '../blog_posts/blog_posts.css';

// imgs
import students from "./static/students.png"
import school from "./static/school.png"
import countries from "./static/countries.png"
import counseling from "./static/counseling.webp"
import male from "./static/male.png"
import female from "./static/female.png"
import age from "./static/age.png"
import img from "./static/8.png"
import img1 from "./static/9.png"
import img2 from "./static/11.png"

// External Components
import BlogsHeader from "../blogs_header/blogs_header.js"
import CountUp from "react-countup"
import { Doughnut, Bar, Pie } from "react-chartjs-2"
import Footer from "../footer/footer.js"

// Internal Components
import Figures from "./figures.js"

// import 'chart.piecelabel.js';
import "chartjs-plugin-labels"
import "chartjs-plugin-datalabels"

import { MCD_URL } from "src/constants"

// Useful Stats for Our Users Related to ChatBot
class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data_value: "",
      schools: data.data.no_of_schools,
      Counselling_Sesssions : data.data.Counselling_Sesssions,
      countries: data.data.countries,
      male_percentage: data.data.males_percentage,
      female_perceentage: data.data.female_percentage,
      matric: data.data.student_edu_level.matric,
      olevels: data.data.student_edu_level.olevel,
      alevels: data.data.student_edu_level.alevel,
      relocate_yes: data.data.wiiling_to_relocate.yes,
      relocate_no: data.data.wiiling_to_relocate.no,
      store: [],
      visits: 0,
      store_data_edu: {
        labels: [
          "Matric",
          "ALevels",
          "OLevels",
          "Pre Matric",
          "FSC",
          "University",
          "Pre OLevels",
        ],
        datasets: [
          {
            label: "Student Education Level",
            data: [
              data.data.student_edu_level.matric,
              data.data.student_edu_level.alevel,
              data.data.student_edu_level.olevel,
              data.data.student_edu_level.pre_matric,
              data.data.student_edu_level.fsc,
              data.data.student_edu_level.university,
              data.data.student_edu_level.pre_o_level,
            ],
            backgroundColor: [
              "rgb(2,80,197) ",
              "rgb(107,72,169) ",
              "rgb(212,63,141) ",
              "#421690",
              "#b28bc6",
              "#de74b6",
              "#053680",
            ],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      },
      store_data_compatibility: {
        labels: [
          "Low (%)",
          "Mismatch (%)",
          "Medium (%)  ",
          "High (%) ",
          "Exceptionally High (%)",
        ],
        datasets: [
          {
            label: "Career",
            data: [
              data.data.student_compatibilty.low,
              data.data.student_compatibilty.mismatch,
              data.data.student_compatibilty.medium,
              data.data.student_compatibilty.good,
              data.data.student_compatibilty.excellent,
            ],
            backgroundColor: [
              "#8d71b4",
              "rgb(2,80,197) ",
              "rgb(107,72,169) ",
              "rgb(212,63,141) ",
              "#421690",
            ],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      },

      store_data_relocate: {
        labels: ["Willing", "Not Willing"],
        datasets: [
          {
            data: [
              data.data.wiiling_to_relocate.Can_Relocate,
              data.data.wiiling_to_relocate.Cant_Relocate,
            ],
            backgroundColor: ["rgb(107,72,169) ", "rgb(212,63,141) "],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      },
      store_data_study_time: {
        labels: ["Less than 5 Hours", "More than 5 Hours"],
        datasets: [
          {
            data: [
              data.data.study_time.less_than_five_hours,
              data.data.study_time.more_than_five_hours,
            ],
            backgroundColor: ["rgb(107,72,169) ", "rgb(212,63,141) "],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      },

      store_data_working_hours: {
        labels: ["Alone", "Team"],
        datasets: [
          {
            data: [
              data.data.work_preference.alone,
              data.data.work_preference.team,
            ],
            backgroundColor: ["rgb(107,72,169) ", "rgb(212,63,141) "],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      },
      store_data_percentage: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: ["Male and Females"],
            data: ["24", "48"],
            backgroundColor: ["rgb(107,72,169) ", "rgb(212,63,141) "],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      },

      // store_data_bar:{
      //      labels:['Preffered','Most Likely','Least Likely','Engineering','Medical','BBA'],
      //      datasets:[{
      //          label:'Career',
      //          data:['28','46','85','98','96','123'],
      //          backgroundColor:[
      //             'rgb(2,80,197) ',
      //             'rgb(107,72,169) ',
      //             'rgb(212,63,141) ',
      //             'lightgreen',
      //             'purple',
      //             'skyblue'
      //          ],
      //          hoverBackgroundColor: "rgba(255,99,132,0.4)",
      //      }]

      // }
    }
  }

  componentDidMount() {
    const outer_this = this
    fetch(`${MCD_URL}/new_visits`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        return response.json()
      })
      .then(function (data) {
        outer_this.setState({ visits: data })
      })
    document.getElementById('exceptioanlly_high').style.backgroundColor = "#421690";
    document.getElementById('exceptioanlly_high').style.width = (data.data.student_compatibilty.excellent * 3) + '%';
    document.getElementById('exceptioanlly_high').style.color = "white"
    document.getElementById('exceptioanlly_high').style.borderRadius = "25px"

    document.getElementById('high').style.backgroundColor = "rgb(212,63,141) ";
    document.getElementById('high').style.width = (data.data.student_compatibilty.good * 2) + '%';
    document.getElementById('high').style.color = "white"
    document.getElementById('high').style.borderRadius = "25px"

    document.getElementById('medium').style.backgroundColor = "rgb(107,72,169)";
    document.getElementById('medium').style.width = (data.data.student_compatibilty.medium * 2) + '%';
    document.getElementById('medium').style.color = "white"
    document.getElementById('medium').style.borderRadius = "25px"

    document.getElementById('low').style.backgroundColor = "#421690";
    document.getElementById('low').style.width = (data.data.student_compatibilty.low * 2) + '%';
    document.getElementById('low').style.color = "white"
    document.getElementById('low').style.borderRadius = "25px"

    document.getElementById('mismatch').style.backgroundColor = "rgb(2,80,197)";
    document.getElementById('mismatch').style.width = (data.data.student_compatibilty.mismatch * 2) + '%';
    document.getElementById('mismatch').style.color = "white"
    document.getElementById('mismatch').style.borderRadius = "25px"
  }
  render() {
    const data1 = canvas => {
      const ctx = canvas.getContext("2d")
      const gradient = ctx.createLinearGradient(0, 20, 0, 1000)
      gradient.addColorStop(1, "#45dec0")
      gradient.addColorStop(0.1, "#53c3bf")
      gradient.addColorStop(0.6, "#60a8be")
      ctx.fillStyle = gradient
      const gradient1 = ctx.createLinearGradient(0, 5, 0, 1000)
      gradient1.addColorStop(1, "#0250c5")
      gradient1.addColorStop(0.1, "#6b48a9 ")
      gradient1.addColorStop(0.6, "#d43f8d")
      // ctx.fillBar(20, 20, 200, 100)
      return {
        labels: ["Computers (%)", "Medicine (%)", "Armed Forces(%)"],
        datasets: [
          {
            label: "Career",
            barThickness: 55, // number (pixels) or 'flex'
            maxBarThickness: 90,
            data: [
              data.data.likely_careers.computers,
              data.data.likely_careers.Medical,
              data.data.likely_careers.Army,
            ],
            backgroundColor: [gradient1, gradient, gradient1],
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
          },
        ],
      }
    }
    return (
      <div className="main_margin" id="remove_space">
        <BlogsHeader header="Statistics" location={this.props} />

        {/*  Row 1  */}
        <div className="container-fluid">
          <div className={classes.div_model}>
            <div className={classes.heading}>
              So far we have...
          </div>
            <div className="row">
              <div className="col-md-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className={classes.div_inline}>
                        <img
                          src={school}
                          className={classes.icon_img_styling}
                          alt="Schools & Colleges"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">

                      <CountUp
                        start={0}
                        end={this.state.schools}
                        className={classes.icon_with_image}
                      ></CountUp>

                    </div>
                  </div>
                </div>

                <div className={classes.description_under_image}>
                  Schools, colleges and universities on board
                </div>
              </div>
              <div className="col-md-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className={classes.div_inline}>
                        <img
                          src={counseling}
                          className={classes.icon_img_styling}
                          alt="Schools & Colleges"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">

                      <CountUp
                        start={0}
                        end={this.state.visits}
                        className={classes.icon_with_image}
                      ></CountUp>

                    </div>
                  </div>
                </div>


                <div className={classes.description_under_image}>
                  Students Served
                </div>
              </div>
              <div className="col-md-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className={classes.div_inline}>
                        <img
                          src={countries}
                          className={classes.icon_img_styling}
                          alt="Schools & Colleges"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">

                      <CountUp
                        start={0}
                        end={this.state.countries}
                        suffix="+"
                        className={classes.icon_with_image}
                      ></CountUp>

                    </div>
                  </div>
                </div>

                <div className={classes.description_under_image}>
                  Countries
                </div>

              </div>
              <div className="col-md-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className={classes.div_inline}>
                        <img
                          src={students}
                          className={classes.icon_img_styling}
                          alt="Schools & Colleges"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">

                      <CountUp
                        start={0}
                        end={this.state.Counselling_Sesssions}
                        suffix="+"
                        className={classes.icon_with_image}
                      ></CountUp>

                    </div>
                  </div>
                </div>

                <div className={classes.description_under_image}>
                  Counselling Sesssions
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="container-fluid">
          <div className={classes.heading}>Some Facts About Our Users</div>
          <div className="row" id="set_row_margins_1" >
            <div className="col-md-4">
              <Pie
                data={this.state.store_data_edu}
                height={160}
                options={{
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex]
                        var total = dataset.data.reduce(function (
                          previousValue,
                          currentValue,
                          currentIndex,
                          array
                        ) {
                          return previousValue + currentValue
                        })
                        var currentValue = dataset.data[tooltipItem.index]
                        var precentage = Math.floor(
                          (currentValue / total) * 100 + 0.5
                        )
                        return precentage + "%"
                      },
                    },
                  },
                  responsive: true,
                  animation: {
                    duration: 3000,
                    easing: "easeInCirc",
                  },
                  hover: {
                    easing: "easeInCirc",
                  },

                  plugins: {
                    labels: {
                      render: "label",
                      fontColor: "purple",
                      fontSize: 9,
                      textShadow: true,
                      position: "outside",
                      textMargin: 4,
                    },
                    datalabels: {
                      display: false,
                      color: "white",
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        display: false,
                      },
                    ],
                  },
                  legend: {
                    display: false,
                    position: "left",
                  },
                }}
              />
              <div className={classes.description_under_graph}>
                Student Education Level
                </div>
            </div>
            <div className="col-md-4">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <div className={classes.gender_img_div}>
                      <img src={male} className={`${classes.gender_img} ${classes.gender_align}`} alt={"Male"} />
                    </div>
                    <div className={classes.gender_description}>
                      Male <br />
                      <CountUp
                        start={0}
                        end={data.data.percentage.male}
                        suffix="%"
                      ></CountUp>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={classes.gender_img_div}>
                      <img src={female} className={classes.gender_img} alt={"Female"} />
                    </div>
                    <div className={classes.gender_description}>
                      Female <br />
                      <CountUp
                        start={0}
                        end={data.data.percentage.female}
                        suffix="%"
                      ></CountUp>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={classes.age_div_design}>
                <CountUp
                  start={0}
                  end={data.data.average_age}
                  className={classes.age_counter}
                ></CountUp>
              </div>
              <div className={classes.description_under_graph}>
                Average Age
                </div>
            </div>
          </div>
        </div>
        {/* Row 3 */}
        <div className="contaner-fluid">
          <div className={classes.div_model}>
            <div className={classes.heading}>
              User preferences
           </div>
            <div className="row" id="set_row_margins_2">
              <div className="col-md-4">
                <img
                  src={img}
                  className={classes.img_inside_chart}
                  alt="Students Willing to Relocate"
                />
                <Doughnut
                  data={this.state.store_data_relocate}
                  height={180}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          var dataset = data.datasets[tooltipItem.datasetIndex]
                          var total = dataset.data.reduce(function (
                            previousValue,
                            currentValue,
                            currentIndex,
                            array
                          ) {
                            return previousValue + currentValue
                          })
                          var currentValue = dataset.data[tooltipItem.index]
                          var precentage = Math.floor(
                            (currentValue / total) * 100 + 0.5
                          )
                          return precentage + "%"
                        },
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                      duration: 3000,
                      easing: "easeInCirc",
                    },
                    legend: {
                      display: false,
                    },
                    plugins: {
                      labels: {
                        render: "label",
                        fontColor: "#fff",
                      },
                      datalabels: {
                        display: false,
                        color: "white",
                      },
                    },
                  }}
                />
                <div className={classes.description_under_graph}>
                  User Willing to Relocate for Career in Future
                </div>
              </div>
              <div className="col-md-4">
                <img src={img1} className={classes.img_inside_chart} alt="study time" />
                <Doughnut
                  data={this.state.store_data_study_time}
                  height={180}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          var dataset = data.datasets[tooltipItem.datasetIndex]
                          var total = dataset.data.reduce(function (
                            previousValue,
                            currentValue,
                            currentIndex,
                            array
                          ) {
                            return previousValue + currentValue
                          })
                          var currentValue = dataset.data[tooltipItem.index]
                          var precentage = Math.floor(
                            (currentValue / total) * 100 + 0.5
                          )
                          return precentage + "%"
                        },
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                      duration: 3000,
                      easing: "easeInCirc",
                    },
                    legend: {
                      display: false,
                    },
                    plugins: {
                      labels: {
                        render: "label",
                        fontColor: "#fff",
                        arc: true,
                      },
                      datalabels: {
                        display: false,
                        color: "white",
                      },
                    },
                  }}
                />
                <div className={classes.description_under_graph}>
                  No of Hours Students Study per day
                </div>
              </div>
              <div className="col-md-4">
                <img src={img2} className={classes.img_inside_chart} alt="working hours" />
                <Doughnut
                  data={this.state.store_data_working_hours}
                  height={180}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: function (tooltipItem, data) {
                          var dataset = data.datasets[tooltipItem.datasetIndex]
                          var total = dataset.data.reduce(function (
                            previousValue,
                            currentValue,
                            currentIndex,
                            array
                          ) {
                            return previousValue + currentValue
                          })
                          var currentValue = dataset.data[tooltipItem.index]
                          var precentage = Math.floor(
                            (currentValue / total) * 100 + 0.5
                          )
                          return precentage + "%"
                        },
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                      duration: 3000,
                      easing: "easeInCirc",
                    },
                    legend: {
                      display: false,
                    },
                    plugins: {
                      labels: {
                        render: "label",
                        fontColor: "#fff",
                      },
                      datalabels: {
                        display: false,
                        color: "white",
                      },
                    },
                  }}
                />
                <div className={classes.description_under_graph}>
                  Work Preference
                </div>
              </div>
            </div>
          </div>
        </div>
{/* Row 4 */}
        <div className="container-fluid">
          <div className="row " id="set_row_margins_3" style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '3%' }}>
            <div className="col-md-6">
              <div className={classes.heading_1}>Top 3 Most Popular Careers
</div>
              <Bar
                data={data1}
                height={140}
                options={{
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return Number(tooltipItem.yLabel) + " % "
                      },
                    },
                  },
                  maintainAspectRatio: true,
                  responsive: true,
                  animation: {
                    duration: 3000,
                    easing: "easeInOutBounce",
                  },
                  scales: {
                    xAxes: [
                      {
                        barThickness: 50, // number (pixels) or 'flex'
                        maxBarThickness: 80, // number (pixels)
                        ticks: {
                          min: 10,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        barThickness: 50,
                        maxBarThickness: 60,
                        ticks: {
                          min: 0,
                        },
                      },
                    ],
                  },

                  legend: {
                    display: false,
                  },
                  plugins: {
                    labels: false,
                    datalabels: {
                      display: true,
                      color: "white",
                    },
                  },
                }}
              />
            </div>
            <div className="col-md-6">
              <div className={classes.heading_1}>Compatibility of Students with the Careers they Choose</div>

              <div className={classes.exceptioanlly_high} >
                <span className={classes.float_content}>Exceptionally High</span>
                <div className={classes.bar_background}>
                  <div id="exceptioanlly_high">
                    <span className={classes.set_padding}>{data.data.student_compatibilty.excellent} %</span>
                  </div>
                </div>

              </div>
              <div className={classes.high}>
                <span className={classes.float_content}>High</span>
                <div className={classes.bar_background}>
                  <div id="high">
                    <span className={classes.set_padding}>{data.data.student_compatibilty.good} %</span>
                  </div>
                </div>
              </div>
              <div className={classes.medium}>
                <span className={classes.float_content}>Medium</span>
                <div className={classes.bar_background}>
                  <div id="medium">
                    <span className={classes.set_padding}>{data.data.student_compatibilty.medium} %</span>
                  </div>
                </div>
              </div>
              <div className={classes.low}>
                <span className={classes.float_content}>Low</span>
                <div className={classes.bar_background}>
                  <div id="low">
                    <span className={classes.set_padding}>{data.data.student_compatibilty.low} %</span>
                  </div>
                </div>
              </div>
              <div className={classes.mismatch}>
                <span className={classes.float_content}>Mismatch</span>
                <div className={classes.bar_background}>
                  <div id="mismatch">
                    <span className={classes.set_padding}>{data.data.student_compatibilty.mismatch} %</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
{/* Row 5 */}
        <div className="container-fluid">
          <div className={classes.heading}>Statistics From Pakistan</div>
          <div className="row">
            <div className="col-md-12">
              <Figures />
            </div>
          </div>
        </div>

        <Footer />

      </div>
    )
  }
}
export default Statistics

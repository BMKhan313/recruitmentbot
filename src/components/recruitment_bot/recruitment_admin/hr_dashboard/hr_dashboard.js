import React, { useEffect, useState } from "react"

import { PoweroffOutlined } from "@ant-design/icons"
import * as cs from "./hr_dashborad.module.scss"
import { MEEZAN_API_URL, REC_URL } from "src/constants"
import { navigate } from "gatsby"
import "./hr.css"
import logo from "./static/logo.png"
import wave from "./static/wave.png"
import moment from "moment"
import Swal from "sweetalert2"

import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  DatePicker,
  Modal,
  Select,
  Button,
} from "antd"
import { MEEZAN_COMPANY_CODE } from "../../../../constants"
import { StylesContext } from "@material-ui/styles"
const { Option } = Select
const { TextArea } = Input

let CURRENT_API_URL = REC_URL
// const originData = [];
const originData = [
  {
    id: "1",
    job_code: "JC-001",
    job_name: "Frontend Developer",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "2",
    job_code: "JC-002",
    job_name: "Backend Developer",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "7",
    job_code: "JC-003",
    job_name: "Full Stack Developer",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "6",
    job_code: "JC-004",
    job_name: "Data Scientist",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "8",
    job_code: "JC-001",
    job_name: "Frontend Developer",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "12",
    job_code: "JC-002",
    job_name: "Backend Developer",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "24",
    job_code: "JC-003",
    job_name: "Full Stack Developer",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
  {
    id: "72",
    job_code: "JC-004",
    job_name: "Data Scientist",
    created_at: "2022-01-01 00:00:00",
    expiry_date: "2022-12-31 00:00:00",
  },
]

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  // console.log("flag: ",moment(moment(), 'YYYY/MM/DD'))
  //  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  const inputNode = inputType === "number" ? <TextArea rows={4} /> : <Input />
  //  <DatePicker   />  defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}! \n Don't enter special character`,
            },
          ]}
        >
          {inputType === "datePick" ? (
            <input
              type="date"
              class="datepicker"
              data-date-format="YYYY-MM-DD"
            ></input>
          ) : (
            inputNode
          )}

          {/* <DatePicker defaultValue={moment(moment(), 'YYYY/MM/DD')}  /> */}
          {/* <h5>Text</h5> */}
          {/* <DatePicker  />  */}
          {/* {inputNode} */}
          {/* {( inputType === "datePick" ) ?  <DatePicker onChange={onChange} /> : inputNode } */}
          {/* <DatePicker
          // format={"YYYY-MM-DD"}
          // onChange={(date, dateString) =>
          //   this.handleDatepickerChange(date, dateString)
          // }
          placeholder="Start Date"
          // value={ moment('2015/01/01')}
         
          // value={
          //   this.state.startDate !== ""
     
          //     : ""
          // }
        /> */}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

// for (let i = 0; i < 15; i++) {
//    originData.push({
//      id: i.toString(),
//      name: `Edrward ${i}`,
//      age: 32,
//      address: `London Park no. ${i}`,
//    });
//  }

const dateFormat = "YYYY/MM/DD"

function HRDashbaord({ location }) {
  const [form] = Form.useForm()
  const [data, setData] = useState(null)
  const [editingKey, setEditingKey] = useState("")
  const [visible, setVisible] = useState(false)
  const [careerName, setcareerName] = useState(null)

  const [jobName, setjobName] = useState("")
  const [jobCareer, setjobCareer] = useState("")
  const [jobExpiry, setjobExpiry] = useState("")

  const expiryDateRef = React.useRef("")
  const jobNameRef = React.useRef("")
  const careerRef = React.useRef("")
  const [url_updated, setURL] = useState(false)

  if (typeof window !== "undefined" && location.state) {
    var token = location.state.token
  } else if (location.search !== "") {
    let info = window.location.href.split("?==")
    var token = window.atob(info[1])
  }

  const isEditing = record => record.id === editingKey

  // useEffect(() => {
  //   getJobs()
  //   getCareerName()

  // }, [])

  useEffect(() => {
    if ((location.state === null) & (location.search === "")) {
      Swal.fire({
        icon: "error",
        title: "Not Authenticated",
        text: "Please Login First",
        timer: 1500,
        confirmButtonColor: "#1D1E2C",
      })
      navigate("/recruitment-bot/hr-admin/login/")
      return
    } else {
      if (url_updated) {
        getJobs()
        getCareerName()
      } else {
        getCompanyCode()
      }
    }
  }, [url_updated])

  function getCompanyCode() {
    if (location.search !== "") {
      let info = window.location.href.split("?==")
      CURRENT_API_URL =
        window.atob(info[2]) == MEEZAN_COMPANY_CODE ? MEEZAN_API_URL : REC_URL
      setURL(true)
    } else {
      CURRENT_API_URL =
        location.state.company_code == MEEZAN_COMPANY_CODE
          ? MEEZAN_API_URL
          : REC_URL
      setURL(true)
    }
  }

  function getCareerName() {
    //ANCHOR - Refactored - career-names-dropdown
    fetch(`${CURRENT_API_URL}/recruitment/dashboard/career-names-dropdown`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        // console.log("data: ",res)
        if (res.success) {
          setcareerName(res.data)
        } else {
          Swal.fire({
            icon: "error",
            text: "Unable to fetch Careers",
            confirmButtonColor: "#1D1E2C",
          })
        }
      })
  }

  function getJobs() {
    //ANCHOR - Refactored - jobs
    fetch(`${CURRENT_API_URL}/recruitment/dashboard/jobs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        // console.log("data: ", data)
        const { data } = res
        if (res.success) {
          // const temp = []
          // res.jobs.map(j=>{
          //   console.log("item: ", moment(j.created_at).format('MMMM Do YYYY, h:mm:ss a'))
          //   const job = {
          //     career_name: j.career_name ,
          //     created_at: moment(j.created_at).format('YYYY-MM-DD, h:mm:ss a')  ,
          //     expiry_date: j.expiry_date ,
          //     id: j.id,
          //     job_code: j.job_code ,
          //     job_name: j.job_name ,
          //     updated_at: j.updated_at ,
          //   }
          //   temp.push(job)
          // })
          // setData(temp)
          setData(data)
        } else {
          Swal.fire({
            icon: "error",
            text: "Something Went Wrong",
            confirmButtonColor: "#1D1E2C",
          })
        }
      })
  }

  const edit = record => {
    form.setFieldsValue({
      job_code: "",
      job_name: "",
      created_at: "",
      expiry_date: "",
      ...record,
    })
    setEditingKey(record.id)
  }

  const expireJob = record => {
    // console.log({ record })
    // alert("Expire Job",record.id)
    // console.log("record: ",record.id)
    //ANCHOR -  Refactored - job/expire
    fetch(`${CURRENT_API_URL}/recruitment/job/expire`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id: record.id }),
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res.success) {
          // document.getElementById("ExpBtn").style.backgroundColor = "#1E1E2E"
          // document.getElementById("ExpBtn").style.content = "Activate"
          Swal.fire({
            icon: "success",
            text: res.data.msg,
            confirmButtonColor: "#F4B63F",
          })
          getJobs()
        } else {
          Swal.fire({
            icon: "error",
            text: "Failed",
            confirmButtonColor: "#F4B63F",
          })
        }
      })
  }

  //      moment(this.state.startDate)

  const cancel = () => {
    setEditingKey("")
  }

  const save = async id => {
    try {
      const row = await form.validateFields()

      const newData = [...data]
      const index = newData.findIndex(item => id === item.id)

      if (index > -1) {
        const item = newData[index]
        // newData.splice(index, 1, { ...item, ...row });
        // console.log({ ...row })

        //REVIEW - Refactored - update-record
        fetch(
          `${CURRENT_API_URL}/recruitment/update-job-expiry?id=${item.id}&job_name=${row.job_name}&expiry_date=${row.expiry_date}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
            // body: JSON.stringify({
            //   id:item.id,
            //   job_name: row.job_name,
            //   expiry_date: row.expiry_date,
            // }),
          }
        )
          .then(response => {
            return response.json()
          })
          .then(res => {
            const { data } = res
            if (res.code === 200) {
              Swal.fire({
                icon: "success",
                title: data.msg,
                confirmButtonColor: "#1D1E2C",
              })
            } else if (res.code === 422) {
              Swal.fire({
                icon: "info",
                title: data.expiry_date[0],
                confirmButtonColor: "#1D1E2C",
              })
            } else if (res.code === 500) {
              Swal.fire({
                icon: "info",
                title: data[0],
                confirmButtonColor: "#1D1E2C",
              })
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed to Update job",
                confirmButtonColor: "#1D1E2C",
              })
            }
            // Swal.fire({
            //   icon: res.success === true ? "success" : "error",
            //   title: data?.msg ? data.msg : "Failed to activate job",
            // })

            getJobs()
          })

        // setData(newData);
        setEditingKey("")
      } else {
        // newData.push(row);
        // setData(newData);
        setEditingKey("")
      }
    } catch (errInfo) {
      Swal.fire({
        icon: "error",
        text: "Failed",
        confirmButtonColor: "#1D1E2C",
      })
      // console.log("Validate Failed:", errInfo)
    }
  }

  const columns = [
    {
      title: "Career Code",
      dataIndex: "job_code",
      //  width: '25%',
      //  editable: true,
    },
    {
      title: "Career Name",
      dataIndex: "job_name",
      width: "20%",
      editable: true,
    },
    {
      title: "Created At",
      dataIndex: "last_updated",
      width: "20%",
      //  editable: true,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      // width: '30%',
      editable: true,
    },
    {
      title: "Job",
      dataIndex: "career_name",
      // width: '20%',
      color: "green",
      editable: false,
      render: career_name => (
        // <Tooltip placement="topLeft" title={address}>
        <div className={cs.career_name}>{career_name}</div>

        // </Tooltip>
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        // {console.log(record.job_name,": ",moment().isAfter(record.expiry_date))}
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            {record.expiry_date === "2022-02-01 00:00:00" ||
            moment().isAfter(record.expiry_date) ? null : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            )}
            {record.expiry_date === "2022-02-01 00:00:00" ||
            moment().isAfter(record.expiry_date) ? (
              <div
                className={cs.ActivateBtn}
                id="ExpBtn"
                onClick={() => edit(record)}
              >
                Activate
                {/* {console.log("Check:",moment('2019-11-11').isSame('2019-11-11'))} */}
              </div>
            ) : (
              <div
                className={cs.ExpBtn}
                id="ExpBtn"
                onClick={() => expireJob(record)}
              >
                Expire
              </div>
            )}
          </div>
        )
      },
    },
  ]
  const mergedColumns = columns.map(col => {
    // console.log("Flag: ",columns)
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === "expiry_date" ? "datePick" : "text",
        //  inputType: col.dataIndex ,

        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  function addJob() {
    setVisible(false)
    if (
      careerRef.current === "" ||
      jobName === "" ||
      expiryDateRef.current === ""
    ) {
      Swal.fire({
        icon: "info",
        text: "All fields are required!",
      })
      return
    } else {
      //ANCHOR - Refactored - add-company-job-code
      fetch(`${CURRENT_API_URL}/recruitment/add-company-job-code`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          job_name: jobName,
          career_name: careerRef.current,
          expiry_date: expiryDateRef.current,
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          const { data } = res

          if (res.code == 201) {
            Swal.fire({
              icon: "success",
              title: data.msg,
              confirmButtonColor: "#1D1E2C",
            })
            getJobs()
          } else if (res.code == 422) {
            Swal.fire({
              icon: "info",
              title: data.expiry_date[0],
              confirmButtonColor: "#1D1E2C",
            })
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to activate job",
              confirmButtonColor: "#1D1E2C",
            })
          }
        })
      setjobName("")
    }
  }
  const logout = () => {
    let red_url = sessionStorage.getItem("red_url")
    if (token) {
      fetch(`${CURRENT_API_URL}/recruitment/logout`, {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          Authorization: "Bearer" + token,
        },
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          if (res.success) {
            Swal.fire({
              icon: "success",
              title: res?.message[0] ?? "Successfully logout!",
              text: "Please login again to continue",
              timer: 1500,
            })

            if (red_url && red_url !== "") {
              window.location.assign(red_url)
            } else {
              window.history.back()
            }
          } else if (res?.message === "Unauthenticated.") {
            Swal.fire({
              icon: "success",
              title: "Logout successfully!",
              text: "Please login again to continue",
              timer: 1500,
            })
            if (red_url && red_url !== "") {
              window.location.assign(red_url)
            } else {
              window.history.back()
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed to logout!",
              text: "Please try again",
              timer: 1500,
            })
          }
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Failed to logout, please try again",
            timer: 1500,
          })
        })
    } else {
      if (red_url && red_url !== "") {
        window.location.assign(red_url)
      } else {
        window.history.back()
      }
    }
  }

  return (
    <>
      <div className={cs.container}>
        {/* <img src={wave} alt="Recruitment Bot" className={cs.wave}  /> */}
        <div className={cs.header}>
          <img src={logo} alt="Recruitment Bot" />
          {/* <h3>Resume Builder</h3> */}
          <p onClick={logout}>Logout</p>
        </div>
        <h1 className={cs.talent_heading}>
          HR Dashboard<span className={cs.dashboardText}></span>
        </h1>

        <div className={cs.btnDiv}>
          <div
            className={cs.btns}
            onClick={() => {
              Swal.fire({
                icon: "success",
                text: "Table Updated",
                showConfirmButton: false,
                timer: 1500,
                confirmButtonColor: "#1D1E2C",
              })
              getJobs()
            }}
          >
            Update Table
          </div>
          <div className={cs.btns} onClick={() => setVisible(true)}>
            Add New
          </div>
        </div>

        {/* // <div id="container" style={{padding: "24px"}}> */}
        {/* <Table columns={columns} dataSource={data} /> */}
        {/* <Button type="primary" size="small" loading>
            Loading
          </Button> */}
        {/* {console.log(data)} */}
        <Form form={form} component={false}>
          <div className={cs.tableConatiner}>
            {/* <Button
              type="primary"
              onClick={() => {
                Swal.fire({
                  icon: "success",
                  text: "Table Updated",
                  showConfirmButton: false,
                  timer: 1500,
                })
                getJobs()
              }}
              className={cs.reloadBtn}
            >
              Reload
            </Button> */}

            {!data ? (
              // <div>Loading..</div>
              <div className={cs.loading_Div}>
                <div className={cs.loading_style}>
                  <lottie-player
                    src="https://assets4.lottiefiles.com/packages/lf20_wwtntc5z.json"
                    background="transparent"
                    style={{ width: "100%", height: "100%" }}
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                </div>
              </div>
            ) : (
              <div className={cs.tableDiv}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  // bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                  scroll={{ x: 400 }}
                />
              </div>
            )}
            {/* <div className={cs.addButton} onClick={() => setVisible(true)}>
              Add New
            </div> */}
          </div>
        </Form>
      </div>
      <Modal
        title="Add New"
        centered
        visible={visible}
        onOk={() => addJob()}
        onCancel={() => setVisible(false)}
        width={400}
        className={cs.modal}
      >
        <Select
          // showSearch
          style={{ cursor: "pointer" }}
          placeholder="Select Career"
          optionFilterProp="children"
          // value={jobCareer}
          // onChange={(value)=> setjobCareer(value)}
          allowClear
          onChange={value => (careerRef.current = value)}
          // filterOption={(input, option) =>
          //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }

          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {careerName &&
            careerName.map(c => (
              <Option style={{ textAlign: "left" }} value={c}>
                {c}
              </Option>
            ))}
        </Select>

        <Input
          placeholder="Job Name"
          value={jobName}
          onChange={e => setjobName(e.target.value)}
        />
        {/* <DatePicker allowClear placeholder="Expiry Date" value={jobExpiry} onChange={(date, dateString) => setjobExpiry(moment(date).format('YYYY-MM-DD hh:mm:ss')) } /> */}
        {/* <Input placeholder="Job Name" onChange={ e => jobNameRef.current = e.target.value } /> */}
        <DatePicker
          allowClear
          placeholder="Expiry Date"
          onChange={(date, dateString) =>
            (expiryDateRef.current = moment(date).format("YYYY-MM-DD hh:mm:ss"))
          }
        />
        {/* <Input placeholder="Job Name" /> */}
        {/* <input type="date" class="datepicker" data-date-format="mm/dd/yyyy"></input> */}
      </Modal>
    </>
  )
}
export default HRDashbaord

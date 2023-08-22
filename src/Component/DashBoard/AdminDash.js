import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardFd } from "./CardFd";
import { CardFdT } from "./CardFdT";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CalenderService from "../../Services/CalenderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaFilter } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./AdminDash.css";
import TopNavbar from "../Sidebar/TopNavbar";

const AdminDash = () => {
  const auth = useAuth();
  const nav = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [select, setSelect] = useState("All");
  const [toggle, setToggle] = useState(true);

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];
    // const originalData = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // if (nArr.length === 0) {
    //   nArr = originalData;
    // }
    setDocumentView(nArr);
  };


  useEffect(() => {
    TransactionSercvice.getAccountSummary(auth.user).then((res) => (setDocumentView(res.data),
      setAccountData(res.data))
    );
  }, [auth]);

  console.log("data", documentView);

  const handelDate = () => {
    const sdate = new Date(startDate);
    console.log("sdate", sdate);
    const edate = new Date(endDate);
    edate.setHours(23, 59, 59);
    console.log("ldate", edate);

    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      // console.log('st', transactionDate)
      return transactionDate >= sdate && transactionDate <= edate;
    });
    setDocumentFilter(filteredDocuments);
    setToggle(false)
  };

  const handleReset = () => {
    setDocumentView(accountData);
    setSubAdmin("");
    setBank("");
    setWebsite("");
    setStartDate("");
    setEndDate("");
    setToggle(true)
  }
  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value)
  };
  console.log("filterdata", documentFilter);
  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value)
  };
  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
    handleClick("bankName", value)
  };
  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
    handleClick("websiteName", value)
  };

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
      });
    }
  }, [auth]);
  console.log(subAdminlist);
  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.bankList(auth.user).then((res) => {
        setBankList(res.data);
      });
    }
  }, [auth]);
  console.log(bankList);
  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.websiteList(auth.user).then((res) => {
        setWebsiteList(res.data);
      });
    }
  }, [auth]);
  console.log(websiteList);
  return (
    <div className="main">
      {/* This is the Main Card */}
      <div
        className="card card-body rounded-1 main "
      // style={{ backgroundImage: gradient }}
      >
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2">
            {" "}
            View <FaEye />
          </h6>
          <select
            className="form-control mx-3 w-25"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            <option className="d-flex" value="All">
              <b>All</b>
            </option>
            <option className="d-flex" value="Deposit">
              <b>Deposit</b>
            </option>
            <option className="d-flex" value="Withdraw">
              <b>Withdraw</b>
            </option>
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
          <select
            className="form-control mx-3 w-25"
            value={subAdmin || ""}
            autoComplete="off"
            onChange={handleSubAdmin}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select subAdmin</option>
            {subAdminlist.map((data) => {
              return <option key={data._id} value={data.firstname}>{data.firstname}</option>;
            })}
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
          <select
            className="form-control mx-3 w-25"
            value={bank || ""}
            autoComplete="off"
            onChange={handleBank}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select Bank</option>
            {bankList.map((data) => {
              return <option key={data._id} value={data.bankName}>{data.bankName}</option>;
            })}
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
          <select
            className="form-control mx-3 w-25"
            value={website || ""}
            autoComplete="off"
            onChange={handleWebsite}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select website</option>
            {websiteList.map((data) => {
              return <option key={data._id} value={data.name}>{data.name}</option>;
            })}
          </select>
        </div>
        <div className="d-flex mt-2 pl-5 justify-content-center">
          <p className="fw-bold fs-6 text-nowrap mt-1">
            <FaFilter />
          </p>

          <div className="d-flex gap-2 justify-content-center w-25 ms-5">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control datepicker-with-icon input-group input-group-sm"
              placeholderText="Start Date"
              dateFormat="dd/MM/yyyy"
            />

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="form-control datepicker-with-icon input-group input-group-sm "
              placeholderText="End Date"
              dateFormat="dd/MM/yyyy"
            />

            <div>
              {" "}
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handelDate}
              >
                Filter
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {toggle ? <div className=" container mt-5">
        {/* This is for Deposit Card Normal View */}
        <div
          className="card  rounded-2 mb-2"
          style={{
            boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
            backgroundImage:
              "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
          }}
        >
          <div className="card-body">
            <div className="row">
              <h4 className="col fs-6">Date</h4>
              <h4 className="col fs-6">Amount</h4>
              <h4 className="col fs-6">Transaction Id</h4>
              <h4 className="col fs-6">Gateway</h4>
              <h4 className="col fs-6">CreatedBy</h4>
              <h4 className="col fs-6">User Id</h4>
              <h4 className="col fs-6">Bank</h4>
              <h4 className="col fs-6">Website</h4>
            </div>
          </div>
        </div>

        {documentView.length > 0 ? (
          documentView.map((data, i) => {
            return (
              <div
                className="card rounded-2"
                style={{
                  transition: "transform 0.3s",
                  transform: "scale(1)",
                  boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <p className="col fs-6">
                      {new Date(data.createdAt).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}{" "}
                      {new Date(data.createdAt).getDate()}
                    </p>
                    <p className="col fs-6">₹&nbsp;{data.amount}</p>
                    <p className="col fs-6 text-break">
                      {data.transactionID}
                    </p>
                    <p className="col fs-6">{data.paymentMethod}</p>
                    <p className="col fs-6 text-break">
                      {data.subAdminId}
                    </p>
                    <p className="col fs-6">{data.userId}</p>
                    <p className="col fs-6">{data.bankName}</p>
                    <p className="col fs-6">{data.websiteName}</p>
                  </div>
                  <Link to={`/admindash/${data._id}`} className="col">
                    <button type="button" className="btn btn-primary">
                      <FontAwesomeIcon
                        icon={faEdit}
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center">No Transaction Found</h1>
        )}
      </div> : <div className=" container mt-5">
        {/* This is for Deposit Card Normal View */}
        <div
          className="card  rounded-2 mb-2"
          style={{
            boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
            backgroundImage:
              "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
          }}
        >
          <div className="card-body">
            <div className="row">
              <h4 className="col fs-6">Date</h4>
              <h4 className="col fs-6">Amount</h4>
              <h4 className="col fs-6">Transaction Id</h4>
              <h4 className="col fs-6">Gateway</h4>
              <h4 className="col fs-6">CreatedBy</h4>
              <h4 className="col fs-6">User Id</h4>
              <h4 className="col fs-6">Bank</h4>
              <h4 className="col fs-6">Website</h4>
            </div>
          </div>
        </div>

        {documentFilter.length > 0 ? (
          documentFilter.map((data, i) => {
            return (
              <div
                className="card rounded-2"
                style={{
                  transition: "transform 0.3s",
                  transform: "scale(1)",
                  boxShadow: "20px 3px 22px 1px rgba(0, 0, 0, 0.36)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <p className="col fs-6">
                      {new Date(data.createdAt).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}{" "}
                      {new Date(data.createdAt).getDate()}
                    </p>
                    <p className="col fs-6">₹&nbsp;{data.amount}</p>
                    <p className="col fs-6 text-break">
                      {data.transactionID}
                    </p>
                    <p className="col fs-6">{data.paymentMethod}</p>
                    <p className="col fs-6 text-break">
                      {data.subAdminId}
                    </p>
                    <p className="col fs-6">{data.userId}</p>
                    <p className="col fs-6">{data.bankName}</p>
                    <p className="col fs-6">{data.websiteName}</p>
                  </div>
                  <Link to={`/admindash/${data._id}`} className="col">
                    <button type="button" className="btn btn-primary">
                      <FontAwesomeIcon
                        icon={faEdit}
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center">No Transaction Found</h1>
        )}
      </div>}
    </div>
  );
};

export default AdminDash;
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/header";
import Footer from "./footer";
import CarouselHeader from "./carousel";
import "./land.scss";
import axios from "axios";
import { API_ENDPOINT } from "../config/config";
import moment from "moment";
import circle from "../Images/circle.png";
import profile from "../Images/profile.png";
import salary from "../Images/salary.png";
import salary2 from "../Images/salary2.png";
import salary3 from "../Images/salary3.png";
import days from "../Images/days.png";

class Land extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDiv: "divpost1",
      daysLeft: 0,
      fullName: "",
      totalamountDrawed: 0,
      remainingSal: 0,
    };
  }

  toggleDiv = () => {
    this.setState({
      activeDiv: this.state.activeDiv === "divpost1" ? "divpost2" : "divpost1",
    });
  };

  componentDidMount() {
    this.getData();
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getData() {
    const firstName = localStorage.getItem("name");
    axios
      .get(`${API_ENDPOINT}api/get/user?NAME=${firstName}`, {})
      .then((res) => {
        var today = new Date();
        var sal = Number(res.data.data[0].salary);
        var dr = Number(res.data.data[0].amtWithdrawn);
        var remSal = sal - dr;
        // console.log(remSal);
        this.setState({
          remainingSal: remSal,
        });

        var currentMonth = moment(today).format("M");
        var currentYear = moment(today).format("YYYY");
        var days = this.daysInMonth(currentMonth, currentYear);
        var currentDate = moment(Date.now()).format("DD-MM-YYYY");
        var currentMonthsep = moment(today).format("MM");
        var firstDate = "01" + "-" + currentMonthsep + "-" + currentYear;
        var lastDate = days + "-" + currentMonthsep + "-" + currentYear;
        var dat1 = moment(currentDate, "DD-MM-YYYY"); //creating moment function
        var newdat2 = moment(firstDate, "DD-MM-YYYY"); //creating moment function
        var lastDatenew = moment(lastDate, "DD-MM-YYYY");

        var diff = dat1.diff(newdat2, "days"); //diff in days
        var lastDiff = lastDatenew.diff(dat1, "days");
        var difference = diff + 1;
        var maxAmt = res.data.data[0].salary;
        var availtoWithdraw = maxAmt * (1 / 30) * difference;
        if (availtoWithdraw > 10000) {
          availtoWithdraw = 10000;
          if (availtoWithdraw - res.data.data[0].amtWithdrawn <= 0) {
            availtoWithdraw = 0;
          } else {
            availtoWithdraw = availtoWithdraw - res.data.data[0].amtWithdrawn;
          }
        } else if (availtoWithdraw <= 10000) {
          availtoWithdraw = availtoWithdraw - res.data.data[0].amtWithdrawn;
        }
        this.setState({
          daysLeft: lastDiff,
          daysCurrentMonth: days,
          difference: difference,
          availtoWithdraw: availtoWithdraw,
          data: res.data.data[0],
        });
        // console.log(this.state.data.fullName);
      });
    axios
      .get(`${API_ENDPOINT}api/get/server?NAME=${firstName}`, {})
      .then((res) => {
        // console.log(res.data.data);
        var amountTotalWith = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          amountTotalWith = amountTotalWith + res.data.data[i].amountWithdrawn;
        }
        this.setState({
          totalamountDrawed: amountTotalWith,
        });
      });
  }

  render() {
    return (
      <div>
        <Header></Header>

        <CarouselHeader></CarouselHeader>
        <div style={{ height: "600px" }}>
          <div
            class="row"
            style={{
              marginLeft: "13px",
              fontSize: "1.6em",
              fontWeight: "600",
              marginBottom: "5vh",
            }}
          >
            My Profile
          </div>

          {this.state.data != undefined && (
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 th-mbot-24 th-pad-0">
                <div
                  className="card th-sp-card-m1 th-text-center"
                  style={{ margin: "2px" }}
                >
                  <div>
                    <img
                      className="card-img-top card-dummy-img th-cat-prod-img6"
                      src={profile}
                      alt="Image"
                    />
                  </div>

                  <div class="card-body" style={{ padding: "0px" }}>
                    <div className="item-name-spare-sub4">
                      <label className="">
                        Name : {this.state.data.fullName}{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 th-mbot-24 th-pad-0">
                <div
                  className="card th-sp-card-m1 th-text-center"
                  style={{ margin: "2px" }}
                >
                  <div>
                    <img
                      className="card-img-top card-dummy-img th-cat-prod-img6"
                      src={salary}
                      alt="Image"
                    />
                  </div>

                  <div class="card-body" style={{ padding: "0px" }}>
                    <div className="item-name-spare-sub4">
                      <label className="">
                        Current Salary : Rs.{this.state.data.salary}{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 th-mbot-24 th-pad-0">
                <div
                  className="card th-sp-card-m1 th-text-center"
                  style={{ margin: "2px" }}
                >
                  <div>
                    <img
                      className="card-img-top card-dummy-img th-cat-prod-img6"
                      src={salary2}
                      alt="Image"
                    />
                  </div>

                  <div class="card-body" style={{ padding: "0px" }}>
                    <div className="item-name-spare-sub4">
                      <label className="">
                        Amount Available To Withdraw : Rs.
                        {this.state.availtoWithdraw}
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 th-mbot-24 th-pad-0">
                <div
                  className="card th-sp-card-m1 th-text-center"
                  style={{ margin: "2px" }}
                >
                  <div>
                    <img
                      className="card-img-top card-dummy-img th-cat-prod-img6"
                      src={days}
                      alt="Image"
                    />
                  </div>

                  <div class="card-body" style={{ padding: "0px" }}>
                    <div className="item-name-spare-sub4">
                      <label className="">
                        Days left for Salary : {this.state.daysLeft}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 th-mbot-24 th-pad-0">
                <div
                  className="card th-sp-card-m1 th-text-center"
                  style={{ margin: "2px" }}
                >
                  <div>
                    <img
                      className="card-img-top card-dummy-img th-cat-prod-img6"
                      src={salary3}
                      alt="Image"
                    />
                  </div>

                  <div class="card-body" style={{ padding: "0px" }}>
                    <div className="item-name-spare-sub4">
                      <label className="">
                        Total Amount Withdrawed till Date : Rs.
                        {this.state.totalamountDrawed}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 th-mbot-24 th-pad-0">
                <div
                  className="card th-sp-card-m1 th-text-center"
                  style={{ margin: "2px" }}
                >
                  <div>
                    <img
                      className="card-img-top card-dummy-img th-cat-prod-img6"
                      src={salary2}
                      alt="Image"
                    />
                  </div>

                  <div class="card-body" style={{ padding: "0px" }}>
                    <div className="item-name-spare-sub4">
                      <label className="">
                        Remaining Salary : Rs.{this.state.remainingSal}{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer></Footer>
      </div>
    );
  }
}

export default Land;

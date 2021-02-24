import React, { Component } from "react";
// import { Navbar } from "react-bootstrap";
import "./land.scss";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { API_ENDPOINT } from "../config/config";
import Header from "../Header/header";
import Footer from "./footer";
import moment from "moment";
import postBanner from "../Images/cash.jpeg";
import next from "../Images/next.png";
import Carousel from "react-bootstrap/Carousel";
import PopupView1 from "./PopupView1";

class PostReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      daysCurrentMonth: "",
      difference: "",
      data: "",
      availtoWithdraw: "",
      value: 0,
      popupViewShow1: false,
      postData: [],
      finalTax: "",
    };
  }

  componentDidMount() {
    this.getData();
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  handleNameChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  updateRange = (e, sliderVal) => {
    var taxes = sliderVal * (2 / 100);
    if (this.state.data.taxPaid >= 200) {
      taxes = 0;
    } else {
      var ffftax = taxes + this.state.data.taxPaid;
      if (ffftax >= 200) {
        taxes = taxes - (ffftax - 200);
      }
    }
    this.setState({ value: sliderVal, finalTax: taxes });
  };

  handleSubmit = () => {
    const a = this.state.value;
    const b = this.state.finalTax;
    const c = this.state.data.salary;
    const totalAmt = a + b;
    const remaining = c - b - a;
    localStorage.setItem("remainingSalary", remaining);
    localStorage.setItem("totalAmt", totalAmt);
    localStorage.setItem("existingTax", this.state.data.taxPaid);
    localStorage.setItem("amountWithdrawing", this.state.value);
    localStorage.setItem("tax", this.state.finalTax.toFixed(2));
    localStorage.setItem("amtwithdrawnEarlier", this.state.data.amtWithdrawn);
    localStorage.setItem("salary1", this.state.data.salary);
    this.setState({ popupViewShow1: true });
  };

  getData() {
    const firstName = localStorage.getItem("name");
    axios
      .get(`${API_ENDPOINT}api/get/user?NAME=${firstName}`, {})
      .then((res) => {
        var today = new Date();
        var currentMonth = moment(today).format("M");
        var currentYear = moment(today).format("YYYY");
        var days = this.daysInMonth(currentMonth, currentYear);

        var currentDate = moment(Date.now()).format("DD-MM-YYYY");
        var currentMonthsep = moment(today).format("MM");
        var firstDate = "01" + "-" + currentMonthsep + "-" + currentYear;

        var dat1 = moment(currentDate, "DD-MM-YYYY"); //creating moment function
        var newdat2 = moment(firstDate, "DD-MM-YYYY"); //creating moment function
        var diff = dat1.diff(newdat2, "days"); //diff in days
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
          daysCurrentMonth: days,
          difference: difference,
          availtoWithdraw: availtoWithdraw,
          data: res.data.data[0],
        });
      });
  }
  handlelogout = () => {
    localStorage.clear();
  };
  render() {
    let popupViewClose = () => {
      this.setState({ popupViewShow1: false });
    };
    return (
      <React.Fragment>
        <Header></Header>
        <div class="row postRowWidth" style={{ maxWidth: "100%" }}>
          <div className="pcdPharmacards">
            <span className="card-heading"></span>
          </div>

          <div class="row">
            <div class="col">
              <label className="post-select">Your Name</label>
              <input
                type="text"
                name="postReq"
                value={this.state.data.fullName}
                disabled
                className="post-select"
              />

              <label className="post-select">Your Salary</label>
              <input
                className="post-select"
                type="text"
                name="fullname"
                value={this.state.data.salary}
                disabled
              />

              <label className="post-select">Amount Withdrawn This Month</label>
              <input
                className="post-select"
                type="text"
                value={this.state.data.amtWithdrawn}
                disabled
              />
              {/* <br /> */}
              {Object.keys(this.state.data).length !== 0 ? (
                this.state.data.amtWithdrawn < "10000" &&
                this.state.availtoWithdraw > 0 ? (
                  <div style={{ width: 300, margin: 40 }}>
                    <label className="post-select">
                      Amount Available To Withdraw (Max- Rs.
                      {this.state.availtoWithdraw})
                    </label>
                    <Slider
                      className="post-select"
                      min={0}
                      step={5}
                      max={this.state.availtoWithdraw}
                      onChange={this.updateRange}
                    />
                    Rs.{this.state.value}
                    <button
                      className="submitWithdraw"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <p
                    style={{
                      marginLeft: "47px",
                      marginTop: "10px",
                      color: "red",
                    }}
                  >
                    You have exceeded withdrwal limit
                  </p>
                )
              ) : (
                <p></p>
              )}
            </div>

            <div class="col">
              <Carousel className="landcarouselpost">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    style={{ maxHeight: "390px", minHeight: "360px" }}
                    src={postBanner}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>

        <PopupView1
          show={this.state.popupViewShow1}
          onHide={popupViewClose}
          data={this.state.postData}
          taxprop={this.state.data.taxPaid}
        />
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default PostReq;

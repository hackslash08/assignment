import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Card, Table } from "react-bootstrap";
import "./land.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, Slide } from "react-toastify";
import axios from "axios";
import { API_ENDPOINT } from "../config/config";
import logo from "../Images/logo.svg";
toast.configure({
  autoClose: 1500,
  draggable: false,
  transition: Slide,
  //etc you get the idea
});
export class PopupView1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      amountWithdrawing: "",
      id1: "",
      tax: "",
      taxesPaid: "",
      fullName: "",
      amountEarlier: 0,
      amountWithdrawing: "",
      email: "",
      salary: "",
      remain: 0,
      totalAmount: 0,
      existing: "",
    };
  }

  componentWillUpdate() {
    // console.log(this.props.taxprop);
    this.getData();
    const firstName = localStorage.getItem("name");
    const existTax = localStorage.getItem("existingTax");
    const amount = localStorage.getItem("amountWithdrawing");
    const taxes = localStorage.getItem("tax");
    const amtwearlier = localStorage.getItem("amtwithdrawnEarlier");
    const email = localStorage.getItem("userName");
    const salary1 = localStorage.getItem("salary1");
    const remainingSalary = localStorage.getItem("remainingSalary");
    const totalAmt = localStorage.getItem("totalAmt");
    if (this.state.totalAmount !== localStorage.getItem("totalAmt")) {
      this.setState({
        totalAmount: totalAmt,
      });
    }
    if (this.state.existing !== localStorage.getItem("existingTax")) {
      this.setState({
        existing: existTax,
      });
    }
    if (this.state.remain !== localStorage.getItem("remainingSalary")) {
      this.setState({
        remain: remainingSalary,
      });
    }
    if (this.state.salary !== localStorage.getItem("salary1")) {
      this.setState({
        salary: salary1,
      });
    }
    if (this.state.email !== localStorage.getItem("userName")) {
      this.setState({
        email: email,
      });
    }

    if (this.state.taxesPaid !== localStorage.getItem("tax")) {
      this.setState({
        taxesPaid: taxes,
      });
    }
    if (this.state.fullName !== localStorage.getItem("name")) {
      this.setState({
        fullName: firstName,
      });
    }
    if (
      this.state.amountWithdrawing !== localStorage.getItem("amountWithdrawing")
    ) {
      var taxtwo = amount * (2 / 100);
      var taxthree = taxtwo.toFixed(2);
      this.setState({
        amountWithdrawing: amount,
        tax: taxthree,
      });
    }
    if (
      this.state.amountEarlier !== localStorage.getItem("amtwithdrawnEarlier")
    ) {
      this.setState({
        amountEarlier: amtwearlier,
      });
    }
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  getData() {
    const firstName = localStorage.getItem("name");
    axios
      .get(`${API_ENDPOINT}api/get/user?NAME=${firstName}`, {})
      .then((res) => {
        // console.log(res.data.data[0]);
      });
  }

  handleSubmit = () => {
    const name = localStorage.getItem("name");
    const amtwearlier = localStorage.getItem("amtwithdrawnEarlier");
    const amount = localStorage.getItem("amountWithdrawing");
    const email = localStorage.getItem("userName");
    const taxes = localStorage.getItem("tax");

    const {
      fullName,
      userName,
      company,
      taxPaid,
      amountWithdrawn,
      taxesPaid,
      oneTimeFees,
    } = this.state;
    const postData = {
      fullName: this.state.fullName,
      userName: this.state.email,
      amountWithdrawn: this.state.totalAmount,
      taxPaid: this.state.taxesPaid,
    };
    var jk = Number(this.state.amountEarlier);
    var hl = Number(this.state.totalAmount);
    var totaldeductedamt = hl + jk;
    var am = Number(this.state.existing);
    var pm = Number(this.state.taxesPaid);
    var totalTAX = am + pm;
    // console.log(totalTAX);
    const postData2 = {
      amtWithdrawn: totaldeductedamt,
      taxPaid: totalTAX,
    };
    axios
      .post(`${API_ENDPOINT}api/create/newServer`, postData, {
        data: postData,
      })
      .then((res) => {
        axios
          .put(
            `${API_ENDPOINT}api/edit/user?NAME=${this.state.fullName}`,
            postData2,
            {
              data: postData2,
            }
          )
          .then((res) => {
            toast.success("Successfully Earned", { containerId: "ERROR" });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          });
      });
  };

  handleNameChange = (evt) => {
    
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    const mystyle1 = {
      width: "100%",
      maxHeight: "300px",
      padding: "5px",
      marginTop: "8%",
    };
    return (
      <Modal {...this.props} size="lg" centered width="auto">
        
        <Modal.Header closeButton>
          <div className="container">
            <Row>
              <Col sm={4}>
                <center style={{}}>
                  <Card.Img variant="top" src={logo} style={mystyle1} />
                </center>
              </Col>
              <Col sm={8}>
                <h4>
                  <br />
                  Confirm to earn money
                </h4>
              </Col>
            </Row>
          </div>
        </Modal.Header>

        <Modal.Body>
          {/* {this.state.salary} */}
          <div className="popupCss">
            Amount Withdrawing: Rs.{this.state.amountWithdrawing}
          </div>
          <div className="popupCss">Taxes(2% Charges): Rs.{this.state.tax}</div>
          <div className="popupCss">
            Total Tax amount: Rs.{this.state.taxesPaid}
          </div>
          <div className="popupCss">
            Total amount to be deducted : Rs.{this.state.totalAmount}
          </div>
          <div style={{ fontSize: "0.8em" }}>
            Maximum charges of Rs.200 is applied for each month capped for each
            customer
          </div>
          <div className="popupCss">
            Remaining Salary: Rs.{this.state.remain}
          </div>
          <button className="finalSubmit" onClick={this.handleSubmit}>
            Confirm
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PopupView1;

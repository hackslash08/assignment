import React, { Component } from "react";
// import { Navbar } from "react-bootstrap";
import "./header.scss";
// import auth from "../Auth/auth";
import logo from "../Images/logo.svg";
import { black } from "color-name";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      firstName: "",
    };
  }

  componentDidMount() {
    // const userName = localStorage.getItem("username");
    // const firstName = localStorage.getItem("name");
    // this.setState({
    //   userName,
    //   firstName,
    // });
  }
  handlelogout = () => {
    localStorage.clear();
    console.log(localStorage);
  };
  render() {
    return (
      <React.Fragment>
        <div className="headerfix">
          {/* <div className="header1">
            <span className="spanheader">
              <i aria-hidden="true" class="fas fa-phone-alt"></i> Call Us:
              8571072716
            </span>
            <span className="spanheader3">
              <i aria-hidden="true" class="fas fa-mail-bulk"></i> Mail Us:
              info@vizztechsolutions.com
            </span>
            <span className="spanheader1">
              <i aria-hidden="true" class="fas fa-plus-circle"></i> Join Free
            </span>
            <span className="spanheader2">
              <i aria-hidden="true" class="fas fa-sign-in-alt"></i> Sign In
            </span>
          </div> */}

          <div className="header2">
            <a
              style={{ color: "black", textDecoration: "none" }}
              href="/Landing"
            >
              {" "}
              <img
                style={{ marginLeft: "75px" }}
                className="logoImage"
                width="170"
                height="70"
                src={logo}
                alt=""
                loading="lazy"
              />
            </a>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href="/Landing"
            >
            <span className="postrequirement">My Profile</span></a>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href="/withdraw"
            >
              {" "}
              <span className="discoverpackages">
                Instantly Earn Your Salary
              </span>
            </a>
            <span className="discoverpackages">Terms and Conditions</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;

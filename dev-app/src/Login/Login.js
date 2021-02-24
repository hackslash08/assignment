import React, { Component } from "react";
import "./login.scss";
import axios from "axios";
// import { Redirect } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Images/klear.png";
import { Navbar } from "react-bootstrap";
import auth from "../Auth/auth";
import { API_ENDPOINT } from "../config/config";
// C:\projects\zip-files\ambala-wale\devtest\dev-app\src\Landing\Land.js

toast.configure({
  autoClose: 1500,
  draggable: false,
  transition: Slide,
  //etc you get the idea
});
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formValid: false,
      // errorCount: null,
      errors: {
        email: "",
        password: "",
      },
    };
  }
handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ [name]: value });
  };
  newUserChange = () => {
    this.props.history.push("/newuser");
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    let payload = {
      userName: email,
      password: password,
    };
    // console.log(payload);
    axios.post(`${API_ENDPOINT}api/login/user`, payload).then((res) => {
      // console.log(res.data);

      const userName = res.data.user.userName;
      // const role = res.data.role;
      const company = res.data.user.company;
      const fullName = res.data.user.fullName;
      
      const role = res.data.user.role;
      // console.log(firstName);
      localStorage.setItem("userName", userName);
      // localStorage.setItem("role", role);
      localStorage.setItem("company", company);
      localStorage.setItem("fullname", fullName);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", fullName);

      if(role==='user'){
        return auth.login(() => {
          this.props.history.push("/Landing");
        });
      }
      else{
        return auth.login(() => {
          this.props.history.push("/newUser");
        });
      }
      
    });
  };
  render() {
    const { errors, email, password } = this.state;
    const isEnabled = email.length > 0 && password.length > 0;
    return (
      <React.Fragment>
        <section className="loginpageAlign">
          <div className="loginheader">
            <Navbar className="loginNavbar">
              <Navbar.Brand>
                {" "}
                <img alt="Logo" className="loginlogo" src={logo}></img>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Text className="headertext">
                <p className="timesheetText"> KlearMoney </p>{" "}
                {/* <p className="tracker">Admin Panel</p> */}
              </Navbar.Text>
              <Navbar.Text className="vesriontext">
                
              </Navbar.Text>
            </Navbar>
          </div>
          <div className="wrapper">
            <div className="form-wrapper">
              <h2> Login </h2>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="email">
                  <label htmlFor="email"> Email </label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    className="Logininput"
                    noValidate
                  />
                  {errors.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div className="password">
                  <label htmlFor="password"> Password </label>
                  <input
                    type="password"
                    className="Logininput"
                    name="password"
                    onChange={this.handleChange}
                    noValidate
                  />
                </div>
                <div className="submit">
                  <button disabled={!isEnabled}> Login </button>
                </div>
                <div className="newuser">
                  {/* <a onClick={this.newUserChange}>New User?</a> */}
                </div>
                {/* <div>
                                    <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <a class="nav-link" href="Admin">Admin</a>
                                        </li>
                                    </ul>


                                </div> */}
              </form>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default LoginPage;

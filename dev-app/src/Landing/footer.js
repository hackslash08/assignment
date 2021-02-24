import React, { Component } from "react";
// import { Navbar } from "react-bootstrap";
import "./land.scss";
import fb from "../Images/fb.JPG";
import twitter from "../Images/twitter.JPG";
import linkedin from "../Images/linkedin.JPG";
import logo from "../Images/klear.png";

class Footer extends Component {
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
    // console.log(localStorage);
  };
  render() {
    return (
      <React.Fragment>
       

       <div className="row footerr" style={{maxWidth:"101.1%", minHeight:"300px", backgroundColor:"#eeeeee", margintop:"130vh !important"}}>
          <div className="col" style={{margin: "auto", marginLeft: "20px"}}> 
          <img width="130" height="130" src={logo} alt="" loading="lazy" /><br/>
          <span className="footer-desc">We help you track, and manage your personal finances- all from one app.</span>
          </div>
          <div className="col footerHeader">
            <span className="companyfooter"> Company</span>
            <br/>
            <br/><br/><br/>
            <span className="footerTexts" >Cancellation Policy</span><br/><br/>
            <span className="footerTexts">Terms and Conditions</span><br/><br/>
            <span className="footerTexts">Policy</span><br/><br/>
            {/* <span className="footerTexts">Career</span> */}
            </div>
            <div className="col footerHeader">
            <span className="companyfooter"> Information</span>
            <br/>
            <br/><br/><br/>
            <span className="footerTexts" >Blog</span><br/><br/>
            {/* <span className="footerTexts">All Categories</span><br/><br/> */}
            <span className="footerTexts">Contact</span><br/><br/>
            <span className="footerTexts">About Us</span>
            </div>

            <div className="col footerHeader">
            <span className="companyfooter"> Contact Us</span>
            <br/>
            <br/><br/><br/>
            <img className="contactUs" src={fb} alt="facebook" /><br/><br/>
            <img className="contactUs" src={twitter} alt="twitter" /><br/><br/>
            <img className="contactUs" src={linkedin} alt="linkedin" />
            
            </div>
        </div>
           
          
       
      </React.Fragment>
    );
  }
}

export default Footer;

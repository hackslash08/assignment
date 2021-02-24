import React, { Component } from "react";

import "./land.scss";
import banner3 from "../Images/banner3.jpg";
import banner4 from "../Images/banner4.jpg";
import banner from "../Images/banner1.jpg";
import banner2 from "../Images/banner2jpg.jpg";
import Carousel from "react-bootstrap/Carousel";
// import IntlTelInput from "react-intl-tel-input";
class CarouselHeader extends Component {
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
        <div>
            <Carousel className="landcarousel1">
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-topB"
                style={{ maxHeight: "300px" }}
                src={banner2}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-topB"
                style={{ maxHeight: "300px" }}
                src={banner}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>

          <Carousel className="landcarousel2">
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-topB"
                style={{ maxHeight: "300px" }}
                src={banner3}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-topB"
                style={{ maxHeight: "300px" }}
                src={banner4}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          </div>
          
          
       
      </React.Fragment>
    );
  }
}

export default CarouselHeader;

import { Component } from "react";
import Tilt from "react-tilt";
import "./logo.css";
import logo from "./logo.png";

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <Tilt className="Tilt" options={{ max: 50 }}>
          <div className="Tilt-inner">
            <img src={logo} alt="the logo" />
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;

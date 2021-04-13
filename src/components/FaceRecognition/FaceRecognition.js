import { Component } from "react";
import "./faceRecognition.css";

class FaceRecognition extends Component {
  render() {
    // const { xmin, ymin, width, height } = this.props.boundingBox;
    const xmin = this.props.boundingBox[0];
    const ymin = this.props.boundingBox[1];
    const width = this.props.boundingBox[2];
    const height = this.props.boundingBox[3];
    const test = width === 0 ? "empty" : "not empty";
    const borderValue =
      test === "empty" ? "1px solid transparent" : "1px solid red";
    return (
      <div id="container">
        <div id="imageContainer">
          <img
            id="imageBox"
            src={this.props.resultImage}
            alt=" "
            crossOrigin="true"
          />
        </div>
        <div
          id="boundingBox"
          style={{
            width: width,
            height: height,
            left: xmin,
            top: ymin,
            position: "absolute",
            border: borderValue,
          }}
        ></div>
      </div>
    );
  }
}

export default FaceRecognition;

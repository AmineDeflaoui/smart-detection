import { Component } from "react";
import "./imageLinkForm.css";

class ImageLinkForm extends Component {
  render() {
    return (
      <div className="entry">
        <label htmlFor="detect">Label</label>
        <input
          type="text"
          onChange={this.props.inputOnChange}
          name="detect"
          id="detect"
          placeholder="Enter your image URL here"
        />

        <button
          id="detectButton"
          name="detect"
          onClick={this.props.inputOnSubmit}
        >
          Detect
        </button>
      </div>
    );
  }
}

export default ImageLinkForm;

import { Component } from "react";
import "./rank.css";

class Rank extends Component {
  render() {
    return (
      <p className="rank">{`${this.props.name}, You are Ranked # ${this.props.entries} .`}</p>
    );
  }
}

export default Rank;

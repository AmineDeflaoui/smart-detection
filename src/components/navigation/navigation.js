import { Component } from "react";
import "./navigation.css";

class Navigation extends Component {
  render() {
    return (
      <div id="signOut">
        {this.props.page === "mainPage" ? (
          <button
            type="button"
            className="buttonA"
            onClick={() => {
              this.props.pageChangerClick("signIn");
              this.props.signOutClicked();
            }}
          >
            Sign Out
          </button>
        ) : this.props.page === "signIn" || this.props.page === "signUp" ? (
          <div>
            <button
              type="button"
              className="buttonA"
              onClick={() => this.props.pageChangerClick("signIn")}
            >
              Sign In
            </button>
            <button
              type="button"
              className="buttonA"
              onClick={() => this.props.pageChangerClick("signUp")}
            >
              Sign Up
            </button>
          </div>
        ) : (
          "Error in state"
        )}
      </div>
    );
  }
}

export default Navigation;

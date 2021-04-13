import React from "react";
import "./signIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInMail: "",
      signInPassword: "",
      signInMailError: false,
      signInPasswordError: false,
    };
  }

  onMailChange = (event) => {
    this.setState({ signInMail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    // console.log(this.state);
    fetch("https://hidden-shore-32279.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInMail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data : ", data);
        if (data.length === 2) {
          this.setState({ signInMailError: data[0] });
          this.setState({ signInPasswordError: data[1] });
        } else if (data.length === 1) {
          this.props.loadUser(data[0]);
          this.props.pageChangerClick("mainPage");
        } else {
          window.alert(data);
        }
      });
  };

  onClickSignUp = () => {
    this.props.pageChangerClick("signUp");
  };

  render() {
    return (
      <div className="signIn">
        <form>
          <fieldset>
            <h1>Sign In</h1>
            <label htmlFor="email">Email</label>
            <br />
            <input
              onChange={this.onMailChange}
              type="email"
              name="email"
              id="email"
              autoComplete="true"
              required
            />
            {this.state.signInMailError ? (
              <div>
                <label
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  Envalid Entry !
                </label>
                <br />
              </div>
            ) : (
              <div>
                <label
                  style={{
                    fontSize: "12px",
                  }}
                ></label>
                <br />
              </div>
            )}
            <label htmlFor="password">Password</label>
            <br />
            <input
              onChange={this.onPasswordChange}
              type="password"
              name="password"
              id="password"
              autoComplete="true"
              required
            />
            {this.state.signInPasswordError ? (
              <div>
                <label
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  Invalid Entry !
                </label>
                <br />
              </div>
            ) : (
              <div>
                <label
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                ></label>
                <br />
              </div>
            )}
            <small className="smallPassword">Forgot Password !</small>
            <br />
            <button
              type="button"
              className="button"
              onClick={this.onSubmitSignIn}
            >
              Sign In
            </button>
            <br />
            <small className="smallSignUp" onClick={this.onClickSignUp}>
              Sign Up
            </small>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SignIn;

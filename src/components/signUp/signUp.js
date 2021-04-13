import React from "react";
import "./signUp.css";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      signUpUsername: "",
      signUpMail: "",
      signUpPassword: "",
      signUpUserNameError: false,
      signUpMailError: false,
      signUpPasswordError: false,
    };
  }

  onUsernameChange = (event) => {
    this.setState({ signUpUsername: event.target.value });
  };

  onMailChange = (event) => {
    this.setState({ signUpMail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signUpPassword: event.target.value });
  };

  onSubmitSignUp = () => {
    // console.log(this.state);
    fetch("https://hidden-shore-32279.herokuapp.com/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.signUpUsername,
        email: this.state.signUpMail,
        password: this.state.signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.length === 3) {
          this.setState({ signUpUserNameError: data[0] });
          this.setState({ signUpMailError: data[1] });
          this.setState({ signUpPasswordError: data[2] });
        } else if (data.length === 1) {
          this.props.loadUser(data[0]);
          this.props.pageChangerClick("mainPage");
        } else {
          window.alert(data);
        }
      });
  };

  render() {
    return (
      <div className="signUp">
        <form>
          <fieldset>
            <h1>Sign Up</h1>
            <label htmlFor="username">User Name</label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="true"
              onChange={this.onUsernameChange}
              required
            />
            {this.state.signUpUserNameError ? (
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
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="true"
              onChange={this.onMailChange}
              required
            />
            {this.state.signUpMailError ? (
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
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="true"
              onChange={this.onPasswordChange}
              required
            />
            {this.state.signUpPasswordError ? (
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
                    fontSize: "12px",
                  }}
                ></label>
                <br />
              </div>
            )}
            <button
              type="button"
              className="button"
              onClick={this.onSubmitSignUp}
            >
              Sign Up
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SignIn;

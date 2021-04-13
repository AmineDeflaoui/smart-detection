import React from "react";
import "./App.css";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import Rank from "./components/rank/rank";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";

import Particles from "react-particles-js";

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
      },
    },
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

const initiateUser = {
  search: "",
  urlImage: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
  bounding_box: [0, 0, 0, 0],
  page: "signIn",
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initiateUser;
  }

  loadUser = (data) => {
    // console.log("loadUser : ", data);
    // console.log(data[0].name);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
    // console.log(this.state.user.name);
  };

  onChange = (event) => {
    return this.setState({ search: event.target.value });
  };

  onSubmit = () => {
    // console.log("URL : ", this.state.search);
    this.setState({ urlImage: this.state.search });
    this.setState({ bounding_box: [0, 0, 0, 0] });
    const url = this.state.search;
    fetch("https://hidden-shore-32279.herokuapp.com/deepai", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
      }),
    })
      .then((data) => data.json())
      .then((resp) => {
        // console.log("respond array : ", resp);
        const coord = resp.output.faces[0].bounding_box;
        // const coordBox = [coord[0], coord[1], coord[2], coord[3]];
        // console.log("Final values : ", coordBox);
        // console.log("Xmin: ", coord[0]);
        // console.log("Ymin: ", coord[1]);
        // console.log("Xmax: ", coord[0] + coord[2]);
        // console.log("Ymax: ", coord[1] + coord[3]);
        const fakeImage = document.getElementById("fakeImage");
        const fakeImageWidth = Number(fakeImage.width);
        const fakeImageheight = Number(fakeImage.height);
        // console.log(
        //   "fake width & height : ",
        //   fakeImageWidth,
        //   " ",
        //   fakeImageheight
        // );
        const pourcertages = [
          coord[0] / fakeImageWidth,
          coord[1] / fakeImageheight,
          (coord[0] + coord[2]) / fakeImageWidth,
          (coord[1] + coord[3]) / fakeImageheight,
        ];
        // console.log("pourcentages are : ", pourcertages);

        const Image = document.getElementById("imageBox");
        const ImageWidth = Number(Image.width);
        const ImageHeight = Number(Image.height);
        // console.log("image width & height : ", ImageWidth, " ", ImageHeight);
        var box = [
          ImageWidth * pourcertages[0],
          ImageHeight * pourcertages[1],
          ImageWidth * pourcertages[2],
          ImageHeight * pourcertages[3],
        ];
        // console.log("box : ", box);
        box[2] -= box[0];
        box[3] -= box[1];
        this.setState({ bounding_box: box });
        // console.log("Finale coordination : ", this.state.bounding_box);
      })
      .then(
        setTimeout(() => {
          fetch("https://hidden-shore-32279.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((data) =>
              this.setState(Object.assign(this.state.user, { entries: data }))
            );
        }, 3500)
      );
  };

  pageChanger = (data) => {
    this.setState({ page: data });
  };

  signOutFunction = () => {
    this.setState(initiateUser);
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          page={this.state.page}
          pageChangerClick={this.pageChanger}
          signOutClicked={this.signOutFunction}
        />
        <Logo />
        {this.state.page === "signUp" ? (
          <SignUp
            loadUser={this.loadUser}
            pageChangerClick={this.pageChanger}
          />
        ) : this.state.page === "signIn" ? (
          <div className="container">
            <h1 className="title">Smart AI Face Detection</h1>
            <SignIn
              loadUser={this.loadUser}
              pageChangerClick={this.pageChanger}
            />
            <small className="footer">
              Crafted with{" "}
              <span className="spanHeart">
                <span class="tooltiptext">My Priceless &#128525;</span>
                &hearts;
              </span>{" "}
              by <span className="spanName">Amine DEFLAOUI</span>
            </small>
          </div>
        ) : this.state.page === "mainPage" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              inputOnChange={this.onChange}
              inputOnSubmit={this.onSubmit}
            />
            <FaceRecognition
              boundingBox={this.state.bounding_box}
              resultImage={this.state.urlImage}
            />
            <img id="fakeImage" src={this.state.search} alt=" " />
          </div>
        ) : (
          "Page Not Found ! 404"
        )}
      </div>
    );
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }
}

export default App;

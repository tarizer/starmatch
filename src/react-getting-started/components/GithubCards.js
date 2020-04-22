/* Github Cards Application using class components */

import React, { Component } from "react";
import style from "../assets/github-cards.module.css";

/* const testData = [
  {
    name: "Dan Abramov",
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "@facebook",
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Humu",
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Facebook",
  },
]; */

function CardList({ profiles }) {
  return (
    <>
      {profiles.map((profile, index) => (
        <Card key={index} {...profile} />
      ))}
    </>
  );
}

class Card extends Component {
  render() {
    const profile = this.props;
    return (
      <div className={style.githubProfile}>
        <img src={profile.avatar_url} alt="profile" />
        <div className={style.info}>
          <div className={style.name}>{profile.name}</div>
          <div className={style.company}>{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  // userNameInput = React.createRef();
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await fetch(
      `https://api.github.com/users/${this.state.userName}`
    );
    const data = await resp.json();
    this.setState({ userName: "" });
    // document.querySelector("input").placeholder = "Github username";
    console.log(data);
    if (data.message !== "Not Found") {
      this.props.onSubmit(data);
    } else {
      console.log("User not found");
    }

    // console.log(this.userNameInput.current.value);
  };
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Github username"
            value={this.state.userName}
            onChange={(event) =>
              this.setState({ userName: event.target.value })
            }
            // ref={this.userNameInput}
          />
          <button type="submit">Add card</button>
        </form>
      </>
    );
  }
}

class GithubCards extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     profiles: testData,
  //   };
  // }
  state = {
    // Shortcuts, not part of Javascript, yet
    profiles: [],
  };
  addNewProfile = (newProfile) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, newProfile],
    }));
  };
  render() {
    document.querySelector("title").innerText = this.props.title.slice(2);
    return (
      <>
        <div className={style.header}>{this.props.title}</div>
        <div>
          <span role="img" aria-label="React">
            ⚛️
          </span>{" "}
          Hello from Github Cards
          <h3>Todo: Switch from classes to hooks</h3>
        </div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </>
    );
  }
}

export default GithubCards;

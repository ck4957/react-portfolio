import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat();
    }
    if (this.props.sharedBasicInfo) {
      var profilepic = "images/" + this.props.sharedBasicInfo.image;
      var awsDvaBadge = "images/" + this.props.sharedBasicInfo.aws_certifications[0];
      var awsSaaBadge = "images/" + this.props.sharedBasicInfo.aws_certifications[1];
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    }
    const HeaderTitleTypeAnimation = React.memo(() => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    return (
      <header id="home" style={{ height: window.innerHeight - 100, display: 'block' }}>
        <div className="row aligner" style={{ height: '100%' }}>
          <div className="col-sm-12 col-md-4 mb-5">
            <div className="d-block">
            <div className="polaroid center">
              <span style={{ cursor: "auto" }}>
                <img
                  height="300px"
                  src={profilepic}
                  alt="Avatar placeholder"
                />
              </span>
            </div>
            </div>
            <div className="d-block">
              <div className="d-inline">
                <span style={{ cursor: "auto" }}>
                    <img
                      height="120px"
                      src={awsDvaBadge}
                      alt="AWS Developer Certified"
                    />
                </span>
              </div>
              <div className="d-inline">
                <span style={{ cursor: "auto" }}>
                    <img
                      height="120px"
                      src={awsSaaBadge}
                      alt="AWS Solutions Architect Certified"
                    />
                </span>
            </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-7">

            <div className="col-md-12 d-block mb-5">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br />
                  <span className="wave">{hello} :) </span>
                  <br />
                  <br />
                  {about}
                </div>
              </div>
            </div>
            <div className="col-md-12 d-block">
              <div>
                <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
                <br />
                <h1 className="mb-0">
                  <Typical steps={[name]} wrapper="p" />
                </h1>
                <div className="title-container">
                  <HeaderTitleTypeAnimation />
                </div>
                <Switch
                  checked={this.state.checked}
                  onChange={this.onThemeSwitchChange}
                  offColor="#baaa80"
                  onColor="#353535"
                  className="react-switch mx-auto"
                  width={90}
                  height={40}
                  uncheckedIcon={
                    <span
                      className="iconify"
                      data-icon="twemoji:owl"
                      data-inline="false"
                      style={{
                        display: "block",
                        height: "100%",
                        fontSize: 25,
                        textAlign: "end",
                        marginLeft: "20px",
                        color: "#353239",
                      }}
                    ></span>
                  }
                  checkedIcon={
                    <span
                      className="iconify"
                      data-icon="noto-v1:sun-with-face"
                      data-inline="false"
                      style={{
                        display: "block",
                        height: "100%",
                        fontSize: 25,
                        textAlign: "end",
                        marginLeft: "10px",
                        color: "#353239",
                      }}
                    ></span>
                  }
                  id="icon-switch"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

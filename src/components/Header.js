import React, { useState, useEffect } from "react";
import Typed from "react-typed";
import Switch from "react-switch";

const Header = ({ sharedData, sharedBasicInfo, resumeBasicInfo }) => {
  const [checked, setChecked] = useState(false);
  const [titles, setTitles] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [awsDvaBadge, setAwsDvaBadge] = useState("");
  const [awsSaaBadge, setAwsSaaBadge] = useState("");
  const [awsDeaBadge, setAwsDeaBadge] = useState("");
  const [azureAiBadge, setAzureAiBadge] = useState("");
  const [name, setName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [hello, setHello] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (sharedBasicInfo) {
      setName(sharedBasicInfo?.name);
      setTitles(sharedBasicInfo?.titles.map((x) => x.toUpperCase()));
      setProfilePic("images/" + sharedBasicInfo.image);
      setAwsDvaBadge("images/" + sharedBasicInfo.certifications[0]);
      setAwsSaaBadge("images/" + sharedBasicInfo.certifications[1]);
      setAwsDeaBadge("images/" + sharedBasicInfo.certifications[2]);
      setAzureAiBadge("images/" + sharedBasicInfo.certifications[3]);
    }
    if (resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.about);
      setHello(resumeBasicInfo.description_header);
      setAbout(resumeBasicInfo.description);
    }
  }, [sharedData, sharedBasicInfo, resumeBasicInfo]);

  const onThemeSwitchChange = (checked) => {
    setChecked(checked);
    setTheme();
  };

  const setTheme = () => {
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  };

  const headerTitleAnimation = (
    <Typed
      className="title-styles"
      strings={titles}
      typeSpeed={100}
      backSpeed={50}
      loop
    />
  );

  return (
    <header
      id="home"
      style={{ height: window.innerHeight - 100, display: "block" }}
    >
      <div className="row aligner" style={{ height: "100%" }}>
        <div className="col-sm-12 col-md-4 mb-5">
          <div className="d-block">
            <div className="polaroid center">
              <span style={{ cursor: "auto" }}>
                <img height="300px" src={profilePic} alt="Avatar placeholder" />
              </span>
            </div>
          </div>
          <div className="d-block">
            <div className="d-inline">
              <span style={{ cursor: "auto" }}>
                <img
                  height="120px"
                  src={awsDeaBadge}
                  alt="AWS Certified Data Engineer Associate"
                />
              </span>
            </div>
            <div className="d-inline">
              <span style={{ cursor: "auto" }}>
                <img
                  height="120px"
                  src={awsDvaBadge}
                  alt="AWS Certified Developer Associate"
                />
              </span>
            </div>
            <div className="d-inline">
              <span style={{ cursor: "auto" }}>
                <img
                  height="120px"
                  src={awsSaaBadge}
                  alt="AWS Certified Solutions Architect Associate"
                />
              </span>
            </div>
            <div className="d-inline">
              <span style={{ cursor: "auto" }}>
                <img
                  height="120px"
                  src={azureAiBadge}
                  alt="Microsoft Certified Azure AI Fundamentals"
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
                  whiteSpace: "pre-wrap",
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
              <span
                className="iconify header-icon"
                data-icon="la:laptop-code"
                data-inline="false"
              ></span>
              <br />
              <h1 className="mb-0">
                <Typed
                  strings={[sharedBasicInfo?.name || ""]}
                  typeSpeed={100}
                  backSpeed={50}
                  loop={false}
                />
              </h1>
              <div className="title-container">{headerTitleAnimation}</div>
              <Switch
                checked={checked}
                onChange={onThemeSwitchChange}
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
};

export default Header;

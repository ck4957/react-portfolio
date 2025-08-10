import React, { useState, useEffect, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
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
  //const [sectionName, setSectionName] = useState("");
  const [hello, setHello] = useState("");
  const [about, setAbout] = useState("");

  if (sharedBasicInfo && sharedBasicInfo.social) {
    var networks = sharedBasicInfo?.social?.map(function (network) {
      console.log(network);
      return (
        <span key={network.name} className="m-4">
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.class}></i>
          </a>
        </span>
      );
    });
  }

  useEffect(() => {
    if (sharedBasicInfo) {
      setName(sharedBasicInfo?.name);
      setTitles(sharedBasicInfo?.titles || []);
      setProfilePic("images/" + sharedBasicInfo.image);
      setAwsDvaBadge("images/" + sharedBasicInfo.certifications[0]);
      setAwsSaaBadge("images/" + sharedBasicInfo.certifications[1]);
      setAwsDeaBadge("images/" + sharedBasicInfo.certifications[2]);
      setAzureAiBadge("images/" + sharedBasicInfo.certifications[3]);
    }
    if (resumeBasicInfo) {
      //setSectionName(resumeBasicInfo.section_name.about);
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

  const HeaderTitleTypeAnimation = useMemo(() => {
    if (!titles || titles.length === 0) return null;
    
    const sequence = titles.reduce((acc, title) => {
      acc.push(title.toUpperCase(), 1500);
      return acc;
    }, []);
    
    return (
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        speed={50}
        className="title-styles"
        repeat={Infinity}
      />
    );
  }, [titles]);

  return (
    <header id="home" style={{ height: window.innerHeight, display: "block" }}>
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
                <br />
                {networks}
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
                <TypeAnimation
                  sequence={[name]}
                  wrapper="p"
                  speed={50}
                  repeat={1}
                />
              </h1>
              <div className="title-container">{HeaderTitleTypeAnimation}</div>
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

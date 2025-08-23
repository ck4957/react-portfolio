import React, { useState, useEffect } from "react";
import { ReactTyped as Typed } from "react-typed";
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
  const [hello, setHello] = useState("");
  const [about, setAbout] = useState("");

  let networks = null;
  if (sharedBasicInfo && sharedBasicInfo.social) {
    networks = sharedBasicInfo?.social?.map(function (network) {
      return (
        <span key={network.name} className="mx-3">
          <a href={network.url} target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform inline-block">
            <i className={network.class}></i>
          </a>
        </span>
      );
    });
  }

  useEffect(() => {
    if (sharedBasicInfo) {
      setName(sharedBasicInfo?.name);
      setTitles(
        sharedBasicInfo?.titles.map((x) => x.toUpperCase())
      );
      setProfilePic("images/" + sharedBasicInfo.image);
      if (sharedBasicInfo.certifications) {
        setAwsDvaBadge("images/" + sharedBasicInfo.certifications[0]);
        setAwsSaaBadge("images/" + sharedBasicInfo.certifications[1]);
        setAwsDeaBadge("images/" + sharedBasicInfo.certifications[2]);
        setAzureAiBadge("images/" + sharedBasicInfo.certifications[3]);
      }
    }
    if (resumeBasicInfo) {
      setHello(resumeBasicInfo.description_header);
      setAbout(resumeBasicInfo.description);
    }
  }, [sharedData, sharedBasicInfo, resumeBasicInfo]);

  const onThemeSwitchChange = (checked) => {
    setChecked(checked);
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme = body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  };

  const headerTitleAnimation = titles.length > 0 ? (
    <Typed
      className="text-yellow-400 text-2xl font-semibold"
      strings={titles}
      typeSpeed={100}
      backSpeed={50}
      backDelay={1500}
      loop
    />
  ) : null;

  return (
    <header id="home" className="min-h-screen flex items-center bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile and Badges */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <div className="inline-block bg-white rounded-2xl p-6 shadow-lg">
                {profilePic && (
                  <img 
                    className="w-64 h-64 object-cover rounded-xl mx-auto" 
                    src={profilePic} 
                    alt="Profile picture" 
                  />
                )}
              </div>
            </div>
            
            {/* Certification Badges */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
              {awsDeaBadge && (
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                  <img
                    className="w-full h-20 object-contain"
                    src={awsDeaBadge}
                    alt="AWS Certified Data Engineer Associate"
                  />
                </div>
              )}
              {awsDvaBadge && (
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                  <img
                    className="w-full h-20 object-contain"
                    src={awsDvaBadge}
                    alt="AWS Certified Developer Associate"
                  />
                </div>
              )}
              {awsSaaBadge && (
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                  <img
                    className="w-full h-20 object-contain"
                    src={awsSaaBadge}
                    alt="AWS Certified Solutions Architect Associate"
                  />
                </div>
              )}
              {azureAiBadge && (
                <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow">
                  <img
                    className="w-full h-20 object-contain"
                    src={azureAiBadge}
                    alt="Microsoft Certified Azure AI Fundamentals"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Terminal Card */}
          <div className="w-full order-1 lg:order-2">
            <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-8 text-white font-mono">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-green-400 text-lg">$</span> 
                    <span className="ml-2 text-gray-300 text-lg">{hello}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-400 text-lg">$</span> 
                    <span className="ml-2 text-gray-300 text-lg">whoami</span>
                  </div>
                  <div className="text-blue-400 text-4xl font-bold mb-4 pl-4">
                    {name}
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-400 text-lg">$</span> 
                    <span className="ml-2 text-gray-300 text-lg">cat roles.txt</span>
                  </div>
                  <div className="pl-4 mb-6">
                    {headerTitleAnimation}
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-green-400 text-lg">$</span> 
                    <span className="ml-2 text-gray-300 text-lg">cat about.txt</span>
                  </div>
                  <div className="text-gray-300 leading-relaxed pl-4 text-lg">
                    {about}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

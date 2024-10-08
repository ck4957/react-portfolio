import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';

const App = () => {
  const [sharedData, setSharedData] = useState({});
  const [resumeData, setResumeData] = useState({});
  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const response = await fetch('portfolio_shared_data.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        setSharedData(data);
        document.title = `${data?.basic_info?.name}`;
      } catch (error) {
        alert(error);
      }
    };
    
    const fetchResumeData = async () => {
      try {
        const response = await fetch('res_primaryLanguage.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        alert(error);
      }
    }

    fetchSharedData();
    fetchResumeData();
  }, []);

  return (
    <div>
    <Header sharedData={sharedData}
            resumeBasicInfo={resumeData.basic_info}
            sharedBasicInfo={sharedData.basic_info} />
    {/* <About 
      resumeBasicInfo={this.state.resumeData.basic_info}
      sharedBasicInfo={this.state.sharedData.basic_info}
    /> */}
    <Projects
      resumeProjects={resumeData.projects}
      resumeBasicInfo={resumeData.basic_info}
    />
    <Skills
      sharedSkills={sharedData.skills}
      resumeBasicInfo={resumeData.basic_info}
    />
    <Experience
      resumeExperience={resumeData.experience}
      resumeBasicInfo={resumeData.basic_info}
    />
    <Footer sharedBasicInfo={sharedData.basic_info} />
  </div>
);
};

export default App;

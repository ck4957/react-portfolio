import React, { useState, useEffect } from 'react';
import './App-minimal.scss';
import Navigation from './components/Navigation.jsx';
import Header from './components/Header.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import ContactForm from './components/ContactForm.jsx';

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
    <Navigation />
    <Header sharedData={sharedData}
            resumeBasicInfo={resumeData.basic_info}
            sharedBasicInfo={sharedData.basic_info} />
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
    <ContactForm />
    <Footer sharedBasicInfo={sharedData.basic_info} />
  </div>
);
};

export default App;

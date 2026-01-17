import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

const HomePage = ({ sharedData, resumeData }) => {
  const location = useLocation();

  // Scroll to blog section if hash is present
  useEffect(() => {
    if (location.hash === '#blog') {
      const blogSection = document.getElementById('blog');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <Header sharedData={sharedData}
              resumeBasicInfo={resumeData.basic_info}
              sharedBasicInfo={sharedData.basic_info} />
      <Blog />
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
    <Routes>
      <Route path="/" element={<HomePage sharedData={sharedData} resumeData={resumeData} />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
};

export default App;

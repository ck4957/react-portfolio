import React from 'react';
import './ExperienceCard.scss';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="experience-card">
      <div className="experience-header">
        <div className="company-info">
          <div className="company-logo">
            {experience.companylogo ? (
              <img src={experience.companylogo} alt={experience.company} />
            ) : (
              <div className="company-initial">
                {experience.company.charAt(0)}
              </div>
            )}
          </div>
          <div className="company-details">
            <h3 className="role-title">{experience.role}</h3>
            <h4 className="company-name">{experience.company}</h4>
            <p className="duration">{experience.date}</p>
          </div>
        </div>
        <div className="experience-type">
          {experience.type || 'Full-time'}
        </div>
      </div>
      
      <div className="experience-content">
        <p className="description">{experience.description}</p>
        
        {experience.mainTech && (
          <div className="main-tech">
            <span className="tech-label">Primary Technologies:</span>
            <div className="tech-list">
              {experience.mainTech.map((tech, index) => (
                <span key={index} className="tech-tag primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {experience.technologies && (
          <div className="other-tech">
            <span className="tech-label">Also used:</span>
            <div className="tech-list">
              {experience.technologies.map((tech, index) => (
                <span key={index} className="tech-tag secondary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;

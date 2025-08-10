import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Modern ProjectCard component with hover effects and accessibility
 * Demonstrates contemporary UI patterns and responsive design
 */
const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies = [], 
  year, 
  url,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article 
      className={`
        relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden
        cursor-pointer transition-all duration-300 ease-in-out transform
        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]
        focus:outline-none focus:ring-4 focus:ring-blue-500/50
        ${isHovered ? 'ring-2 ring-blue-300' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View project ${title}`}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={`${title} preview`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl text-gray-300 dark:text-gray-500">
              📋
            </div>
          </div>
        )}
        
        {/* Year Badge */}
        {year && (
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium">
            {year}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium"
              >
                {tech.name || tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Project Link */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
          <span>View Project</span>
          <svg 
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ])),
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  url: PropTypes.string,
  onClick: PropTypes.func
};

export default ProjectCard;
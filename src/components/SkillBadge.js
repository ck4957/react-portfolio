import React from 'react';
import PropTypes from 'prop-types';

/**
 * Modern, reusable SkillBadge component
 * Showcases component architecture best practices
 */
const SkillBadge = ({ 
  name, 
  level = 50, 
  icon, 
  variant = 'primary',
  size = 'medium',
  showLevel = false 
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      success: 'bg-green-500 text-white',
      modern: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
    };
    return variants[variant] || variants.primary;
  };

  const getSizeClasses = () => {
    const sizes = {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-2 text-sm',
      large: 'px-4 py-3 text-base'
    };
    return sizes[size] || sizes.medium;
  };

  return (
    <div className={`
      inline-flex items-center gap-2 rounded-lg shadow-sm transition-all duration-200
      hover:shadow-md hover:scale-105 cursor-pointer
      ${getVariantClasses()} ${getSizeClasses()}
    `}>
      {icon && (
        <i className={`${icon} text-lg`} aria-hidden="true" />
      )}
      <span className="font-medium">{name}</span>
      {showLevel && (
        <span className="text-xs opacity-80 ml-1">({level}%)</span>
      )}
    </div>
  );
};

SkillBadge.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number,
  icon: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'modern']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showLevel: PropTypes.bool
};

export default SkillBadge;
import React, { Component } from "react";

// Modern Image Carousel Component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  if (!images || images.length === 0) return null;
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
     
      
      {/* Image container */}
      <div className="relative aspect-video bg-gray-100">
        <img
          src={images[currentIndex]}
          alt={`Project screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Modal Component using Tailwind
const Modal = ({ show, onHide, children }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl max-h-[90vh] overflow-auto relative shadow-2xl">
        <button
          onClick={onHide}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all duration-200"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

class ProjectDetailsModal extends Component {
  render() {
    let technologies = null;
    let images = null;
    let title = "";
    let description = "";
    let url = "";
    let tech = null;
    
    if (this.props.data) {
      technologies = this.props.data.technologies;
      images = this.props.data.images;
      title = this.props.data.title;
      description = this.props.data.description;
      url = this.props.data.url;
      
      if (this.props.data.technologies) {
        tech = technologies.map((icons, i) => {
          return (
            <span key={i} className="inline-flex items-center px-4 py-2 m-1 text-base font-medium bg-blue-100 text-blue-800 rounded-full">
              <i className={`${icons.class} mr-2`}></i>
              {icons.name}
            </span>
          );
        });
      }
    }
    
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <div className="p-8">
          {/* Image Carousel */}
          <div className="mb-8">
            <ImageCarousel images={images} />
          </div>
          
          {/* Project Details */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <span className="mr-2">View Live</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
            
            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap">
                {tech}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;

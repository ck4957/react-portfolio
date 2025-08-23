import React, { Component } from "react";

class About extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var profilepic = "images/" + this.props.sharedBasicInfo.image;
    }
    if (this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.about;
      var hello = this.props.resumeBasicInfo.description_header;
      var about = this.props.resumeBasicInfo.description;
    }

    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">
            <span>{sectionName}</span>
          </h1>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  className="w-64 h-64 object-cover rounded-xl mx-auto"
                  src={profilepic}
                  alt="Avatar placeholder"
                />
              </div>
            </div>

            <div className="w-full">
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
                      <span className="text-green-400 text-base">$</span> 
                      <span className="ml-2 text-gray-300 text-base">cat intro.txt</span>
                    </div>
                    <div className="text-blue-400 text-7xl font-bold mb-4 pl-4">
                      {hello} 🙂
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-400 text-base">$</span> 
                      <span className="ml-2 text-gray-300 text-base">cat description.txt</span>
                    </div>
                    <div className="text-gray-300 leading-loose pl-4 text-xl font-trebuchet text-justify">
                      {about}
                    </div>
                    
                    <div className="flex items-center mt-6">
                      <span className="text-green-400 text-base">$</span> 
                      <span className="ml-2 text-gray-300 text-base">cat additional-info.txt</span>
                    </div>
                    <div className="text-gray-300 leading-loose pl-4 text-base font-trebuchet mt-4">
                      <p className="mb-4">
                        I'm currently focused on front-end engineering —
                        building accessible, performant, and reusable UI using
                        Lit, TypeScript, SCSS and component-driven workflows
                        (Storybook). I care about performance optimizations,
                        testing (Playwright/Jest), and delivering polished user
                        experiences.
                      </p>
                      <p className="text-yellow-400">
                        <a
                          href="https://github.com/ck4957/react-portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-yellow-300 transition-colors"
                        >
                          View code
                        </a>
                        <span className="text-gray-500 mx-2">•</span>
                        <a
                          href="https://www.linkedin.com/in/kularchirag/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-yellow-300 transition-colors"
                        >
                          Connect on LinkedIn
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;

import React, { Component } from "react";

class Skills extends Component {
  render() {
    if (this.props.sharedSkills && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.skills;
      var skills = this.props.sharedSkills.icons.map(function (skills, i) {
        return (
          <div className="flex flex-col items-center p-4" key={i}>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 group border border-gray-600">
              <i 
                className={`${skills.class} text-5xl text-gray-200 group-hover:text-blue-400 transition-colors duration-300`}
              ></i>
            </div>
            <p className="text-lg font-medium text-gray-300 mt-3 text-center">
              {skills.name}
            </p>
          </div>
        );
      });
    }

    return (
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              {sectionName}
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 justify-items-center">
            {skills}
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;

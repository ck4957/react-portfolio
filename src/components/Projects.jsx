import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal.jsx";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      var projects = this.props.resumeProjects.map(function (projects) {
        return (
          <div
            className="w-full md:w-1/2 lg:w-1/3 p-4"
            key={projects.title}
            style={{ cursor: "pointer" }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative" onClick={() => detailsModalShow(projects)}>
                <img
                  src={projects.images[0]}
                  alt="projectImages"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 right-2 bg-primary-600 text-white text-md px-2 py-1 rounded-full">
                  {projects.startDate}
                </span>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mt-2">
                    {projects.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span>{sectionName}</span>
            </h1>
          </div>
          <div className="flex flex-wrap -mx-4">
            {projects}
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;

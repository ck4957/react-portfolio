import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

class Experience extends Component {
  render() {
    if (this.props.resumeExperience && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.experience;
      var work = this.props.resumeExperience.map(function (work, i) {
        const technologies = work.technologies;
        const mainTechnologies = work.mainTech;

        var mainTech = mainTechnologies.map((technology, i) => {
          return (
            <span className="inline-block bg-primary-600 text-white text-md px-3 py-1 rounded-full mr-2 mb-2" key={i}>
              {technology}
            </span>
          );
        });
        var tech = technologies.map((technology, i) => {
          return (
            <span className="inline-block bg-gray-200 text-gray-700 text-md px-3 py-1 rounded-full mr-2 mb-2" key={i}>
              {technology}
            </span>
          );
        });
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={work.years}
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={<i className="fab fa-angular experience-icon"></i>}
            key={i}
          >
            <div style={{ textAlign: "left", marginBottom: "4px" }}>
              {mainTech}
            </div>

            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {work.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {work.company}
            </h4>
            <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <section id="resume" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {sectionName}
            </h1>
          </div>
          <div className="max-w-4xl mx-auto">
            <VerticalTimeline>
              {work}
              <VerticalTimelineElement
                iconStyle={{
                  background: "#3b82f6",
                  color: "#fff",
                  textAlign: "center",
                }}
                icon={
                  <i className="fas fa-hourglass-start experience-icon"></i>
                }
              />
            </VerticalTimeline>
          </div>
        </div>
      </section>
    );
  }
}

export default Experience;

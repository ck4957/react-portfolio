import React, { Component } from "react";

class Skills extends Component {
  render() {
    if (this.props.sharedSkills && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.skills;
      
      // Render categorized skills
      var skillCategories = this.props.sharedSkills.categories?.map(function (category, idx) {
        var icons = category.icons.map(function (skill, i) {
          return (
            <li className="list-inline-item mx-3" key={i}>
              <span>
                <div className="text-center skills-tile">
                  <i className={skill.class} style={{ fontSize: "220%" }}>
                    <p
                      className="text-center"
                      style={{ fontSize: "30%", marginTop: "4px" }}
                    >
                      {skill.name}
                    </p>
                  </i>
                </div>
              </span>
            </li>
          );
        });

        return (
          <div key={idx} className="skill-category-group">
            <div className="skill-category-name">
              <h3>{category.name}</h3>
            </div>
            <div className="skill-category-icons">
              <ul className="list-inline skill-icon">{icons}</ul>
            </div>
          </div>
        );
      });
    }

    return (
      <section id="skills">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="section-title">
              <span className="text-white">{sectionName}</span>
            </h1>
          </div>
          {skillCategories}
        </div>
      </section>
    );
  }
}

export default Skills;

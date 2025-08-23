import React, { Component } from "react";

class Footer extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="mx-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform inline-block">
              <i className={network.class}></i>
            </a>
          </span>
        );
      });
    }

    return (
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8 bg-gray-800 inline-block px-8 py-4 rounded-full">
              {networks}
            </div>

            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 text-lg">
                Copyright &copy; {new Date().getFullYear()}{" "}
                {this.props.sharedBasicInfo
                  ? this.props.sharedBasicInfo.name
                  : "???"}
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

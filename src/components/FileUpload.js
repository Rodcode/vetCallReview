import React, { Component } from "react";

class FileUpload extends Component {
  handleFileUpload = (e) => {
    e.preventDefault();
    this.props.handleAudio(e.target.audio.value);
  };

  render() {
    return (
      <div>
        <h3>Drag Drop</h3>
        <form onSubmit={this.handleFileUpload}>
          <input type="file" name="audio"></input>
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;

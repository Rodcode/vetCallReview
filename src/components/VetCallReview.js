import React, { Component } from "react";
import Header from "./Header";
import FileUpload from "./FileUpload";
import ListHistory from "./ListHistory";
import Transcript from "./Transcript";
import Analytics from "./Analytics";
import { TRANSCRIPT, ANALYTICS } from "../fakeDB";

class VetCallReview extends Component {
  state = {
    practiceName: this.props.practiceName,
    logoUrl: this.props.logoUrl,
    transcript: this.props.transcript,
    analytics: this.props.analytics,
    history: this.props.history,
  };

  handleAudio = (audioFile) => {
    // const transcript = trancriptAPI(audioFile); return string
    // update this.state.transcript = transcript
    // const analytics = analyticsAPI(transcript); return JSON obj
    // update this.state.analytics = analytics
    console.log(audioFile);
  };
  render() {
    const { practiceName, logoUrl, transcript, analytics, history } =
      this.state;
    const petOwner = analytics["critical_details"]["pet_owner_name"];
    return (
      <div>
        <Header practiceName={practiceName} />
        <FileUpload handleAudio={this.handleAudio} />
        <ListHistory history={history} />
        <Transcript transcript={transcript} petOwner={petOwner} />
        <Analytics analytics={analytics} />
      </div>
    );
  }
}

VetCallReview.defaultProps = {
  practiceName: "[Veterinary Practices Name]",
  logoUrl: "",
  file: {},
  transcript: TRANSCRIPT,
  analytics: ANALYTICS,
  history: [],
};

export default VetCallReview;

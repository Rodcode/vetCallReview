import React, { Component } from "react";
import Grade from "./Grade";
import CriticalDetails from "./CriticalDetails";

class Analytics extends Component {
  state = this.props.analytics;

  formatCategory = (cat) => {
    let arr = cat.replaceAll("_", " ").toUpperCase();

    return arr + ":";
  };

  formatItem = (item) => {
    if (typeof item === "string") {
      let arr = item.split("");
      arr[0] = arr[0].toUpperCase();

      return arr.join("") + ".";
    }
    return item;
  };

  createContentArray = (obj) => {
    let content = [];
    for (const i in obj) {
      content.push(this.formatCategory(i));
      if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
        const temp = this.createContentArray(obj[i]);
        for (const j in temp) {
          content.push(temp[j]);
        }
      } else if (Array.isArray(obj[i])) {
        let newArr = obj[i].map((obj) => this.formatItem(obj));
        content = [...content, ...newArr];
      } else {
        content.push(this.formatItem(obj[i]));
      }
    }
    return content;
  };

  render() {
    const analytics = this.createContentArray(this.state);
    const grade = analytics.pop();
    const tone = analytics[1].toUpperCase().replace(".", "");
    analytics.pop();
    analytics.pop();
    const details = analytics.slice(2);

    return (
      <div>
        <Grade grade={grade} tone={tone} />
        <CriticalDetails details={details} />
      </div>
    );
  }
}

export default Analytics;

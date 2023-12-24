import React, { Component } from "react";

export default class MapField extends Component {
    handleClick = e => {
    console.log("teate")
    const value = "1";
    this.props.onClick({ ...this.props.field, value });
  };
  render() {
    const { field } = this.props;
    return (
      <input
        className="field"
        value={field.value || ""}
        readOnly="True"
        onClick={this.handleClick}
      />
    );
  }
}

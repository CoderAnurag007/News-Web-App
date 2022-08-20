import React, { Component } from "react";
import "./loader.css";
import loading from "../../Spinner-2.gif";

export default class Loader extends Component {
  render() {
    return (
      <div className="spinner my-3">
        <img src={loading} alt="" />
      </div>
    );
  }
}

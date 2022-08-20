import React, { Component } from "react";
import "./quote.css";

export default class Quote extends Component {
  constructor() {
    super();
    this.state = {
      quote: "",
      author: "",
    };
  }
  async componentDidMount() {
    let url = "https://api.quotable.io/random?maxlen=50";
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      quote: parsedData.content,
      author: parsedData.author,
    });
  }
  render() {
    return (
      <div className="quote-container">
        <h1>A Quote For You</h1>
        <h2>{this.state.quote}</h2>
        <br />
        <small>Author - {this.state.author} </small>
      </div>
    );
  }
}

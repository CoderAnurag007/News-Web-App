import "./App.css";
import LoadingBar from "react-top-loading-bar";
import React, { Component } from "react";
import Navbar from "./components/Navigation/Navbar";
import News from "./components/News/News";
import { Route, Routes } from "react-router-dom";
import Quote from "./components/Quote/Quote";
// import dotenv from "dotenv";
export default class App extends Component {
  pagesize = 15;
  apiKey = process.env.REACT_APP_API_KEY;

  state = {
    progress: 0,
  };
  setprogress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <LoadingBar
          color="rgb(0,255,0)"
          progress={this.state.progress}
          height={4}
        />
        <Quote />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                key={"general"}
                pagesize={this.pagesize}
                country={"in"}
                category={"general"}
              />
            }
          />
          <Route
            path="/Science"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                key={"science"}
                pagesize={this.pagesize}
                country={"in"}
                category={"science"}
              />
            }
          />
          <Route
            path="/Entertainment"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                key={"entertainment"}
                pagesize={this.pagesize}
                country={"in"}
                category={"entertainment"}
              />
            }
          />
          <Route
            path="/Sports"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                key={"sports"}
                pagesize={this.pagesize}
                country={"in"}
                category={"sports"}
              />
            }
          />
          <Route
            path="/Business"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                key={"business"}
                pagesize={this.pagesize}
                country={"in"}
                category={"business"}
              />
            }
          />
          <Route
            key={"health"}
            path="/Health"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                pagesize={this.pagesize}
                country={"in"}
                category={"health"}
              />
            }
          />
          <Route
            key={"technology"}
            path="/Technology"
            element={
              <News
                setProgress={this.setprogress}
                apiKey={this.apiKey}
                pagesize={this.pagesize}
                country={"in"}
                category={"technology"}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

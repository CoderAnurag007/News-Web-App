import React, { Component } from "react";
import "./news.css";
import Spinner from "../../imagenot.jpg";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, published, source } =
      this.props;

    return (
      <div className="container">
        <div className="badge-box">
          <span class="badge  badge-success bg-danger">{source}</span>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={!imageUrl ? Spinner : imageUrl}
            className="card-img-top newsimg"
            alt=" "
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description} ...</p>
            <p class="card-text">
              <small class="text-muted">
                {new Date(published).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-success">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

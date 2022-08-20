import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./news.css";
import Loader from "../loader/loader";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 10,
    category: "general",
  };
  static props = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalresult: 0,
    };
  }

  // async update(pageno) {

  // }
  async componentDidMount() {
    // console.log(this.props);
    this.props.setProgress(10);

    document.title = `NewZerr - ${this.capitalize(this.props.category)}`;
    // this.update(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(50);

    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      page: this.state.page,
      loading: false,
    });
    this.props.setProgress(100);
  }
  handleClicknext = async () => {
    // this.update(this.state.page + 1);
    this.update(this.state.page + 1);
  };
  update = async (pageno) => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageno}&pageSize=${this.props.pagesize}`;
    this.setState({
      loading: true,
      page: this.state.page - 1,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    this.setState({
      articles: parsedData.articles,
      loading: false,
    });
    this.props.setProgress(100);
  };
  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({
      loading: true,
      page: this.state.page - 1,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.totalResults);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
    });
  };
  handleClickprev = async () => {
    this.update(this.state.page - 1);
  };
  render() {
    return (
      <div>
        <h2>Top Headlines of {this.capitalize(this.props.category)}</h2>
        {/* {this.state.loading && <Loader />} */}
        <div>
          {/* !this.state.loading && */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalresult}
            loader={<Loader />}
          >
            <div className="row  mainbox ">
              {this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4 ">
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 70)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      published={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
          <div className="container d-flex justify-content-between my-3">
            <button
              type="button"
              className=" btn btn-primary"
              onClick={this.handleClickprev}
              disabled={this.state.page <= 1}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleClicknext}
              disabled={
                this.state.page + 1 < Math.ceil(this.state.totalresult / 20)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;

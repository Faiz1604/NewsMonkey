import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div className="card">
        <img className="card-img-top" src={imageUrl} alt= "top image"/>
          <div className="card-body">
            <span className="badge badge-pill badge-primary bg-dark my-2">{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By:{!author?"Unknown":author} {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read more..
            </a>
          </div>
        </div>
      </div>
    );
  }
}
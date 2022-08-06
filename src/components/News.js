import NewsItem from "./NewsItem.js";
import React, { Component } from "react";
// import PropTypes from 'prop-types';
import Spinner from "./Spinner.js";
import InfiniteScroll from 'react-infinite-scroll-component'
export default class News extends Component {
  static defaultProps= {
    country:"in",
    pageSize:10,
    category:"general",
  }
  // static propTypes={
  //   country:propTypes.String,
  //   pageSize:propTypes.Number
  // }
  capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase()+string.slice(1)
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
  }
  
  async updateNews(){
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    this.setState({
      loading:true
    })
    let parsedData = await data.json();
    this.setState({
      articles: await parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  fetchMoreData=async ()=>{
    this.setState({
      page:this.state.page+1
    })
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    );
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  }
  async componentDidMount() {
    // let data = await fetch(
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // );
    // this.setState({
    //   loading:true
    // })
    // let parsedData = await data.json();
    // this.setState({
    //   articles: await parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading:false
    // });
    this.updateNews()

  }
  handleNextClick = async () => {
    // this.setState({
    //   loading:true
    // })
    // let data = await fetch(
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`
    // );
    
    // let parsedData = await data.json();
    // if (!(
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // )) {
    //   this.setState({
    //     articles: await parsedData.articles,
    //     page: this.state.page + 1,
    //     loading:false
    //   });
    // }
    this.setState({
      page:this.state.page+1
    })
    this.updateNews()
  };
  handlePrevClick = async () => {
    // this.setState({
    //   loading:true
    // })
    // let data = await fetch(
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
    //     this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`
    // );
    
    // let parsedData = await data.json();
    // this.setState({
    //   articles: await parsedData.articles,
    //   page: this.state.page - 1,
    //   loading:false
    // });
    this.setState({
      page:this.state.page-1
    })
    this.updateNews()
  };
  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style = {{textDecoration:"underline",marginTop:"60px"}}>{`News Monkey Top ${this.capitalizeFirstLetter(this.props.category)}  Headlines`}</h1>
          {this.state.loading&&<Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                    element.urlToImage
                        ? element.urlToImage
                        : "https://thumbs.dreamstime.com/z/news-icon-19655995.jpg"
                    }
                    newsUrl={element.url}
                    author = {element.author} date = {element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
           </div>
          </InfiniteScroll>
        </div>
         
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo;Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&raquo;
          </button>
        </div> */}
      </>
    );
  }
  
}
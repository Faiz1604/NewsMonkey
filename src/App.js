import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar.js";
import News from "./components/News.js";
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<News key = {"general"} category={'general'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/business" element={<News key = {"business"} category={'business'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/entertainment" element={<News key = {"entertainment"} category={'entertainment'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/general" element={<News key = {"general"}  category={'general'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/health" element={<News key = {"health"} category={'health'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/science" element={<News key = {"science"}  category={'science'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/sports" element={<News key = {"sports"}  category={'sports'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
          <Route path="/technology" element={<News key = {"technology"}  category={'technology'} apiKey = {this.apiKey} pageSize={12}/>}></Route>
        </Routes>
      </Router>
      </>
    );
  }
}

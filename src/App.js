import React, { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login/login.component";
import SignUp from "./components/login/signup.component";
import Dashboard from "./components/dashboard/dashboard.component";
import FavouriteList from "./components/dashboard/favouriteList.component";
import RecommenedMatch from "./components/dashboard/recommenedMatch.component";
import Match from "./components/dashboard/match.component";

export default class App extends Component {
  constructor(){
    super();
    this.state = {
        session : false
    }
  }
  updateSession(sessionValue) {
    this.setState({session:sessionValue});
    if(sessionValue === false) {
      sessionStorage.setItem("session", "false");
    }
  }
  render(){
    console.log(sessionStorage);
        return (
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" >Cricket Matches</Link>
                 {( (this.state.session || sessionStorage.getItem("session") === "true") && <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to={"/dashboard"} >Home</Link>
                    </li>
                   <li className="nav-item">
                      <Link className="nav-link" to={"/match"} >Add Matches</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/favouriteList"}>Favorite Matches</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/recommmend"} >Recommanded Matches</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/"} onClick={() => this.updateSession(false)}>Sing Out</Link>
                    </li>
                  </ul>
                 </div>)}
              </div>
            </nav>
            <div className="auth-wrapper">
                <Switch>
                  <Route exact path='/' component={(props) =><Login  updateSession={(sessionValue) => this.updateSession(sessionValue)} {...props}></Login>}  />
                  <Route path="/register" component={(props) =><SignUp {...props}></SignUp>} />
                  <Route path="/dashboard" component={(props) =><Dashboard {...props}></Dashboard> }  />
                  <Route path="/favouriteList" component={(props) =><FavouriteList {...props}></FavouriteList> }  />
                  <Route path="/recommmend" component={(props) =><RecommenedMatch {...props}></RecommenedMatch> }  />
                  <Route path="/match" component={(props) =><Match {...props}></Match> }  />
                </Switch>
            </div>
          </div></Router>
        );
      }
}
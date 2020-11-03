import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Header.tsx";
import Home from "../Routes/Home";
import MyPage from "../Routes/MyPage";
import Notice from "../Routes/Notice";
import Edit from "../Routes/Edit";
import Signup from "../Routes/Signup";
import Login from "../Routes/Login";

export default () => (
  <Router>
    <>
      <Header></Header>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/myPage" exact component={MyPage}></Route>
        <Route path="/notice" exact component={Notice}></Route>
        <Route path="/edit/:id" component={Edit}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>

        <Redirect to="/"></Redirect>
      </Switch>
    </>
  </Router>
);

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
        <Route path="/card-wallet/" exact={true} component={Home}></Route>
        <Route path="/card-wallet/myPage" exact component={MyPage}></Route>
        <Route path="/card-wallet/notice" exact component={Notice}></Route>
        <Route path="/card-wallet/edit/:id" component={Edit}></Route>
        <Route path="/card-wallet/Signup" component={Signup}></Route>
        <Route path="/card-wallet/login" component={Login}></Route>

        <Redirect to="/card-wallet/"></Redirect>
      </Switch>
    </>
  </Router>
);

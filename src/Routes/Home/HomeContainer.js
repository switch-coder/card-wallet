import React from "react";
import HomePresenter from "./HomePresenter";
import MemberShip from "../../membership.json";
export default class extends React.Component {
  render() {
    return <HomePresenter MemberShip={MemberShip.data} />;
  }
}

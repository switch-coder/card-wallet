import React, { useState } from "react";
import HomePresenter from "./HomePresenter";
import MemberShip from "../../membership.json";

const HomeContainer = () => {
  const [Search, setSearch] = useState("");
  const [MemberShipArray, setMemberArray] = useState({});

  function ClickSearch(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(Search)
    const array = MemberShip.data.filter(data => data.name.includes(Search));
    setMemberArray(
      array
    );
  }

  function ChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    console.log(value);
    setSearch(value.replace(/[~!@#$%^&*()_+|<>?:{}]/g, ""));
    console.log("Search", Search)
    if (value === "") {
      const array = MemberShip.data.filter(data => data.name.includes(value));
      setMemberArray(
        array
      );
    }
  }


  return <HomePresenter MemberShip={MemberShipArray && Object.keys(MemberShipArray).length > 0 ? MemberShipArray : MemberShip.data} Search={Search} ChangeSearch={ChangeSearch} ClickSearch={ClickSearch} />;

}

export default HomeContainer;

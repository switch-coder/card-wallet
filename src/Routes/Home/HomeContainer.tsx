import React, { useState } from "react";
import HomePresenter from "./HomePresenter";
import MemberShip from "../../membership.json";

// 멤버십 서비스를 하고 있는 브랜드들을 볼 수 있고
// 멤버십 검색을 할 수 있다
// 멤버십 클릭시 멤버십을 추가 할 수 있는 창으로 이동한다. (로그인시에만 가능)

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

  //처음엔 그냥 멤버십 정보들을 다 넣고 검색어 입력시 아래 함수 실행 
  //검색어를 지우고 다 보고 싶을 경우가 있기때문에 빈값이면 전체 멤버십 정보를 보여준다.
  function ChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    console.log(value);
    //특수문자 입력 방지
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

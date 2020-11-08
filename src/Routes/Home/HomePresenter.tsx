import React from "react";
import Card from "../../Component/Card";
import styled from "styled-components";
import PropsTypes from "prop-types";


const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
  gap: 20px;
 
`;

const Container = styled.div`
  background-color: #ffffff;
  border: solid 1px rgba(223, 228, 234, 1);
  width: 80vw;
  min-height: 200px;
  margin-top: 60px;
  margin-bottom: 60px;
  padding: 25px;

  @media only screen and (max-width: 1300px){
     ${Contents}{
        grid-template-columns:repeat(3,1fr);
     }
 }
 @media only screen and (max-width: 1000px){
     ${Contents}{
        grid-template-columns:repeat(2,1fr);
     }
 }
 @media only screen and (max-width: 770px){
     ${Contents}{
        grid-template-columns:repeat(1,1fr);
     }
 }
`;

const Title = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  border-bottom: 1.3px solid black;
`;

const Tab = styled.span`
  width: 50%;
  align-items: center;
  display: flex;
  height: 50px;
  font-size: 1.2em;
  font-weight: 600;
`;

const SearchContainer = styled.div`  
  width: 50%;
  height: 50px;
  align-items: center;
  display:flex;
  justify-content:flex-end;
`;

const SearchBtn = styled.button`
  width:60px;
  height:34px;
  padding:2px 10px 2px 10px;
  border:1px solid #d2d2d7;
    &:hover{
      cursor:pointer;
    }
    &:focus{
        outline:none;
    }

`;
const SearchBox = styled.input`
  width:100px;
  height:30px;
  padding:2px 10px 0px 10px;
  border:1px solid #d2d2d7;
    &:focus{
        outline:none;
    }

`;

const EmptyCard = styled.div`
    font-size:1.7em;
    font-weight:550;
    height:400px;
    display:flex;
    align-items:center;
    justify-content:center;
`;



const HomePresenter = ({ MemberShip, Search, ChangeSearch, ClickSearch }) =>
  (
    <Container>
      <Title>
        <Tab>패스 리스트</Tab>
        <SearchContainer>
          <SearchBox onChange={ChangeSearch} value={Search}></SearchBox>
          <SearchBtn type="submit" onClick={ClickSearch} >검색</SearchBtn>
        </SearchContainer>
      </Title>

      {MemberShip && MemberShip.length > 0 ? (
        <Contents>
          {MemberShip.map((data) => (
            <Card
              key={data.num}
              name={data.name}
              name_en={data.name_en}
              num={data.num}
              image_color={data.img_color}
              font_color={data.font_color}
            />
          ))}
        </Contents>
      ) : <EmptyCard> 검색하신 내용을 찾을 수 없습니다.</EmptyCard>}
    </Container>
  );

HomePresenter.propsTypes = {
  MemberShip: PropsTypes.array,
};

export default HomePresenter;

import React from "react";
import Card from "../../Component/Card";
import styled from "styled-components";
import PropsTypes from "prop-types";

const Container = styled.div`
  background-color: #ffffff;
  border: solid 1px rgba(223, 228, 234, 1);
  width: 80vw;
  min-height: 200px;
  margin-top: 60px;
`;

const Title = styled.div`
  display: flex;
`;

const Tab = styled.span`
  width: 50%;
  text-align: center;
  height: 50px;
  font-size: 2em;
  border-bottom: 1px solid rgba(223, 228, 234, 1);
  :not(:last-child) {
    border-right: 1px solid rgba(223, 228, 234, 1);
  }
`;

const Contents = styled.div`
  display: grid;
  padding: 10px;
  grid-template-columns: repeat(4, 1fr);
`;

const HomePresenter = ({ MemberShip }) => (
  <Container>
    <Title>
      <Tab>home</Tab>
      <Tab>공지사항</Tab>
    </Title>
    {MemberShip && MemberShip.length > 0 && (
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
    )}
  </Container>
);

HomePresenter.propsTypes = {
  MemberShip: PropsTypes.array,
};

export default HomePresenter;

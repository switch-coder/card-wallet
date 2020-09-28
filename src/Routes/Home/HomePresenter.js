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
  margin-bottom: 60px;
  padding: 25px;
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

const Contents = styled.div`
  display: grid;
  padding: 10px;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const HomePresenter = ({ MemberShip }) => (
  <Container>
    <Title>
      <Tab>패스 리스트</Tab>
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

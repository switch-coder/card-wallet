import React from "react";
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

const LogoContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
  background-color: ${(props) => props.bgColor};
`;

const Logo = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100px;
`;

const FormWrap = styled.form`
  margin-top: 20px;
  padding: 5px;
`;

const Row = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const Input = styled.input`
  width: 99%;
  height: 20px;
  border: solid 1px #a4b0be;
  border-radius: 5px;
  padding: 5px;
  &:focus {
    outline-color: #70a1ff;
  }
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 0.8em;
  margin: 5px;
`;

const Message = styled.p`
  font-weight: 500;
  font-size: 0.7em;
  margin: 5px;
  color: #3742fa;
`;

const PassBtn = styled.button`
  width: 100%;
  height: 50px;
  text-align: center;
  margin-top: 20px;
  border: none;
  font-size: 1.3em;
  font-weight: 600;
  border-radius: 5px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  box-shadow: rgba(0, 0, 0, 0.12) 0 5px 20px, rgba(0, 0, 0, 0.15) 0 7px 15px;
  &:hover {
    cursor: pointer;
  }
`;

const EditPresenter = ({ num, bgColor, color, name, handleSubmit }) => (
  <Container>
    <Title>
      <Tab>패스 등록</Tab>
    </Title>
    <LogoContainer bgColor={bgColor}>
      <Logo bgUrl={num && require(`../../asset/logo/${num}.png`)} />
    </LogoContainer>
    <FormWrap onSubmit={handleSubmit}>
      <Row>
        <Label>이름</Label>
        <Input type="text" placeholder="이름을 입력하세요" />
        <Message>*실제 멤버쉽을 발급받은 사람의 이름을 입력하세요 </Message>
      </Row>

      <Row>
        <Label>멤버쉽 번호</Label>
        <Input type="text" placeholder="이름을 입력하세요" />
        <Message>
          *실제 멤버쉽 번호를 "-" 를 제외하고 숫자만 입력해주세요{" "}
        </Message>
      </Row>
      <Row>
        <Label>기본 바코드 타입</Label>
        <Input type="text" placeholder="이름을 입력하세요" />
        <Message>*실제 멤버쉽을 발급받은 사람의 이름을 입력하세요 </Message>
      </Row>
      <Row>
        <Label>QR</Label>
        <Input type="text" placeholder="이름을 입력하세요" />
        <Message>*실제 멤버쉽을 발급받은 사람의 이름을 입력하세요 </Message>
      </Row>
      <PassBtn
        bgColor={bgColor !== "rgb(255, 255, 255)" ? bgColor : "#1e90ff"}
        color={color}
        type="submit"
      >
        발급 받기{" "}
      </PassBtn>
    </FormWrap>
  </Container>
);

EditPresenter.propsTypes = {
  num: PropsTypes.string,
  bgColor: PropsTypes.string,
  color: PropsTypes.string,
  name: PropsTypes.string,
  name_en: PropsTypes.string,
};

export default EditPresenter;

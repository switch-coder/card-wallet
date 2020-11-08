import React from "react";
import styled from "styled-components";
import { IBgColor, IBgUrl } from "../../Component/styledInterface";

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

const LogoContainer = styled.div<IBgColor>`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
  background-color: ${(props) => props.bgColor};
`;

const Logo = styled.div<IBgUrl>`
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
  width:99%;
  display:block;
`;

const Message = styled.p`
  font-weight: 500;
  font-size: 0.7em;
  margin: 5px;
  color: #3742fa;
`;

const PassBtn = styled.button<IBgColor>`
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

const Radio = styled.input`
  margin-right:10px;
`;
const RadioLable = styled.label`
  width:50%;
  display:inline-block;
`;

const Camera = styled.input`
  width:80px;
  height:25px;
  &:hover{
    cursor:pointer;
  }
 `;

interface IProps {
  num: string;
  bgColor: string;
  color: string;
  storeName: string;
  userName: string;
  serialNumber: string;
  handleSubmit: (evnt: React.FormEvent) => void;
  setUserName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSRNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCamera: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRadio: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditPresenter: React.FunctionComponent<IProps> = ({ num, bgColor, color, storeName, userName, serialNumber, setUserName, setSRNumber, handleSubmit, setRadio, setCamera }) => (
  <Container>
    <Title>
      <Tab>패스 등록</Tab>
    </Title>
    <LogoContainer bgColor={bgColor}>
      <Logo bgUrl={num && require(`../../asset/logo/${num}.png`).default} />
    </LogoContainer>
    <FormWrap onSubmit={handleSubmit}>
      <Row>
        <Label>이름</Label>
        <Input value={userName} onChange={setUserName} type="text" placeholder="이름을 입력하세요" required />
        <Message>*실제 멤버쉽을 발급받은 사람의 이름을 입력하세요 </Message>
      </Row>

      <Row>
        <Label>멤버쉽 번호</Label>
        <Input value={serialNumber} onChange={setSRNumber} type="text" placeholder="이름을 입력하세요" required />
        <Message>
          *실제 멤버쉽 번호를 "-" 를 제외하고 숫자만 입력해주세요{" "}
        </Message>
        <Camera type="file" accept="image/*;capture=camera" onChange={setCamera}></Camera>
        <Message>
          *위 파일선택 버튼으로 바코드가 보이는 파일을 선택하여 번호를 자동으로 입력해보세요!.{" "}
        </Message>
      </Row>
      <Row>
        <Label>번호 표기방법 선택</Label>
        <RadioLable><Radio type="radio" onChange={setRadio} value="true" name="isCutting" checked /> 네자리마다 띄어쓰기</RadioLable>
        <RadioLable> <Radio type="radio" onChange={setRadio} value="false" name="isCutting" />모두 붙여쓰기</RadioLable>
      </Row>

      <PassBtn
        bgColor={
          bgColor !== "rgb(255, 255, 255)" &&
            bgColor !== "rgb(252, 252, 252)" &&
            bgColor !== "rgb(248, 248, 250)"
            ? bgColor
            : "#70a1ff"
        }
        color={
          bgColor !== "rgb(255, 255, 255)" && bgColor !== "rgb(252, 252, 252)"
            ? color
            : "rgb(252, 252, 252)"
        }
        type="submit"
      >
        발급 받기{" "}
      </PassBtn>
    </FormWrap>
  </Container>
);



export default EditPresenter;

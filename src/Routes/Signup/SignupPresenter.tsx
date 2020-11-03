import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width:410px;
    height:56px;
    padding: 2px 20px 0px 20px;
    font-size:1.2em;
    border-radius:7px; 
    margin-bottom:3px;
    border:1px solid #d2d2d7;
    &:focus{
        outline:none;
        box-shadow: 0 0 0 3px ${props => props.color ? props.color : "#1e90ff"};
       
    }
`;

const Container = styled.form`
 background-color: #ffffff;
    border: solid 1px rgba(223, 228, 234, 1);
    font-family:"segoe ui","malgun gothic","microsoft neogothic",sans-serif;
    border-radius:15px;
    width: 50vw;
    min-height: 200px;
    margin-top: 60px;
    margin-bottom: 60px;
    display:grid;
    padding: 40px;
    justify-content:center;
    align-items:center;
    gap:20px;

    @media only screen and (max-width: 780px){
     ${Input}{
        width:310px;
     }
    }
    @media only screen and (max-width: 540px){
     ${Input}{
        width:180px;
     }
    }

    @media only screen and (max-width: 280px){
     ${Input}{
        width:160px;
     }
    }
`;

const Title = styled.div`
    font-weight:900;
    font-size:2.4em;
    width:200px;
    margin-bottom:20px;
`
const Row = styled.div`
    display:flex;
    flex-direction:column;
    text-align:right;
    color : ${props => props.color};
    
    `;




const Button = styled.button`
  height:40px;
    border:none;
    border-radius:7px;
    background-color:#0071e3;
    color:white;
    font-weight:600;
    font-size:1.2em;
`;
interface IProps {
    ID: string;
    pwd: string;
    name: string;
    pwvalid: string;
    setID: any;
    setPwd: any;
    color: string;
    setName: any;
    handleSubmit: (evnt: React.FormEvent) => void;
    onChangePwValid: (evnet: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SignupPresenter: React.FunctionComponent<IProps> = ({ ID, pwd, name, color, pwvalid, setID, setPwd, setName, handleSubmit, onChangePwValid }) => {
    return <Container onSubmit={handleSubmit}>
        <Title>ID생성</Title>
        <Input type="text" placeholder="ID" value={ID} onChange={setID}></Input>
        <Input type="text" placeholder="이름" value={name} onChange={setName}></Input>
        <Input type="password" placeholder="암호" onChange={setPwd} ></Input>
        <Row color={color}>
            <Input type="password" placeholder="암호 확인 " onChange={onChangePwValid} color={color} ></Input>
            {color && color === "red" ? "암호가 일치하지 않습니다." : ""}
        </Row>

        <Button type="submit" >ID생성 </Button>
    </Container>;
};

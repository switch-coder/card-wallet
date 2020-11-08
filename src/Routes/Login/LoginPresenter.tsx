import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
    font-weight:900;
    font-size:2.4em;
    width:200px;
    margin-bottom:20px;
`

const Input = styled.input`
    width:410px;
    height:56px;
    padding: 2px 20px 0px 20px;
    font-size:1.2em;
    border-radius:10px;
    border:1px solid #d2d2d7;
    &:focus{
        outline:none;
    }

    
`;

const Button = styled.button`
    height:40px;
    border:none;
    border-radius:10px;
    background-color:#0071e3;
    color:white;
    font-weight:600;
    font-size:1.2em;
`;

const SignupButton = styled.div`
    color:blue;
    text-align:right;
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


interface IProps {
    password: string;
    ID: string;
    setID: any;
    setPassword: any;
    handleSubmit: (evnt: React.FormEvent) => void;
}

export const Form: React.FunctionComponent<IProps> = ({ ID, password, setID, setPassword, handleSubmit }) => {
    return <Container onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <Input type="text" placeholder="ID" value={ID} onChange={setID} required></Input>
        <Input type="password" placeholder="암호" value={password} onChange={setPassword} required></Input>
        <Button type="submit" >로그인 </Button>
        <SignupButton><Link to="/card-wallet/signup" >ID생성</Link></SignupButton>
    </Container>;
};




import React from "react";
import styled from "styled-components";
import { IBgColor, IBgUrl } from "./styledInterface"
import Barcode from "react-barcode"

const Modify = styled.button<IBgColor>`
    position:absolute;
    right:15px;
    font-size:0.8em;
    font-weight:700;
    color:${props => props.bgColor};
    opacity:0;
    display:flex;
    font-weight:100px;
    justify-content:center;
    align-items:center;
    border-radius:50%;
    width:34px;
    padding:0px;
    height:34px;
    border:none;
    cursor:pointer;
    background-color:${props => props.color};
`;

const Container = styled.div<IBgColor>`
    position:relative;
    border-radius:10px;
    background-color:${(props) => props.bgColor};
    min-height:120px;
    padding:20px;
    box-shadow: 0px 0px 10px 2px rgba(130,130,130,1);
    &:hover{
        ${Modify}{
            opacity:1;
        }
    }
`;



const StoreLogo = styled.div<IBgUrl>`
    background-image: url(${(props) => props.bgUrl});
    height:50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position:center;
    margin-bottom:10px;
    
`;

const BarcodeWarpper = styled.div`
    position:relative   ;
    background-color:white;
    left:-20px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    width:100%;
    margin-bottom:20px;
`;



const Label = styled.label`
    font-size:0.9em;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color:${props => props.color};
`;

const Text = styled.p`
    font-size:1.2em;
    margin:5px 5px 15px 5px;
`;

interface IPorps {
    key: string,
    _id: string,
    Url: String,
    bgColor: String,
    color: String,
    userName: String,
    cardNumber: String,
    isCutting: boolean,
    setModify: (evnet: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MyCard: React.FunctionComponent<IPorps> = ({ _id, Url, bgColor, color, userName, cardNumber, isCutting, setModify }) => (
    <Container bgColor={`${bgColor}`} >
        <Modify color={`${color}`} bgColor={`${bgColor}`} onClick={setModify} id={_id}>수정</Modify>
        <StoreLogo bgUrl={Url && require(`../asset/logo/${Url}.png`)} />
        <BarcodeWarpper>
            <Barcode value={cardNumber} displayValue={false} width={2} />
        </BarcodeWarpper>
        <Label color={`${color}`}>이름<Text >{userName}</Text></Label>
        <Label color={`${color}`}>카드번호<Text >{isCutting && isCutting ? cardNumber.replace(/(\d)(?=(?:\d{4})+(?!\d))/g, '$1 ') : cardNumber}</Text></Label>
    </Container >
)


export default MyCard;
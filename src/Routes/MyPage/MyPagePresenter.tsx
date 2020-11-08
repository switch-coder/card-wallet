import React from "react";
import styled from "styled-components";
import MyCard from "../../Component/MyCard"
import { IBgColor, IBgUrl, IColor } from "../../Component/styledInterface"

const CardContainer = styled.div`
    padding:10px;
    display:grid;
    grid-template-columns: repeat(4 , 1fr);
    gap:20px;

`;

const Container = styled.div`
 background-color:white;
 border:1px solid rgba(223, 228, 234, 1);
 padding:20px;
 margin-top:60px;
 min-height: 200px;
 width:80vw;
 
 @media only screen and (max-width: 1820px){
     ${CardContainer}{
        grid-template-columns:repeat(3,1fr);
     }
    
 }
 @media only screen and (max-width: 1370px){
     ${CardContainer}{
        grid-template-columns:repeat(2,1fr);
     }
 }
 @media only screen and (max-width: 900px){
     ${CardContainer}{
        grid-template-columns:repeat(1,1fr);
     }
     width:100vw;
     margin-top:-18px;
    
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


interface ModifyContainer {
    display: string
    bgColor: string
}
const ModifyContainer = styled.div<ModifyContainer>`
    display:${props => props.display};
    position:fixed;
    width:35vw;
    height:65vh;
    justify-content:center;
    padding:20px;
    background-color:${props => props.bgColor};
    box-shadow: 0px 0px 300px 200px rgba(0,0,0,0.29);
    border-radius:13px;
    left:50%;
    bottom:50%;
    transform: translate(-50%, 50%);
    min-width:300px;
    min-height:420px;
    max-height:500px;
`;

const Logo = styled.div<IBgUrl>`
    background-image: url(${(props) => props.bgUrl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    
    width: 100%;
    height:100px;
    
`;

const Row = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
  @media only screen and (max-height: 530px){
        &:last-child{
            margin-bottom:100px;
        }
    }
`;

const Input = styled.input`
  width: 95%;
  height: 40px;
  border: solid 1px #a4b0be;
  border-radius: 10px;
  padding: 5px;
  &:focus {
    outline-color: #70a1ff;
  }
`;

const Label = styled.label<IColor>`
  font-weight: 700;
  font-size: 0.8em;
  margin: 5px;
  width:70%;
  display:block;
  color:${props => props.color};
`;

const Message = styled.p`
  font-weight: 500;
  font-size: 0.7em;
  margin: 5px;
  color: #3742fa;
`;

const BtmButton = styled.div`
    position:absolute;
    bottom:10px;
    left:50%;
    transform: translate(-50%, -50%);
`;

const MuataionButton = styled.button<IBgColor>`
    width:60px;
    height:60px;
    margin-right:10px;
    border-radius:50%;
    border:1px solid ${props => props.color};
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
    &:hover{
        background-color: ${props => props.color};
        color: ${props => props.bgColor};
    };
`;

const Cancel = styled.button<IBgColor>`
    position:absolute;
    background-color:${props => props.bgColor};
    border:none;
    height:30px;
    width:30px;
    right:15px;
    top:15px;
    &::after{
        position:absolute;
        content:"";
        height:16px;
        width:2px;
        top:7px;
        left:14px;
        background-color:black;
        border-radius:1px;
        transform:rotate(45deg);
        &:hover{
            background-color:white;
        }
    }
    &::before{
        position:absolute;
        content:"";
        height:16px;
        width:2px;
        top:7px;
        left:14px;
        background:black;
        border-radius:1px;
        transform:rotate(-45deg);
        &:hover{
            background:white;
        }
    }
    &:hover{
        background-color:red;
        border-radius:50%;
        
        &::after,::before{ background-color:white;}
       
    }
`;

interface CardProps {
    _id: string;
    img: String
    bgColor: string
    color: string
    name: String
    cardNumber: String
    num: number
    isCutting: boolean

}


interface IProps {
    cards: Array<CardProps>
    setModify: (event: React.MouseEvent<HTMLButtonElement>) => void
    cancelBtn: (event: React.MouseEvent<HTMLButtonElement>) => void
    removeCard: (event: React.MouseEvent<HTMLButtonElement>) => void
    mutationCard: (event: React.MouseEvent<HTMLButtonElement>) => void
    setModifyCard: (evnet: React.ChangeEvent<HTMLInputElement>) => void
    modifyCard: { name: string, cardNumber: string }
    modify: { key: string, display: string, img: string }
}

const MyPagePresenter: React.FunctionComponent<IProps> = ({ cards, modify, setModify, cancelBtn, removeCard, mutationCard, modifyCard, setModifyCard }) => {
    const card: { name: String, cardNumber: String, bgColor: string, color: string, img: String } = cards.filter(card => card._id === modify.key)[0];


    return (<Container>{cards && cards.length > 0 ?
        <CardContainer> {cards.map((data) =>
            (<MyCard
                key={data._id}
                _id={data._id}
                Url={data.img}
                bgColor={data.bgColor}
                color={data.color}
                userName={data.name}
                cardNumber={data.cardNumber}
                isCutting={data.isCutting}
                setModify={setModify}></MyCard>))
        }</CardContainer> :
        <EmptyCard>"등록된 카드가 없습니다. 카드를 등록해주세요"</EmptyCard>}
        {card && (
            <ModifyContainer display={modify.display} bgColor={card.bgColor}>
                <Cancel bgColor={card.bgColor} onClick={cancelBtn}></Cancel>
                <Logo bgUrl={modify && modify.img}></Logo>
                <Row>
                    <Label color={card.color}>이름</Label>
                    <Input value={modifyCard.name} name="name" onChange={setModifyCard} type="text" placeholder="이름을 입력하세요" required />
                    <Message>*실제 멤버쉽을 발급받은 사람의 이름을 입력하세요 </Message>
                </Row>
                <Row>
                    <Label color={card.color}>카드번호</Label>
                    <Input value={modifyCard.cardNumber} name="cardNumber" onChange={setModifyCard} type="text" placeholder="카드번호를 입력하세요" required />
                    <Message>*실제 멤버쉽을 발급받은 사람의 이름을 입력하세요 </Message>
                </Row>
                <BtmButton>
                    <MuataionButton bgColor={card.bgColor} color={card.color} onClick={mutationCard}>수정</MuataionButton>
                    <MuataionButton bgColor={card.bgColor} color={card.color} onClick={removeCard}>삭제</MuataionButton>
                </BtmButton>


            </ModifyContainer>
        )}  </Container>


    )
}

export default MyPagePresenter
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditPresenter from "./EditPresenter";
import Membership from "../../membership.json";
import { IAddCardData, IAddCardVars } from "../../apollo/interfaces"
import { gql, useMutation } from "@apollo/client";


const AddCard = gql`
 mutation AddCard($name:String! $store:String! $img:String! $cardNumber:String! $isCutting:Boolean!,$bgColor:String!,$color:String!){
   addCard(name:$name,store:$store,img:$img,cardNumber:$cardNumber,isCutting:$isCutting,bgColor:$bgColor,color:$color)
 }`

interface IParams {
  id: string

}

export default (event: any) => {
  const { id } = useParams<IParams>();
  const [userName, setUserName] = useState(""),
    [serialNumber, setSerialNumber] = useState(""),
    [isCutting, setRadio] = useState(true);
  const [addCard, ResultAddCard] = useMutation<IAddCardData, IAddCardVars>(AddCard)
  const data = Membership.data.filter(
    (card) => card.num === parseInt(id)
  );

  if (isNaN(parseInt(id)) || data.length === 0) {
    event.history.push("/");
    return <></>;
  }

  if (!sessionStorage.getItem("UserToken")) {
    event.history.push("/", alert("로그인이 필요합니다."));
    return <></>;
  }

  useEffect(() => {
    if (ResultAddCard.data?.addCard === true) {
      alert("추가되었습니다.");
      event.history.push("/");
    }
  })
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addCard({ variables: { name: userName, store: data[0].name, cardNumber: serialNumber, img: id, isCutting, bgColor: data[0].img_color, color: data[0].font_color } })
    console.log(typeof userName, typeof serialNumber, typeof data[0].name, typeof id, data[0].img_color, data[0].font_color, typeof isCutting)
  };

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
  }

  const onChangeSRNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setSerialNumber(value);
  }

  const onChageRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (value === "true") { setRadio(true); }
    else if (value === "false") { setRadio(false); }
  }


  return <EditPresenter
    num={id}
    bgColor={data[0].img_color}
    color={data[0].font_color}
    storeName={data[0].name}
    serialNumber={serialNumber}
    userName={userName}
    handleSubmit={handleSubmit}
    setUserName={onChangeUserName}
    setSRNumber={onChangeSRNumber}
    setRadio={onChageRadio}
  ></EditPresenter>

}



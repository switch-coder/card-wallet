import { gql, useMutation, useQuery } from "@apollo/client";
import { currentUserVar, GET_CURRENT_USER } from "../../apollo/cache";
import { IMydata, ICurrentUserData, IRemoveCard, IRemoveCardVar, IMutationCard, IMutationcardVars } from "../../apollo/interfaces";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MyPagePresenter from "./MyPagePresenter";
import Loading from "../../Component/Loading";

const Mydata = gql`
query { 
  mydata{
    name
    cards{
      _id
      store
      name
      cardNumber
      isCutting
      img
      bgColor
      color
    }
  }
}`

const RemoveCard = gql`
  mutation removeCard($key:ID!){
    removeCard( key:$key)
  }`;

const MutationCard = gql`
  mutation mutationCarad($key:ID!, $name:String!,$cardNumber:String!){
    mutationCard(key:$key,name:$name,cardNumber:$cardNumber)
  }  

`;

const MyPageContainer = (event: any) => {
  const history = useHistory();
  const [modify, setModify] = useState({
    display: "none",
    key: "",
    img: ""
  }),
    [modifyCard, setModifyCard] = useState({ name: "", cardNumber: "" })
  let user;
  const { data, loading, error, refetch } = useQuery<IMydata>(Mydata);
  const [remove, RasultRemove] = useMutation<IRemoveCard, IRemoveCardVar>(RemoveCard);
  const [mutation, ResultMutation] = useMutation<IMutationCard, IMutationcardVars>(MutationCard);

  useEffect(() => {
    if (RasultRemove.data?.removeCard === true) {
      setModify({
        display: "none",
        key: "",
        img: ""
      });
      alert("삭제되었습니다.");
      refetch();
    } else if (RasultRemove.data?.removeCard === false) {
      alert("다시시도해 주세요");
    }
    if (ResultMutation.data?.mutationCard === true) {
      setModify({
        display: "none",
        key: "",
        img: ""
      });
      setModifyCard({
        name: "",
        cardNumber: ""
      });
      alert("변경되었습니다.");
      refetch();
    } else if (ResultMutation.data?.mutationCard === false) {
      alert("다시시도해 주세요");
    }
  });

  if (error) {
    return (<>"에러"</>)
  }
  if (loading) {
    return (<Loading />)
  }
  if (sessionStorage.getItem("UserToken")) {
    currentUserVar(data?.mydata)
    user = data?.mydata
  }
  console.log(user)

  if (user === null) history.replace("/card-wallet/login");

  const modifyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const { img } = user?.cards.filter((data) => data._id === id)[0];
    console.log(img);
    const setImg = require(`../../asset/logo/${img}.png`);
    console.log(setImg)
    setModify({
      display: "",
      key: id,
      img: setImg,
    });
  }

  const mutationCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    mutation({ variables: { key: modify.key, name: modifyCard.name, cardNumber: modifyCard.cardNumber } });
  }

  const removeCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    remove({ variables: { key: modify.key } });

  }

  const cancelBtn = (event: React.MouseEvent<HTMLButtonElement>) => {

    setModify({
      display: "none",
      key: "",
      img: ""
    })
  }

  const setCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "name") {
      setModifyCard({
        cardNumber: modifyCard.cardNumber,
        name: value
      })
    } else if (name === "cardNumber") {
      setModifyCard({
        cardNumber: value,
        name: modifyCard.name
      })
    }

  }

  return (
    <MyPagePresenter cards={user?.cards} modify={modify} setModify={modifyClick} cancelBtn={cancelBtn} removeCard={removeCard} mutationCard={mutationCard} setModifyCard={setCard}></MyPagePresenter >
  );
}

export default MyPageContainer;
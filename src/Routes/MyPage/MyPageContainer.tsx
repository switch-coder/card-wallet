import { gql, useMutation, useQuery } from "@apollo/client";
import { currentUserVar } from "../../apollo/cache";
import { IMydata, IRemoveCard, IRemoveCardVar, IMutationCard, IMutationcardVars } from "../../apollo/interfaces";
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
  const { data, loading, error, refetch, networkStatus } = useQuery<IMydata>(Mydata, {
    fetchPolicy: "network-only"
  });
  const [remove, RasultRemove] = useMutation<IRemoveCard, IRemoveCardVar>(RemoveCard);
  const [mutation, ResultMutation] = useMutation<IMutationCard, IMutationcardVars>(MutationCard);

  useEffect(() => {
    if (RasultRemove.data?.removeCard === true) {

      refetch();
    } else if (RasultRemove.data?.removeCard === false) {
      alert("다시시도해 주세요");
      console.log("remove")
    }
    if (ResultMutation.data?.mutationCard === true) {
      console.log("ResultMutation")
      refetch();

    } else if (ResultMutation.data?.mutationCard === false) {
      alert("다시시도해 주세요");
      console.log("mutation")
    }
  }, [RasultRemove.data, ResultMutation.data]);
  if (networkStatus === 4) {
    return (<>refetching</>)
  }
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


  if (user === null) history.replace("/card-wallet/login");

  const modifyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const { img, name, cardNumber } = user?.cards.filter((data) => data._id === id)[0];
    console.log(img);
    const setImg = require(`../../asset/logo/${img}.png`).default;

    setModifyCard({ name, cardNumber })
    setModify({
      display: "",
      key: id,
      img: setImg,
    });
  }

  const mutationCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    mutation({ variables: { key: modify.key, name: modifyCard.name, cardNumber: modifyCard.cardNumber } });
    setModify({
      display: "none",
      key: "",
      img: ""
    });

  }

  const removeCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    remove({ variables: { key: modify.key } });
    setModify({
      display: "none",
      key: "",
      img: ""
    });
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
    <MyPagePresenter cards={user?.cards} modify={modify} setModify={modifyClick} cancelBtn={cancelBtn} removeCard={removeCard} mutationCard={mutationCard} modifyCard={modifyCard} setModifyCard={setCard}></MyPagePresenter >
  );
}

export default MyPageContainer;
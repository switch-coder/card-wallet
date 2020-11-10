import { gql, useMutation, useQuery } from "@apollo/client";
import { currentUserVar } from "../../apollo/cache";
import { IMydata, IRemoveCard, IRemoveCardVar, IMutationCard, IMutationcardVars } from "../../apollo/interfaces";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MyPagePresenter from "./MyPagePresenter";
import Loading from "../../Component/Loading";

// 저장해놨던 멤버십정보들을 카드형식으로 보여줌
// 각각의 카드에 마우스를 올려놓으면 수정버튼이 보이고 클릭시 수정 모달을 보여줌
// 수정시  mutation 으로 업데이트후 성공시 refetch 하여 데이터를 다시 로드함

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

  //수정버튼 눌렀을때 dispaly :"" , key : 카드생성시 id값 , image : 동적으로 이미지 로드후 데이터를 넣어준다
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

  // 카드 오버후 수정버튼 눌렀을때 여기서 이미지 로드를 해주고 'img' 에 값을 넣어준다
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

  //모달창에서 수정버튼 클릭하여 서버에 정보 업데이트 시
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
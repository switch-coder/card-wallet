import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import EditPresenter from "./EditPresenter";
import Membership from "../../membership.json";
import { IAddCardData, IAddCardVars } from "../../apollo/interfaces"
import { gql, useMutation } from "@apollo/client";
import Quagga from "quagga";

const AddCard = gql`
 mutation AddCard($name:String! $store:String! $img:String! $cardNumber:String! $isCutting:Boolean!,$bgColor:String!,$color:String!){
   addCard(name:$name,store:$store,img:$img,cardNumber:$cardNumber,isCutting:$isCutting,bgColor:$bgColor,color:$color)
 }`

interface IParams {
  id: string

}

const EditContainer = (event: any) => {
  const { id } = useParams<IParams>();
  const [userName, setUserName] = useState(""),
    [serialNumber, setSerialNumber] = useState(""),
    [isCutting, setRadio] = useState(true);
  const [addCard, ResultAddCard] = useMutation<IAddCardData, IAddCardVars>(AddCard)
  const history = useHistory();
  const data = Membership.data.filter(
    (card) => card.num === parseInt(id)
  );

  useEffect(() => {
    if (ResultAddCard.data?.addCard === true) {
      alert("추가되었습니다.");
      history.push("/card-wallet/");
    }
  }, [ResultAddCard.data, history])

  if (isNaN(parseInt(id)) || data.length === 0) {
    history.push("/card-wallet/");
    return <></>;
  }

  if (!sessionStorage.getItem("UserToken")) {
    history.push("/card-wallet/", alert("로그인이 필요합니다."));
    return <></>;
  }



  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addCard({ variables: { name: userName, store: data[0].name, cardNumber: serialNumber, img: id, isCutting, bgColor: data[0].img_color, color: data[0].font_color } })
  };

  const onChangeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
  }

  //카드번호 입력
  const onChangeSRNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    //숫자만 입력가능하게 replace 함수 사용
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setSerialNumber(value);
  }

  //4자리마다 띄우기 / 다 붙여쓰기 선택
  const onChageRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "true") { setRadio(true); }
    else if (value === "false") { setRadio(false); }
  }

  //바코드 이미지를 인식하여 숫자정보를 추출함
  const onChangeCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    Quagga.decodeSingle({
      src: URL.createObjectURL(file),
      numOfWorkers: 1,  // Needs to be 0 when used within node
      inputStream: {
        size: 800  // restrict input-size to be 800px in width (long-side)
      },
      decoder: {
        readers: ["code_128_reader"] // List of active readers
      },
    }, function (result) {
      if (result.codeResult) {
        setSerialNumber(result.codeResult.code);
      } else {
        alert("파일을 읽을 수 없습니다.")
      }
    });

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
    setCamera={onChangeCamera}
  ></EditPresenter>

}

export default EditContainer;


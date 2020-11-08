import React, { useState, useEffect } from "react";
import { SignupPresenter } from "./SignupPresenter";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { ISignupData, ISignupVars } from "../../apollo/interfaces"

const SIGNUP = gql`
mutation Signup($ID: String!, $password: String!, $name: String!){
  signup(ID: $ID, password: $password, name: $name)
}`;


function Signup() {
  const [ID, setID] = useState("");
  const [password, setPwd] = useState("");
  const [pwvalid, setPwValid] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const history = useHistory();
  const [signup, signupResult] = useMutation<ISignupData, ISignupVars>(SIGNUP);


  useEffect(() => {
    if (signupResult.data?.signup === true) {
      alert("회원가입되었습니다.")
      history.replace("/card-wallet/login")
    } else if (signupResult.data?.signup === false) {
      alert("회원가입에 실패힜습니다.");
    }

  }, [signupResult.data, history]);

  const onChangePwValid = (evnet: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = evnet.target;
    setPwValid(value);
    if (password !== value) setColor("red");
    else { setColor("#1e90ff") }

  }



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (password === pwvalid) {
      signup({ variables: { ID, password, name } });
      setID("");
      setPwd("");
      setName("");

    } else {

    }

  }

  return (<SignupPresenter
    ID={ID}
    pwd={password}
    name={name}
    pwvalid={pwvalid}
    color={color}
    setID={(e: { target: { value: React.SetStateAction<string>; }; }) => setID(e.target.value)}
    setPwd={(e: { target: { value: React.SetStateAction<string>; }; }) => setPwd(e.target.value)}
    setName={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}
    handleSubmit={handleSubmit}
    onChangePwValid={onChangePwValid}
  ></SignupPresenter>
  )

}

export default Signup;
import React, { useEffect, useState, useContext } from "react";
import { Form } from "./LoginPresenter";
import { ILoginData, ILoginVars } from "../../apollo/interfaces";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import UserContext from '../../Context/UserContext'
import Error from "../../Component/Error";
import Loading from "../../Component/Loading";
import { currentUserVar } from "../../apollo/cache";

const LOGIN = gql`
mutation login($ID :String!, $password:String!){
  login( ID:$ID, password: $password){
    ID
    name
    token
    cards{
      _id
      name
      store
      cardNumber
      isCutting
      img
      bgColor
      color
    }
  }
}
`;


function Login() {
  const [login, loginResult] = useMutation<ILoginData, ILoginVars>(LOGIN);
  const history = useHistory();
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const loginData = loginResult.data?.login;
  const context = useContext(UserContext);

  useEffect(() => {
    if (loginData) {
      currentUserVar(loginData);
      context?.setUser({ loginData, login: true });
      sessionStorage.setItem("UserToken", loginData.token);
      history.replace("/");
    } else if (loginData === null) {
      alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
    }
  }, [loginResult.data, history]);

  if (loginResult.loading) return <Loading />;
  if (loginResult.error) return <Error msg={loginResult.error.message} />;
  function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    login({ variables: { ID, password } });
    setID("");
    setPassword("");



  }
  return (
    <div>

      <Form handleSubmit={handleSubmit} ID={ID} password={password} setID={(e: { target: { value: string } }) => setID(e.target.value)} setPassword={(e: { target: { value: string } }) => setPassword(e.target.value)}>


      </Form>
    </div>
  )
}

export default Login; 
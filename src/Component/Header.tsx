import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { ILogoutData, IMe } from "../apollo/interfaces";
import { useHistory } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { currentUserVar } from "../apollo/cache";
import Error from "./Error";
import Loading from "./Loading";
import styled from "styled-components";


const LOGOUT = gql`
mutation {
    logout
}`;

const Me = gql`
query { 
  me{
    ID
    name
    token
  }
}`

const Logo = styled.div`
 color: black;
  list-style: none;
  width: 80px;
  text-align: center;
  margin-right: 50px;
`;

const List = styled.ul<{ display: string }>`
  display: ${props => props.display};
  list-style: none;
  text-decoration: none;
  margin: 0px;
`;

const Item = styled.li`
 color: black;
  list-style: none;
  width: 80px;
  text-align: center;
  margin-right: 50px;
 
`;

const SLink = styled(Link)`
&:hover,:link{
  color: black;
  font-weight: 500;
  text-decoration: none;
  justify-content: center;
}
`;

const Btn = styled.button`
  border:none;
  background-color:white;
  font-weight:500;
  padding:0px;
  color:black;
  margin:0px;
  font-size:16px;
  
`;

const MenuItem = styled.div<{ display: string }>`
  display:none;
  position:absolute;
  right:60px;
  width:20px;
  height:25px;
  padding-top:5px;
  cursor:pointer;
`;
const MenuIcon = styled.div<{ display: string }>`
  width:15px;
  border:2px solid black;
  border-radius:2px;
  transition:0.4;
  :first-child{
    transform: ${props => props.display === "flex" ? "rotate(-45deg) translate(-6px, 6px)" : "none"};
  }
  :nth-child(2){
    ${props => props.display === "flex" ? "opacity:0;" : "opacity:1;"};
  }
  :last-child{
    transform: ${props => props.display === "flex" ? "rotate(45deg) translate(-5px, -6px)" : "none"};
  }
  &:not(:last-child){
    margin-bottom:4px;
  }
  
`;
const Header = styled.header<{ display: string }>`
   position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  margin: 0px;
  box-shadow: 0px 1px 5px 2px rgba(206, 214, 224, 1);
  color:white;
  display: flex;
  align-items: center;
  display:flex;
  justify-content: center;
  z-index: 9;
  background-color: white;

  @media screen and (max-width: 750px){
    justify-content:left;
    padding-left:30px;
    ${List}{
      flex-direction:column;
      position:fixed;
      top:61px;
      height:100%;
      width:100vw;
      right:0;
    }
    ${Item}{
      background-color:white;
      padding:10px;
      width:100vw;
      border-bottom:solid 1px #c2c2c2c2;
      &:last-child{
        box-shadow: 0px 2px 4px 1px rgba(206, 214, 224, 1);
      }
    }
    ${MenuItem}{
      display:block;
    }

  }
`;

const SomeComponent = withRouter((event) => {
  let user;
  const { data } = useQuery<IMe>(Me);
  const [logout, logoutResult] = useMutation<ILogoutData>(LOGOUT);
  const history = useHistory();
  const [display, setDisplay] = useState("flex");
  const myRef = useRef<HTMLDivElement>(null);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setDisplay("none");
    logout();
  }

  const handleClickOutside = e => {
    if (myRef.current?.attributes[0].nodeValue === "flex") {
      setDisplay("none");
    }
  };

  const toggle = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    console.log(myRef)
    if (display === "flex") setDisplay("none");
    else if (display === "none") setDisplay("flex");
  }

  if (sessionStorage.getItem("UserToken")) {
    user = data?.me
  }




  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 750) { setDisplay("none") }
      else if (window.innerWidth >= 750) { setDisplay("flex") };
    }
    window.addEventListener("resize", handleResize);

    // document.addEventListener("mousedown", handleClickOutside);
    // document.removeEventListener("mousedown", handleClickOutside);
    if (logoutResult.data?.logout === true) {
      currentUserVar(null);
      history.replace("/");
      sessionStorage.removeItem("UserToken")
    } else if (logoutResult.data?.logout === false) {
      alert("로그아웃에 실패했습니다");
    }

  }, [logoutResult.data, history]);

  // if (currentUser.data?.user === null) history.replace("/login");
  if (logoutResult.loading) return <Loading />;
  if (logoutResult.error) return <Error msg={logoutResult.error.message} />;

  return (

    <Header display={display}>
      <Logo>
        <SLink to="/" onClick={toggle} >
          CardWallet
        </SLink>
      </Logo>
      <MenuItem ref={myRef} onClick={toggle} display={display} >
        <MenuIcon display={display} />
        <MenuIcon display={display} />
        <MenuIcon display={display} />
      </MenuItem>
      <List display={display}>
        <Item>
          <SLink to="/" onClick={toggle}>
            패스리스트
        </SLink>
        </Item>
        <Item>
          <SLink to="/notice" onClick={toggle}>
            공지사항
        </SLink>
        </Item>
        {
          user ? (
            <><Item>
              <SLink to="/mypage" onClick={toggle}>
                마이페이지
                </SLink>
            </Item>
              <Item>
                <Btn onClick={handleClick} >
                  로그아웃
                  </Btn>
              </Item></>
          ) : (
              <><Item>
                <SLink to="/login" onClick={toggle} >
                  로그인
                  </SLink>
              </Item>
                <Item>
                  <SLink to="/signup" onClick={toggle}>
                    회원가입
                    </SLink>
                </Item></>
            )
        }


      </List>
    </Header>)
}



)


export default SomeComponent;
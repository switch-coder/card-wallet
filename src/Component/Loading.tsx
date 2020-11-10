import React from "react";
import styled, { keyframes } from "styled-components";

const Conatiner = styled.div`
  position: fixed;
  display: relative;
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const LoadingText = keyframes`
  0% {
    color: white;
  }
  50% {
    color: #E6E6E6;
  }
`;

const Loading = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.span`
  position: relative;
  width: 110px;
  height: 110px;
  left: 50px;
  border: 1px solid transparent;
  border-color: transparent #2f3542 transparent #2f3542;
  border-radius: 100%;
  animation: ${Loading} 1.5s linear 0s infinite normal;
`;

const Text = styled.span`
  position: relative;
  text-align: center;
  left: -60px;
  width: 110px;
  color: black;
  animation-name: ${LoadingText} 2s infinite;
`;

export default () => (
  <Conatiner>
    <Rotate />
    <Text>Loading...</Text>
  </Conatiner>
);

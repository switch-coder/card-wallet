import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding-bottom: 0px;
`;

const Title = styled.span`
  position: relative;
  font-size: 1em;
  color: ${(props) => props.font_color};
  display: flex;
  height: 150px;
  justify-content: center;
  align-items: flex-end;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 170px;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 40%;
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 5px 20px, rgba(0, 0, 0, 0.15) 0 7px 15px;
`;

const Card = ({ name, name_en, num, image_color, font_color }) => (
  <Link to={`/edit/${num}`}>
    <Container>
      <Image bgUrl={require(`../asset/logo/${num}.png`)} bgColor={image_color}>
        <Title font_color={font_color} bgColor={image_color}>
          {name}
        </Title>
      </Image>
    </Container>
  </Link>
);

Card.propTypes = {
  name: PropTypes.string,
  name_en: PropTypes.string,
  num: PropTypes.number,
  font_color: PropTypes.string,
  image_color: PropTypes.string,
};

export default Card;

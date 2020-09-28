import React from "react";
import EditPresenter from "./EditPresenter";
import Membership from "../../membership.json";

export default class extends React.Component {
  state = {
    num: null,
    bgColor: null,
    color: null,
    name: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert("submit");
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;

    if (isNaN(parseInt(id))) {
      return push("/");
    }
    const data = await Membership.data.filter(
      (card) => card.num === parseInt(id)
    );

    if (data.length === 0 || Array.isArray(data) === false) {
      return push("/");
    }
    this.setState({
      num: id,
      bgColor: data[0].img_color,
      color: data[0].font_color,
      name: data[0].name,
      name_en: data[0].name_en,
    });
  }

  render() {
    const { num, bgColor, color, name, name_en } = this.state;
    console.log(typeof num);
    return (
      <EditPresenter
        num={num}
        bgColor={bgColor}
        color={color}
        name={name}
        handleSubmit={this.handleSubmit}
      ></EditPresenter>
    );
  }
}

import React, { createContext } from "react";

interface IContext {
  user: object;
  setUser: (any) => void;
}


const UserContext = createContext<IContext | null>(null);

const { Provider, Consumer: UserConsumer } = UserContext;

class UserProvider extends React.Component {
  state = {
    user: {

    },
  };

  setUser = (user) => {
    this.setState((prevState) => ({ user }))
  }
  render() {
    const { user } = this.state;
    const { setUser } = this;

    return <Provider value={{ user, setUser }}>{this.props.children}</Provider>;
  }
}

export { UserProvider, UserConsumer };

export default UserContext;

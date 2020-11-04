import React, { createContext, useState } from "react";

interface IContext {
  user: string;
  setUser: (any) => void;
}

const UserContext = createContext<any>(null);

export default UserContext;

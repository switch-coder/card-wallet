
export interface ICurrentUserData {
  user: IUser;
}

export interface ILogin {
  ID: string;
  passwordHash: string;
}

export interface IUser {
  id: any;
  name: string;
  ID: string;
  passwordHash: string;
  token: string;
  cards: ICard[];

}

export interface IMe {
  me: IUser;
}

export interface ICard {
  _id: any
  name: String
  store: String
  img: String
  cardNumber: String
  isCutting: Boolean
  bgColor: String
  color: String
}

export interface ILoginData {
  login: IUser | null;
}

export interface ILoginVars {
  ID: string;
  password: string;
}

export interface ILogoutData {
  logout: boolean;
}

export interface ISignupData {
  signup: boolean;
}

export interface ISignupVars {
  name: string;
  ID: string;
  password: string;
}

export interface IAddCardVars {
  name: String;
  store: String;
  img: String;
  cardNumber: String;
  isCutting: Boolean;
  bgColor: String;
  color: String;
}

export interface IAddCardData {
  addCard: boolean
}

export interface IMydata {
  mydata: IUser
}

export interface IRemoveCard {
  removeCard: Boolean
}

export interface IRemoveCardVar {
  key: string
}

export interface IMutationCard {
  mutationCard: Boolean
}

export interface IMutationcardVars {
  key: string
  name: string
  cardNumber: string
}
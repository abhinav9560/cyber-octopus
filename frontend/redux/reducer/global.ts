import { Global } from "../constants";

const initialState = {
  title: null,
  description: null,
  address: null,
  phone: null,
  email: null,
  facebook: null,
  twitter: null,
  linkden: null,
};

const globalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Global:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        address: action.payload.address,
        phone: action.payload.phone,
        email: action.payload.email,
        facebook: action.payload.facebook,
        linkden: action.payload.linkden,
        twitter: action.payload.twitter,
      };
    default:
      return state;
  }
};
export default globalReducer;

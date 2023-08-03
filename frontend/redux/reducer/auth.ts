import { AUTH } from "../constants";

const initialState = {
  token: null,
  userId: null,
  fName: null,
  lName: null,
  email: null,
  role: null,
  roleInCompany: null,
  work: null,
  image: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        fName: action.payload.fName,
        lName: action.payload.lName,
        email: action.payload.email,
        role: action.payload.role,
        roleInCompany: action.payload.roleInCompany,
        work: action.payload.work,
        image: action.payload.image,
      };
    default:
      return state;
  }
};
export default authReducer;

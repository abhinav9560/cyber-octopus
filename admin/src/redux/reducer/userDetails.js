import { UserDetail } from "../constants";
const initialState = {
  _id: null,
  name: null,
  mobile: null,
  email: null,
  role: null,
};
const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserDetail:
      return {
        ...state,
        _id: action.payload._id,
        name: action.payload.name,
        mobile: action.payload.mobile,
        email: action.payload.email,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
export default userDetailReducer;

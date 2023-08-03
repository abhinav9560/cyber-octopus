import { TOKEN } from "../constants";
const initialState = {
  token: null,
  userId: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};
export default authReducer;

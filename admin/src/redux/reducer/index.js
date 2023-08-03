import { combineReducers } from "redux";
import authReducer from "./auth";
import userDetailReducer from "./userDetails";

const rootReducer = combineReducers({
  authReducer,
  userDetailReducer,
});
export default rootReducer;

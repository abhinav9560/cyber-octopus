import { combineReducers } from "redux";

import tempReducer from "./temp";
import authReducer from "./auth";
import globalReducer from "./global";

const rootReducer = combineReducers({
  tempReducer,
  authReducer,
  globalReducer,
});
export default rootReducer;
// export type rootReducer = ReturnType<typeof rootReducer>;

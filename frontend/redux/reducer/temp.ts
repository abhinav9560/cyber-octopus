import { TEMP } from "../constants";

const initialState = {
  otpType: null,
  otpId: null,
};

const tempReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TEMP:
      return {
        ...state,
        otpType: action.payload.otpType,
        otpId: action.payload.otpId,
      };
    default:
      return state;
  }
};
export default tempReducer;

import { types } from "../types/types";

const initiaState = {
  checking: true,
  //uid: null,
  //name: null
};

export const authReducer = (state = initiaState, { type, payload }) => {
  switch (type) {
    case types.authLogin:
      return { ...state, checking: false, ...payload };
    case types.authCheckingFinish:
      return { ...state, checking: false };
    case types.authLogout:
      return { checking: false };
    default:
      return state;
  }
};

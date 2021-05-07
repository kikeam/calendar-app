import Swal from "sweetalert2";
import { fetchNoToken, fetchToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const res = await fetchNoToken("auth", { email, password }, "POST");
    const body = await res.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-time", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const res = await fetchNoToken(
      "auth/new",
      { email, password, name },
      "POST"
    );
    const body = await res.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-time", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startCheking = () => {
  return async (dispatch) => {
    const isCurrentToken = !!(localStorage.getItem("token") || "");

    if (!isCurrentToken) {
      dispatch(checkingFinish());
      return;
    }
    const res = await fetchToken("auth/renew");
    const body = await res.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-time", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(eventLogout());
  };
};

const logout = () => ({
  type: types.authLogout,
});

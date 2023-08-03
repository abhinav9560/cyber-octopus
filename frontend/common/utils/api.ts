import instance from "./inteceptor";

// import { ToastContainer, toast } from "react-toastify";
import { ShowToast } from "../component/common";
// import { useDispatch, useSelector } from "react-redux";

import { store } from "../../redux/store";

export const post = async (url: string, formData: any, type = 0) => {
  const options = {
    headers: {
      Accept: type ? "multipart/form-data" : "application/json",
      "Content-Type": type ? "multipart/form-data" : "application/json",
    },
  };

  const token = store.getState();

  if (token?.authReducer.token) {
    // @ts-ignore
    options.headers.authorization = `Bearer ${token?.authReducer.token}`;
  }
  return instance
    .post(url, formData, options)
    .then(function (response) {
      console.log("success", response);
      return response.data;
    })
    .catch(function (error) {
      ShowToast(error.message, false);
      if (error.message == "Request failed with status code 401") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
};

export const put = async (url: string, formData: any, type = 0) => {
  const options = {
    headers: {
      Accept: type ? "multipart/form-data" : "application/json",
      "Content-Type": type ? "multipart/form-data" : "application/json",
    },
  };
  const token = store.getState();

  if (token?.authReducer.token) {
    // @ts-ignore
    options.headers.authorization = `Bearer ${token?.authReducer.token}`;
  }
  return instance
    .put(url, formData, options)
    .then(function (response) {
      console.log("success", response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error, "error");
      ShowToast(error.message, false);
      if (error.message == "Request failed with status code 401") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
};

export const get = async (url: string, type = 0) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const token = store.getState();

  if (token?.authReducer.token) {
    // @ts-ignore
    options.headers.authorization = `Bearer ${token?.authReducer.token}`;
  }

  return instance
    .get(url, options)
    .then(function (response) {
      console.log("success", response);
      return response.data;
    })
    .catch(function (error) {
      if (error.message == "Request failed with status code 401") {
        localStorage.clear();
        window.location.href = "/login";
      }
      ShowToast(error.message, false);
    });
};

export const deleteApi = async (url: string, type = 0) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const token = store.getState();

  if (token?.authReducer.token) {
    // @ts-ignore
    options.headers.authorization = `Bearer ${token?.authReducer.token}`;
  }

  return instance
    .delete(url, options)
    .then(function (response) {
      console.log("success", response);
      return response.data;
    })
    .catch(function (error) {
      ShowToast(error.message, false);
      if (error.message == "Request failed with status code 401") {
        localStorage.clear();
        window.location.href = "/login";
      }
    });
};

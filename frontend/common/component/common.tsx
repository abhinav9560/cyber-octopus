import React, { useEffect, useState } from "react";
import { toast, ToastOptions } from "react-toastify";
import { store } from "../../redux/store";

const option: ToastOptions = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: false,
};

export const ShowToast = (text: string, type: boolean) => {
  toast.clearWaitingQueue();
  if (type) toast.success(text, option);
  else toast.error(text, option);
};

export const ErrorText = (props: any) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <p className="errorText">{props.title}</p>
      </div>
    </>
  );
};

export const roleArray = [
  { label: "Developer", value: 1 },
  { label: "CEO", value: 2 },
  { label: "Manager", value: 3 },
  { label: "Designer", value: 4 },
  { label: "CTO", value: 5 },
];

export const checkLanguage = () => {
  return store.getState();
};

export const DefaultDocument = (props) => {
  let type = 1;
  if (props.type == "detail") {
    const array = props.src.split(".");
    let data = array[array.length - 1];
    if (data == "jpeg" || data == "jpg" || data == "png") {
      type = 1;
    } else {
      type = 2;
    }
  } else {
    if (props.type.includes("image")) {
      type = 1;
    } else {
      type = 2;
    }
  }

  return (
    <>
      {type == 1 ? (
        <img
          src={`${props.src}`}
          style={{
            maxHeight: "80px",
            maxWidth: "80px",
            alignItems: "center",
            margin: "10px",
          }}
        />
      ) : type == 2 ? (
        <>
          <a
            className="btn btn-primary"
            style={{ margin: "2px" }}
            href={props.src}
            target={"_blank"}
          >
            Document
          </a>
        </>
      ) : (
        <>{/* <img src="/images/pdf-icon.svg"></img> */}</>
      )}
    </>
  );
};

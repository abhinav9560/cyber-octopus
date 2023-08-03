import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Loader from "react-loader-spinner";

import { toast } from "react-toastify";

const option = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: false,
  limit: 1,
};

export const ShowToast = (text, type) => {
  toast.clearWaitingQueue();
  if (type) toast.success(text, option);
  else toast.error(text, option);
};

export const ErrorText = (props) => {
  return (
    <>
      <div>
        <p className="errorText">{props.title}</p>
      </div>
    </>
  );
};

export const DefaultLoader = (props) => {
  return (
    <>
      {props.visible && (
        <Loader type="Puff" color="#00BFFF" height={"100%"} width={"100%"} />
      )}
    </>
  );
};

export const DefaultDocument = (props) => {
  let type = 1;
  const file = props.url.split(".");
  if (file[1] == "jpeg" || file[1] == "jpg" || file[1] == "png") {
    type = 1;
  } else if (file[1] == "mp4" || file[1] == "mov" || file[1] == "mkv") {
    type = 2;
  } else {
    type = 2;
  }
  return (
    <>
      {type == 1 ? (
        <Image
          src={`${props.url}`}
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
            href={props.url}
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

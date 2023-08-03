import React, { useEffect, useState } from "react";

import { ErrorText } from "./common";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let CKEditor;
let ClassicEditor;

const DefaultEditor = (props: any) => {
  useEffect(() => {
    CKEditor = require("@ckeditor/ckeditor5-react");
    ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  }, []);

  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.name}</label>

        {CKEditor && (
          <CKEditor
            editor={ClassicEditor}
            data={props.value}
            onReady={(editor: any) => {}}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              props.onChange(data);
            }}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
          />
        )}

        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

export default DefaultEditor;

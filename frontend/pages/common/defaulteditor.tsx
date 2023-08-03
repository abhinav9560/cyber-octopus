import React, { useEffect, useRef, useState } from "react";
import { ErrorText } from "../../common/component/common";

const DefaultEditor = (props) => {
  const editorRef = useRef();
  // @ts-ignore
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // @ts-ignore
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setTimeout(() => {
      setLoad(true);
    }, 550);
  }, []);

  return (
    <div>
      {load ? (
        <>
          <CKEditor
            type=""
            config={{
              toolbar: [
                "undo",
                "redo",
                "bold",
                "italic",
                "blockQuote",
                "heading",
                "link",
                "numberedList",
                "bulletedList",
                "insertTable",
                "tableColumn",
                "tableRow",
                "mergeTableCells",
              ],
            }}
            name={"asas"}
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
          {props.error ? <ErrorText title={props.error} /> : null}
        </>
      ) : null}
    </div>
  );
};

export default DefaultEditor;

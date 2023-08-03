import React, { useEffect, useRef, useState } from "react";

import { ErrorText } from "./common";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const DefaultInput = (props: any) => {
  return (
    <>
      <div className="form-group">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input
          type={props.type}
          className="form-control"
          placeholder={props.placeholder}
          name={props.name}
          id={props.id}
          ref={props.refr}
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          required={props.required}
          readOnly={props.readOnly}
          disabled={props.disabled}
          multiple={props.multiple}
          maxLength={props.maxLength}
          accept={props.accept}
        />
        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

export const DefaultOTPInput = (props: any) => {
  return (
    <>
      <input
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        ref={props.refr}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        required={props.required}
        readOnly={props.readOnly}
        disabled={props.disabled}
        maxLength={props.maxLength}
      />
    </>
  );
};

export const DefaultTextarea = (props: any) => {
  return (
    <>
      <div className="form-group">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <textarea
          className="form-control"
          placeholder={props.placeholder}
          name={props.name}
          id={props.id}
          ref={props.refr}
          value={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          required={props.required}
          readOnly={props.readOnly}
          disabled={props.disabled}
          maxLength={props.maxLength}
        ></textarea>
        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

// export const DefaultInputWithIcon = (props) => {
//   return (
//     <>
//       <div>
//         <div className="input-group mb-3">
//           <input
//             type={props.type}
//             className="form-control"
//             placeholder={props.placeholder}
//             name={props.name}
//             value={props.value}
//             onBlur={props.onBlur}
//             onChange={props.onChange}
//             required={props.required}
//             readOnly={props.readOnly}
//             disabled={props.disabled}
//             maxLength={props.maxLength}
//           />
//           <button
//             className="btn btn-outline-secondary"
//             type="button"
//             onClick={props.onClick}
//           >
//             {props.customType == "search" ? (
//               <i className="fas fa-search"></i>
//             ) : null}
//           </button>
//         </div>

//         {props.error ? <ErrorText title={props.error} /> : null}
//       </div>
//     </>
//   );
// };

export const DefaultSelect = (props: any) => {
  return (
    <>
      <div>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <select
          name={props.name}
          id={props.id}
          className={"form-control"}
          value={props.value}
          defaultValue={props.value}
          onBlur={props.onBlur}
          onChange={props.onChange}
          multiple={props.multiple}
        >
          <option disabled>{props.placeholder}</option>
          {props.data
            ? props.data.map((ele: any, index: number) => {
                return (
                  <option key={index} value={ele.value}>
                    {ele.label}
                  </option>
                );
              })
            : null}
        </select>
        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

// export const DefaultMobileInput = (props) => {
//   return (
//     <>
//       <div>
//         <label htmlFor={props.id}>{props.name}</label>
//         <PhoneInput
//           className={"form-control"}
//           placeholder={props.placeholder}
//           value={props.value}
//           onChange={props.onChange}
//           international={false}
//           withCountryCallingCode={true}
//           defaultCountry={props.defaultCountry}
//           maxLength={props.maxLength}
//           smartCaret={props.smartCaret}
//           defaultCountry={"IN"}
//         />
//         {props.error ? <ErrorText title={props.error} /> : null}
//       </div>
//     </>
//   );
// };

// export const DefaultEditor = (props: any) => {
//   let CKEditor;
//   let ClassicEditor;
//   const [load, setload] = useState(false);

//   const editorRef = useRef();

//   // const { CKEditor, ClassicEditor} = editorRef.current

//   useEffect(() => {
//     (CKEditor = require("@ckeditor/ckeditor5-react").CKEditor), 
//       (ClassicEditor = require("@ckeditor/ckeditor5-build-classic")),
//       setload(true);
//   }, []);

//   return (
//     <>
//       <div>
//         <label htmlFor={props.id}>{props.name}</label>
//         {load && (
//           <CKEditor
//             editor={ClassicEditor}
//             data={props.value}
//             onReady={(editor: any) => {}}
//             onChange={(event: any, editor: any) => {
//               const data = editor.getData();
//               props.onChange(data);
//             }}
//             onBlur={props.onBlur}
//             onFocus={props.onFocus}
//           />
//         )}

//         {props.error ? <ErrorText title={props.error} /> : null}
//       </div>
//     </>
//   );
// };

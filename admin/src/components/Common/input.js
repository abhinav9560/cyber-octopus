import React, { useEffect, useState } from "react";

import { ErrorText } from "./common";
import PhoneInput from "react-phone-number-input";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const DefaultInput = (props) => {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.name}</label>
        <input
          type={props.type}
          className="form-control default-input-class"
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
          multiple={props.multiple}
          accept={props.accept}
        />
        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

export const DefaultTextarea = (props) => {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.name}</label>
        <textarea
          type={props.type}
          className="form-control default-input-class"
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

export const DefaultInputWithIcon = (props) => {
  return (
    <>
      <div>
        <div className="input-group mb-3">
          <input
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            onBlur={props.onBlur}
            onChange={props.onChange}
            required={props.required}
            readOnly={props.readOnly}
            disabled={props.disabled}
            maxLength={props.maxLength}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={props.onClick}
          >
            {props.customType == "search" ? (
              <i className="fas fa-search"></i>
            ) : null}
          </button>
        </div>

        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

export const DefaultSelect = (props) => {
  return (
    <>
      <div>
        {props.hideLable ? null : (
          <label htmlFor={props.id}>{props.name}</label>
        )}

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
          <option disabled selected>
            {props.placeholder}
          </option>
          {props.data
            ? props.data.map((ele, index) => {
                return (
                  <option
                    key={index}
                    value={
                      props.type == "country"
                        ? String(ele.label).toLowerCase().replace(" ", "-")
                        : ele.value
                    }
                  >
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

export const DefaultMobileInput = (props) => {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.name}</label>
        <PhoneInput
          className={"form-control"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          international={false}
          withCountryCallingCode={true}
          defaultCountry={props.defaultCountry}
          maxLength={props.maxLength}
          smartCaret={props.smartCaret}
          defaultCountry={"IN"}
        />
        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

export const DefaultEditor = (props) => {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.name}</label>
        <CKEditor
          editor={ClassicEditor}
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
          data={props.value}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            props.onChange(data);
          }}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
        />
        {props.error ? <ErrorText title={props.error} /> : null}
      </div>
    </>
  );
};

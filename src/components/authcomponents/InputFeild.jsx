import React from "react";

export default function InputFeild(props) {
  return (
    <>
      <div className="w-full mb-4">
        <label htmlFor={props.htmlFor} className="block mb-2 text-gray-700">
          {props.label}
        </label>
        <input
          type={props.type}
          id={props.id}
          autoComplete={props.autoComplete || "off"}
          name={props.name}
          ref={props.refer}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span><p className="text-red-500 text-sm mt-1">{props.error}</p></span>
      </div>
    </>
  );
}

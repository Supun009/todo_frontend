import React from "react";

export default function AuthButton(props) {
  return (
    <>
      <div className="w-full mb-4">
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {props.buttonName}
        </button>
      </div>
    </>
  );
}

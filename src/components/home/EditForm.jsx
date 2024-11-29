import React, { useRef, useEffect, useState } from "react";

function EditForm({ isOpen, onClose, onSubmit, task, isDarkMode }) {
  const formRef = useRef(null);
  const [todoValue, setTodoValue] = useState(task?.task || "");

  const handleInputChange = (e) => {
    setTodoValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = todoValue.trim();
    if (!trimmedValue) {
      alert("Todo cannot be empty or just spaces!");
      return;
    }

    onSubmit({ ...task, task: trimmedValue });
    setTodoValue("");
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setTodoValue(task?.task || "");
  }, [task]);

  if (!isOpen) {
    return null;
  }

  // Define theme-based styles
  const backgroundClass = isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
  const inputClass = isDarkMode
    ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-gray-500"
    : "bg-white border-gray-300 text-gray-800 focus:ring-pink-500";
  // const buttonClass = isDarkMode
  //   ? "bg-gradient-to-r from-gray-700 to-gray-500"
  //   : "bg-gradient-to-r from-pink-500 to-orange-400";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={formRef}
        className={`
          relative 
          ${backgroundClass}
          rounded-xl 
          shadow-2xl 
          w-96 
          p-6 
          transform 
          transition-all 
          duration-300 
          scale-100 
          opacity-100
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute 
            top-4 
            right-4 
            text-gray-500 
            hover:text-gray-300 
            transition-colors
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Edit ToDo
          </h2>
          <input
            type="text"
            value={todoValue}
            onChange={handleInputChange}
            className={`
              w-full 
              p-3 
              border-2 
              rounded-lg 
              focus:outline-none 
              focus:border-transparent 
              transition-all 
              duration-300
              ${inputClass}
            `}
            placeholder="Enter your text here"
          />
          <button
            type="submit"
            className={`
              w-full 
              py-3 
              bg-gradient-to-r from-pink-500 to-orange-400
              text-white 
              rounded-lg 
              hover:opacity-90 
              transition-opacity 
              duration-300 
              font-semibold 
              uppercase 
              tracking-wider
            `}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;

import React, { useRef, useEffect, useState } from "react";

function EditForm({ isOpen, onClose, onSubmit, task }) {
  const formRef = useRef(null);
  const [todoValue, setTodoValue] = useState(task?.task || ""); // Initialize local state

  const handleInputChange = (e) => {
    setTodoValue(e.target.value); // Update local state when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = todoValue.trim(); // Remove leading/trailing spaces
    if (!trimmedValue) {
      alert("Todo cannot be empty or just spaces!");
      return;
    }

    onSubmit({ ...task, task: trimmedValue }); // Pass updated task to parent
    setTodoValue(""); // Clear local state after submission
    onClose(); // Close the form
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); // Close if clicking outside
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
    setTodoValue(task?.task || ""); // Update local state when the task prop changes
  }, [task]);

  if (!isOpen) {
    return null; // Render nothing if the form is not open
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={formRef}
        className="
          relative
          bg-white 
          rounded-xl 
          shadow-2xl 
          w-96 
          p-6 
          transform 
          transition-all 
          duration-300 
          scale-100 
          opacity-100
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute 
            top-4 
            right-4 
            text-gray-500 
            hover:text-gray-800 
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Edit Item
          </h2>
          <input
            type="text"
            value={todoValue} // Controlled input
            onChange={handleInputChange} // Update local state on input change
            className="
              w-full 
              p-3 
              border-2 
              border-gray-300 
              rounded-lg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-pink-500 
              focus:border-transparent 
              transition-all 
              duration-300
            "
            placeholder="Enter your text here"
          />
          <button
            type="submit"
            className="
              w-full 
              py-3 
              bg-gradient-to-r 
              from-pink-500 
              to-orange-400 
              text-white 
              rounded-lg 
              hover:opacity-90 
              transition-opacity 
              duration-300 
              font-semibold 
              uppercase 
              tracking-wider
            "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditForm;

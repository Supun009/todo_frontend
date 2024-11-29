import React, { useState, useRef, useEffect } from 'react';

function FloatingButton(props) {
  const { theme = "true" } = props; // Default to "light" mode
  const [isOpen, setIsOpen] = useState(false);
  const todoRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.toSubmit(todoRef.current.value);
    setIsOpen(false);
    todoRef.current.value = "";
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current && 
        !formRef.current.contains(event.target) &&
        !event.target.closest('.floating-button')
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        className={`
          floating-button 
          w-16 h-16 
          bg-gradient-to-br from-pink-500 to-orange-400 
          text-white 
          rounded-full 
          shadow-2xl 
          hover:shadow-xl 
          transition-all 
          duration-300 
          flex 
          items-center 
          justify-center 
          transform 
          hover:scale-110 
          active:scale-95
        `}
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      {/* Modal Overlay and Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div 
            ref={formRef}
            className={`
              relative
              ${theme ? "bg-gray-800 text-white" : "bg-white text-gray-800"} 
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
              onClick={handleClose}
              className={`
                absolute 
                top-4 
                right-4 
                ${theme ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"} 
                transition-colors
              `}
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
                Add New ToDo
              </h2>
              <input
                type="text"
                ref={todoRef}
                className={`
                  w-full 
                  p-3 
                  border-2 
                  ${theme ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"} 
                  rounded-lg 
                  focus:outline-none 
                  focus:ring-2 
                  ${theme ? "focus:ring-pink-400 focus:border-transparent" : "focus:ring-pink-500 focus:border-transparent"} 
                  transition-all 
                  duration-300
                `}
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
      )}
    </div>
  );
}

export default FloatingButton;

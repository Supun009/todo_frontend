import React from "react";

const TodoItem = ({ index, todo, markasCompleted, handleEdit, handleDelete, isDarkMode }) => {
  return (
    <li
      key={todo.todo_id}
      className={`
        px-6 py-4 flex items-center justify-between transition-colors duration-300 
        ${
          todo.completed
            ? isDarkMode
              ? "bg-gray-700 text-gray-500"
              : "bg-gray-100 text-gray-500"
            : isDarkMode
            ? "hover:bg-gray-700"
            : "hover:bg-blue-50"
        }
      `}
    >
      <p
  className={`
    text-lg flex-grow pr-4 break-words 
    ${todo.completed ? "line-through" : ""}
    ${isDarkMode ? "text-gray-300" : ""}
  `}
  style={{
    wordBreak: "break-word", // Fallback for wrapping long words
    overflowWrap: "break-word", // Handle long unbroken strings
  }}
>
  {todo.task}
</p>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleEdit(index)}
          className={`
            hover:text-red-700 transition-colors duration-200 
            ${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                : "text-red-500 hover:text-red-700 hover:bg-red-100"
            }
            p-2 rounded-full
          `}
        >
          Edit
        </button>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => markasCompleted(index)}
          className={`
            form-checkbox h-5 w-5 rounded 
            ${
              isDarkMode
                ? "text-blue-600 bg-gray-700 border-gray-600"
                : "text-blue-600 focus:ring-blue-500"
            }
          `}
        />
        <button
          onClick={() => handleDelete(index)}
          className={`
            hover:text-red-700 transition-colors duration-200 
            ${
              isDarkMode
                ? "text-red-400 hover:text-red-300 hover:bg-gray-700"
                : "text-red-500 hover:text-red-700 hover:bg-red-100"
            }
            p-2 rounded-full
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

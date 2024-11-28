import { useState, useEffect, useRef } from "react";
import { getAllTodos, updateTodo } from "../../services/TodoServices";
import { addTodo } from "../../services/TodoServices";
import { markasCompletedDb } from "../../services/TodoServices";
import { deleteTodo } from "../../services/TodoServices";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import FloatingButton from "../../components/home/FloatingButton";
import FormDialogbox from "../../components/home/EditForm";
import EditForm from "../../components/home/EditForm";
export default function TodoPage() {
  const [todos, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos();
        const todoList = todos.todo_list.map((todo) => ({
          todo_id: todo.todo_id,
          task: todo.task,
          user_id: todo.user_id,
          completed: todo.completed,
          created_at: todo.created_at,
        }));
        setTodo(todoList);
        toast.success("Todos fetched successfully");
      } catch (error) {
        toast.error("Error fetching todos");
      }
    };

    fetchTodos();
  }, []);

  const todoSubmit = async (text) => {
    if (text.trim() !== "") {
      const id = uuidv4();
      const newtodo = {
        task: text,
        deleted: false,
        user_id: "",
        todo_id: id,
        completed: false,
        created_at: new Date().toISOString(),
      };

      try {
        setTodo([...todos, newtodo]);
        await addTodo(newtodo);
      } catch (error) {
        toast.error("Error adding todo");
      }
    } else {
      toast.error("Please enter a task");
    }
  };

  const markasCompleted = (index) => {
    setTodo((prev) =>
      prev.map(
        (todo, i) => {
          if (i === index) {
            handeCompleted(todo.todo_id, !todo.completed);
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }
        // i === index ? { ...todo, completed: !todo.completed }  : todo
      )
    );
  };

  const handeCompleted = async (todo_id, isCompleted) => {
    try {
      const response = await markasCompletedDb(todo_id, isCompleted);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = (index) => {
    setTodo((prev) => {
      const todoToDelete = prev[index];

      if (todoToDelete) {
        handleDeleteDb(todoToDelete.todo_id);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDeleteDb = async (todo_id) => {
    try {
      const response = await deleteTodo(todo_id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = (index) => {
    const todoedit = todos[index];
    setEditTodo(todoedit);
    setIsOpen(true);
  };

  const handleEditDb = async (editedTodo) => {
    setTodo((prev) =>
      prev.map((todo, i) => {
        if (todo.todo_id === editedTodo.todo_id) {
          return { ...todo, task: editedTodo.task };
        }
        return todo;
      })
    );
    try {
      const response = await updateTodo(editedTodo.task, editedTodo.todo_id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-center text-blue-800 tracking-tight">
            Todo List
          </h1>
        </header>

        <section className="bg-white shadow-xl rounded-lg overflow-hidden">
          {todos.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {todos.map((todo, index) => (
                <li
                  key={todo.todo_id}
                  className={`px-6 py-4 flex items-center justify-between transition-colors duration-300 
                    ${
                      todo.completed
                        ? "bg-gray-100 text-gray-500"
                        : "hover:bg-blue-50"
                    }`}
                >
                  <p
                    className={`text-lg flex-grow pr-4 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.task}
                  </p>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 hover:bg-red-100 p-2 rounded-full"
                    >
                      Edit
                    </button>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => markasCompleted(index)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200 hover:bg-red-100 p-2 rounded-full"
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
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p className="text-xl">No todos yet. Add a new task!</p>
            </div>
          )}
        </section>

        <FloatingButton toSubmit={todoSubmit} />

        <EditForm
          task={editTodo}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleEditDb}
          initialValue=""
        />
      </div>
    </div>
  );
}

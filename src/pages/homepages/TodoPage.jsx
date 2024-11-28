import React, { useState, useEffect } from "react";
import { getAllTodos, updateTodo } from "../../services/TodoServices";
import { addTodo } from "../../services/TodoServices";
import { markasCompletedDb } from "../../services/TodoServices";
import { deleteTodo } from "../../services/TodoServices";
import { currentuser } from "../../services/AuthService";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import FloatingButton from "../../components/home/FloatingButton";
import EditForm from "../../components/home/EditForm";
import TodoItem from "../../components/home/TodoItem";
import { useOutletContext } from "react-router-dom";

export default function TodoPage() {

  const { isDarkMode, setIsDarkMode } = useOutletContext();
  const [todos, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [currentUser, setCurrentUser] = useState("");


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

    const getCurrent = () => {
      const user = currentuser();
      if (user !== null) {
        setCurrentUser(user);
      }
    };

    

    getCurrent();
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
      prev.map((todo, i) => {
        if (i === index) {
          handeCompleted(todo.todo_id, !todo.completed);
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handeCompleted = async (todo_id, isCompleted) => {
    try {
      await markasCompletedDb(todo_id, isCompleted);
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
      prev.map((todo) => {
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`
      min-h-screen 
      ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}
      py-8 px-4 sm:px-6 lg:px-8
    `}>
      <div className="max-w-2xl mx-auto">
        {/* User Display and Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          {currentUser && (
            <div className={`
              text-lg font-semibold
              ${isDarkMode ? 'text-gray-200' : 'text-blue-800'}
            `}>
              Welcome, {currentUser}
            </div>
          )}
          <button 
            onClick={toggleDarkMode}
            className={`
              px-4 py-2 rounded-full transition-colors duration-300
              ${isDarkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}
            `}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <header className="mb-6">
          <h1 className={`
            text-4xl font-extrabold text-center tracking-tight
            ${isDarkMode ? 'text-white' : 'text-blue-800'}
          `}>
            Todo List
          </h1>
        </header>

        <section className={`
          shadow-xl rounded-lg overflow-hidden
          ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}
        `}>
          {todos.length > 0 ? (
            <ul className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {todos.map((todo, index) => (
                <TodoItem index={index} handleDelete={handleDelete} handleEdit={handleEdit} key={todo.todo_id} todo={todo} markasCompleted={markasCompleted} isDarkMode={isDarkMode}/>
                
              ))}
            </ul>
          ) : (
            <div className={`
              text-center py-10 
              ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
            `}>
              <p className="text-xl">No todos yet. Add a new task!</p>
            </div>
          )}
        </section>

        <FloatingButton theme={isDarkMode} toSubmit={todoSubmit} />

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
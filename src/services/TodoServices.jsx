import axiosInstance from "./AxiosInsance";

export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get("/todos/get-todos");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};

export const addTodo = async (newtodo) => {  try {
    const response = await axiosInstance.post("/todos/add-todo", { newtodo });
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};
export const markasCompletedDb = async (todo_id, isCompleted) => {
  try {
    return await axiosInstance.post(`/todos/completed/${todo_id}`, {
      isCompleted,
    });
  } catch (error) {
    return "Something went wrong";
  }
};

export const deleteTodo = async (todo_id) => {
  try {
    const response = await axiosInstance.delete(`/todos/delete/${todo_id}`);
    return response.data;
  } catch (error) {
    return "Something went wrong";
  }
};

export const updateTodo = async (editedtask, todo_id) => {
  try {
    const response = await axiosInstance.put(`/todos/update/${todo_id}`, {
      editedtask,
    });
    return response.data;
  } catch (error) {
    return "Something went wrong";
  }
};

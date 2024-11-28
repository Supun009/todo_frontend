import axiosInstance from "./AxiosInsance";


export const getAllTodos = async () => {
  try {
    const response = await axiosInstance.get("/todos/get-todos");
    if (response.status === 200) {
      console.log(response.data)
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

export const addTodo = async (newtodo) => {
  console.log(newtodo);
  try {
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
export const markasCompletedDb = async(todo_id, isCompleted) => {
  console.log(todo_id)
  console.log(isCompleted)
  try {
    return await axiosInstance.post(`/todos/completed/${todo_id}`, {isCompleted});
   
  } catch (error) {
    return "Something went wrong";
  }
}

export const deleteTodo = async(todo_id) => {
  try {
    const response =  await axiosInstance.delete(`/todos/delete/${todo_id}`);
   console.log(response.data);
   return response.data;
  } catch (error) {
    console.log(error.message);
    return "Something went wrong";
  }
}

export const updateTodo = async(editedtask, todo_id) => {
  try {
    const response =  await axiosInstance.put(`/todos/update/${todo_id}`,{editedtask});
   console.log(response);
   return response.data;
  } catch (error) {
    console.log(error.message);
    return "Something went wrong";
  }
}



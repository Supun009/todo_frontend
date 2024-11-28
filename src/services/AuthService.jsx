import axiosInstance from "./AxiosInsance";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem("jwttoken", response.data.access_token);
      return "200";
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("jwttoken");
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (email, username, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      email,
      username,
      password,
    });
    if (response.status == 201) {
      return "201";
    }
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return "Something went wrong";
    }
  }
};
export const currentuser = (username, password) =>
  axiosInstance.post("/auth/currentuser", { username, password });

import axiosInstance from "./AxiosInsance";
import {jwtDecode} from 'jwt-decode';


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
    console.log(response)
   return response;
  } catch (error) {  
      console.log(error.response.data.message) ;
      return error;
    }
  }

export const currentuser = () =>{
  const token = localStorage.getItem("jwttoken");
  
  if (!token) {
    return null;
  } else {
    try {

      const decodedToken = jwtDecode(token); 

      const email = decodedToken?.username;

      if (!email) return null;
      return email;
  } catch (error) {
      console.error("Invalid token", error);
      return null;
  }
  
  }
}
 

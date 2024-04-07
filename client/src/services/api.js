import  axios from "axios";
import { CREATE_TODO, LOGIN } from "./apiConstants";
import { REGISTER } from "./apiConstants";

export const login = async (data)=>{
    return axios.post(LOGIN,data)
}

export const register = async (data)=>{
    return axios.post(REGISTER,data)
}

export const createTodoApi = async (data)=>{
    return axios.post(CREATE_TODO,data)
}
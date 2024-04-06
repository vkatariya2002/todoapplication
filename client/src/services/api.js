import  axios from "axios";
import { LOGIN } from "./apiConstants";
import { REGISTER } from "./apiConstants";

export const login = async (data)=>{
    return axios.post(LOGIN,data)
}

export const register = async (data)=>{
    return axios.post(REGISTER,data)
}
import User from "../models/User.js"
import Todo from "../models/Todo.js"
import { jsonGenerate } from "../utils/helpers.js";
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET,StatusCode } from "../utils/constants.js";
export const GetTodos = async(req,res)=>{
    const user=jwt.verify(req.headers.auth,JWT_TOKEN_SECRET);
    try {
        const list = await Todo.find({ userId: user.userId})
        // .select("-password")
        // .populate('todos')
        // .exec();
        console.log(list);
        return res.json(jsonGenerate(StatusCode.SUCCESS,"ALL todo list",list))
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"error",error))

    }
}
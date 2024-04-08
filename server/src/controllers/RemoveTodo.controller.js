import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import Todo from '../models/Todo.js';
import jwt from 'jsonwebtoken';

export const RemoveTodo = async (req,res)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo id is required",error.mapped()));
    }
    const user=jwt.verify(req.headers.auth,JWT_TOKEN_SECRET)
    try {
        const result = await Todo.findOneAndDelete({
            userId:user.userId,
            _id:req.body.todo_id,
        });
        // if(result){
        //     const user = await user.findOneAndUpdate({
        //         _id:user.userId,
        //     },
        //     {
        //         $pull:{todos:req.body.todo_id}}
        //     );
            return res.json(jsonGenerate(StatusCode.SUCCESS,"todo deleted",null));
        // }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"could not delelted",null));

    }
}
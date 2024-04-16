import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import jwt from 'jsonwebtoken';
import Todo from "../models/Todo.js";

export const MarkTodo = async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo id is required ",error.mapped()))
    }
    const user=jwt.verify(req.headers.auth,JWT_TOKEN_SECRET);
    console.log(user.userId);
    try {
        // const todo = await Todo.findOneAndUpdate({
        //     _id:req.body.todo_id,
        //     userId: user.userId,
        // },
        //     {
        //         $set: {
        //             isCompleted:{
        //                 $eq:[false,"$isCompleted"]
        //             }
        //         }
        //     }
        // );
        let check;
        if(req.body.isCompleted){
            check=false;
            console.log('test1');
        }
        else{
            check=true;
            console.log('test2');x1``
        }
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.body.todo_id,
                userId: user.userId,
            },
            {
                $set: {
                    isCompleted: check
                }
            }
        );
        console.log(todo);
        if(todo){
            return res.json(jsonGenerate(StatusCode.SUCCESS,"updated",todo))
        }
    } catch (error) {
        console.log(error);
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"could not update",null))

    }
};
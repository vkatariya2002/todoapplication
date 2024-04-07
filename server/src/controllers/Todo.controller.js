import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET,StatusCode } from "../utils/constants.js";
import Todo from '../models/Todo.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const createTodo=async (req,res)=>{
    const error = validationResult(req);
    const user=jwt.verify(req.headers.auth,JWT_TOKEN_SECRET);
    if(!error.isEmpty()){
        return res.json(
            jsonGenerate(
                StatusCode.VALIDATION_ERROR,
                "Todo is required",
                error.mapped()
            )
        );
    }
    try {
        const result = await Todo.create({
            userId:user.userId,
            desc:req.body.desc,
        })

        if(result){
            const user = await User.findOneAndUpdate({_id:req.userId},
                {
                    $push:{todos:result}
                });
            return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo created Successfully",result))
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Something went wrong ",error))

    }
};
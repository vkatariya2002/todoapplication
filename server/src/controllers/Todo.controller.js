import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";

export const createTodo=async (req,res)=>{
    const error = validationResult(req);
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
            userId:req.userId,
            desc:req.body.desc,
        })

        if(result){
            const user = await User.findOneAndUpdate({_id:req.userId},
                {
                    $push:{totos:result}
                });
            return res.json(jsonGenerate(StatusCode.SUCCESS,"Todo created Successfully",result))
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Something went wrong ",error))

    }
};
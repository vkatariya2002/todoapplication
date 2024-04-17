import { validationResult } from "express-validator";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";
import { jsonGenerate } from "../utils/helpers.js";

const Login = async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const { username, password } = req.body;
        const userrs = await User.findOne({ username: username })

        if (!userrs) {
            return res.json
                (jsonGenerate(
                    StatusCode.UNPROCESSABLE_ENTITY,
                    "Username or password is incorrect"
                )
            );
        }

        const verified = bcrypt.compareSync(password, userrs.password);
    
    if (!verified) {
        return res.json(
            jsonGenerate(
                StatusCode.UNPROCESSABLE_ENTITY,
                "Username or password is incorrect"
            )
        );
    }


    const token = Jwt.sign({ userId: userrs._id }, JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(StatusCode.SUCCESS, "Login Successful", {userId: userrs._id,token: token,}));
    }
    
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
 };

export default Login;
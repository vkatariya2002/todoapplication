import express from "express";
import apiRoute, {apiProtected} from "./routes/api.js";
import mongoose  from "mongoose";
import AuthMiddleware from "./middlewares/AuthMidleware.js";
import {DB_CONNECT} from "./utils/constants.js";


const app = express();

//mongoose.connect(DB_CONNECT,{useNewUrlParser:true},(e)=>console.log(e));

mongoose.connect(DB_CONNECT)
.then(()=>{console.log('Connected to MongoDB')})
.catch(error=>{console.log(error)});

const PORT = 8000;

app.use(express.json());
app.use('/api/',apiRoute);
app.use("/api/",AuthMiddleware,apiProtected);
app.listen(PORT,()=>console.log('server is running'))

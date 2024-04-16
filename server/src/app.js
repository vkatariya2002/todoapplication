import express from "express";
import apiRoute, {apiProtected} from "./routes/api.js";
import mongoose  from "mongoose";
import AuthMiddleware from "./middlewares/AuthMidleware.js";
import {DB_CONNECT} from "./utils/constants.js";
import cors from 'cors';


const app = express();

//mongoose.connect(DB_CONNECT,{useNewUrlParser:true},(e)=>console.log(e));

mongoose.connect(DB_CONNECT)
.then(()=>{console.log('Connected to MongoDB')})
.catch(error=>{console.log(error)});

const PORT = 8000;


app.use(cors());
// app.use(cors({
//     origin: 'https://todoapplication-3r56.vercel.app/',
//     methods: ['GET', 'POST'], // Specify the allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed request headers
//   }));
app.use(express.json());
app.use('/api/',apiRoute);
app.use("/api/",AuthMiddleware,apiProtected);
app.listen(PORT,()=>console.log('server is running'))

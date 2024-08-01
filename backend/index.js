import express from 'express';
import dotenv from 'dotenv'
import path from 'path';
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from 'mongoose';
import {userAuthRouter} from './Routes/userAuthRoutes.js'
const app = express()
app.use(cors(
    {
        origin:'http://localhost:5173',
        credentials:true,
        allowedHeaders:['Content-Type','Authorization'],
        exposedHeaders:['Content-Type','Authorization'],
        methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue:false,
        optionsSuccessStatus:200,
    }
));

app.use(express.json());
app.use(cookieParser());
app.use('/auth',userAuthRouter);
// app.use('/app',userApiRouter);
dotenv.config({path:'secrets.env'});
const port = process.env.PORT


mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("Database connected!")).catch(err=>{
    console.log(err.message);
});






app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});
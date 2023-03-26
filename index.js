/**
 * Modules
 */

import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from'cors';
import connectDB from './mongodb/connect.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import Authenticate from './routes/Authenticate.js';
import path from 'path';
import User from './mongodb/models/user.js';




/**
 * 
 * 
 Set up the app and middleware:
 */


dotenv.config();
const app  = express();
const __dirname = path.resolve();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use('/resgist',userRoutes);
app.use('/login',Authenticate);
app.use('/booking',bookingRoutes);



app.use(express.static(__dirname+'/client'));
app.get('/', async (req,res)=>res.sendFile('./client/index.html',{root : __dirname},(err)=>console.log(err)));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));



const port =8080;

const startServer = async () =>{
try {
    connectDB(process.env.MONGO_URL);
    app.listen(port , () =>console.log(`server was running on port : http://localhost:${port} `));
} catch (error) {
    console.log(error);
}



}   
startServer();
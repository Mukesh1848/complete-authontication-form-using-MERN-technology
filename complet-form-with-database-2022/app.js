import express from 'express'
const app = express();
const port = process.env.PORT || "3000"
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";
import {join} from 'path';
import connectDB from './db/connectdb.js';
import web from './routes/web.js';


// database connection 
connectDB(DATABASE_URL);

// set template engine 
app.set("view engine" , "ejs");


app.use(express.json())
app.use(express.urlencoded({extended:false}));


// load routes 
app.use('/',web);

app.listen(port,()=>{
        console.log(`server is running at the port of http://localhost:${port}`);
})
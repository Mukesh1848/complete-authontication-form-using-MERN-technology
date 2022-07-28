import mongoose from 'mongoose'

const connectDB = async(DATABASE_URL)=>{
        try {
              const DB_OPTIONS ={
                dbName:"database_name"
              }  
              await mongoose.connect(DATABASE_URL,DB_OPTIONS);
              console.log("connection successfully");
        } catch (error) {
         console.log(error)       
        }
}

export default connectDB;

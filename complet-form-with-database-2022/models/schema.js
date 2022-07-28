import mongoose from 'mongoose'

// definging schema

const formSchema = new mongoose.Schema({
        name:{type:String, required:true,trim:true},
        age:{type:Number, required:true},
        email:{type:String,required:true},
        password:{type:String, required:true},
        address:{type:String, required:true}     
})

// Model 
const formModel = mongoose.model("Collection_Name",formSchema);


export default formModel;

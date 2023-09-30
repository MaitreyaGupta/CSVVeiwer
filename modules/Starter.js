const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
},{
    timestamps:true,
})

const user=new mongoose.model("user",userSchema)

module.exports=user
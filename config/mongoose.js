const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://maitreyaguptaa:killerman@devs.syeiknh.mongodb.net/NewCSVSaver",{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection

db.once("open",function(req,res){
    console.log("The database has been connected")
})

module.exports=db

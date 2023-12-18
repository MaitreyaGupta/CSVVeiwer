const mongoose=require("mongoose")

mongoose.connect(" mongodb+srv://Maitreya:KillerMan@cluster0.sk6ugig.mongodb.net/CSVStarter",{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection

db.once("open",function(req,res){
    console.log("The database has been connected")
})

module.exports=db

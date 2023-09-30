const express=require("express")
const fs=require("fs")
const multer=require("multer")
const db=require("./config/mongoose")
const {parse}=require("csv-parse")
app=express() 
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set("view engine","ejs")
app.use(express.static("public"))
const Starter=require("./modules/Starter")
const path = require("path")
const csv=require("fast-csv")
const user = require("./modules/Starter")
const parser= require("csv-parser")
app.listen(5000,function(req,res){
    console.log("This is to inform you the port is listening")
})

let storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads/")
    },
    filename:(req,file,callback)=>
    {
        callback(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    },
})

let upload=multer({
    storage:storage
})

app.get("/",function(req,res){
    res.render("Index")
})
 
let Starter1=[]

app.post("/Starter",upload.single('i'),function(req,res){
     uploadCSV(__dirname +"/uploads/"+req.file.filename)
     console.log(user.name)
     console.log(__dirname +"/uploads/"+req.file.filename)
     res.redirect("ShowCSV")
     Starter1+=req.file.filename
})


function uploadCSV(path){ 
    const CSVdata = []; 
    fs.createReadStream(path)
        .pipe(parser({}))
        .on('data', (data) => CSVdata.push(data))
        .on('end', () => {
          console.log(CSVdata);
          const data2={
            name:JSON.stringify(CSVdata),
          } 
          console.log(data2)
          if(data2!=null)
      {
      user.insertMany(data2)
      }
      else
      {
        res.send("Please upload again")
      }// further processing with birthdays
      })
}

app.get("/ShowCSV",async function(req,res){
    const data3=await user.find()
 res.render("ShowCSV",{
    practice:data3})
})

 app.post("/DeleteCSV",function(req,res){
    delCSV(__dirname +"/uploads/"+Starter1)
    res.redirect("/")
})

app.post("/NewCSV",function(req,res){
    res.redirect("/")
})
function delCSV(path){
    const CSVdata1 = []; 
    fs.createReadStream(path)
        .pipe(parser({}))
        .on('data', (data) => CSVdata1.push(data))
        .on('end', () => {
          console.log(CSVdata1);
          const data4={
            name:JSON.stringify(CSVdata1),
          }
          user.collection.deleteMany(data4)
          console.log(data4)
})
}

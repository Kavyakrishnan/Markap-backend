const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const { default: mongoose } = require("mongoose")
const req = require("express/lib/request")
const res = require("express/lib/response")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
var MarkModel=Mongoose.model("marks",
new mongoose.Schema(
    {
        name: String,
        admissionno: String,
        cgpa: String
    }
)
)
Mongoose.connect("mongodb+srv://gopika:1234@cluster0.2q4qp.mongodb.net/markappdb")


app.post("/api/delete",(req,res)=>{
    try{
        var getId=req.body
    MarkModel.findByIdAndRemove(getId,(error,data)=>{
        if(error){
res.send({"status":error})
        }
        else{
 res.send({"status":"success"})       

        }
    })
    }
    catch(error){
        res.send(error)
    }
})
app.post("/api/search",(req,res)=>{
try{
    var getadmissionno=req.body
MarkModel.find(getadmissionno,(error,data)=>{
 if(error)
 {
     res.send({"status":error})}
 else
 {
     res.send(data)
    }   
}) 
} 
catch(error){
res.send(error)
} 
})
app.post("/api/viewall",(req,res)=>{
    try{
        MarkModel.find(
            (error,data)=>{
                if(error){
    res.send({"status":"error"})
                }
    else
    {
    res.send(data)
    }
            }
        )
    }
    catch(error)
    {
        res.send(error)
    }
})

app.post("/api/read",(req,res)=>{
    try{
        var data=req.body
    let ob=new MarkModel(data)
    ob.save(
        ( error,data)=>
        {if(error){
            res.send({"status":"error","error":error})
        }
else
{
    res.send({"status":"success","data":data})
}
        }
    )
   
    }
    catch(error)
    {
        res.send(error)
    }
})
app.listen(4011,()=>{
    console.log("server is running")
})
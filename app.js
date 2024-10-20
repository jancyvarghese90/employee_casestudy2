// Task1: initiate app and run server at 3000
var express=require('express');
var morgan=require('morgan');
const mongoose=require('mongoose');
require('dotenv').config();
const employeeModel=require("./model/employeeModel")
var app=express();
app.use(express.json());
app.use(morgan("dev"));

app.listen(process.env.port,()=>{
    console.log(`server is listening in the port ${process.env.port}`)
});
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

mongoose.connect(process.env.mongo_url)
.then(()=>{
console.log("db is connected")
})
.catch((err)=>{
    console.log(err);
});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'


app.get('/api/employeelist',async(req,res)=>{
    try{
var data=await employeeModel.find();
res.status(200).send(data);
    }catch(error){
res.status(400).send("unable to send")
    }
});

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async(req,res)=>{

    try{
        
        var data=await employeeModel.findById(req.params.id)
       
        res.status(200).send(data);
    }
    catch(error){
        res.status(404).send("unable to get data")
    }
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async(req,res)=>{
try{
    var item=req.body;
    var data=new employeeModel(item);
    await data.save();
    res.status(200).send("Data added successfully");
}
catch(error){
res.status(400).send("unable to send data");
}
});




//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id",async(req,res)=>{
    console.log("hello")
    try{
        console.log(req.params.id)
await employeeModel.findByIdAndDelete(req.params.id);
res.status(200).send("Deleted successfully")
    } 
    catch(error){
res.status(404).send("unable to delete")
    }
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist/:id',async(req,res)=>{
    try{
await employeeModel.findByIdAndUpdate(req.params.id,req.body)
res.status(200).send("Updated Successfully")
    }
    catch(error){
res.status(404).send("unable to update")
    }
});
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




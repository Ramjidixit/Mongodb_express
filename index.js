const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');

main()
.then(()=>{
    console.log("connection completed");
})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.send("working root welcome");
})

app.listen(8081,()=>{
    console.log("app is listening..")
})
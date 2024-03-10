const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
//requiring from chat.ejs
const Chat=require("./models/chat.ejs");

const methodOverride=require('method-override');

main()
.then(()=>{
    console.log("connection completed");
})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
//to use styling
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

//index route
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
     res.render("idex.ejs",{chats})
 })
 //new route
 app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
 })

 //create route
 app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()

    });
    newChat.save().then(res=>{console.log("chat is saved")}).catch(err=>{
        console.log(err);
    });
    res.redirect("/chats");
 })

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let { id }=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{ chat });
})
//update route
app.put("/chats/:id",async(req,res)=>{
    let { id }=req.params;
    let {msg:newMsg}=req.body;
    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true});

    res.redirect("/chats");
});


//destroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
})

app.get("/",(req,res)=>{
    res.send("working root welcome");
})

app.listen(8081,()=>{
    console.log("app is listening..")
})
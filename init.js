const mongoose=require('mongoose');
//requiring from chat.ejs
const Chat=require("./models/chat.ejs");


main()
.then(()=>{
    console.log("connection completed");
})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


let allChats=[{
    from:"Shreya1",
    to:"Prachi1",
    msg:"Hello Dear1",
    created_at:new Date()
},
{
    from:"Shreya2",
    to:"Prachi2",
    msg:"Hello Dear2",
    created_at:new Date()
},
{
    from:"Shreya3",
    to:"Prachi3",
    msg:"Hello Dear3",
    created_at:new Date()
},
{
    from:"Shreya4",
    to:"Prachi4",
    msg:"Hello Dear4",
    created_at:new Date()
},
{
    from:"Shreya5",
    to:"Prachi5",
    msg:"Hello Dear5",
    created_at:new Date()
},
];
Chat.insertMany(allChats);

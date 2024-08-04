const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
const Chat=require("./models/chat.js");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
// what we want to create : there is website which shiws chat  basuc chat the chat we do in whatsapp  the basic information like id ,from,to,message,created_at
// with the help of restfull api
main().then(()=>{
    console.log("connection is successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.post("/chats",(req,res)=>{
let{from,to,msg}=req.body;
let newchat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
});
newchat.save()
.then((res)=>{
    console.log("chat was saved");
})
.catch((err)=>{
    console.log(err);
});
res.redirect("/chats");
});
// EDIT ROUTE
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);

    res.render("edit.ejs",{chat});
});
// update route
app.put("/chats/:id", async(req,res)=>{
     let { id }=req.params;
     let{  msg:newMsg } =req.body;
     console.log(newMsg);
     let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},
        { runValidators: true, new: true}
     );
     console.log(updatedChat);
    res.redirect("/chats");
});
// destroy route
app.delete("/chats/:id", async(req,res)=>{
    let { id }=req.params;
     let  deletedChat= await Chat.findByIdAndDelete(id);
     console.log(deletedChat);
     res.redirect("/chats");

})
app.get("/chats",async(req,res)=>{
     let chats=   await Chat.find();
    //  console.log(chats);
     res.render("index.ejs",{chats});
});
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})





























// create after chat.js
let chat1=new Chat({
    from:"neha",
    to:"priyanshi",
    msg:" send me the pics of the day",
    created_at:new Date()
});
chat1.save().then((res)=>{
    console.log(res);
});
app.listen(8080,()=>{
    console.log(("server is listening"));
});
app.get("/",(req,res)=>{
    res.send("root.is working");
});

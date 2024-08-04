const mongoose=require("mongoose");
const Chat=require("./models/chat.js");
main().then(()=>{
    console.log("connection is successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
let allchats=[
    {
            from:"nehul",
            to:"preet",
        msg:"Hey hello how are you",
          created_at:new Date(),
    },
    {
        from:"mehul",
        to:"nehul",
        msg:"Hey how's doing",
        created_at:new Date(),
    },
    {
        from:"rehul",
        to:"mehul",
        msg:"let's meet",
        created_at:new Date(),
    },
    {
        from:"mehak",
        to:"megha",
        msg:"reach fast",
        created_at:new Date(),
    },
    {
        from:"rahul",
        to:"preeti",
        msg:"let goo its too late now",
        created_at:new Date(),
            },
]
Chat.insertMany(allchats);
// chat.save().then((res)=>{
//     console.log(res);
// });
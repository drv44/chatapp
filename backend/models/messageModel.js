// import mongoose
const mongoose=require('mongoose')

const messageModel=mongoose.Schema({
    //create an obj inside of it ,3 things first name of sender or the id of sender , second the content of the msg(that is wht is written inside of this msg),third reference of the chat to which it belongs to
    sender:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    content:{type:String,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
},{
    timestamps:true,
}
);

const Message = mongoose.model("Message",messageModel);

module.exports=Message;
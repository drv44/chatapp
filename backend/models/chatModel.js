const mongoose=require('mongoose')

//user , latestmsg,groupAdmin
const chatModel=mongoose.Schema(
    {
        chatName:{type:String, trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            }
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    }

    ,
    //add a field so that mongoose create the timestamp everytime we add a new data 
    {
        timestamps:true,
    }


);

const Chat=mongoose.model("Chat",chatModel);

module.exports=Chat;





//chatname
//isgrpchat
//users
//latestmsg
//grpadmin

const bcrypt =require("bcryptjs")

const mongoose = require('mongoose');
// const {registerUser}=require("../controllers/userControllers")


const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password: {type:String, required:true},
    pic:{type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
},{
    timestamps:true
});

userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}
userSchema.pre('save',async function (next){
    if(!this.isModified){
        next();
    }

    const salt=await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)

})

const User= mongoose.model("User",userSchema);

module.exports = User;

//these were 3 fields we have in our database , with the help of these models mongodb will understand how it need to structure this data in our database 
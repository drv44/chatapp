const expressAsyncHandler = require("express-async-handler");
const User=require("../models/userModel");
const generateToken= require('../config/generateToken')

const registerUser = expressAsyncHandler (async(req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all fields");
    }

    const userExists=await User.findOne({email});

     if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

     if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }

} );

const authUser= expressAsyncHandler( async(req,res)=>{
    const {email,password}=req.body;

    const user= await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        // isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id) 
        })
    }else {
        res.status(400);
        throw new Error("User not found");
    }

});

// /api/user?search=piyush
// for queries use registerUser.query , for id use req.id
const allUsers = expressAsyncHandler(async(req,res)=>{
    const keyword = req.query.search ? {
         $or: [
          { name: { $regex: req.query.search, $options: "i" } }, //we use regex to see if the query inside of this search is matches with name of user, option i to match case insenstive like uppercase or lowercase both
          { email: { $regex: req.query.search, $options: "i" } },
        ],
    }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})

module.exports = {registerUser,authUser , allUsers }
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Schema
const userSchema = new Schema({
    name: {type:String, 
        required:true}, 
    email: {type:String,
        required:true},
    username: {type:String, 
        required:true}, 
    password: {type:String,
        required:true},
}, {timestamps:true});

// Model
const User = mongoose.model('User', userSchema) // Automatically searches for 'donations' collections in mongoDB

module.exports = User
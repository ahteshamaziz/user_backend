const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    
    First_name : {
        type: String,
        required:true
    },
    Last_name: {
        type: String,
        required:true
    },
    Email: {
        type: String,
        required:true,
        unique:true
    },
    Phone_number: {
        type: String,
        required:true
    },
    Profile:{
        type: String,
        required:true
    }



});



module.exports = mongoose.model('User', User,'User');

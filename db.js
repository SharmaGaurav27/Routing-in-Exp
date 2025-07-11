const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:String ,unique:true},
    password:String,
    firstName:String,
    lastName:String

});

const adminSchema = new Schema({

});

const courseSchema = new Schema({

});

const purchaseSchema = new Schema({

});

const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    adminID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        required : true
    },
    name : {
        type : String,
        required :true 
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    type:{
        type:String,
        required : true
    },
    salary : {
        type : Number,
        required: true
    }
});

const Manager = mongoose.model('Manager',managerSchema);

module.exports = Manager;
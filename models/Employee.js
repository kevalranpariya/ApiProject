const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    adminID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        required : true
    },
    managerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Manager',
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
        type :String,
        required : true
    },
    salary : {
        type : Number,
        required: true
    }
});

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;
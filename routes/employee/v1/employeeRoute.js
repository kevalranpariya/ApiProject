const express = require('express');
const employeeController = require('../../../controller/employee/v1/employeeController');
const passport = require('passport');

const route = express.Router();

route.post('/addEmployee',passport.authenticate('manager-rule',{session:false}), employeeController.addEmployee)

route.post('/login', employeeController.employeeLogin);

route.get('/profile',passport.authenticate('employee-rule',{session : false}), employeeController.employeeProfile);

route.get('/allEmployee',passport.authenticate('manager-rule',{session : false}),employeeController.allEmployee);

route.put('/updateEmployee',passport.authenticate('employee-rule',{session : false}), employeeController.updateEmployee);

route.get('/deleteEmployee/:id',passport.authenticate('manager-rule',{session : false}),employeeController.deleteEmployee);

module.exports = route
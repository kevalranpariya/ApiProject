const express = require('express');
const adminController = require('../../../controller/admin/v1/adminController');
const passport = require('passport');   
const { Passport } = require('passport');
const route = express.Router();

route.post('/addAdminData',passport.authenticate('admin-rule',{session : false}),adminController.addAdminData);

route.post('/login', adminController.AdminLogin);

module.exports = route;
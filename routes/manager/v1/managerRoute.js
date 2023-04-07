const express = require('express');
const passport = require('passport');
const managerController = require('../../../controller/manager/v1/managerController');
const route = express.Router();

route.post('/addManager',passport.authenticate('admin-rule',{session : false}), managerController.addManager);

route.post('/login',managerController.managerLogin);

route.put('/managerUpdateData',passport.authenticate('manager-rule',{session : false}), managerController.managerUpdateData);

route.get('/profile',passport.authenticate('manager-rule',{session:false}),managerController.managerProfile);

route.get('/viewAllManager',passport.authenticate('admin-rule',{session : false}), managerController.viewAllManager);

route.get('/deleteManager/:id',managerController.deleteManager);

module.exports = route;
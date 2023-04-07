const express = require('express');

const route = express.Router();

route.use('/admin',require('./admin/v1/adminRoute'));
route.use('/manager',require('./manager/v1/managerRoute'));
route.use('/employee',require('./employee/v1/employeeRoute'));
module.exports = route;
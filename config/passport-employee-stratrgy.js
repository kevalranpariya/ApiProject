const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;

const Employee = require('../models/Employee');

passport.use('employee-rule',new jwtStrategy({
    jwtFromRequest : Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'employeeData'
},async(employeeData, done)=>{
    let checkEmployee = await Employee.findById(employeeData.Data._id);

    if(checkEmployee)
    {
        return done(null,checkEmployee);
    }
    return done(null,false)
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    let checkEmployee = await Employee.findById(id);

    if(checkEmployee)
    {
        return done(null,checkEmployee)
    }
    return done(null,false)
});

module.exports = passport;
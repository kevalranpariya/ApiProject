const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Admin = require('../models/Admin');

passport.use('admin-rule',new JWTstrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'NewAPIProject'
},async(adminData,done)=>{
    let user = await Admin.findById(adminData.Data._id);
    if(user)
    {
        return done(null,user);
    }
    return done(null,false)
}));



passport.serializeUser((user,done)=>{
    return done(null, user.Data._id);
});

passport.deserializeUser(async(id,done)=>{

    let user = await Admin.findById(id);
    if(user)
    {
        return done(null, user);
    }
    return done(null,false);
});



module.exports = passport;
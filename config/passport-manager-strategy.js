const { compareSync } = require('bcrypt');
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Manager = require('../models/Manager');


passport.use('manager-rule',new JWTstrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'ManagerData'
},async(playload,done)=>{
    let checkManager = await Manager.findById(playload.Data._id);

    if(checkManager)
    {
        return done(null,checkManager);
    }
    return done(null,false)
}));

passport.serializeUser((checkManager,done)=>{
    return done(null, checkManager.Data._id);
});

passport.deserializeUser(async(id,done)=>{
    let checkManager = await Manager.findById(id);
    if(checkManager)
    {
        return done(null, checkManager);
    }
    return done(null,false);
});



module.exports = passport;
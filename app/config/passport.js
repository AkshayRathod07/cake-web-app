const LocalStrategy = require('passport-local').Strategy
const User = require("../models/User")
const bcrypt = require("bcrypt")

// function init(passport){
//     passport.use(new LocalStrategy ({usernameField : "email"}, async (email,password,done) =>{
//         // Login
//         // Check email exists
//         const user = User.findOne({email:email})
//         if(!user){
//             return done(null,false,{message:'NO user with this email'})
//         }

//         bcrypt.compare(password,user.password).then(match=>{
//             if(match){
//                 return done(null,user,{message: "Logged in successfully"})
//             }
//             return done(null,false,{message: "Wrong user name or password"})
//         }).catch(err=>{
//             return done(null,false,{message: "Something went wrong"})

//         })

//     } ))

//     passport.serializeUser((user,done)=>{
//         done(null,user._id)
//     })

//     passport.deserializeUser((id,done)=>{
//         User.findById(id,(err,user)=>{
//             done(err,user)
//         })
//     })
// }


function init(passport) {
    passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done) => {
    //login
    
    //check if email exist
    
    const user = await User.findOne({email : email})
    if(!user) {
        return done(null,false, { message:'No User Found With This Mail'})
    }
    
    bcrypt.compare(password,user.password).then(match => {
        if(match) {
            return done(null,user ,{message:'Success'})
        }
        return done(null,false ,{message:'Wrong Username OR Password'})
    }).catch(err => {
        return done(null,false,{message:'Something went wrong'})
    })
    
    }))
    
    passport.serializeUser((user,done) => {
    done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user) => {
    done(err,user)
    })
    })
    
    }



module.exports = init
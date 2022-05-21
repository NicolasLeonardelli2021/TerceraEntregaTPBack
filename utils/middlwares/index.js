const session = require("express-session")
const passport = require("passport");
let LocalPassport = require("passport-local").Strategy
let usuarioSchema= require('../../DB/schema/usuarios');
const SECRET_KEY_SESION = "desafioFinal";
const Usuario = require('../../objetos/usuario');
const MongoStore = require('connect-mongo');
const email = require('../email');
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

module.exports = app =>{
 

passport.use("login", new LocalPassport(async(username,password,done)=>{
    console.log("entro al middware login");
    let user = await usuarioSchema.find({email:username});
    if(user=="") return done(null,false);
    if(user[0].password != password) return done(null,false);

    return done(null,user[0]);

}));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nicolas:nicolas34805446@cluster0.69iyd.mongodb.net/ecomerce?retryWrites=true&w=majority',
        mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true}
    }),
    secret: SECRET_KEY_SESION,
    cookie:{
        httpOnly: false,
        secure: false,
        maxAge:600000
    },
    resave: false,
    saveUninitialized:false
}))


passport.serializeUser((user,done)=>{
    done(null, user.email);
})

passport.deserializeUser(async(username,done)=>{
    await usuarioSchema.find({email:username})
    .then((user)=>  done(null, user))
    .catch(error => console.log("Error al leer la Base de Datos",error));
});

app.use(passport.initialize());
app.use(passport.session());

}
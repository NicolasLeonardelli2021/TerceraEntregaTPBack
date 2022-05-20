const session = require("express-session")
const passport = require("passport");
let LocalPassport = require("passport-local").Strategy
let usuarioSchema= require('../../DB/schema/usuarios');
const SECRET_KEY_SESION = "desafioFinal";
const Usuario = require('../../objetos/usuario');
const MongoStore = require('connect-mongo');


module.exports = app =>{
 

passport.use("login", new LocalPassport(async(username,password,done)=>{

    let user = await usuarioSchema.find({email:username});
    console.log(user)
    if(user=="") return done(null,false);
    if(user[0].password != password) return done(null,false);

    return done(null,user[0]);

}));

passport.use("register", new LocalPassport(
    
    {passReqToCallback:true},
    async(req, username, password, done)=>{
        try{
            console.log("entro a user register");
            let { nombre } = req.body;
            const {apellido} = req.body
           const {edad} = req.body;
           const {area} = req.body;
           const {telefono} = req.body;
           let numTelefono = area+telefono;
    
        let user = await usuarioSchema.find({email:username})
        /* .then(()=> console.log(user))
        .catch((error)=> console.log("error al leer la BD")); */

        console.log("usuario:",user)
        if(user!="") return done(null,false);
    
        const usuario = new Usuario(nombre,apellido,edad,username,password,numTelefono);
           const usuarioSave = new usuarioSchema(usuario);
           await usuarioSave.save()
           
           return done(null, usuario)

        }catch(error){
            console.log('Error al guardar los datos',error)
        }
     
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
        maxAge:60000
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
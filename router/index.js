//let carrito = require("../components/carrito")
//let card = require("../components/card")
//const fetch = require("node-fetch");
const Usuario = require('../objetos/usuario');
const Producto = require('../objetos/Producto');
const Carrito = require('../objetos/Carrito')
const { tamanioArray, carrito } = require('../src/daos');
const ProductoDaoMemoria = require('../src/daos')
const CarritoDao = require('../src/daos')
const baseProductos = require('../src/daos');
let usuarioSchema= require('../DB/schema/usuarios');
const passport = require("passport");
let LocalPassport = require("passport-local").Strategy
let datos = "";
const email = require('../utils/email');

const SECRET_KEY_SESION = "desafioFinal";
const session = require("express-session")

 let administrador = false;
console.log(ProductoDaoMemoria)
console.log(baseProductos)

function calcularTiempo(){
    let t = new Date();
    const dia = t.getDate();
    const mes = t.getMonth()+1;
    const anio = t.getFullYear();
    const hora = t.getHours();
    const min = t.getMinutes();
    const seg = t.getSeconds();

    if(mes < 10){
        return dia+"/"+0+mes +"/"+anio +"-"+hora + ":" + min + ":"+seg;
    }else{
        return dia+"/"+mes +"/"+anio +"-"+hora + ":" + min + ":"+seg;
    }

}




let isAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.render('error', {eror: "No estas autenticado"});
    }
} 

let isNoAuth = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.redirect('productos');
    }
} 

    

//app.post("/registro",  passport.authenticate("register",{successRedirect:"datos", failureRedirect: "error"}));


module.exports = app =>{
   
    app.get('/',(req,res,next)=>{
        res.render('principal',{});
    })

    //Vista Ingreso
     app.get("/api/ingreso", (req,res)=>{
        let existCarri = false
        let administrador = true;

        if(CarritoDao.tamanioArrayCarrito() != 0){
            existCarri = true;
        }
        
        res.render("index",{existCarri,administrador});
    }) 
    
    // Vista ingreso para Editar
    app.get("/api/ingreso/:id",(req,res)=>{
        const array = baseProductos.listarAll();
        let {id} = req.params;
        for(producto of array){
            if(producto.id == id){
                res.render("edicion",producto);
            }
        }

    })
    
    //Grabar  de datos
    app.post("/api/ingreso",(req,res,next)=>{
        //console.log(baseProductos.tamanioArray())
        let id = baseProductos.tamanioArray() + 1;
        let timestamp = calcularTiempo();
        let {nombre} = req.body;
        let {descripcion} = req.body;
        let {codigo} = req.body;
        let {precio} = req.body;
        let {ruta} = req.body;
        let {stock} = req.body;
    
    ProductoDaoMemoria.insertarProducto(new Producto(id,timestamp,nombre,descripcion,codigo,ruta,precio,stock))
    res.redirect("/api/ingreso");
      
    })
    
    // Vista PRODUCTOS

    app.get("/api/productos", isAuth, (req,res,next)=>{
        //let existCarri = false


       /*  if(CarritoDao.() != 0){
            existCarri = true;tamanioArrayCarrito
        } */
        const usuario = req.user[0];
        const nombre = req.user[0].nombre;
        const array = baseProductos.listarAll();
        console.log(usuario);
        res.render("card", {array,usuario});
        console.log(array)
        
    })


/*
    app.get("/api/productos/:id", (req,res,next)=>{
        let {id} = req.params;
        let encontrado = false;
    
            for(producto of productos){
                if(producto.id == id){
                    encontrado=true
                    const productos = [producto]
                    res.render("../card",{productos});
                }
            }
            if(encontrado == false){
                res.json({
                    "ERROR": "producto no encontrado"
                })
            }
    })
*/

    // Grabar Edicion
   app.put("/api/edicion/:id",(req,res,next)=>{
       console.log("entro al PUT")
        const {id} = req.params;
        let encontrado = false;
        let {nombre} = req.body;
        let {descripcion} = req.body;
        let {codigo} = req.body;
        let {precio} = req.body;
        let {ruta} = req.body;
        let {stock} = req.body;

        const array = baseProductos.listarAll();
        for(producto of array){
            if(producto.id == id){
                encontrado=true
                producto.set(nombre,descripcion,codigo,precio,ruta,stock)
            }
        }

        if(encontrado == false){
            res.json({
                "ERROR": "producto no encontrado"
            })
        }else{
            //alert("producto Guardado")
            res.render("../card",{array});
            //res.render("../card",{productos});
        }  
    })

    function borrar(req,res,next){

    }

    // Eliminar Producto
    app.delete('/api/productos/:id', (req,res,next)=>{
        const {id} = req.params
        baseProductos.borrarElemento(id);
        const array = baseProductos.listarAll();
        
        
      
    })

    app.post('/api/carrito',(req,res)=>{
        
        const id = CarritoDao.tamanioArrayCarrito() + 1
        const timestamp = calcularTiempo();

        CarritoDao.insertarACarrito(new Carrito(id,timestamp))
        console.log(CarritoDao.listarAllCarrito());
    })
   app.post('/api/carrito/:id/productos',(req,res)=>{
        const {ids} = req.body;
        const array = baseProductos.listarAll();
        const carri = CarritoDao.listarAllCarrito();
        for(producto of array){
            if(producto.id == ids){
                encontrado=true
                console.log(producto)
                    carri[0].agregarProductos(producto)
                
              
            }
        }
        console.log(CarritoDao.listarAllCarrito())
   })

   app.get('/api/carrito/:id/productos',(req,res)=>{
       let {id} = req.params;
       let array = CarritoDao.verCarrito(id)
        console.log(array)
       res.render('carrito',{array})
   })

   app.get('/api/registro', isNoAuth,(req,res,next)=>{
        res.render('register',{});
   })

  
   app.post("/api/registro",async(req,res,next)=>{
    let { username } = req.body;
        try{    
            let user = await usuarioSchema.find({email:username});
            if(user==""){
                datos = (req.body);
                
                res.render("imagenUsuario",{});
            }else{
                res.send("Usuario ya registrado");
            }
        }catch(error){  
            res.render("error",{});
        }
   })



app.get("/api/upload",(req,res,next)=>{
   
    res.render("imagenUsuario",{});
})

app.post("/api/upload", async(req,res)=>{
    try{
        console.log(req.file)
        const image = req.file.filename
        const rutaImage = '/uploads/' + image
        let num = datos.area+datos.telefono
        const usuario = new Usuario(datos.nombre,datos.apellido,datos.edad,datos.username,datos.password,num,rutaImage);

         console.log(usuario);
         const usuarioSave = new usuarioSchema(usuario);
        await usuarioSave.save(); 

        email(usuario); 
        res.render('userRegistrado',{});
    }catch(error){
        console.log(error)
    }
  
    
})

/* app.post('/api/login', (req,res,next)=>{
    const {email} = req.body;
    const {password} = req.body;
    console.log(email,password)
}) */

app.post("/api/login", passport.authenticate("login",{successRedirect:"productos", failureRedirect: "error"}));

app.get('/api/login', isNoAuth,(req,res,next)=>{
    res.render('login',{});
})

const getName = req =>req.session.name;

app.get("/api/olvidar",(req, res, next)=>{
    let name = getName(req)
    req.session.destroy(err =>{
        if(err) res.json({error: JSON.stringify(err) });
        res.redirect('login');      
    })
    
})

}

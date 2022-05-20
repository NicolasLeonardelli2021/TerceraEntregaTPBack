
const express = require("express")
const app = express()
const middlwares = require('./utils/middlwares')
let cors = require("cors");
let path = require('path')
let {config} = require("./config");
const PORT = config.port;
const serverRoutes = require("./router")


app.use(express.json());                    
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors("*"));

app.set("views",path.join( __dirname,"./views"));
app.set("view engine", "ejs");

middlwares(app)

serverRoutes(app)


app.listen(PORT, err=>{
    console.log(`estamos escuchando en esta url: http://localhost:8080`)
})
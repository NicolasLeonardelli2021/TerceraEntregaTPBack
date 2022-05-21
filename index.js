
const express = require("express")
const app = express()
const middlwares = require('./utils/middlwares')
let cors = require("cors");
let path = require('path')
let {config} = require("./config");
const PORT = config.port;
const serverRoutes = require("./router")
const multer = require('multer');
const uuid = require('uuid/v4');

app.use(express.json());                    
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors("*"));

app.set("views",path.join( __dirname,"./views"));
app.set("view engine", "ejs");

app.use(express.static('public'));

//app.use(multer({dest: path.join(__dirname, 'public/uploads')}).single('image'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb,filename) => {
                 cb(null, uuid() + path.extname(file.originalname));
    }
});


app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    /* fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }, */
    //limits: {fileSize: 1000000},
}).single('image'));




middlwares(app)

serverRoutes(app)


app.listen(PORT, err=>{
    console.log(`estamos escuchando en esta url: http://localhost:8080`)
})
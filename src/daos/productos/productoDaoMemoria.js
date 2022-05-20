const ContenedorMemoria = require("../../contenedores/contenedorMemoria")

//let productos = [];
class ProductoDaoMemoria extends ContenedorMemoria {
    constructor(){
        super()
    }

    async desconectar(){

    }
}
module.exports = new ProductoDaoMemoria
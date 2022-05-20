const ContenedorMemoria = require("../../contenedores/contenedorMemoria")

//let carrito = [];
class CarritoDaoMemoria extends ContenedorMemoria {
    constructor(){
        super()
    }

    async desconectar(){

    }
}
module.exports = new CarritoDaoMemoria

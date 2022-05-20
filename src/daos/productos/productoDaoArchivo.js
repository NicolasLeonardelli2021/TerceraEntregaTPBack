const ContenedorArchivo = require("../../contenedores/contenedorArchivo")

class ProductoDaoArchivo extends ContenedorArchivo {
    constructor(){
        super('DB/productos.json')
    }

    async desconectar(){

    }
}
module.exports = ProductoDaoArchivo

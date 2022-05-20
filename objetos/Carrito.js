class Carrito{
    constructor(id,timestamp, productos){
        this.id = id;
        this.timestamp = timestamp;
        this.productos =[];

    }

    agregarProductos(objeto){
        this.productos.push(objeto)
        }

    }

    module.exports = Carrito
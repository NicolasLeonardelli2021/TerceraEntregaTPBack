class ContenedorMemoria {
    constructor(){
        this.arrayProductos = [];
        this.carrito = [];
        
    }

    async listar(id){
        const objs = await this.listarAll();
        const buscado = objs.find(o =>o.id == id)
        return buscado;
    }
      listarAll(){
        try{         
            return this.arrayProductos
        }catch(error){
            return[]
        }
    }
    listarAllCarrito(){
        try{         
            return this.carrito
        }catch(error){
            return[]
        }
    }

    tamanioArray(){
        return this.arrayProductos.length;
    }
    tamanioArrayCarrito(){
        return this.carrito.length;
    }

    insertarProducto(obj){
        this.arrayProductos.push(obj)
    }
    insertarACarrito(obj){
        this.carrito.push(obj)
    }

    borrarElemento(id){
        let encontrado = false;
        for(let i =0; i< this.tamanioArray(); i++){
        if(this.arrayProductos[i].id == id){
            encontrado=true
            this.arrayProductos.splice(i,1)
            console.log("borrado")
        }
        }
    }

    verCarrito(id){
        return this.carrito[id-1].productos
    }
}
module.exports = ContenedorMemoria
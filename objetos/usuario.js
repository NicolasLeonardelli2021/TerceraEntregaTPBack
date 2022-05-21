class usuario {
    constructor(nombre, apellido, edad, email, password, telefono, imagen){
        this.rol = "usuario";
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.imagen = imagen;
    }

    
}

module.exports = usuario;
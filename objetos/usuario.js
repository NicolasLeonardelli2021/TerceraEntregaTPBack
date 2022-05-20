class usuario {
    constructor(nombre, apellido, edad, email, password, telefono, ){
        this.rol = "usuario"
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
    }

    
}

module.exports = usuario;
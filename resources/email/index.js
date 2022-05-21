let {createTransport} = require("nodemailer");


module.exports = obj =>{

    let host = 'smtp.ethereal.email';

    /* let user = 'fdx2oen2zxvwy3en@ethereal.email';
    let pass = 'vY7UamprESh6JWUeh2H'; */
    
    let user = 'nicolasleonardelli2012@gmail.com';
    let pass = 'vaojlkmygjuqwews'; 
    
    let transport = createTransport({
        host,
        service: 'gmail',
        port: 587,
        auth: {
            user,
            pass
        }
    });
    console.log(obj)
    console.log(process.argv);
    let subject =process.argv[2] || `Nuevo Registro`;
    let html = process.argv[3] || `<div><h2> Datos nuevo registro</h2></div>
                                    <div> <p> emeil: ${obj.email}</p><br>
                                    <p> nombre: ${obj.nombre}</p><br>
                                    <p> apellido: ${obj.apellido}</p><br></br>
                                    <p> telefono: ${obj.telefono}</p><br>
                                    <p> edad: ${obj.edad}</p><br> </div> `;
    
    (async()=>{
        try{
           
    
            let params = {
                from: 'Informatica Cender',
                to: 'nicolasleonardelli2012@gmail.com',
                subject,
                html,
              
            }
            const response = await transport.sendMail(params);
            console.log("Response -> ", response);
        }catch(error){
            console.log(error)
        }
    })()


}

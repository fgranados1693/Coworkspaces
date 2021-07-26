'use strict';

let input_correo;
let input_contrasenna;
let btn_iniciar_sesion;
let usuario;

/*--CARGA LOS VALORES*/ 
function init() {
    input_correo = document.querySelector('#input-correo');
    input_contrasenna = document.querySelector('#input-contrasenna');
    btn_iniciar_sesion = document.getElementById('#link-ingresar');
    
}

//VALIDA SI LOS CAMPOS ESTAN VACIOS
const validar = () => {
    let error;
    let campos_requeridos = document.querySelectorAll('[required]');

    campos_requeridos.forEach(campo => {
        if (campo.value == '') {
            campo.classList.add('is-invalid');
            error = true;
            event.preventDefault();
        } else {
            campo.classList.remove('is-invalid');
            campo.classList.remove('is-valid');
        }
    });
    return error;
};


//CALCULA LA FECHA MAS CERCANA A LA ACTUAL
function getClosestDateToToday(dates) {
    var temp = dates.map(d => Math.abs(new Date() - new Date(d).getTime()));
    var idx = temp.indexOf(Math.min(...temp));
    //console.log(dates[idx]);
    return dates[idx];
}

//VALIDA SI LA CONTRASEÑA QUE SE ESTA INGRESANDO ES LA CONTRASEÑA ACTIVA. LA CONTRASEÑA ACTIVA ES LA QUE TENGA LA FECHA MAS RECIENTE
function validarContrasenna() {
    //console.log("valida contraseña al menos");
    let service = "contrasenna/contrasenna?idUsuario=";
    let controlActions = new ControlActions();

    //let encriptado = new MD5();
    var contraMD5 = CryptoJS.MD5(input_contrasenna.value).toString();
    
    let estado = false;
    service += usuario;
    //let conVerif = encriptado.MD5(input_contrasenna); 

    let conBD = controlActions.GetToApiFuncional(service);
    console.log(service);
    console.log(contraMD5);
    console.log(conBD);
    let fechas = [];
    
    Array.from(conBD.Data).forEach(con => {
        fechas.push(con.Fecha_Creacion);
    });
    //console.log(fechas);
    

    let fechaMenor = getClosestDateToToday(fechas);
    //console.log(conBD.Data);

    Array.from(conBD.Data).forEach(con => {
       //console.log(fechaMenor, con.Valor);
        if (fechaMenor == con.Fecha_Creacion) {
            if (contraMD5 == con.Valor) {
                
                estado = true;
                //console.log("verifica contra");
            }
        }
    });
    return estado;
}

function validarUsuario(email) {
    let service = "usuario";
    let controlActions = new ControlActions();
    let estado = false;

    let usuarios = controlActions.GetToApiFuncional(service);
    //console.log(usuarios);

    Array.from(usuarios.Data).forEach(user => {
        //console.log(user);
        if (user.Email == email) {
            estado = true;
            usuario = user.Id_Usuario;
        } else {
            event.preventDefault();
        }
    });
    return estado;

}

//ESTABLECE EL ROL DEL USUARIO EN LOCAL STORAGE
function rolUsuario(idUsuario) {
    let service = "rolusuario";
    let ctrlActions = new ControlActions();
    let estado = false;

    let rolUsuario = ctrlActions.GetToApiFuncional(service);
    Array.from(rolUsuario.Data).forEach(rol => {
        if (rol.Id_Usuario == idUsuario) {
            
            //console.log("Rol: "+rol.Id_Rol);
            localStorage.setItem('rolUsuario', rol.Id_Rol);
        }
    });
}

async function isPropietario() {
    var isPropietario = false;

    if (usuario != "" && usuario != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + usuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        for (var i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 2) {
                isPropietario = true;
            }

        }
    }
    return isPropietario;
}

async function validarRol() {

    var res = true;

    if (await isPropietario()) {
        res = await checkSolicitud();
    }

    if (res == false)
        return res;

    res = await validarEstado();

    return res;
}

async function validarEstado() {

    let ctrlActions = new ControlActions();

    var res = true;

    if (usuario != "" && usuario != undefined) {
        var url = "https://localhost:44302/api/usuario/" + usuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (json['Data']['Estado'] != "activo") {
            ctrlActions.ShowMessage('E', "Su cuenta fue desactivada");
            res = false;
        }
    }

    return res;
}

async function checkSolicitud() {
    try {
        let ctrlActions = new ControlActions();

        var url = "https://localhost:44302/api/solicitud";
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var solicitudes = json['Data'];
        var solicitud = {};
        for (var i in solicitudes) {
            if (solicitudes[i]['Id_Usuario'] == usuario) {
                solicitud = solicitudes[i];
            }
        }

        if (solicitud['Revisada'] != 'true') {
            ctrlActions.ShowMessage('E', "Su solicitud no ha sido revisada");
            return false;
        } else {
            if (solicitud['Resultado'] != 'aceptada') {
                ctrlActions.ShowMessage('E', "Su solicitud fue rechazada");
                return false;
            }
        }

        return true;

    } catch (err) {
        console.log(err);
    }
}

//REALIZA LAS VALIDACIONES Y GENERA EL LOCAL STORAGE PARA EL MANEJO DE SESIONES
document.getElementById('link-ingresar').onclick = async function () {
    let ctrlActions = new ControlActions();
    validar();
    
    if (validarUsuario(input_correo.value) == true) {
        if (validarContrasenna() == true) {
            if (await validarRol() == true) {
                //VALIDA SI ES UN INICIO DE SESION DE CARRITO
                if (localStorage.getItem('sesionReservaUsuario') == 1) {
                    localStorage.setItem('idUsuario', usuario);
                    localStorage.setItem('sesion', true);
                    localStorage.setItem('sesionReservaUsuario', 0);
                    rolUsuario(usuario);
                    window.location.href = "PagarReserva";
                } else {
                    localStorage.setItem('idUsuario', usuario);
                    localStorage.setItem('sesion', true);
                    rolUsuario(usuario);
                    window.location.href = "vPerfilUsuario";
                }
            }
        } else {
            ctrlActions.ShowMessage('E', "Contraseña y/o correo incorrectos");
            event.preventDefault();
        }

    } else {
        //input_correo.add('error');
        //input_contrasenna.add('error');
        ctrlActions.ShowMessage('E', "Contraseña y/o correo incorrectos");
        event.preventDefault();
    }
    
    
};
    //console.log('se hizo');
    
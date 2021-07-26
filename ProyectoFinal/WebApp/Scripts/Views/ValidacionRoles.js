function load() {}

var id_usuario_logeado = localStorage.getItem('idUsuario');

async function isAdmin() {
    var isAdmin = false;

    if (id_usuario_logeado != "" && id_usuario_logeado != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + id_usuario_logeado;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        for (var i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 1) {
                isAdmin = true;
            }

        }
    }
    return isAdmin;
}

async function isPropietario() {
    var isPropietario = false;

    if (id_usuario_logeado != "" && id_usuario_logeado != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + id_usuario_logeado;
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

async function isFinal() {
    var isFinal = false;

    if (id_usuario_logeado != "" && id_usuario_logeado != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + id_usuario_logeado;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        for (var i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 3) {
                isFinal = true;
            }

        }
    }
    return isFinal;
}

async function checkMembresia() {
    try {
        var membresia = await GetMembresia();

        var today = new Date();
        var memDate = new Date(membresia['Fecha_Ultimo_Pago']);

        if ((today - memDate) / (1000 * 3600 * 24 * 365) > 1) {
            window.location.href = "vPagarMembresia";
        }
    } catch (err) {
        console.log(err);
    }
}

async function GetMembresia() {
    try {

        var url = "https://localhost:44302/api/membresia?idUsuario=" + id_usuario_logeado;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        }

        return json['Data'];
    } catch (err) {
        console.log(err);
    }
}

async function GetSolicitud() {
    try {

        var url = "https://localhost:44302/api/solicitud";
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var solicitudes = json['Data'];
        var solicitud = {};
        for (i in solicitudes) {
            if (solicitudes[i]['Id_Usuario'] == id_usuario_logeado) {
                solicitud = solicitudes[i];
            }
        }

        return solicitud;
    } catch (err) {
        console.log(err);
    }
}

async function checkSolicitud() {
    try {
        var solicitud = await GetSolicitud();

        if (solicitud['Resultado'] != 'aceptada') {
            //Limpiar el local storage.
            localStorage.setItem('correo', '');
            localStorage.setItem('contrasenna', '');
            localStorage.setItem('idUsuario', '');
            localStorage.setItem('sesion', false);
            location.href = '../';
        }

    } catch (err) {
        console.log(err);
    }
}

//ON DOCUMENT READY
$(document).ready(async function () {
    try {
        var sesion = localStorage.getItem('sesion');
        if (sesion == "true") {
            if (await isAdmin()) {
                if (document.getElementById("dash-admin") != null)
                    document.getElementById("dash-admin").classList.remove('visually-hidden');
            } else {
                if (await isPropietario()) {
                    if (document.getElementById("dash-prop") != null)
                        document.getElementById("dash-prop").classList.remove('visually-hidden');
                    await checkSolicitud();
                    await checkMembresia();

                } else {
                    if (await isFinal()) {
                        if (document.getElementById("dash-final") != null)
                            document.getElementById("dash-final").classList.remove('visually-hidden');
                    }
                }
            }
        } else {
            window.location.href = "../";
        }

    } catch (err) {
        console.log(err);
    }
    
});


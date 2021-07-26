function load() { }

var usuario = {};

var idUsuario = localStorage.getItem('idUsuario');

function vPerfilUsuario() {

    this.Mod = function () {
        localStorage.setItem('idUsuarioMod', localStorage.getItem('idUsuario'));
        window.location.href = "vModificarPerfilUsuario";
    }

    this.ModEmail = function () {
        localStorage.setItem('idUsuarioMod', localStorage.getItem('idUsuario'));
        window.location.href = "vModificarEmail1";
    }

    this.ModTel = function () {
        localStorage.setItem('idUsuarioMod', localStorage.getItem('idUsuario'));
        window.location.href = "vModificarTelefono1";
    }

    this.Recargar = function () {
        window.location.href = "vRecargarMonedero";
    }

    this.SubirFotoPerfil = function () {
        window.location.href = "vRegistrarFotoPerfil";
    }

    this.EliminarFotoPerfil = async function () {

        var ctrlActions = new ControlActions();

        try {

            var data = usuario;
            data['URL_Foto'] = "https://res.cloudinary.com/imgproyecto1/image/upload/v1618533622/suyzfhrrlz1wkwa5qajd.jpg";
            var result = await fetch('https://localhost:44302/api/usuario', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }
            else {
                ctrlActions.ShowMessage('I', "Imagen eliminada con éxito");
                setTimeout(function () {
                    window.location.href = "vPerfilUsuario";
                }, 3000);
            }

        } catch (err) {
            console.log(err);
        }        
    }
}

async function getUsuario() {
    try {

        var ctrlActions = new ControlActions();
         var idUsuario = localStorage.getItem('idUsuario');
        if (idUsuario != "" && idUsuario != undefined) {
            var url = "https://localhost:44302/api/usuario/" + idUsuario;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }
            usuario = json['Data'];

        }

    } catch (err) {
        console.log(err);
    }
}

async function isPerfilPropietario() {
    var isPropietario = false;

    if (idUsuario != "" && idUsuario != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idUsuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        for (i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 2) {
                isPropietario = true;
            }

        }
    }
    return isPropietario;
}

async function fillCalificacion() {

    var reservas = [];
    var calificacion = 0;

    if (await isPerfilPropietario()) {
        reservas = await getReservasPropietario();
        calificacion = Math.round(calcularCalificacion(reservas, 'Calificacion_Propietario'));
    } else {
        reservas = await getReservasCliente();
        calificacion = Math.round(calcularCalificacion(reservas, 'Calificacion_Usuario'));
    }

    for (var j = 0; j < calificacion; j++) {
        var icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add("fa-star");
        icon.classList.add("calif");
        document.getElementById("calificacion").appendChild(icon);
    }

    for (var j = 0; j < 5 - calificacion; j++) {
        var icon = document.createElement("i");
        icon.classList.add("far");
        icon.classList.add("fa-star");
        icon.classList.add("calif");
        document.getElementById("calificacion").appendChild(icon);
    }

}

function calcularCalificacion(reservas, id) {

    var sumaCalificaciones = 0;

    for (i in reservas) {
        sumaCalificaciones += reservas[i][id];
    }

    if (reservas.length != 0) {
        return sumaCalificaciones / reservas.length;
    } else {
        return 0;
    }

}

async function getReservasCliente() {

    var result = await fetch('https://localhost:44302/api/reservacion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var allReservas = json['Data'];

    var reservas = [];

    for (i in allReservas) {
        if (allReservas[i]['Id_Usuario'] == idUsuario)
            reservas.push(allReservas[i]);
    }

    return reservas;

}

async function getReservasPropietario() {

    var espacios = await getEspacios();

    var result = await fetch('https://localhost:44302/api/reservacion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var allReservas = json['Data'];

    var reservas = [];

    for (i in allReservas) {
        if ($.inArray(allReservas[i]['Id_Espacio'], espacios) != -1)
            reservas.push(allReservas[i]);
    }

    return reservas;

}

async function getEspacios() {

    try {
        var propiedades = await getPropiedadesPropietarioIds();

        var result = await fetch('https://localhost:44302/api/espacio', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var espacios = json['Data'];
        var ids = [];

        for (i in espacios) {
            if ($.inArray(espacios[i]['Id_Propiedad'], propiedades) != -1)
                ids.push(espacios[i]["Id_Espacio"]);
        }

        return ids;
    } catch (err) {
        console.log(err);
    }

}

async function getPropiedadesPropietarioIds() {

    var propiedades = await getPropiedades();
    var propiedadesPropietario = [];

    for (i in propiedades) {

        if (propiedades[i]["IdUsuario"] == idUsuario) {
            propiedadesPropietario.push(propiedades[i]['IdPropiedad']);
        }
    }

    return propiedadesPropietario;

}

async function getPropiedades() {

    var result = await fetch('https://localhost:44302/api/propiedad', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];

}

async function getEspacio(id) {

    try {

        var result = await fetch('https://localhost:44302/api/espacio/' + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var espacio = json['Data'];

        return espacio;

    } catch (err) {
        console.log(err);
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {
    try {
        var idUsuario = localStorage.getItem('idUsuario');

        if (idUsuario != "" && idUsuario != undefined) {
            var url = "https://localhost:44302/api/usuario/" + idUsuario;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            for (i in json['Data']) {
                if (i != 'Id_Usuario' && i != 'Fecha_Creacion' && i != 'URL_Foto' && i != 'Estado' && i != 'Fecha_Nacimiento')
                    document.getElementById(i).innerHTML = json['Data'][i];
                if (i == 'Fecha_Nacimiento') {
                    var date = new Date(json['Data'][i]);
                    document.getElementById(i).innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                }

                if (i == 'URL_Foto') {
                    document.querySelector('#URL_Foto').src = json['Data'][i];
                }
            }

            if (await isAdmin() == false)
                await fillCalificacion();

        } else {
            window.location.href = "vIniciarSesion";
        }

    } catch (err) {
        console.log(err);
    }

    await getUsuario();

});

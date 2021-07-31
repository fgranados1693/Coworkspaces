function load() {

}

var idUsuarioPerfil = localStorage.getItem('idUsuarioPerfil');

function vPerfilUsuarioOtro() {

    this.Mod = function () {
        localStorage.setItem('idUsuarioMod', idUsuarioPerfil);
        window.location.href = "vModificarPerfilUsuario";
    }

    this.ModEmail = function () {
        localStorage.setItem('idUsuarioMod', idUsuarioPerfil);
        window.location.href = "vModificarEmail1";
    }

    this.ModTel = function () {
        localStorage.setItem('idUsuarioMod', idUsuarioPerfil);
        window.location.href = "vModificarTelefono1";
    }

    this.ModCom = function () {
        localStorage.setItem('idUsuarioMod', idUsuarioPerfil);
        window.location.href = "vModificarComision";
    }

    this.Msg = function () {
        localStorage.setItem("idUsuarioConv", idUsuarioPerfil);
        window.location.href = "vConversacion";
    }
}

async function isAdmin() {
    var isAdmin = false;

    if (idUsuarioPerfil != "" && idUsuarioPerfil != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idUsuarioPerfil;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        for (i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 1) {
                isAdmin = true;
            }

        }
    }
    return isAdmin;
}

async function isPerfilPropietario() {
    var isPropietario = false;

    if (idUsuarioPerfil != "" && idUsuarioPerfil != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idUsuarioPerfil;
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

async function getPropiedadesPropietario() {

    var propiedades = await getPropiedades();
    var propiedadesPropietario = [];

    for (i in propiedades) {

        if (propiedades[i]["IdUsuario"] == idUsuarioPerfil) {
            propiedadesPropietario.push(propiedades[i]);
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

async function fillTableProp() {

    var data = await getPropiedadesPropietario();

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");

        var nombre = document.createElement("td");
        var descripcion = document.createElement("td");

        var a = document.createElement("a");

        var textNombre = document.createTextNode(data[i]['Nombre']);
        a.appendChild(textNombre);
        a.href = "#";
        a.id = data[i]['IdPropiedad'];
        a.addEventListener('click', perfilPropiedad);

        nombre.appendChild(a);
        descripcion.appendChild(document.createTextNode(data[i]['Descripcion']));

        tr.appendChild(nombre);
        tr.appendChild(descripcion);

        document.getElementById("tblBodyPropiedades").appendChild(tr);
    }

}

function perfilPropiedad(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idPropiedadPerfil", id);
    window.location.href = "vPerfilPropiedad";
}

async function fillTableUsuario() {

    if (idUsuarioPerfil != "" && idUsuarioPerfil != undefined) {
        var url = "https://localhost:44302/api/usuario/" + idUsuarioPerfil;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var fullName = "";
        for (i in json['Data']) {
            if (i != 'Id_Usuario' && i != 'Fecha_Creacion' && i != 'URL_Foto' && i != 'Estado' && i != 'Fecha_Nacimiento')
                document.getElementById(i).innerHTML = json['Data'][i];
            if (i == 'Fecha_Nacimiento') {
                var date = new Date(json['Data'][i]);
                document.getElementById(i).innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            }
            if (i == 'Nombre' || i == 'Apellidos') {
                fullName += (json['Data'][i] + " ");
            }
            if (i == 'URL_Foto') {
                document.querySelector('#URL_Foto').src = json['Data'][i];
            }
        }

        if (await isPerfilPropietario() == false) {
            document.getElementById('btnModCom').classList.add('visually-hidden');
        }

        await fillCalificacion();

        document.getElementById("FullName").innerHTML = fullName;
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {
    try {
       
        await fillTableUsuario();

        if (await isPerfilPropietario()) {
            document.getElementById('prop-cont').classList.remove('visually-hidden');
            await fillTableProp();
            $('#tblPropiedades').DataTable();
        }

    } catch (err) {
        console.log(err);
    }

});

var idUsuario = localStorage.getItem('idUsuario');

//ON DOCUMENT READY
$(document).ready(async function () {

    if (await isAdmin()) {

        document.getElementById("registroPropiedadAdmin").classList.remove("visually-hidden");
        var data = await getPropiedades();
        
        await fillTable(data);

    } else {

        document.getElementById("registroPropiedadPropietario").classList.remove("visually-hidden");

        var dataPP = await getPropiedadesPropietario();                
        await fillTable(dataPP);

    }

    $('#tblPropiedades').DataTable();


});

async function getPropiedadesPropietario() {

    var propiedades = await getPropiedades();
    var propiedadesPropietario = [];

    for (i in propiedades) {

        if (propiedades[i]["IdUsuario"] == idUsuario) {

            propiedadesPropietario.push(propiedades[i]);
        }
    }

    return propiedadesPropietario;

}

async function getPropiedades() {

    var result = await fetch('https://localhost:44302/api/propiedad?idUsuario=' + idUsuario, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];

}

async function fillTable(data) {
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");

        var propietario = document.createElement("td");
        var nombre = document.createElement("td");
        var descripcion = document.createElement("td");
        var estado = document.createElement("td");
        var editar = document.createElement("td");
        var adjuntarFoto = document.createElement("td");  
        var adjuntarDocumento = document.createElement("td");  

        var a = document.createElement("a");

        var textNombre = document.createTextNode(data[i]['Nombre']);
        a.appendChild(textNombre);
        a.href = "#";
        a.id = data[i]['IdPropiedad'];
        a.addEventListener('click', perfilPropiedad);

        nombre.appendChild(a);
        descripcion.appendChild(document.createTextNode(data[i]['Descripcion']));
        estado.appendChild(document.createTextNode(data[i]['Estado']));

        var aEditar = document.createElement("a");
        aEditar.href = "#";
        aEditar.id = data[i]['IdPropiedad'];
        aEditar.addEventListener('click', modPropiedad);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-edit");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['IdPropiedad'];
        aEditar.appendChild(iconEditar);
        editar.appendChild(aEditar);

        var aAdjuntarFoto = document.createElement("a");
        aAdjuntarFoto.href = "#";
        aAdjuntarFoto.id = data[i]['IdPropiedad'];
        aAdjuntarFoto.addEventListener('click', adjuntarFotoProp);
        var iconAdjuntarFoto = document.createElement("i");
        iconAdjuntarFoto.classList.add("fas");
        iconAdjuntarFoto.classList.add("fa-paperclip");
        iconAdjuntarFoto.classList.add("paperclip");
        iconAdjuntarFoto.id = data[i]['IdPropiedad'];
        aAdjuntarFoto.appendChild(iconAdjuntarFoto);
        adjuntarFoto.appendChild(aAdjuntarFoto);


        var aAdjuntarDocumento = document.createElement("a");
        aAdjuntarDocumento.href = "#";
        aAdjuntarDocumento.id = data[i]['IdPropiedad'];
        aAdjuntarDocumento.addEventListener('click', adjuntarDocumentoProp);
        var iconAdjuntarDocumento = document.createElement("i");
        iconAdjuntarDocumento.classList.add("fas");
        iconAdjuntarDocumento.classList.add("fa-paperclip");
        iconAdjuntarDocumento.classList.add("paperclip");
        iconAdjuntarDocumento.id = data[i]['IdPropiedad'];
        aAdjuntarDocumento.appendChild(iconAdjuntarDocumento);
        adjuntarDocumento.appendChild(aAdjuntarDocumento);

        var usuario = await getUsuario(data[i]["IdUsuario"]);

        var a = document.createElement("a");

        var textUsuario = document.createTextNode(usuario['Nombre'] + " " + usuario['Apellidos']);
        a.appendChild(textUsuario);
        a.href = "#";
        a.id = usuario['Id_Usuario'];
        a.addEventListener('click', perfilUsuario);

        propietario.appendChild(a);

        tr.appendChild(propietario);
        tr.appendChild(nombre);
        tr.appendChild(descripcion);
        tr.appendChild(estado);
        tr.appendChild(editar);
        tr.appendChild(adjuntarFoto);
        tr.appendChild(adjuntarDocumento);

        document.getElementById("tblBodyPropiedades").appendChild(tr);
    }
}

async function getUsuario(id) {

    var result = await fetch('https://localhost:44302/api/usuario/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];

}

function perfilPropiedad(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idPropiedadPerfil", id);
    window.location.href = "vPerfilPropiedad";
}

function modPropiedad(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idPropiedadMod", id);
    window.location.href = "vModificarPropiedad";
}

function adjuntarFotoProp(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idPropiedadFoto", id);
    window.location.href = "vRegistrarFotoPropiedad";
}

function adjuntarDocumentoProp(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idPropiedadDocumento", id);
    window.location.href = "vRegistrarDocumentoPropiedad";
}

function vMantenimientoPropiedades() {

    this.NuevaPropiedad = function() {

        window.location.href = "vRegistrarPropiedad";
    }

    this.NuevaPropiedadAdmin = function () {

        window.location.href = "vRegistrarPropiedadAdmin";
    }
}


function perfilUsuario(e) {
    var a = e.target;
    var id = a.id;
    
    localStorage.setItem("idUsuarioPerfil", id);
    window.location.href = "vPerfilUsuarioOtro";
}

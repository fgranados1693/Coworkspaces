//ON DOCUMENT READY
$(document).ready(async function () {
    var result = await fetch('https://localhost:44302/api/solicitud', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var solicitudes = json['Data'];

    await fillTable(solicitudes);

    $('#tblSolicitudes').DataTable();
});

async function GetUsuario(id) {
    var url = "https://localhost:44302/api/usuario/" + id;
    var result = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var usuario = json['Data'];

    return usuario;
}

async function fillTable(data) {

    for (var i = 0; i < data.length; i++) {

        if (data[i]['Revisada'] == 'false') {

            var usuario = await GetUsuario(data[i]['Id_Usuario']);

            var tr = document.createElement("tr");
            var nombre = document.createElement("td");
            var identificacion = document.createElement("td");
            var email = document.createElement("td");
            var telefono = document.createElement("td");
            var responder = document.createElement("td");

            nombre.appendChild(document.createTextNode(usuario['Nombre'] + " " + (usuario['Apellidos'])));
            identificacion.appendChild(document.createTextNode(usuario['Identificacion']));
            email.appendChild(document.createTextNode(usuario['Email']));
            telefono.appendChild(document.createTextNode(usuario['Telefono']));

            var aResponder = document.createElement("a");

            aResponder.href = "#";
            aResponder.id = data[i]['Id_Solicitud'];
            aResponder.addEventListener('click', ResSolicitud);

            var iconResponder = document.createElement("i");
            iconResponder.classList.add("fas");
            iconResponder.classList.add("fa-eye");
            iconResponder.classList.add("edit");
            iconResponder.id = data[i]['Id_Solicitud'];
            aResponder.appendChild(iconResponder);

            responder.appendChild(aResponder);

            tr.appendChild(nombre);
            tr.appendChild(identificacion);
            tr.appendChild(email);
            tr.appendChild(telefono);
            tr.appendChild(responder);

            document.getElementById("tblBodySolicitudes").appendChild(tr);

        }
        
    }
}

function ResSolicitud(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idSolicitud", id);
    window.location.href = "vPerfilSolicitud";
}

var idUsuario = localStorage.getItem('idUsuario');

//ON DOCUMENT READY
$(document).ready(async function () {
    var result = await fetch('https://localhost:44302/api/mensaje?idUsuario=' + idUsuario, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    await fillTable(json['Data']);

    $('#tblConv').DataTable();
});

async function fillTable(data) {

    var users = [];

    for (var i = 0; i < data.length; i++) {

        var idE = data[i][0]['Id_Usuario_Emisor'];
        var idR = data[i][0]['Id_Usuario_Receptor'];
        var id = 0;

        if (idE != idUsuario) {
            id = idE;
        } else {
            id = idR;
        }
        if ($.inArray(id, users) == -1)
            users.push(id);
    }

    for (j in users) {
        await addLine(users[j]);
    }
}

async function addLine(id) {

    var usuario = await GetUsuario(id);

    var tr = document.createElement("tr");
    var user = document.createElement("td");
    var select = document.createElement("td");

    var textNombre = document.createTextNode(usuario['Nombre'] + " " + usuario['Apellidos']);
    user.appendChild(textNombre);

    var a = document.createElement("a");
    a.href = "#";
    a.id = id;
    a.addEventListener('click', selectConv);
    var icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-eye");
    icon.classList.add("edit");
    icon.id = id;
    a.appendChild(icon);
    select.appendChild(a);

    tr.appendChild(user);
    tr.appendChild(select);

    document.getElementById("tblBodyConv").appendChild(tr);
}

async function GetUsuario(id) {
    try {

        var url = "https://localhost:44302/api/usuario/" + id;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        return json['Data'];


    } catch (err) {
        console.log(err);
    }
}

function selectConv(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idUsuarioConv", id);
    window.location.href = "vConversacion";
}


function vListarUsuarios() {

    this.ctrlActions = new ControlActions();

    this.Create = async function () {
        try {

          window.location.href = "vIngresarEmail";

        } catch (err) {
            console.log(err);
        }
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {
	//var listarUsuarios = new vListarUsuarios();
	//listarUsuarios.RetrieveAll();
    var result = await fetch('https://localhost:44302/api/usuario', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    console.log(json);
    await fillTable(json['Data']);

    $('#tblUsuarios').DataTable();
});

async function fillTable(data) {
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var nombre = document.createElement("td");
        var email = document.createElement("td");
        var telefono = document.createElement("td");
        var genero = document.createElement("td");
        var estado = document.createElement("td");
        var rol = document.createElement("td");
        var editar = document.createElement("td");
        var msg = document.createElement("td");


        var a = document.createElement("a");

        var textNombre = document.createTextNode(data[i]['Nombre'] + " " + data[i]['Apellidos']);
        a.appendChild(textNombre);
        a.href = "#";
        a.id = data[i]['Id_Usuario'];
        a.addEventListener('click', perfilUsuario);

        nombre.appendChild(a);
        email.appendChild(document.createTextNode(data[i]['Email']));
        telefono.appendChild(document.createTextNode(data[i]['Telefono']));
        genero.appendChild(document.createTextNode(data[i]['Genero']));
        estado.appendChild(document.createTextNode(data[i]['Estado']));

        var aEditar = document.createElement("a");
        aEditar.href = "#";
        aEditar.id = data[i]['Id_Usuario'];
        aEditar.addEventListener('click', modUsuario);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-pencil-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Usuario'];
        aEditar.appendChild(iconEditar);
        editar.appendChild(aEditar);

        var aMsg = document.createElement("a");
        aMsg.href = "#";
        aMsg.id = data[i]['Id_Usuario'];
        aMsg.addEventListener('click', msgUsuario);
        var iconMsg = document.createElement("i");
        iconMsg.classList.add("fas");
        iconMsg.classList.add("fa-comment");
        iconMsg.classList.add("edit");
        iconMsg.id = data[i]['Id_Usuario'];
        aMsg.appendChild(iconMsg);
        msg.appendChild(aMsg);

        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + data[i]['Id_Usuario'];
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var roles = await result.json();
        for (j = 0; j < roles['Data'].length; j++) {

            var rolData = roles['Data'][j];
            var rolTxt = "";

            switch (rolData['Id_Rol']) {
                case 1:
                    rolTxt += "Administrador";
                    break;
                case 2:
                    rolTxt += "Propietario";
                    break;
                case 3:
                    rolTxt += "Cliente";
                    break;
            }
        }
        rol.appendChild(document.createTextNode(rolTxt));

        tr.appendChild(nombre);
        tr.appendChild(email);
        tr.appendChild(telefono);
        tr.appendChild(genero);
        tr.appendChild(estado);
        tr.appendChild(rol);
        tr.appendChild(editar);
        tr.appendChild(msg);

        document.getElementById("tblBodyUsuarios").appendChild(tr);
    }
}

function perfilUsuario(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idUsuarioPerfil", id);
    window.location.href = "vPerfilUsuarioOtro";
}

function modUsuario(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idUsuarioMod", id);
    window.location.href = "vModificarPerfilUsuario";
}

function msgUsuario(e) {
    var a = e.target;
    var id = a.id;

    if (id != localStorage.getItem('idUsuario')) {
        localStorage.setItem("idUsuarioConv", id);
        window.location.href = "vConversacion";
    }
    
}
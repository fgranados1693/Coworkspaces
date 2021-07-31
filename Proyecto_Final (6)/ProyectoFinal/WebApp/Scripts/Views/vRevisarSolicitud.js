function load() { }

var idSolicitud = localStorage.getItem('idSolicitudMod');
var idUsuario = "";
var email = "";
var nombre = "";
var apellidos = "";
var genero = "";
var tipoIdentificacion = "";
var identificacion = "";
var telefono = "";
var fechaCreacion = "";
var fechaNacimiento = "";
var urlFoto = "";
var revisada = "";
var respuesta = "";

console.log(idSolicitud);
//ON DOCUMENT READY
$(document).ready(async function () {
    try {
        var ctrlActions = new ControlActions();

        console.log(idSolicitud);

        if (idSolicitud != "" && idSolicitud != undefined) {
            var url = "https://localhost:44302/api/solicitud/" + idSolicitud;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            var response = await result;
            var json = await response.json();
            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            data = json['Data'];

            for (var i = 0; i < data.length; i++) {
                if (data[i]['Id_Solicitud'] == idSolicitud) {
                    email = data[i]['Email'];
                    nombre = data[i]['Nombre'];
                    apellidos = data[i]['Apellidos'];
                    genero = data[i]['Genero'];
                    tipoIdentificacion = data[i]['Tipo_Identificacion'];
                    identificacion = data[i]['Identificacion'];
                    telefono = data[i]['Telefono'];
                    fechaCreacion = data[i]['Fecha_Creacion'];
                    fechaNacimiento = data[i]['Fecha_Nacimiento'];
                    idUsuario = data[i]['Id_Usuario']
                    revisada = data[i]['Revisada'];
                    respuesta = data[i]['Respuesta'];
                }
            }

            document.getElementById("Email").value = email;
            document.getElementById("Nombre").value = nombre;
            document.getElementById("Apellidos").value = apellidos;
            document.getElementById("Genero").value = genero;
            document.getElementById("Tipo_Identificacion").value = tipoIdentificacion;
            document.getElementById("Identificacion").value = identificacion;
            document.getElementById("Telefono").value = telefono;
            document.getElementById("Fecha_Creacion").value = fechaCreacion;
            document.getElementById("Fecha_Nacimiento").value = fechaNacimiento;
            document.getElementById("Id_Solicitud").value = idSolicitud;
            document.getElementById("Id_Usuario").value = idUsuario;
            document.getElementById("Revisada").value = revisada;
            document.getElementById("Respuesta").value = respuesta;

        } 

    } catch (err) {
        console.log(err);
    }

});


function vRevisarSolicitud() {

    this.service = 'solicitud';
    this.ctrlActions = new ControlActions();

    var solicitudData = {
        "Id_Solicitud": idSolicitud,
        "Id_Usuario": idUsuario,
        "Revisada": "true",
        "Resultado": "pendiente"
    };

    console.log(solicitudData);

    this.Mod = async function () {
        try {

            var result = await fetch('https://localhost:44302/api/solicitud', {
                method: 'PUT',
                body: JSON.stringify(solicitudData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var response = await result;
            var json = await response.json();

            console.log(json);

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } else {
                this.ctrlActions.ShowMessage('I', "Cambios guardados");
                setTimeout(function () {
                window.location.href = "vListarSolicitudes";
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
function load() {}

var idUsuario = localStorage.getItem('idUsuarioMod');
var Fecha_Creacion = "";
var URL_Foto = "";
var Email = "";
var Telefono = "";
var Saldo = 0;


function vModificarPerfilUsuario() {

    this.service = 'usuario';
    this.ctrlActions = new ControlActions();

	this.Mod = async function () {
        try {

            var usuarioData = {};
            usuarioData = this.ctrlActions.GetDataForm('formMod');

            

            console.log(usuarioData);

            if (this.ValidateForm(usuarioData)) {
                usuarioData['Id_Usuario'] = idUsuario;
                usuarioData['Fecha_Creacion'] = Fecha_Creacion;
                usuarioData['URL_Foto'] = URL_Foto;
                usuarioData['Email'] = Email;
                usuarioData['Telefono'] = Telefono;
                usuarioData['Saldo'] = Saldo;


                var result = await fetch('https://localhost:44302/api/usuario', {
                    method: 'PUT',
                    body: JSON.stringify(usuarioData),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {
                    this.ctrlActions.ShowMessage('I', "Cambios guardados");
                    setTimeout(function () {
                        window.location.href = "vPerfilUsuario";
                    }, 3000);
                }

            }
            
        } catch (err) {
            console.log(err);
        }
    }

    this.ValidateForm = function (data) {

        var ctrlActions = new ControlActions();
        var valid = true;

        for (i in data) {
                if (data[i] == "" || data[i] == 0) {
                    document.getElementById(i).classList.remove("is-valid");
                    document.getElementById(i).classList.add("is-invalid");
                    valid = false;
                } else {
                    document.getElementById(i).classList.remove("is-invalid");
                    document.getElementById(i).classList.add("is-valid");
                }
        }

        if (!valid) {
            ctrlActions.ShowMessage('E', "Complete todos los espacios");
            return false;
        } else {
            $('.alert').hide();
            return true;
        }
    }

}


async function isAdmin() {
    var isAdmin = false;
    var idUsuarioLog = localStorage.getItem('idUsuario');
    var ctrlActions = new ControlActions();

    if (idUsuarioLog != "" && idUsuarioLog != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idUsuarioLog;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        }

        for (i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 1) {
                isAdmin = true;
            }

        }
    }
    return isAdmin;
}

//ON DOCUMENT READY
$(document).ready(async function () {
    try {

        var ctrlActions = new ControlActions();
        if (await isAdmin()) {
            document.getElementById("EstadoCont").classList.remove('visually-hidden');
        }

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
                if (i != 'Id_Usuario' && i != 'Fecha_Creacion' && i != 'URL_Foto' && i != 'Email' && i != 'Telefono' && i != 'Saldo' && i != 'Fecha_Nacimiento' && i != 'Saldo')
                    document.getElementById(i).value = json['Data'][i];
                if (i == 'Fecha_Creacion')
                    Fecha_Creacion = json['Data'][i];
                if (i == 'URL_Foto')
                    URL_Foto = json['Data'][i];
                if (i == 'Email')
                    Email = json['Data'][i];
                if (i == 'Telefono')
                    Telefono = json['Data'][i];
                if (i == 'Saldo')
                    Saldo = json['Data'][i];
                if (i == 'Fecha_Nacimiento') {
                    var date = new Date(json['Data'][i]);
                    document.getElementById(i).value = formatDate(date);
                }
            }
        }

        

    } catch (err) {
        console.log(err);
    }
    
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
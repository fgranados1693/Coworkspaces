function load() { }

var idCaracteristica = localStorage.getItem('idCaracteristicaMod');
var IdEspacio = "";
var Nombre = "";
var Descripcion = "";

//ON DOCUMENT READY
$(document).ready(async function () {
    try {

        var ctrlActions = new ControlActions();
        if (await isAdmin()) {
            document.getElementById("EstadoCont").classList.remove('visually-hidden');
        }

        

        if (idCaracteristica != "" && idCaracteristica != undefined) {

            var url = "https://localhost:44302/api/caracteristicaEspacio/" + idCaracteristica;
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
                if (data[i]['IdCaracteristica'] == idCaracteristica) {
                    IdEspacio = data[i]['IdEspacio'];
                    Nombre = data[i]['Nombre'];
                    Descripcion = data[i]['Descripcion'];
                }
            }

            document.getElementById("Nombre").value = Nombre;
            document.getElementById("Descripcion").value = Descripcion;
            document.getElementById("IdCaracteristica").value = idCaracteristica;
            document.getElementById("IdEspacio").value = IdEspacio;

        }



    } catch (err) {
        console.log(err);
    }

});

async function isAdmin() {
    var isAdmin = false;
    var idUsuarioLog = localStorage.getItem('idUsuario');
    var ctrlActions = new ControlActions();

    if (idUsuarioLog != "" && idUsuarioLog != undefined) {
        var url = "https://localhost/api_web/api/rolusuario?idUsuario=" + idUsuarioLog;
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

function vModificarCaracteristicaEspacio() {

    this.service = 'caracteristicaEspacio';
    this.ctrlActions = new ControlActions();

    this.Mod = async function () {
        try {

            var caracteristicaData = {};
            caracteristicaData = this.ctrlActions.GetDataForm('formMod');

            if (this.ValidateForm(caracteristicaData)) {

                var result = await fetch('https://localhost:44302/api/caracteristicaEspacio', {
                    method: 'PUT',
                    body: JSON.stringify(caracteristicaData),
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
                        window.location.href = "vListarCaracteristicasEspacio";
                    }, 3000);
                }

            }
            else
            {
                console.log("Error");
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
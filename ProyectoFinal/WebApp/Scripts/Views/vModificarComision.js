function load() {}

var idUsuario = localStorage.getItem('idUsuarioMod');
var membresia = {};

function vModificarComision() {

    this.ctrlActions = new ControlActions();

    this.Mod = async function () {

        try {

            if (this.ValidateForm()) {

                membresia['Comision_Admin'] = document.getElementById('txtComision').value;

                var result = await fetch('https://localhost:44302/api/membresia', {
                    method: 'PUT',
                    body: JSON.stringify(membresia),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {
                    this.ctrlActions.ShowMessage('I', "Comisión actualizada");
                    setTimeout(function () { window.location.href = "vPerfilUsuario"; }, 3000);
                }

            }

        } catch (err) {
            console.log(err);
        }

    }

    this.ValidateForm = function () {

        var comision = document.getElementById('txtComision').value;

        if (comision == "") {
            this.ctrlActions.ShowMessage('E', "Complete todos los espacios");
            document.getElementById('txtComision').classList.remove("is-valid");
            document.getElementById('txtComision').classList.add("is-invalid");
            return false;
        }

        document.getElementById('txtComision').classList.remove("is-invalid");
        document.getElementById('txtComision').classList.add("is-valid");
        return true;
    }

}

async function GetMembresia(idUsuario) {
    try {

        var url = "https://localhost:44302/api/membresia?idUsuario=" + idUsuario;
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
//ON DOCUMENT READY
$(document).ready(async function () {

    try {

        membresia = await GetMembresia(idUsuario);
        document.getElementById('txtComision').value = membresia['Comision_Admin'];

    } catch (err) {
        console.log(err);
    }

});
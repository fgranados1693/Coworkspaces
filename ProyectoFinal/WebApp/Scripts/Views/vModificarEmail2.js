function load() {}

var idUsuario = localStorage.getItem('idUsuarioMod');
var usuario = {};

function vModificarEmail2() {

    this.ctrlActions = new ControlActions();

	this.Verify =  async function () {

        if (this.ValidateForm()) {

            usuario['Email'] = localStorage.getItem('modUserEmail');

            var result = await fetch('https://localhost:44302/api/usuario', {
                method: 'PUT',
                body: JSON.stringify(usuario),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } else {
                this.ctrlActions.ShowMessage('I', "Correo electrónico modificado");
                setTimeout(function () { window.location.href = "vPerfilUsuario"; }, 3000);
            }

        }

    }

    this.ValidateForm = function () {

        var codigo = document.getElementById('txtCodigo').value;

        if (codigo == "") {
            this.ctrlActions.ShowMessage('E', "Complete todos los espacios");
            document.getElementById('txtCodigo').classList.remove("is-valid");
            document.getElementById('txtCodigo').classList.add("is-invalid");

            return false;
        }

        if (codigo != localStorage.getItem('codigoEmail')) {
            this.ctrlActions.ShowMessage('E', "Código inválido");
            document.getElementById('txtCodigo').classList.remove("is-valid");
            document.getElementById('txtCodigo').classList.add("is-invalid");
            return false;
        }
        document.getElementById('txtCodigo').classList.remove("is-invalid");
        document.getElementById('txtCodigo').classList.add("is-valid");
        return true;
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {

    try {

        var url = "https://localhost:44302/api/usuario/" + idUsuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        usuario = json['Data'];


    } catch (err) {
        console.log(err);
    }


});
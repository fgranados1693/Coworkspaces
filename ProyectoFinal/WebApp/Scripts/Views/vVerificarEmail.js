function load() {}

function vVerificarEmail() {

    this.ctrlActions = new ControlActions();

	this.Verify =  function () {
        var ctrlActions = new ControlActions();

        if (this.ValidateForm()) {
            ctrlActions.ShowMessage('I', "Correo electrónico verificado");
            setTimeout(function () { window.location.href = "vIngresarTelefono"; }, 3000);
        }

    }

    this.ValidateForm = function () {

        var ctrlActions = new ControlActions();

        var codigo = document.getElementById('txtCodigo').value;

        if (codigo == "") {
            ctrlActions.ShowMessage('E', "Complete todos los espacios");
            document.getElementById('txtCodigo').classList.remove("is-valid");
            document.getElementById('txtCodigo').classList.add("is-invalid");

            return false;
        }

        if (codigo != localStorage.getItem('codigoEmail')) {
            ctrlActions.ShowMessage('E', "Código inválido");
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
$(document).ready(function () {
    
});
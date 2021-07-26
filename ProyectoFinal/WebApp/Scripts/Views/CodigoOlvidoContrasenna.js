
function load() { }

function validarInput(input) {
    //let ctrlActions = new ControlActions();
    var valid = true;
    if (input == "" || input == null) {
        valid = false;
    }

    if (!valid) {
        document.getElementById("txtCodigo").classList.remove("is-valid");
        document.getElementById("txtCodigo").classList.add("is-invalid");
    } else if (valid == true) {
        //document.getElementById("txtCodigo").classList.add("is-valid");
        document.getElementById("txtCodigo").classList.remove("is-invalid");
    }

    return valid;
}

function verificarCodigo() {

    this.ctrlActions = new ControlActions();

    this.Verify = function () {

        let input = document.getElementById("txtCodigo");

        var data = {};
        data = this.ctrlActions.GetDataForm('formEmail');

        if (validarInput(input.value) == true) {
            if (data['codigo'] == localStorage.getItem('codigoEmail')) {
                console.log("codigo correcto");
                input.classList.add("is-valid");
                this.ctrlActions.ShowMessage('I', "Código correcto");
                setTimeout(function () { window.location.href = "CambiarContrasenna"; }, 2000);
            } else {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
                this.ctrlActions.ShowMessage('E', "Código inválido");
            }
        } else {
            this.ctrlActions.ShowMessage('E', "Debe rellenar el campo del código");
        }
    }

}
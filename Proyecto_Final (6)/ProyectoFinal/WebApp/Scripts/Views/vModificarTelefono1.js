function load() {}

function vModificarTelefono1() {

    this.service = 'sms';
    this.ctrlActions = new ControlActions();

	this.Create = async function () {
        try {

            var data = {};
            data = this.ctrlActions.GetDataForm('formTelefono');

            localStorage.setItem('modUserTelefono', data['telefono']);


            var codigo = Math.floor(Math.random() * (999999 - 100000) + 100000);
            localStorage.setItem('codigoTelefono', codigo);

            data['content'] = "Su código de verificación de Cowork Spaces es: " + codigo;

            if (this.ValidateForm()) {
                if (await this.ValidateTelUnique(data['telefono'])) {
                    var result = await fetch('https://localhost:44302/api/sms', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    var response = await result;
                    var json = await response.json();

                    if (response.status != 200) {
                        this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                    } else {
                        this.ctrlActions.ShowMessage('I', "Enviamos un código a tu número de teléfono");
                        setTimeout(function () { window.location.href = "vModificarTelefono2"; }, 3000);
                    }

                    
                }
            }


        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }

       
    }

    this.ValidateForm = function () {

        var tel = document.getElementById('txtTelefono').value;

        if (tel == "") {
            this.ctrlActions.ShowMessage('E', "Complete todos los espacios");
            document.getElementById('txtTelefono').classList.remove("is-valid");
            document.getElementById('txtTelefono').classList.add("is-invalid");
            return false;
        }

        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(tel)) {
            return true;
        }
        else {
            this.ctrlActions.ShowMessage('E', "El formato del número de teléfono es inválido");
            document.getElementById('txtTelefono').classList.remove("is-valid");
            document.getElementById('txtTelefono').classList.add("is-invalid");
            return false;
        }
        document.getElementById('txtTelefono').classList.remove("is-invalid");
        document.getElementById('txtTelefono').classList.add("is-valid");
        return true;
    }

    this.ValidateTelUnique = async function (tel) {
        try {

            var result = await fetch('https://localhost:44302/api/usuario', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            for (i = 0; i < json['Data'].length; i++) {

                var u = json['Data'][i];
                console.log(u);

                if (u['Telefono'] == tel) {
                    this.ctrlActions.ShowMessage('E', "Ya existe un usuario con este número de teléfono");
                    document.getElementById('txtTelefono').classList.remove("is-valid");
                    document.getElementById('txtTelefono').classList.add("is-invalid");
                    return false;
                }

            }
            document.getElementById('txtTelefono').classList.remove("is-invalid");
            document.getElementById('txtTelefono').classList.add("is-valid");
            return true;
        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    
});
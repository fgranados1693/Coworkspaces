function load() {}

function vCambiarContrasenna() {

    this.service = 'contrasenna';
    this.ctrlActions = new ControlActions();

	this.Create = async function () {
        try {

            var newPwd = document.getElementById('NuevaContrasenna').value;

            var data = {
                "Id_Usuario": localStorage.getItem('idUsuario'),
                "Valor": newPwd
            };

            if (this.ValidateForm()) {
                if (this.ValidateFomartPwd(newPwd)) {
                    if (this.validarContrasenna()) {

                        var result = await fetch('https://localhost:44302/api/contrasenna', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: { 'Content-Type': 'application/json' }
                        });
                        var response = await result;
                        var json = await response.json();

                        if (response.status != 200) {
                            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                        } else {
                            this.ctrlActions.ShowMessage('I', "Contraseña modificada");
                            setTimeout(function () { window.location.href = "vPerfilUsuario"; }, 3000);
                        }

                    }
                    
                }
            }

        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }

    this.ValidateForm =  function () {

        var ctrlActions = new ControlActions();
        var valid = true;

        var newPWd = document.getElementById('NuevaContrasenna');
        var oldPwd = document.getElementById('ContrasennaActual');


        if (newPWd.value == "") {
            newPWd.classList.remove("is-valid");
            newPWd.classList.add("is-invalid");
            valid = false;
        }

        if (oldPwd.value == "") {
            oldPwd.classList.remove("is-valid");
            oldPwd.classList.add("is-invalid");
            valid = false;
        }

        if (!valid) {
            ctrlActions.ShowMessage('E', "Complete todos los espacios");
        } else {
            $('.alert').hide();
        }

        return valid;
    }

    this.ValidateFomartPwd = function (pwd) {
        var valid = true;
        if (pwd != "") {
            // Validar minisculas
            var lowerCaseLetters = /[a-z]/g;
            if (!pwd.match(lowerCaseLetters)) {
                valid = false;
            }

            // Validar mayusculas
            var upperCaseLetters = /[A-Z]/g;
            if (!pwd.match(upperCaseLetters)) {
                valid = false;
            }

            // Validar numeros
            var numbers = /[0-9]/g;
            if (!pwd.match(numbers)) {
                valid = false;
            }

            // Validar caracteres especiales
            var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (!specialChars.test(pwd)) {
                valid = false;
            }

            // Validar lenght
            if (pwd.length < 8) {
                valid = false;
            }

            if (!valid) {
                document.getElementById("NuevaContrasenna").classList.remove("is-valid");
                document.getElementById("NuevaContrasenna").classList.add("is-invalid");
                this.ctrlActions.ShowMessage('E', "El formato de la contraseña es inválido");
            } else {
                document.getElementById("NuevaContrasenna").classList.remove("is-invalid");
                document.getElementById("NuevaContrasenna").classList.add("is-valid");
            }
        }

        return valid;
    }

    this.validarContrasenna = function () {

        var pwd = document.getElementById('ContrasennaActual').value;

        let service = "contrasenna";
        let controlActions = new ControlActions();

        var contraMD5 = CryptoJS.MD5(pwd).toString();

        let estado = true;
        service += "?idUsuario=" + localStorage.getItem('idUsuario');

        let conBD = controlActions.GetToApiFuncional(service);
        let fechas = [];

        Array.from(conBD.Data).forEach(con => {
            fechas.push(con.Fecha_Creacion);
        });


        let fechaMenor = getClosestDateToToday(fechas);

        Array.from(conBD.Data).forEach(con => {
            if (fechaMenor == con.Fecha_Creacion) {
                if (contraMD5 != con.Valor) {
                    estado = false;
                    document.getElementById("ContrasennaActual").classList.remove("is-valid");
                    document.getElementById("ContrasennaActual").classList.add("is-invalid");
                    this.ctrlActions.ShowMessage('E', "El valor de la contraseña actual es incorrecto");
                } else {
                    document.getElementById("ContrasennaActual").classList.remove("is-invalid");
                    document.getElementById("ContrasennaActual").classList.add("is-valid");
                    $('.alert').hide();
                }
            }
        });
        return estado;
    }

}

function getClosestDateToToday(dates) {
    var temp = dates.map(d => Math.abs(new Date() - new Date(d).getTime()));
    var idx = temp.indexOf(Math.min(...temp));
    console.log(dates[idx]);
    return dates[idx];
}

//ON DOCUMENT READY
$(document).ready(function () {
    
});
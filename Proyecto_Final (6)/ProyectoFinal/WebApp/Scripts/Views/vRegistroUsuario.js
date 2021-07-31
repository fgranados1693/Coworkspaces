function load() {}

function vRegistroUsuario() {

    this.service = 'usuario';
    this.ctrlActions = new ControlActions();

	this.Create = async function () {
        try {

            var usuarioData = {};
            usuarioData = this.ctrlActions.GetDataForm('formReg');
            var admin = await isAdmin();

            if (this.ValidateForm(usuarioData)) {

                if (usuarioData["Rol"] == 2) {
                    usuarioData["Estado"] = "activo";
                } else {
                    usuarioData["Estado"] = "activo";
                }
                
                var result = await fetch('https://localhost:44302/api/usuario', {
                    method: 'POST',
                    body: JSON.stringify(usuarioData),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {

                    if (usuarioData["Rol"] == 2) {

                        this.ctrlActions.ShowMessage('I', "Nuevo usuario registrado");
                        var id = await this.GetUserId(usuarioData["Email"]);
                        localStorage.setItem("idUsuarioSolicitud", id);
                        setTimeout(function () {
                            window.location.href = "vRegistroPropiedadSolicitud";
                        }, 3000);

                    } else {
                        this.ctrlActions.ShowMessage('I', "Nuevo usuario registrado");

                        if (admin) {
                            setTimeout(function () {
                                window.location.href = "vListarUsuarios";
                            }, 3000);
                        } else {
                            setTimeout(function () {
                                window.location.href = "vIniciarSesion";
                            }, 3000);
                        }
                        

                    }
                    
                }

            }
            
        } catch (err) {
            console.log(err);
        }
    }

    this.ValidateForm = function (data) {

        var ctrlActions = new ControlActions();
        var alertMes = "";
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
            alertMes += "Complete todos los espacios";
        } 

        var validPwd = this.ValidatePwd(data['Contrasenna']);

        if (!validPwd) {
            document.getElementById("alert_message_pwd").innerHTML = "El formato de la contraseña es inválido";
        } else {
            document.getElementById("alert_message_pwd").innerHTML = "";
        }

        if (!valid || !validPwd) {
            ctrlActions.ShowMessage('E', alertMes);
            return false;
        } else {
            $('.alert').hide();
            return true;
        }
    }

    this.ValidatePwd = function (pwd) {

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
                document.getElementById("Contrasenna").classList.remove("is-valid");
                document.getElementById("Contrasenna").classList.add("is-invalid");
            }
        }
        
        return valid;
    }

    this.GetUserId = async function (mail) {
        try {

            var ctrlActions = new ControlActions();
            var id = "";

            var result = await fetch('https://localhost:44302/api/usuario', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            for (i = 0; i < json['Data'].length; i++) {

                var u = json['Data'][i];
                console.log(u);

                if (u['Email'] == mail) {
                    id = u['Id_Usuario'];
                }

            }

            return id;

        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }
}

async function isAdmin() {
    var isAdmin = false;
    var idUsuario = localStorage.getItem('idUsuario');
    var ctrlActions = new ControlActions();

    if (idUsuario != "" && idUsuario != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idUsuario;
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
        Genero.value = 0;
        Tipo_Identificacion.value = 0;
        Rol.value = 0;

        var email = document.getElementById("Email");
        email.value = localStorage.getItem('newUserEmail');
        email.disabled = true;

        var tel = document.getElementById("Telefono");
        tel.value = localStorage.getItem('newUserTelefono');
        tel.disabled = true;

        if (await isAdmin()) {
            var roles = document.getElementById("Rol");
            var option = document.createElement("option");
            option.text = "Crear un nuevo administrador de la aplicación";
            option.value = '1';
            roles.add(option);
        }

    } catch (err) {
        console.log(err);
    }
    
});

function load() { }
function ContrasennaBD(contra) {
    
    let service = "contrasenna/contrasenna?idUsuario=" + localStorage.getItem('idUsuarioOlvidoContrasenna');
    let controlActions = new ControlActions();
    //service += localStorage.getItem('idUsuarioOlvidoContrasenna');

    let input_contrasenna = document.querySelector('input');
    let contrasenna = controlActions.GetToApiFuncional(service);
    console.log(contrasenna);
    let estadoContrasenna = false; 
    var contraMD5 = CryptoJS.MD5(input_contrasenna.value).toString();
    console.log(contraMD5);
    Array.from(contrasenna.Data).forEach(contrasenna => { 
        //console.log(contrasenna);
        if (contraMD5 == contrasenna.Valor) {
            estadoContrasenna = true;
        }
    });
    return estadoContrasenna;
}

function ValidatePwd(pwd) {
    console.log(pwd);
    var valid = true;
    if (pwd != "" && pwd != null) {
        console.log("valida nulls")
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
            document.querySelector("input").classList.remove("is-valid");
            document.querySelector("input").classList.add("is-invalid");
        } else if(valid == true){
            document.querySelector("input").classList.add("is-valid");
            document.querySelector("input").classList.remove("is-invalid");
        }
    }

    return valid;
}

function validarInput(input) {
    //let ctrlActions = new ControlActions();
    var valid = true;
    if (input == "" || input == null) {
        valid = false;
    }

    if (!valid) {
        document.getElementById("txtContrasenna").classList.remove("is-valid");
        document.getElementById("txtContrasenna").classList.add("is-invalid");
    } else if (valid == true) {
        //document.getElementById("txtCodigo").classList.add("is-valid");
        document.getElementById("txtContrasenna").classList.remove("is-invalid");
    }

    return valid;
}

function cambiarContrasenna() {

    this.service = 'contrasenna';
    this.ctrlActions = new ControlActions();
    let contra = document.getElementById("txtContrasenna");

    this.Update = function () {
        var ctrlActions = new ControlActions();
        
        if (validarInput(contra.value) == true) {

            var validPwd = ValidatePwd(contra.value);

            if (validPwd == true) {

                let contrasennaData = {
                    //Id_Contrasenna: "",
                    Id_Usuario: localStorage.getItem('idUsuarioOlvidoContrasenna'),
                    Valor: "",
                    Fecha_Creacion: ""
                };
                contrasennaData.Valor = contra.value;
                let estadoContra = ContrasennaBD(contrasennaData.Valor);
                //console.log(contrasennaData);
                if (estadoContra == false) {
                    //Hace el post al create

                    
                    this.ctrlActions.PostToAPI(this.service, contrasennaData, function () {
                        contra.classList.add("is-valid");
                        contra.classList.remove("is-invalid");
                        

                    });
                    localStorage.setItem('idUsuario', '');
                    localStorage.setItem('codigoEmail', '');
                    localStorage.setItem('userEmail', '');
                    ctrlActions.ShowMessage('I', "Contraseña cambiada con éxito");
                    setTimeout(function () { window.location.href = "vIniciarSesion"; }, 2000);
                } else {
                    contra.classList.remove("is-valid");
                    contra.classList.add("is-invalid");
                    ctrlActions.ShowMessage('E', "La contraseña debe ser diferente a las últimas 5 ingresadas");
                }
            } else {
                contra.classList.remove("is-valid");
                contra.classList.add("is-invalid");
                ctrlActions.ShowMessage('E', "El formato de la contraseña es inválido");
            }

        } else {
            ctrlActions.ShowMessage('E', "Debe rellenar el campo de la contraseña");
        }
        
        
    }

    }
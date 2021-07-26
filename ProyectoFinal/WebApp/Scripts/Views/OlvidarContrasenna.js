function load() { }

function validarUsuario(email, usuario) {
    let service = "usuario";
    let controlActions = new ControlActions();
    let estado = false;

    let usuarios = controlActions.GetToApiFuncional(service);
    //console.log(usuarios);

    Array.from(usuarios.Data).forEach(user => {
        //console.log(user);
        if (user.Email == email) {
            estado = true;
            console.log(user.Id_Usuario);
            localStorage.setItem('idUsuarioOlvidoContrasenna', user.Id_Usuario);
            
        } else {
            event.preventDefault();
        }
    });
    return estado;
}

function validarCorreo(correo) {
    //let ctrlActions = new ControlActions();
    var valid = true;
    if (correo == "" || correo == null) {
        valid = false;
    }

   if (!valid) {
            document.querySelector("input").classList.remove("is-valid");
            document.querySelector("input").classList.add("is-invalid");
        } else if (valid == true) {
            //document.querySelector("input").classList.add("is-valid");
            document.querySelector("input").classList.remove("is-invalid");
        }

    return valid;
}

function vIngresarEmail() {

    this.service = 'email';
    this.ctrlActions = new ControlActions();



    this.Enviar = async function () {
        var ctrlActions = new ControlActions();
        let usuario;
        //let validaciones = new Validaciones();
        let input_correo = document.querySelector('input');
        input_correo.required = true;

        //validaciones.validar();

        var data = {};
        data = this.ctrlActions.GetDataForm('formEmail');
        if (validarCorreo(input_correo.value) == true) {

            if (validarUsuario(data['email'], usuario) == true) {

                localStorage.setItem('userEmail', data['email']);
                localStorage.setItem('idUsuario', usuario);

                data['codigo'] = Math.floor(Math.random() * (999999 - 100000) + 100000);
                localStorage.setItem('codigoEmail', data['codigo']);

                data['content'] = this.BuildContent(data);

                data["subject"] = "Recuperación de contraseña Cowork Spaces";


                //this.ctrlActions.PostToAPI(this.service, emailData);

                try {

                    var result = await fetch('https://localhost:44302/api/email', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    var json = await result.json();
                    console.log(json);
                    document.querySelector("input").classList.add("is-valid");
                    document.querySelector("input").classList.remove("is-invalid");
                    ctrlActions.ShowMessage('I', "Enviamos un código a tu correo electrónico");
                    setTimeout(function () { window.location.href = "CodigoOlvidoContrasenna"; }, 3000);

                    //window.location.href = "CodigoOlvidoContrasenna";


                } catch (err) {
                    console.log('Ocurrió un error con la ejecución', err);
                }
            } else {
                document.querySelector("input").classList.remove("is-valid");
                document.querySelector("input").classList.add("is-invalid");
                ctrlActions.ShowMessage('E', "El correo electrónico no está asociado con un usuario registrado");
            }

        } else {
            //console.log("campo vacío");
            ctrlActions.ShowMessage('E', "Debe rellenar el campo del correo electrónico");
        }
        
    }

    this.BuildContent = function (data) {
        var content = "";
        var codigo = data['codigo'];

        //content = (
        //    '<!doctype html>' +
        //    '<html lang="en">' +
        //    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
        //    '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
        //    '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
        //    '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px;">' +
        //    '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold;">Coworkspaces</a>' +
        //    '<p style="color: black">Has solicitado un cambio de contraseña. Aquí se encuentra el código que debes ingresar para cambiar la contraseña:</p>' +
        //    '<p>Código: <a style="text-decoration: none; color: black; font-size: 25px; font-weight: bold;">' + codigo + '</a></p>' +
        //    '<p style="color: black">Gracias,</p>' +
        //    '<p style="color: black">Equipo de Coworkspaces.</p>' +
        //    '</div>' +
        //    '</body>' +
        //    '</html>'
        //);

        content = (
            '<!doctype html>' +
            '<html lang="en">' +
            '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
            '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
            '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
            '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px; text-align: center; border: 2px solid #3498db;">' +
            '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold; ">Coworkspaces</a>' +
            '<img src="https://res.cloudinary.com/imgproyecto1/image/upload/v1619658672/ylddosdtpsrcgbczngzj.png" alt="">' +
            '<p style="color: black; text-align: left;">Has solicitado un cambio de contraseña. Aquí se encuentra el código que debes ingresar para cambiar la contraseña:</p>' +
            '<p style="color: black; text-align: left;">Código: <a style="text-decoration: none; color: black; font-size: 25px; font-weight: bold;">' + codigo + '</a></p>' +
            '<p style="color: black; text-align: left;">Gracias,</p>' +
            '<p style="color: black; text-align: left;">Equipo de Coworkspaces.</p>' +
            '</div>' +
            '</body>' +
            '</html>'
        );

        return content;
    }
}

//ON DOCUMENT READY
$(document).ready(function () {

});
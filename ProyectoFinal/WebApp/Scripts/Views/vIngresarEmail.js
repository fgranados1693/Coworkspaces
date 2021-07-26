function load() {}

function vIngresarEmail() {

    this.service = 'email';
    this.ctrlActions = new ControlActions();

	this.Create = async function () {
        try {
            var ctrlActions = new ControlActions();

            var data = {};
            data = this.ctrlActions.GetDataForm('formEmail');

            localStorage.setItem('newUserEmail', data['email']);

            data['codigo'] = Math.floor(Math.random() * (999999 - 100000) + 100000);
            localStorage.setItem('codigoEmail', data['codigo']);

            data['content'] = this.BuildContent(data);

            data["subject"] = "Código de verificación correo electrónico Cowork Spaces";



            if (this.ValidateForm()) {
                if (await this.ValidateMailUnique(data['email'])) {

                    //this.ctrlActions.PostToAPI(this.service, data);

                    var result = await fetch('https://localhost:44302/api/email', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    var response = await result;
                    var json = await response.json();

                    if (response.status != 200) {
                        this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                    } else {
                        ctrlActions.ShowMessage('I', "Enviamos un código a tu correo electrónico");
                        setTimeout(function () { window.location.href = "vVerificarEmail"; }, 3000);
                    }
                    
                }
            }

        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }

    this.BuildContent = function (data) {
        var content = "";
        var codigo = data['codigo'];

        content = (
            '<!doctype html>' +
            '<html lang="en">' +
            '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
            '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
            '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
            '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px; text-align: center; border: 2px solid #3498db;">' +
            '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold; ">Coworkspaces</a>' +
            '<img src="https://res.cloudinary.com/imgproyecto1/image/upload/v1619658672/ylddosdtpsrcgbczngzj.png" alt="">' +
            '<p style="color: black; text-align: left;">Utiliza este código para verificar tu dirección de correo electrónico.</p>' +
            '<p style="color: black; text-align: left;">Código: <a style="text-decoration: none; color: black; font-size: 25px; font-weight: bold;">' + codigo + '</a></p>' +
            '<p style="color: black; text-align: left;">Gracias,</p>' +
            '<p style="color: black; text-align: left;">Equipo de Coworkspaces.</p>' +
            '</div>' +
            '</body>' +
            '</html>'
        );

        return content;
    }

    this.ValidateForm =  function () {

        var ctrlActions = new ControlActions();

        var mail = document.getElementById('txtEmail').value;

        if (mail == "") {
            ctrlActions.ShowMessage('E', "Complete todos los espacios");
            document.getElementById('txtEmail').classList.remove("is-valid");
            document.getElementById('txtEmail').classList.add("is-invalid");
            return false;
        }

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
            return true;
        }
        else {
            ctrlActions.ShowMessage('E', "El formato del correo electrónico es inválido");
            document.getElementById('txtEmail').classList.remove("is-valid");
            document.getElementById('txtEmail').classList.add("is-invalid");
            return false;
        }
        document.getElementById('txtEmail').classList.remove("is-invalid");
        document.getElementById('txtEmail').classList.add("is-valid");
        return true;
    }

    this.ValidateMailUnique = async function (mail) {
        try {

            var ctrlActions = new ControlActions();

            var data = {
                'correo':mail
            }
            
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
                    ctrlActions.ShowMessage('E', "Ya existe un usuario con este correo electrónico");
                    document.getElementById('txtEmail').classList.remove("is-valid");
                    document.getElementById('txtEmail').classList.add("is-invalid");
                    return false;
                }

            }
            document.getElementById('txtEmail').classList.remove("is-invalid");
            document.getElementById('txtEmail').classList.add("is-valid");
            return true;
        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    
});
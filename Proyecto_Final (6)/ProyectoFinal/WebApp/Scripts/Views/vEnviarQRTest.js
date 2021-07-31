function load() { }

function vEnviarQRTest() {

    this.service = 'email';
    this.ctrlActions = new ControlActions();

    this.Create = async function () {
        try {
            var ctrlActions = new ControlActions();

            var data = {};

            data['email'] = "feergranados@gmail.com"

            data['content'] = this.BuildContent(data);

            data["subject"] = "Envío de código QR de confirmación de reservación";


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
            }
                        

        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }

    this.BuildContent = function (data) {
        var content = "";
        var codigoQR = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=Hello%20world";
        
        content = (
            '<!doctype html>' +
            '<html lang="en">' +
            '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
            '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
            '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
            '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px;">' +
            '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold;">Coworkspaces</a>' +
            '<p style="color: black">Utiliza este código para entrar y salir el día de la reservación.</p>' +
            '<p>Código QR: </p>' +
            '<img src="' + codigoQR + '">' +
            '<p style="color: black">Gracias,</p>' +
            '<p style="color: black">Equipo de Coworkspaces.</p>' +
            '</div>' +
            '</body>' +
            '</html>'
        );

        return content;
    }    
}

/*async function getUsuario() {
    try {

        var ctrlActions = new ControlActions();
        var idUsuario = localStorage.getItem('idUsuario');
        if (idUsuario != "" && idUsuario != undefined) {
            var url = "https://localhost:44302/api/usuario/" + idUsuario;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }
            usuario = json['Data'];

        }

    } catch (err) {
        console.log(err);
    }
} */

//ON DOCUMENT READY
/*$(document).ready(function () {

    await getUsuario();

}); */
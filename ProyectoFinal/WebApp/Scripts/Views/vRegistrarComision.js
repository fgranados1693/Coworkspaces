function load() { }

var idMembresia = localStorage.getItem('idMembresiaMod');
var IdUsuario = "";
var FechaUltimoPago = "";
var ComisionAdmin = "";

//ON DOCUMENT READY
$(document).ready(async function () {
    try {

        var ctrlActions = new ControlActions();
        if (await isAdmin()) {
            document.getElementById("EstadoCont").classList.remove('visually-hidden');
        }



        if (idMembresia != "" && idMembresia != undefined) {

            var url = "https://localhost:44302/api/membresia/";
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            var response = await result;
            var json = await response.json();
            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            data = json['Data'];

            for (var i = 0; i < data.length; i++) {

                Id_Usuario = data[i]['Id_Usuario'];
                Fecha_Ultimo_Pago = data[i]['Fecha_Ultimo_Pago'];
                Comision_Admin = data[i]['Comision_Admin'];
            }

            document.getElementById("Id_Membresia").value = ComisionAdmin;
            document.getElementById("Id_Usuario").value = ComisionAdmin;
            document.getElementById("Fecha_Ultimo_Pago").value = ComisionAdmin;
            document.getElementById("Comision_Admin").value = ComisionAdmin;

        }

    } catch (err) {
        console.log(err);
    }
});

function vRegistrarComision() {

    this.service = 'membresia';
    this.ctrlActions = new ControlActions();

    this.Mod = async function () {
        try {

            var membresiaData = {};
            membresiaData = this.ctrlActions.GetDataForm('formMembresia');

            if (this.ValidateForm(membresiaData)) {

                var result = await fetch('https://localhost:44302/api/membresia', {
                    method: 'PUT',
                    body: JSON.stringify(membresiaData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                var response = await result;
                var json = await response.json();

                console.log(json);

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {
                    this.ctrlActions.ShowMessage('I', "Cambios guardados");
                    setTimeout(function () {
                        window.location.href = "vListarMembresias";
                    }, 3000);
                }

            }
            else {
                console.log("Error");
            }
        } catch (err) {
            console.log(err);
        }
    }

}
function load() {}

var idUsuario = localStorage.getItem('idUsuario');
var usuario = {};
var saldoActual = 0;
var saldoRecarga = "";

function vRecargarMonedero() {

    this.ctrlActions = new ControlActions();

    this.SINPE = async function () {

        try {

            saldoRecarga = document.getElementById('Saldo').value;
            if (saldoRecarga != "") {
                $('.alert').hide();

                var data = usuario;
                data['Saldo'] = parseFloat(data['Saldo']) + parseFloat(saldoRecarga);

                var result = await fetch('https://localhost:44302/api/usuario', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {
                    await this.SMS();
                    this.ctrlActions.ShowMessage('I', 'Enviamos un mensaje a tu teléfono móvil con las instrucciones para completar el pago');

                    await CreateFactura();
                    setTimeout(function () {
                        window.location.href = "vPerfilUsuario";
                    }, 3000);
                }

            } else {
                this.ctrlActions.ShowMessage('E', 'Digita el monto que deseas recargar');
            }

        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
       
    }

    this.SMS = async function () {

        var data = {
            "telefono": usuario['Telefono'],
            "content": "Envía el siguiente mensaje al +50688367188: PASE " + saldoRecarga + " 88367188"
        }

        var result = await fetch('https://localhost:44302/api/sms', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        } 
    }
}

async function CreateFactura() {

    try {

        var currentdate = new Date();
        //var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
        var time = currentdate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        //var datetime = new Date(currentdate.getFullYear(), (currentdate.getMonth() + 1), currentdate.getDate(), currentdate.getHours(), currentdate.getMinutes(), currentdate.getSeconds());
        var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + time;

        var facturaData = {
            "Id_Usuario": idUsuario,
            "Fecha": datetime,
            "Nombre_Usuario": (usuario['Nombre'] + " " + usuario['Apellidos']),
            "Detalle": "recarga"
        }

        var result = await fetch('https://localhost:44302/api/factura', {
            method: 'POST',
            body: JSON.stringify(facturaData),
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        } else {

            var idFactura = await this.GetIdFactura(currentdate);
            var transacciones = [];
            var recarga = {
                "Id_Factura": idFactura,
                "Tipo": "recarga",
                "Detalle": "Recarga " + usuario['Nombre'] + " " + usuario['Apellidos'],
                "Monto": saldoRecarga
            }
            transacciones.push(recarga);

            for (i in transacciones) {
                var result = await fetch('https://localhost:44302/api/transaccion', {
                    method: 'POST',
                    body: JSON.stringify(transacciones[i]),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                }
            }
        }



    } catch (err) {
        console.log(err);
    }

}

async function GetIdFactura(currentdate) {

    try {

        var url = "https://localhost:44302/api/factura?idUsuario=" + idUsuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        } else {
            var facturas = json['Data'];
            for (i in facturas) {
                var date = new Date(facturas[i]['Fecha']);

                if (this.CompareDates(date, currentdate))
                    return facturas[i]['Id_Factura'];
            }
        }

        return 0;

    } catch (err) {
        console.log(err);
    }


}

function CompareDates(date1, date2) {
    var time1 = date1.toString();
    var time2 = date2.toString();

    if (time1 == time2)
        return true;
    else
        return false;
}

async function Recargar(details) {
    try {
        var ctrlActions = new ControlActions();

        if (details['status'] == "COMPLETED") {
            ctrlActions.ShowMessage('I', 'Pago completado con éxito');

            var data = usuario;
            data['Saldo'] = parseFloat(data['Saldo']) + parseFloat(saldoRecarga);

            var result = await fetch('https://localhost:44302/api/usuario', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } else {
                await CreateFactura();
                setTimeout(function () {
                    window.location.href = "vPerfilUsuario";
                }, 3000);
            }

        } else {
            ctrlActions.ShowMessage('E', 'El pago no se pudo procesar');
        }

    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

async function fillUserInfo() {
    try {
        var ctrlActions = new ControlActions();

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
            saldoActual = usuario['Saldo'];
            document.getElementById('saldoActual').innerHTML += saldoActual;

        }

    } catch (err) {
        console.log(err);
    }
}

//PayPal
paypal.Buttons({
    createOrder: function (data, actions) {
        saldoRecarga = document.getElementById('Saldo').value;
        if (saldoRecarga != "") {
            $('.alert').hide();
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: (document.getElementById('Saldo').value * 0.0016)
                    }
                }]
            });
        } else {
            var ctrlActions = new ControlActions();
            ctrlActions.ShowMessage('E', 'Digita el monto que deseas recargar');
        }
        
    },
    onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            Recargar(details);
        });
    }
}).render('#paypal-button-container');
  //This function displays Smart Payment Buttons on your web page.

$(document).ready(async function () {
    try {

        await fillUserInfo();

        document.getElementById('Pago').onchange = function () {
            var value = document.getElementById('Pago').value;
            switch (value) {
                case "PayPal":
                    document.getElementById('sinpe-button-container').classList.add('visually-hidden');
                    document.getElementById('paypal-button-container').classList.remove('visually-hidden');
                    break;
                case "SINPE":
                    document.getElementById('paypal-button-container').classList.add('visually-hidden');
                    document.getElementById('sinpe-button-container').classList.remove('visually-hidden');
                    break;
                case "0":
                    break;
            }
        }

    } catch (err) {
        console.log(err);
    }

});
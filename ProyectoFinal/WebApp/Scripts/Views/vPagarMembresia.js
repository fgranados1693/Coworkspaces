function load() {}

var idUsuario = localStorage.getItem('idUsuario');
var usuario = {};
var saldo = 0;
var subtotal = 0;
var totalImpuestos = 0;
var porcentajeImpuestos = 0;
var total = 0;
var impuestos = [];

function vPagarMembresia() {

    this.ctrlActions = new ControlActions();

    this.Recargar = function () {
        window.location.href = "vRecargarMonedero";
    }

	this.Pagar = async function () {
        try {
            if (this.ValidarSaldo()) {
                await this.UpdateSaldoAdmins();
                await this.UpdateSaldoProp();
                //await this.CreateFacturaAdmins();
                await this.CreateFacturaProp();
                await this.UpdateMembresia();
            }
        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }

    this.ValidarSaldo = function(){
        if (saldo < total) {
            this.ctrlActions.ShowMessage('E', 'No tiene saldo suficiente en su monedero');
            return false;
        }
        return true;
    }

    this.UpdateSaldoAdmins = async function () {

        try {

            var admins = await this.GetAdmins();

            for (i in admins) {
                var data = admins[i];
                data['Saldo'] = parseFloat(data['Saldo']) + total;
                console.log(data);
                var result = await fetch('https://localhost:44302/api/usuario', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                }
            }

        } catch (err) {
            console.log(err);
        }
        
    }

    this.UpdateSaldoProp = async function () {

        try {

            var data = usuario;
            data['Saldo'] = parseFloat(data['Saldo']) - total;
            console.log(data);

            var result = await fetch('https://localhost:44302/api/usuario', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

        } catch (err) {
            console.log(err);
        }

    }

    this.UpdateMembresia = async function () {

        try {

            var data = await this.GetMembresia();

            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth() + 1) + "-"
                + currentdate.getDate();

            data['Fecha_Ultimo_Pago'] = datetime;
            console.log(data);

            var result = await fetch('https://localhost:44302/api/membresia', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } else {
                this.ctrlActions.ShowMessage('I', "Pago completado con éxito");
                setTimeout(function () { window.location.href = "vPerfilUsuario"; }, 3000);
            }



        } catch (err) {
            console.log(err);
        }

    }

    this.CreateFacturaProp = async function () {

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
                "Detalle": "membresia"
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

                var idFactura = await this.GetIdFactura(idUsuario);
                var transacciones = [];
                var pagoMembresia = {
                    "Id_Factura": idFactura,
                    "Tipo": "membresia",
                    "Detalle": "Pago membresia " + usuario['Nombre'] + " " + usuario['Apellidos'],
                    "Monto": subtotal
                }
                transacciones.push(pagoMembresia);

                for (i in impuestos) {
                    var monto = ((subtotal * impuestos[i]['Valor']) / 100);
                    var transImp = {
                        "Id_Factura": idFactura,
                        "Tipo": "impuesto",
                        "Detalle": impuestos[i]['Nombre'],
                        "Monto": monto
                    }
                    transacciones.push(transImp);
                }

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

    this.GetIdFactura = async function (idU) {

        try {

            var url = "https://localhost:44302/api/factura?idUsuario=" + idU;
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
                return facturas[facturas.length - 1]['Id_Factura'];
            }

            return 0;

        } catch (err) {
            console.log(err);
        }


    }

    this.CompareDates = function (date1, date2) {
        var time1 = date1.toString();
        var time2 = date2.toString();

        if (time1 == time2)
            return true;
        else
            return false;
    }

    this.GetAdmins = async function () {
        try {
            var admins = [];

            var url = "https://localhost:44302/api/usuario";
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            var users = json['Data'];
            for (i in users) {
                if (await this.IsAdmin(users[i]['Id_Usuario'])) {
                    admins.push(users[i])
                }
            }
            return admins;
        } catch (err) {
            console.log(err);
        }
    }

    this.IsAdmin = async function (idU){

        if (idU != "" && idU != undefined) {
            var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idU;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }
            for (i = 0; i < json['Data'].length; i++) {

                var rol = json['Data'][i];

                if (rol['Id_Rol'] == 1) {
                    return true;
                }

            }
        }
        return false;
    }

    this.GetMembresia = async function () {
        try {

            var url = "https://localhost:44302/api/membresia?idUsuario=" + idUsuario;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            return json['Data'];
        } catch (err) {
            console.log(err);
        }
    }
}

$(document).ready(async function () {
    try {

        await fillUserInfo();
        await fillImpuestos();
        await fillTotales();


    } catch (err) {
        console.log(err);
    }

});

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
            saldo = usuario['Saldo'];
            document.getElementById('saldo').innerHTML += saldo;

        }

    } catch (err) {
        console.log(err);
    }
}

async function fillImpuestos() {
    try {

        var ctrlActions = new ControlActions();

        var url = "https://localhost:44302/api/impuesto";
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();
        if (response.status != 200) {
            ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        }

        var lstImpuestos = json['Data'];
        for (i in lstImpuestos) {
            var tr = document.createElement('tr');

            var th = document.createElement('th');
            th.appendChild(document.createTextNode(lstImpuestos[i]['Nombre']));
            var td = document.createElement('td');
            td.appendChild(document.createTextNode("%" + lstImpuestos[i]['Valor']));
            tr.appendChild(th);
            tr.appendChild(td);
            document.getElementById('impuestos').appendChild(tr);
            //document.getElementById('impuestos').appendChild(td);

            porcentajeImpuestos += lstImpuestos[i]['Valor'];

            impuestos.push(lstImpuestos[i]);
        }

    } catch (err) {
        console.log(err);
    }
}

async function fillTotales() {
    try {

        var ctrlActions = new ControlActions();

        var url = "https://localhost:44302/api/parametro";
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();
        if (response.status != 200) {
            ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        }

        var parametros = json['Data'];
        for (i in parametros) {

            if (parametros[i]['Nombre'] == 'Precio Membresia') {
                subtotal = parseFloat(parametros[i]['Valor']);
                totalImpuestos = (subtotal * porcentajeImpuestos) / 100;
                total = subtotal + totalImpuestos;

                document.getElementById('subtotal').innerHTML += subtotal;
                document.getElementById('total').innerHTML += total;

            }
            
        }

    } catch (err) {
        console.log(err);
    }
}


//this.CreateFacturaAdmins = async function () {

    //    try {

    //        var currentdate = new Date();
    //        //var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
    //        var time = currentdate.toLocaleTimeString(undefined, {
    //            hour: '2-digit',
    //            minute: '2-digit',
    //            second: '2-digit',
    //        });
    //        //var datetime = new Date(currentdate.getFullYear(), (currentdate.getMonth() + 1), currentdate.getDate(), currentdate.getHours(), currentdate.getMinutes(), currentdate.getSeconds());
    //        var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + time;

    //        var facturaData = {
    //            "Id_Usuario": 1,
    //            "Fecha": datetime,
    //            "Nombre_Usuario": (usuario['Nombre'] + " " + usuario['Apellidos'])
    //        }

    //        var result = await fetch('https://localhost:44302/api/factura', {
    //            method: 'POST',
    //            body: JSON.stringify(facturaData),
    //            headers: { 'Content-Type': 'application/json' }
    //        });
    //        var response = await result;
    //        var json = await response.json();

    //        if (response.status != 200) {
    //            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
    //        } else {

    //            var idFactura = await this.GetIdFactura(currentdate, 1);
    //            var transacciones = [];
    //            var pagoMembresia = {
    //                "Id_Factura": idFactura,
    //                "Tipo": "membresia",
    //                "Detalle": "Pago membresia " + usuario['Nombre'] + " " + usuario['Apellidos'],
    //                "Monto": subtotal
    //            }
    //            transacciones.push(pagoMembresia);

    //            for (i in impuestos) {
    //                var monto = ((subtotal * impuestos[i]['Valor']) / 100);
    //                var transImp = {
    //                    "Id_Factura": idFactura,
    //                    "Tipo": "impuesto",
    //                    "Detalle": impuestos[i]['Nombre'],
    //                    "Monto": monto
    //                }
    //                transacciones.push(transImp);
    //            }

    //            for (i in transacciones) {
    //                var result = await fetch('https://localhost:44302/api/transaccion', {
    //                    method: 'POST',
    //                    body: JSON.stringify(transacciones[i]),
    //                    headers: { 'Content-Type': 'application/json' }
    //                });
    //                var response = await result;
    //                var json = await response.json();

    //                if (response.status != 200) {
    //                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
    //                }
    //            }
    //        }



    //    } catch (err) {
    //        console.log(err);
    //    }

    //}
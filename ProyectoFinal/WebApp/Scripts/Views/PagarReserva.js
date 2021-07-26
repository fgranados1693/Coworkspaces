Storage.prototype.setObj = function (key, obj) {

    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}


let controlActions = new ControlActions();

let reservas_local_storage = localStorage.getObj('reservas');
let reservas_usuario = [];
let reserva_eliminada = false;

var idUsuario = localStorage.getItem('idUsuario');
var usuario = {};
var saldo = 0;
var subtotal = 0;
var totalImpuestos = 0;
var porcentajeImpuestos = 0;
var total = 0;
var impuestos = [];
var comision = 0;
var facturaUsuarioDone = false;

function load() {}

function PagarReserva() {
    this.ctrlActions = new ControlActions();

    this.Recargar = function () {
        window.location.href = "vRecargarMonedero";
    }

    this.Pagar = async function () {
        try {
            if (this.ValidarSaldo()) {
                if (reservas_local_storage.length != 0) {
                    for (let i = 0; i < reservas_local_storage.length; i++) {
                        //console.log(reservas_local_storage[i]);

                        let reserva_actual = reservas_local_storage[i];

                        //NOMBRE DEL ESPACIO PARA EL CORREO 
                        let nombre_espacio_reserva = reserva_actual["Nombre_Espacio"];

                        delete reserva_actual["Nombre_Espacio"];
                        let subtotal_reserva = reservas_local_storage[i]["Monto"];
                        let total_reserva = subtotal_reserva + (subtotal_reserva * (porcentajeImpuestos / 100));
                        console.log(reservas_local_storage[i]);
                        console.log(reservas_local_storage[i]["Id_Espacio"]);
                        let idPropietario = await GetIdPropietario(reservas_local_storage[i]["Id_Espacio"]);
                        let espacio = await GetEspacio(reservas_local_storage[i]["Id_Espacio"]);
                        let total_correspondiente_admin = await GetComision(idPropietario, total_reserva);

                        console.log("Pago realizado");
                        await this.UpdateSaldoAdmins(total_correspondiente_admin);
                        //SALDO PROPIETARIO
                        await this.UpdateSaldoUsuario(idPropietario, total_reserva - total_correspondiente_admin);
                        //SALDO USUARIO QUE REALIZA LA RESERVA. EL TOTAL NEGATIVO PARA QUE SE RESTE DEL SALDO Y NO SE SUME
                        await this.UpdateSaldoUsuario(reservas_local_storage[i]["Id_Usuario"], (total_reserva * -1));
                        
                        await this.CreateFacturaUsuario(espacio["Nombre"], subtotal_reserva);

                        //FACTURA DE COMISION DE ADMIN
                        var propietario = await GetUsuario(idPropietario);
                        await this.CreateFacturaComision(espacio["Nombre"], total_correspondiente_admin, propietario);

                        await this.CrearReserva(reserva_actual);

                        //OBTENER LA RESERVA RECIEN CREADA DE LA BD
                        let reserva_buscada;
                        var reservasCliente = await this.getReservasCliente();
                        reserva_buscada = reservasCliente[reservasCliente.length - 1];

                        //ENVIAR EL CORREO
                        var data = {
                            'email' : usuario['Email'],
                            'subject' : "Reservación en Coworkspaces"
                        };

                        reserva_buscada['Nombre_Espacio'] = nombre_espacio_reserva;
                        data['content'] = this.BuildContent(reserva_buscada);

                        var result = await fetch('https://localhost:44302/api/email', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: { 'Content-Type': 'application/json' }
                        });

                        var response = await result;
                        var json = await response.json();
                        console.log(json);
                    }
                    //LIMPIAR LOCALSTORAGE

                    let reserva_limpieza = [];
                    localStorage.setObj('reservas', reserva_limpieza);
                    this.ctrlActions.ShowMessage('I', "Pago completado");
                    setTimeout(function () {
                        window.location.href = "vPerfilUsuario";
                    }, 3000);
                } else {
                    this.ctrlActions.ShowMessage('E', 'No hay reservas agregadas');
                }
            }
        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }

    this.getReservasCliente = async function () {

        var result = await fetch('https://localhost:44302/api/reservacion', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var allReservas = json['Data'];

        var reservas = [];

        for (i in allReservas) {
            if (allReservas[i]['Id_Usuario'] == idUsuario)
                reservas.push(allReservas[i]);
        }

        return reservas;

    }

    //CORREO DE LA RESERVACIÓN
    this.BuildContent = function (data) {
        var date = new Date(data['Fecha']);
        var dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var content = "";
        var codigoQR = "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=";
        codigoQR += data['Id_Reservacion'];
        content = (
            '<!doctype html>' +
            '<html lang="en">' +
            '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
            '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
            '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
            '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px; text-align: center; border: 2px solid #3498db;">' +
            '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold; ">Coworkspaces</a>' +
            '<img src="https://res.cloudinary.com/imgproyecto1/image/upload/v1619658672/ylddosdtpsrcgbczngzj.png" alt="">' +
            '<p style = "color: black; text-align: left;" >¡Su reserva fue procesada!</p>' +
            '<p style = "color: black; text-align: left;" >Código de la reservación: <a style="text-decoration: none; color: black; font-size: 25px; font-weight: bold;">' + data['Id_Reservacion'] + '</a></p>' +
            '<p style="color: black; text-align: left;">Espacio: ' + data['Nombre_Espacio'] + '</p>' +
            '<p style="color: black; text-align: left;">Fecha: ' + dateFormat + '</p>' +
            '<p style="color: black; text-align: left;">Hora de entrada: ' + data['Hora_Entrada'] + '</p>' +
            '<p style="color: black; text-align: left;">Hora de salida: ' + data['Hora_Salida'] + '</p>' +
            '<p style="color: black; text-align: left;">Monto: CRC' + data['Monto'] + '</p>' +
            '<p style="color: black; text-align: left;">Escanee este código QR en la propiedad para poder ingresar al espacio el día de la reservación.</p>' +
            '<img src="' + codigoQR + '" alt="Código QR reserva">' +
            '<p style="color: black; text-align: left;">Gracias,</p>' +
            '<p style="color: black; text-align: left;">Equipo de Coworkspaces.</p>' +
            '</div>' +
            '</body>' +
            '</html>'
        );
        

        return content;
    }

    this.CrearReserva = async function (reserva) {
        console.log(reserva);
        var result = await fetch('https://localhost:44302/api/reservacion', {
            method: 'POST',
            body: JSON.stringify(reserva),
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        } 
    }

    this.ValidarSaldo = function () {
        if (saldo < total) {
            this.ctrlActions.ShowMessage('E', 'No tiene saldo suficiente en su monedero');
            return false;
        }
        return true;
    }

    this.UpdateSaldoAdmins = async function (total) {

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

    //ACTUALIZA EL SALDO DE UN USUARIO FINAL O PROPIETARIO
    this.UpdateSaldoUsuario= async function (idUsuario, total) {

        try {

            var data = await GetUsuario(idUsuario);
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

        } catch (err) {
            console.log(err);
        }

    }

    //FACTURAS
    this.CreateFacturaUsuario = async function (nombreEspacio, subtotal) {

        try {

            var currentdate = new Date();
            
            var time = currentdate.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            if (facturaUsuarioDone == false) {
                var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + time;

                var facturaData = {
                    "Id_Usuario": idUsuario,
                    "Fecha": datetime,
                    "Nombre_Usuario": (usuario['Nombre'] + " " + usuario['Apellidos']),
                    "Detalle": "reserva"
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
                    facturaUsuarioDone = true;
                }
            }
            
            var idFactura = await this.GetIdFactura(idUsuario);
            var transacciones = [];
            var pagoReserva = {
                "Id_Factura": idFactura,
                "Tipo": "reserva",
                "Detalle": "Reservación de " + usuario['Nombre'] + " " + usuario['Apellidos'] + " en " + nombreEspacio ,
                "Monto": subtotal
            }
            transacciones.push(pagoReserva);

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
        } catch (err) {
            console.log(err);
        }

    }

    this.CreateFacturaComision = async function (nombreEspacio, subtotal, propietario) {

        try {

            var currentdate = new Date();

            var time = currentdate.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + time;

            var facturaData = {
                "Id_Usuario": propietario['Id_Usuario'],
                "Fecha": datetime,
                "Nombre_Usuario": (propietario['Nombre'] + " " + propietario['Apellidos']),
                "Detalle": "comision"
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

                var idFactura = await this.GetIdFactura(propietario['Id_Usuario']);
                var transacciones = [];
                var pagoReserva = {
                    "Id_Factura": idFactura,
                    "Tipo": "comision",
                    "Detalle": "Reservación de " + usuario['Nombre'] + " " + usuario['Apellidos'] + " en " + nombreEspacio,
                    "Monto": subtotal
                }
                transacciones.push(pagoReserva);

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

    this.IsAdmin = async function (idU) {

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
}

async function GetEspacio(idEspacio) {
    try {

        var url = "https://localhost:44302/api/espacio/" + idEspacio;
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

async function GetPropiedad(idPropiedad) {
    
    try {

        var url = "https://localhost:44302/api/propiedad?idPropiedad=" + idPropiedad;
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

async function GetUsuario(idUsuario) {

    try {

        var url = "https://localhost:44302/api/usuario/" + idUsuario;
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

//DEVOLVER ID PROPIETARIO PARA BUSCAR SU COMISION PARA EL ADMIN
async function GetIdPropietario(idEspacio) {
    let espacio = await GetEspacio(idEspacio);
    console.log(espacio);
    let propiedad = await GetPropiedad(espacio["Id_Propiedad"]);
    console.log(propiedad);

    return propiedad["IdUsuario"];
}

async function GetComision(idUsuarioPropietario, montoReserva) {
    let membresia = await GetMembresia(idUsuarioPropietario);

    return montoReserva * (membresia["Comision_Admin"] / 100);


}

async function GetMembresia(idUsuarioReserva) {
    try {

        var url = "https://localhost:44302/api/membresia?idUsuario=" + idUsuarioReserva;
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

//CARRITO DE RESERVAS
$(document).ready(async function () {
    try {
        if (reservas_local_storage != null) {
            agregarReservaCarrito();
        }
        await fillUserInfo();
        await fillImpuestos();
        await fillTotales();

    } catch (err) {
        console.log(err);
    }
    

});

function fillTotales() {
    totalImpuestos = (subtotal * porcentajeImpuestos) / 100;
    total = subtotal + totalImpuestos;

    document.getElementById('subtotal').innerHTML = subtotal;
    document.getElementById('total').innerHTML = total;
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

            console.log(json);
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
        console.log(lstImpuestos);
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
                console.log(users[i]);
                if (await this.IsAdmin(users[i]['Id_Usuario'])) {
                    admins.push(users[i])
                }
            }
            return admins;
        } catch (err) {
            console.log(err);
        }
    }

    this.IsAdmin = async function (idU) {

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
                console.log(json['Data'][i]);
                var rol = json['Data'][i];

                if (rol['Id_Rol'] == 1) {
                    return true;
                }

            }
        }
        return false;
    }


//CARGA LA TABLA CON LA(S) RESERVA(S)
function agregarReservaCarrito() {
    console.log(reservas_local_storage);
    if (reservas_local_storage.length != 0) {

        for (var i = 0; i < reservas_local_storage.length; i++) {
            if (reserva_eliminada == false) {
                subtotal += parseFloat(reservas_local_storage[i]['Monto']);
            } 
           // total_carrito.innerHTML = subtotal;

            var tr = document.createElement("tr");
            var espacio = document.createElement("td");
            var fecha = document.createElement("td");
            var hora_entrada = document.createElement("td");
            var hora_salida = document.createElement("td");
            var subtotalCell = document.createElement("td");
            var eliminar = document.createElement("td");

            espacio.appendChild(document.createTextNode(reservas_local_storage[i]['Nombre_Espacio']));
            fecha.appendChild(document.createTextNode(reservas_local_storage[i]['Fecha']));
            hora_entrada.appendChild(document.createTextNode(reservas_local_storage[i]['Hora_Entrada']));
            hora_salida.appendChild(document.createTextNode(reservas_local_storage[i]['Hora_Salida']));
            subtotalCell.appendChild(document.createTextNode(reservas_local_storage[i]['Monto']));

            var aEliminar = document.createElement("a");
            aEliminar.href = "#";
            aEliminar.className = "EliminarReserva";
            aEliminar.id = "Eliminar_" + reservas_local_storage[i]['Nombre_Espacio'];
            //aEliminar.addEventListener('click', eliminarReserva);
            var iconEliminar = document.createElement("i");
            iconEliminar.classList.add("fas");
            iconEliminar.classList.add("fa-trash-alt");
            iconEliminar.classList.add("edit");
            iconEliminar.id = reservas_local_storage[i]['Id_Espacio'];
            aEliminar.appendChild(iconEliminar);
            eliminar.appendChild(aEliminar);

            //SE AGREGAN A LAS CELDAS
            tr.appendChild(espacio);
            tr.appendChild(fecha);
            tr.appendChild(hora_entrada);
            tr.appendChild(hora_salida);
            tr.appendChild(subtotalCell);
            tr.appendChild(eliminar);

            document.getElementById("tblBodyCarrito").appendChild(tr);
            fillTotales();
        }
        length_reservas = reservas_local_storage.length

    } else {
        subtotal = 0;
        //total_carrito.innerHTML = subtotal_reservas;
        //ESCONDE EL TOTAL Y EL BOTON DE RESERVAS SI NO HAY NINGUNA RESERVA EN EL CARRITO
        
        controlActions.ShowMessage('E', 'No hay reservas agregadas')
    }
}

function limpiarCarrito() {
    //ELIMINA TODAS LAS FILAS DE LA TABLA MENOS LOS TITULOS
    $("#tblCarrito tr").remove();
}

//EVENTO DE CLICK EN UN BOTON PARA ELIMINAR UNA RESERVA
$(document).on('click', 'a', function () {
    //alert(this.id);
    //alert(this.href);
    if (this.className == "EliminarReserva") {
        for (var i = 0; i < reservas_local_storage.length; i++) {
            let posibleIdAnchor = "Eliminar_" + reservas_local_storage[i]["Nombre_Espacio"];
            if (this.id == posibleIdAnchor) {
                subtotal -= parseFloat(reservas_local_storage[i]["Monto"]);
                reservas_local_storage.splice(reservas_local_storage.indexOf(reservas_local_storage[i]), 1);

                
                reserva_eliminada = true;
                localStorage.setObj('reservas', reservas_local_storage);
                //SE ACTUALIZA LA TABLA
                limpiarCarrito();
                agregarReservaCarrito();
                fillTotales();
                //contador_carrito.innerHTML = reservas_usuario.length;
                break;
            }
        }
    }
});
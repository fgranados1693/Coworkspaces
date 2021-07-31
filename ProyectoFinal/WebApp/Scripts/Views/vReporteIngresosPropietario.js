
var idUsuario = localStorage.getItem('idUsuario');
var ingresosTotales = 0;
var egresosTotales = 0;
var gananciasTotales = 0;


//ON DOCUMENT READY
$(document).ready(async function () {

});

async function getTotales(data) {

    var totales = [];
    var reservas = 0;
    var recargas = 0;
    var reembolsos = 0;
    var comisiones = 0;
    var membresias = 0;

    for (var i = 0; i < data.length; i++) {

        var url = "https://localhost:44302/api/transaccion?idFactura=" + data[i]['Id_Factura'];
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var transacciones = json['Data'];
        for (j = 0; j < transacciones.length; j++) {
            if (transacciones[j]['Tipo'] == "recarga")
                recargas += transacciones[j]['Monto']
            if (transacciones[j]['Tipo'] == "membresia")
                membresias += transacciones[j]['Monto']
            if (transacciones[j]['Tipo'] == "impuesto")
                membresias += transacciones[j]['Monto']
        }
    }

    var comisionAdmin = await getComision();
    var reservasProp = await getReservasPropietario();
    for (var i = 0; i < reservasProp.length; i++) {

        if (reservasProp[i]['Estado'] != 'reembolso') {
            reservas += reservasProp[i]['Monto'];
            comisiones += reservasProp[i]['Monto'] * (comisionAdmin/100);
        }
        if (reservasProp[i]['Estado'] == 'reembolso') {
            reembolsos += reservasProp[i]['Monto'];
            reservas += reservasProp[i]['Monto'];
        }

    }

    ingresosTotales = reservas + recargas;
    egresosTotales = reembolsos + comisiones + membresias;
    gananciasTotales = ingresosTotales - egresosTotales;

    totales.push(reservas);
    totales.push(recargas);
    totales.push(reembolsos);
    totales.push(comisiones);
    totales.push(membresias);

    return totales;

}

function vReporteIngresosPropietario() {

    this.chartIngresos = 'chartIngresos';
    this.ctrlActions = new ControlActions();

    this.GetDataToChartIngresos = async function (initializeChartFunction) {

        var result = await fetch('https://localhost:44302/api/factura?idUsuario=' + idUsuario, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var totales = await getTotales(json['Data']);

        var data = [];
        data.push(totales[0]);
        data.push(totales[1]);
        data.push(totales[2]);
        data.push(totales[3]);
        data.push(totales[4]);
        initializeChartFunction(data);

        document.getElementById('ingresosTotales').innerHTML = "CRC " + ingresosTotales;
        document.getElementById('egresosTotales').innerHTML = "CRC " + egresosTotales;
        document.getElementById('gananciasTotales').innerHTML = "CRC " + gananciasTotales;

    };

}

async function getReservasPropietario() {

    var espacios = await getEspacios();

    var result = await fetch('https://localhost:44302/api/reservacion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var allReservas = json['Data'];

    var reservas = [];

    for (i in allReservas) {
        if ($.inArray(allReservas[i]['Id_Espacio'], espacios) != -1)
            reservas.push(allReservas[i]);
    }

    return reservas;

}

async function getEspacios() {

    try {
        var propiedades = await getPropiedadesPropietario();

        var result = await fetch('https://localhost:44302/api/espacio', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var espacios = json['Data'];
        var ids = [];

        for (i in espacios) {
            if ($.inArray(espacios[i]['Id_Propiedad'], propiedades) != -1)
                ids.push(espacios[i]["Id_Espacio"]);
        }

        return ids;
    } catch (err) {
        console.log(err);
    }

}

async function getPropiedadesPropietario() {

    var propiedades = await getPropiedades();
    var propiedadesPropietario = [];

    for (i in propiedades) {

        if (propiedades[i]["IdUsuario"] == idUsuario) {
            propiedadesPropietario.push(propiedades[i]['IdPropiedad']);
        }
    }

    return propiedadesPropietario;

}

async function getPropiedades() {

    var result = await fetch('https://localhost:44302/api/propiedad?idUsuario=' + idUsuario, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];

}

async function getEspacio(id) {

    try {

        var result = await fetch('https://localhost:44302/api/espacio/' + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var espacio = json['Data'];

        return espacio;

    } catch (err) {
        console.log(err);
    }


}

async function getComision() {

    try {

        var url = "https://localhost:44302/api/membresia?idUsuario=" + idUsuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        return json['Data']['Comision_Admin'];

    } catch (err) {
        console.log(err);
    }


}
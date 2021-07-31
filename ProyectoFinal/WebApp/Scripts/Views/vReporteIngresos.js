
var idUsuario = localStorage.getItem('idUsuario');
var ingresosTotales = 0;
var egresosTotales = 0;
var gananciasTotales = 0;


//ON DOCUMENT READY
$(document).ready(async function () {

});

async function getTotales(data) {

    var totales = [];
    var membresias = 0;
    var comisiones = 0;
    var recargas = 0;
    var reembolsos = 0;
    var impuestos = 0;


    for (var i = 0; i < data.length; i++) {

        var url = "https://localhost:44302/api/transaccion?idFactura=" + data[i]['Id_Factura'];
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var transacciones = json['Data'];
        for (j = 0; j < transacciones.length; j++) {

            if (transacciones[j]['Tipo'] == "membresia")
                membresias += transacciones[j]['Monto']
            if (transacciones[j]['Tipo'] == "comision")
                comisiones += transacciones[j]['Monto']
            if (transacciones[j]['Tipo'] == "reembolso")
                reembolsos += transacciones[j]['Monto']
            if (transacciones[j]['Tipo'] == "impuesto")
                impuestos += transacciones[j]['Monto']
        }
    }

    var result = await fetch('https://localhost:44302/api/factura?idUsuario=' + idUsuario, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    data = json['Data'];
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
        }
    }

    ingresosTotales = membresias + comisiones + recargas + impuestos;
    egresosTotales = reembolsos;
    gananciasTotales = ingresosTotales - egresosTotales;

    totales.push(membresias);
    totales.push(comisiones);
    totales.push(impuestos);
    totales.push(recargas);
    totales.push(reembolsos);

    return totales;

}

function vReporteIngresos() {

    this.chartIngresos = 'chartIngresos';
    this.ctrlActions = new ControlActions();

    this.GetDataToChartIngresos = async function (initializeChartFunction) {

        var result = await fetch('https://localhost:44302/api/factura', {
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

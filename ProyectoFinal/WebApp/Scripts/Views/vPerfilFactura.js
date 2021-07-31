function load() { }


//ON DOCUMENT READY
$(document).ready(async function () {
    try {
        var idFactura = localStorage.getItem('idFactura');
        var idUsuario = localStorage.getItem('idUsuario');

        if (idUsuario != "" && idUsuario != undefined) {
            var url = "https://localhost:44302/api/factura";
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            var facturas = json['Data'];
            var factura;
            for (i in facturas) {
                if (facturas[i]['Id_Factura'] == idFactura)
                    factura = facturas[i];
            }

            for (j in factura) {
                if (j != 'Id_Usuario' && j != 'Id_Factura' && j != 'Fecha')
                    document.getElementById(j).innerHTML = factura[j];
                if (j == 'Fecha') {
                    var date = new Date(factura[j]);
                    document.getElementById(j).innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                }
            }

            var url = "https://localhost:44302/api/transaccion?idFactura=" + idFactura;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var transacciones = await result.json();

            var subtotal = 0;
            var totalImpuestos = 0;
            var total = 0;

            for (j = 0; j < transacciones['Data'].length; j++) {

                var transData = transacciones['Data'][j];
                if (transData['Tipo'] == "impuesto") {
                    totalImpuestos += transData['Monto'];

                    var tr = document.createElement('tr');

                    var detail = document.createElement('th');
                    detail.appendChild(document.createTextNode(transData['Detalle']));
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode("CRC " + transData['Monto']));
                    tr.appendChild(detail);
                    tr.appendChild(td);
                    document.getElementById('impuestos').appendChild(tr);

                } else {
                    subtotal += transData['Monto'];

                    var tr = document.createElement('tr');

                    var detail = document.createElement('th');
                    detail.appendChild(document.createTextNode(transData['Detalle']));
                    var td = document.createElement('td');
                    td.appendChild(document.createTextNode("CRC " + transData['Monto']));
                    tr.appendChild(detail);
                    tr.appendChild(td);
                    document.getElementById('transacciones').appendChild(tr);
                }

            }

            total = subtotal + totalImpuestos;

            document.getElementById('subtotal').innerHTML += subtotal;
            document.getElementById('total').innerHTML += total;

        } else {
            window.location.href = "vIniciarSesion";
        }

    } catch (err) {
        console.log(err);
    }

});

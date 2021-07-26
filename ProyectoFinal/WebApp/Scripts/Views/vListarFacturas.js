
var idUsuario = localStorage.getItem('idUsuario');
//ON DOCUMENT READY
$(document).ready(async function () {

    if (await isAdmin()) {

        var result = await fetch('https://localhost:44302/api/factura', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        await fillTableAdmin(json['Data']);

        var result = await fetch('https://localhost:44302/api/factura?idUsuario=' + idUsuario, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        await fillTable(json['Data']);

    } else {

        var result = await fetch('https://localhost:44302/api/factura?idUsuario=' + idUsuario, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        await fillTable(json['Data']);

    }

    $('#tblUsuarios').DataTable();

});

async function fillTableAdmin(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]['Detalle'] == "membresia") {

            var tr = document.createElement("tr");
            var fecha = document.createElement("td");
            var usuario = document.createElement("td");
            var detalle = document.createElement("td");
            var monto = document.createElement("td");
            var ver = document.createElement("td");

            var date = new Date(data[i]['Fecha']);
            fecha.appendChild(document.createTextNode(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()));
            usuario.appendChild(document.createTextNode(data[i]['Nombre_Usuario']));
            detalle.appendChild(document.createTextNode(data[i]['Detalle']));


            var url = "https://localhost:44302/api/transaccion?idFactura=" + data[i]['Id_Factura'];
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var transacciones = await result.json();
            var total = 0;
            for (j = 0; j < transacciones['Data'].length; j++) {

                var transData = transacciones['Data'][j];
                total += transData['Monto'];

            }

            monto.appendChild(document.createTextNode(total));

            var a = document.createElement("a");
            a.href = "#";
            a.id = data[i]['Id_Factura'];
            a.addEventListener('click', perfilFactura);
            var icon = document.createElement("i");
            icon.classList.add("fas");
            icon.classList.add("fa-eye");
            icon.classList.add("edit");
            icon.id = data[i]['Id_Factura'];
            a.appendChild(icon);
            ver.appendChild(a);

            tr.appendChild(fecha);
            tr.appendChild(usuario);
            tr.appendChild(detalle);
            tr.appendChild(monto);
            tr.appendChild(ver);

            document.getElementById("tblBodyFacturas").appendChild(tr);

        }
    }
}

async function fillTable(data) {
    for (var i = 0; i < data.length; i++) {

        var tr = document.createElement("tr");
        var fecha = document.createElement("td");
        var usuario = document.createElement("td");
        var detalle = document.createElement("td");
        var monto = document.createElement("td");
        var ver = document.createElement("td");

        var date = new Date(data[i]['Fecha']);
        fecha.appendChild(document.createTextNode(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()));
        usuario.appendChild(document.createTextNode(data[i]['Nombre_Usuario']));
        detalle.appendChild(document.createTextNode(data[i]['Detalle']));


        var url = "https://localhost:44302/api/transaccion?idFactura=" + data[i]['Id_Factura'];
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var transacciones = await result.json();
        var total = 0;
        for (j = 0; j < transacciones['Data'].length; j++) {

            var transData = transacciones['Data'][j];
            total += transData['Monto'];

        }

        monto.appendChild(document.createTextNode(total));

        var a = document.createElement("a");
        a.href = "#";
        a.id = data[i]['Id_Factura'];
        a.addEventListener('click', perfilFactura);
        var icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add("fa-eye");
        icon.classList.add("edit");
        icon.id = data[i]['Id_Factura'];
        a.appendChild(icon);
        ver.appendChild(a);

        tr.appendChild(fecha);
        tr.appendChild(usuario);
        tr.appendChild(detalle);
        tr.appendChild(monto);
        tr.appendChild(ver);

        document.getElementById("tblBodyFacturas").appendChild(tr);

    }
}

function perfilFactura(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idFactura", id);
    window.location.href = "vPerfilFactura";
}

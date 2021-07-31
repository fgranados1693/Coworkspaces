//ON DOCUMENT READY
$(document).ready(async function () {
    var result = await fetch('http://localhost/api_web/api/membresia', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(result);


    var json = await result.json();
    console.log(json);
    await fillTable(json['Data']);

    $('#tblMembresias').DataTable();
});


async function fillTable(data) {

    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);

        var tr = document.createElement("tr");
        var IdUsuario = document.createElement("td");
        var FechaUltimoPago = document.createElement("td");
        var Comision = document.createElement("td");
        var editar = document.createElement("td");

        IdUsuario.appendChild(document.createTextNode(data[i]['Id_Usuario']));
        FechaUltimoPago.appendChild(document.createTextNode(data[i]['Fecha_Ultimo_Pago']));
        Comision.appendChild(document.createTextNode(data[i]['Comision_Admin']));

        var aEditar = document.createElement("a");

        aEditar.href = "#";
        aEditar.id = data[i]['Id_Membresia'];
        aEditar.addEventListener('click', modMembresia);

        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-pencil-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Membresia'];
        aEditar.appendChild(iconEditar);

        editar.appendChild(aEditar);

        tr.appendChild(IdUsuario);
        tr.appendChild(FechaUltimoPago);
        tr.appendChild(Comision);
        tr.appendChild(editar);

        document.getElementById("tblBodyMembresias").appendChild(tr);
    }
}

function modMembresia(c) {
    var a = c.target;
    var id = a.id;
    localStorage.setItem("idMembresiaMod", id);
    window.location.href = "vRegistrarComision";
}
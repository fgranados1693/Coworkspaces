//ON DOCUMENT READY
$(document).ready(async function () {
    var result = await fetch('http://localhost/api_web/api/caracteristicaEspacio', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(result);


    var json = await result.json();
    console.log(json);
    await fillTable(json['Data']);

    $('#tblCaracteristicas').DataTable();
});

async function fillTable(data) {

    for (var i = 0; i < data.length; i++)
    {
        console.log(data[i]);

        var tr = document.createElement("tr");
        var nombre = document.createElement("td");
        var descripcion = document.createElement("td");
        var editar = document.createElement("td");
        var eliminar = document.createElement("td");

        nombre.appendChild(document.createTextNode(data[i]['Nombre']));
        descripcion.appendChild(document.createTextNode(data[i]['Descripcion']));

        var aEditar = document.createElement("a");

        aEditar.href = "#";
        aEditar.id = data[i]['IdCaracteristica'];
        aEditar.addEventListener('click', modCaracteristica);

        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-pencil-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['IdCaracteristica'];
        aEditar.appendChild(iconEditar);

        editar.appendChild(aEditar);

        var aEliminar = document.createElement("a");

        aEliminar.href = "#";
        aEliminar.id = data[i]['IdCaracteristica'];
        aEliminar.addEventListener('click', deleteCaracteristica);

        var iconEliminar = document.createElement("i");
        iconEliminar.classList.add("fas");
        iconEliminar.classList.add("fa-trash");
        iconEliminar.classList.add("delete");
        iconEliminar.id = data[i]['IdCaracteristica'];
        aEliminar.appendChild(iconEliminar);

        eliminar.appendChild(aEliminar);

        tr.appendChild(nombre);
        tr.appendChild(descripcion);
        tr.appendChild(editar);
        tr.appendChild(eliminar);

        document.getElementById("tblBodyCaracteristicas").appendChild(tr);
    }
}

function modCaracteristica(c) {
    var a = c.target;
    var id = a.id;
    localStorage.setItem("idCaracteristicaMod", id);
    window.location.href = "vModificarCaracteristicaEspacio";
}

function deleteCaracteristica(c) {
    var a = c.target;
    var id = a.id;
    localStorage.setItem("idCaracteristicaDelete", id);
    window.location.href = "vEliminarCaracteristicaEspacio";
}
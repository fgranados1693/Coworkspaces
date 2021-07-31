function load() { }

var idPropiedad = localStorage.getItem("idPropiedadPerfil");

$(document).ready(async function () {

    try {

        var idPropiedad = localStorage.getItem('idPropiedadPerfil');
        if (idPropiedad != "" && idPropiedad != undefined) {
            var url = "https://localhost:44302/api/propiedad?idPropiedad=" + idPropiedad;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var json = await result.json();

            for (i in json['Data']) {
                if (i != 'IdPropiedad' && i != 'IdUsuario' && i != 'Estado' && i != 'Latitud' && i != 'Longitud')
                    document.getElementById(i).innerHTML = json['Data'][i];

                if (i == 'IdUsuario')
                    IdUsuario = json['Data'][i];
            }
        }

    } catch (err) {
        console.log(err);
    }

    var dataDocumentosPropiedad = await getDocumentosPropiedad();
    await fillTable(dataDocumentosPropiedad);

    var dataFotografiasPropiedad = await getFotografiasPropiedad();
    await fillTableFotografias(dataFotografiasPropiedad);

    $('#tblDocumentos').DataTable();
    $('#tblFotografias').DataTable();
});

async function getDocumentosPropiedad() {

    var documentos = await getDocumentos();
    var documentosPropiedad = [];

    for (i in documentos) {

        if (documentos[i]["Id_Propiedad"] == idPropiedad && documentos[i]["Tipo"] == "documento") {

            documentosPropiedad.push(documentos[i]);
        }
    }

    return documentosPropiedad;
}

async function getFotografiasPropiedad() {

    var fotografias = await getDocumentos();
    var fotografiasPropiedad = [];

    for (i in fotografias) {

        if (fotografias[i]["Id_Propiedad"] == idPropiedad && fotografias[i]["Tipo"] == "foto") {

            fotografiasPropiedad.push(fotografias[i]);
        }
    }

    return fotografiasPropiedad;
}

async function getDocumentos() {

    var result = await fetch('https://localhost:44302/api/documento', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];
    console.log(json['Data']);

}

async function fillTable(data) {
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var URL = document.createElement("td");
        var nombre = document.createElement("td");
        var eliminar = document.createElement("td");

        var a = document.createElement("a");

        var textNombre = document.createTextNode(data[i]['Nombre']);
        a.appendChild(textNombre);
        a.href = data[i]['URL'];
        a.id = data[i]['Id_Documento'];

        nombre.appendChild(a);  

        var aEditar = document.createElement("a");
        aEditar.href = "#";
        aEditar.id = data[i]['Id_Documento'];
        aEditar.addEventListener('click', eliminarDocumento);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-trash-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Documento'];
        aEditar.appendChild(iconEditar);
        eliminar.appendChild(aEditar);

        tr.appendChild(nombre);
        tr.appendChild(URL);
        tr.appendChild(eliminar);

        document.getElementById("tblBodyPropiedades").appendChild(tr);
    }
}

async function fillTableFotografias(data) {
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var URL = document.createElement("td");
        var nombre = document.createElement("td");
        var eliminar = document.createElement("td");

        var a = document.createElement("a");

        var textNombre = document.createTextNode(data[i]['Nombre']);
        a.appendChild(textNombre);
        a.href = data[i]['URL'];
        a.id = data[i]['Id_Documento'];

        nombre.appendChild(a);

        var aEditar = document.createElement("a");
        aEditar.href = "#";
        aEditar.id = data[i]['Id_Documento'];
        aEditar.addEventListener('click', eliminarDocumento);
        var iconEditar = document.createElement("i");
        iconEditar.classList.add("fas");
        iconEditar.classList.add("fa-trash-alt");
        iconEditar.classList.add("edit");
        iconEditar.id = data[i]['Id_Documento'];
        aEditar.appendChild(iconEditar);
        eliminar.appendChild(aEditar);

        tr.appendChild(nombre);
        tr.appendChild(URL);
        tr.appendChild(eliminar);

        document.getElementById("tblBodyFotografias").appendChild(tr);
    }
}

async function eliminarDocumento(e) {

    var a = e.target;
    var id = a.id;

    var ctrlActions = new ControlActions();
    var documento = {"Id_Documento": id};

    var result = await fetch('https://localhost:44302/api/documento', {
        method: 'DELETE',
        body: JSON.stringify(documento),
        headers: { 'Content-Type': 'application/json' }
    });

    var response = await result;
    var json = await response.json();

    if (response.status != 200) {
        ctrlActions.ShowMessage('E', json['ExceptionMessage']);
    } else {
        ctrlActions.ShowMessage('I', "Cambios guardados");
        setTimeout(function () {
            window.location.href = "#";
        }, 3000);
    }
}

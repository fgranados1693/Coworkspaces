
var idUsuario = localStorage.getItem('idUsuario');

function vListarReservas() {

    this.ctrlActions = new ControlActions();

    this.Create = async function () {
        try {

          window.location.href = "vIngresarEmail";

        } catch (err) {
            console.log(err);
        }
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {

    try {

        if (await isPropietario()) {

            var data = await getReservasPropietario();
            await fillTablePropietario(data);

        } else {

            var data = await getReservasCliente();
            await fillTableCliente(data);

        }

        $('#tblReservas').DataTable();

    } catch (err) {
        console.log(err);
    }
    

});

async function getReservasCliente() {

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

async function getReservaPropietario(id) {

    try {

        var result = await fetch('https://localhost:44302/api/reservacion/' + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var reservacion = json['Data'];

        return reservacion;

    } catch (err) {
        console.log(err);
    }


}

async function getReservaCliente(id) {

    try {

        var result = await fetch('https://localhost:44302/api/reservacion/' + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var reservacion = json['Data'];

        return reservacion;

    } catch (err) {
        console.log(err);
    }


}

async function getPropiedad(id) {

    try {

        var result = await fetch('https://localhost:44302/api/propiedad/' + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var propiedad = json['Data'];

        return propiedad;

    } catch (err) {
        console.log(err);
    }


}


async function fillTablePropietario(data) {

    var th = document.createElement("th");
    document.getElementById("headers").appendChild(th);

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var espacio = document.createElement("td");
        var fecha = document.createElement("td");
        var entrada = document.createElement("td");
        var salida = document.createElement("td");
        var estado = document.createElement("td");
        var cUsuario = document.createElement("td");

        var espacioData = await getEspacio(data[i]['Id_Espacio']);
        var reservacionData = await getReservaPropietario(data[i]['Id_Reservacion']);
        var a = document.createElement("a");

        a.appendChild(document.createTextNode(espacioData['Nombre']));
        a.href = "#";
        a.id = espacioData['Id_Espacio'];
        a.addEventListener('click', perfilEspacio);
        espacio.appendChild(a);

        fecha.appendChild(document.createTextNode(data[i]['Fecha']));
        entrada.appendChild(document.createTextNode(data[i]['Hora_Entrada']));
        salida.appendChild(document.createTextNode(data[i]['Hora_Salida']));
        estado.appendChild(document.createTextNode(data[i]['Estado']));
        
        var a = document.createElement("a");
        a.appendChild(document.createTextNode('Calificar usuario'));
        a.href = "#";
        a.id = reservacionData['Id_Reservacion'];
        a.addEventListener('click', calificarUsuario);
        cUsuario.appendChild(a);

        tr.appendChild(espacio);
        tr.appendChild(fecha);
        tr.appendChild(entrada);
        tr.appendChild(salida);
        tr.appendChild(estado);
        tr.appendChild(cUsuario);
        
        document.getElementById("tblBodyReservas").appendChild(tr);
    }
}

async function fillTableCliente(data) {

    var th = document.createElement("th");
    document.getElementById("headers").appendChild(th);

    var th = document.createElement("th");
    document.getElementById("headers").appendChild(th);

    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        var espacio = document.createElement("td");
        var fecha = document.createElement("td");
        var entrada = document.createElement("td");
        var salida = document.createElement("td");
        var estado = document.createElement("td");
        var cPropietario = document.createElement("td");
        var cPropiedad = document.createElement("td");

        var espacioData = await getEspacio(data[i]['Id_Espacio']);
        var reservacionData = await getReservaCliente(data[i]['Id_Reservacion']);
        var a = document.createElement("a");

        a.appendChild(document.createTextNode(espacioData['Nombre']));
        a.href = "#";
        a.id = espacioData['Id_Espacio'];
        a.addEventListener('click', perfilEspacio);
        espacio.appendChild(a);

        fecha.appendChild(document.createTextNode(data[i]['Fecha']));
        entrada.appendChild(document.createTextNode(data[i]['Hora_Entrada']));
        salida.appendChild(document.createTextNode(data[i]['Hora_Salida']));
        estado.appendChild(document.createTextNode(data[i]['Estado']));
        
        var a = document.createElement("a");

        a.appendChild(document.createTextNode('Calificar propietario'));
        a.href = "#";
        a.id = reservacionData['Id_Reservacion'];
        a.addEventListener('click', calificarPropietario);
        cPropietario.appendChild(a);
        
        var a = document.createElement("a");
        a.appendChild(document.createTextNode('Calificar propiedad'));
        a.href = "#";
        a.id = reservacionData['Id_Reservacion'];
        a.addEventListener('click', calificarPropiedad);
        cPropiedad.appendChild(a);

        tr.appendChild(espacio);
        tr.appendChild(fecha);
        tr.appendChild(entrada);
        tr.appendChild(salida);
        tr.appendChild(estado);
        tr.appendChild(cPropietario);
        tr.appendChild(cPropiedad);

        document.getElementById("tblBodyReservas").appendChild(tr);
    }
}

function perfilEspacio(e) {
    var a = e.target;
    var id = a.id;
    console.log(a.id);
    localStorage.setItem("idEspacioPerfil", id);
    window.location.href = "vPerfilEspacio";
}

function calificarPropiedad(e) {
    var a = e.target;
    var id = a.id;
    console.log(a.id);
    localStorage.setItem("idReservacion", id);
    window.location.href = "vCalificarPropiedad";
}

function calificarPropietario(e) {
    var a = e.target;
    var id = a.id;
    console.log(a.id);
    localStorage.setItem("idReservacion", id);
    window.location.href = "vCalificarUsuario";
}

function calificarUsuario(e) {
    var a = e.target;
    var id = a.id;
    console.log(a.id);
    localStorage.setItem("idReservacion", id);
    window.location.href = "vCalificarUsuario";
}

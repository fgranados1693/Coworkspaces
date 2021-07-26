async function fillCalificacion() {

    var reservas = [];
    var calificacion = 0;

    if (await isPerfilPropietario()) {
        reservas = await getReservasPropietario();
        calificacion = Math.round(calcularCalificacion(reservas, 'Calificacion_Propietario'));
    } else {
        reservas = await getReservasCliente();
        calificacion = Math.round(calcularCalificacion(reservas, 'Calificacion_Usuario'));
    }

    for (var j = 0; j < calificacion; j++) {
        var icon = document.createElement("i");
        icon.classList.add("fas");
        icon.classList.add("fa-star");
        icon.classList.add("calif");
        document.getElementById("calificacion").appendChild(icon);
    }

    for (var j = 0; j < 5 - calificacion; j++) {
        var icon = document.createElement("i");
        icon.classList.add("far");
        icon.classList.add("fa-star");
        icon.classList.add("calif");
        document.getElementById("calificacion").appendChild(icon);
    }

}

function calcularCalificacion(reservas, id) {

    var sumaCalificaciones = 0;

    for (i in reservas) {
        sumaCalificaciones += reservas[i][id];
    }

    if (reservas.length != 0) {
        return sumaCalificaciones / reservas.length;
    } else {
        return 0;
    }

}

async function getReservasCliente() {

    var result = await fetch('https://localhost:44302/api/reservacion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var allReservas = json['Data'];

    var reservas = [];

    for (i in allReservas) {
        if (allReservas[i]['Id_Usuario'] == idUsuarioPerfil)
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
        var propiedades = await getPropiedadesPropietarioIds();

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

async function getPropiedadesPropietarioIds() {

    var propiedades = await getPropiedades();
    var propiedadesPropietario = [];

    for (i in propiedades) {

        if (propiedades[i]["IdUsuario"] == idUsuarioPerfil) {
            propiedadesPropietario.push(propiedades[i]['IdPropiedad']);
        }
    }

    return propiedadesPropietario;

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
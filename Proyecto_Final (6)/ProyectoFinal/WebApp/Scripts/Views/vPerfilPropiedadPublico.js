function load() { }

var idPropiedad = localStorage.getItem("idPropiedadPerfil");
let map;

function initMap() {
    let latitude = 9.934739;
    let longitude = -84.087502;

    let myLatLng = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        disableDoubleClickZoom: true
    });
}

$(document).ready(async function () {

    listarFotosCards();

    try {
        var IdUsuario = "";
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

            var propietario = await GetPropietario(IdUsuario);
            document.getElementById('propietario').innerHTML = propietario['Nombre'] + ' ' + propietario['Apellidos'];
            document.getElementById('propietario').addEventListener('click', perfilUsuario);
            document.getElementById('propietario').id = propietario['Id_Usuario'];


            var espacios = await GetEspaciosPropiedad();

            for (i in espacios) {
                var tr = document.createElement("tr");
                var nombre = document.createElement("td");

                var a = document.createElement('a');
                a.href = "#";
                a.id = espacios[i]['Id_Espacio'];
                a.addEventListener('click', perfilEspacio);

                a.appendChild(document.createTextNode(espacios[i]['Nombre']));
                nombre.appendChild(a);

                tr.appendChild(nombre);

                document.getElementById("tblBodyEspacios").appendChild(tr);
            }

            await fillCalificacion();
        }

        $('#tblEspacios').DataTable();

        var myLatlng = new google.maps.LatLng(json['Data']['Latitud'], json['Data']['Longitud']);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: json['Data']['Nombre']
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
        map.setCenter(marker.getPosition());
    
    
    

    } catch (err) {
        console.log(err);
    }
});

let listarFotosCards = async () => {
    var sct_fotos = document.querySelector('#lista_fotos');
    let fotos = await getFotografiasPropiedad();

    for (let index = 0; index < fotos.length; index++) {

        var contenedor_card = document.createElement('div');

        var contenedor_imagen = document.createElement('div');
        var foto = document.createElement('img');
         
        foto.src = fotos[index]['URL'];

        contenedor_imagen.appendChild(foto);

        contenedor_card.appendChild(contenedor_imagen);
        sct_fotos.appendChild(contenedor_card);           
        
    }
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
}

async function GetPropietario(id) {

    var result = await fetch('https://localhost:44302/api/usuario/' + id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];
}

function vPerfilPropiedadPublico() {

    this.verEspacios = function () {

        window.location.href = "vEspacios";
    }
}

async function fillCalificacion() {

    var reservas = [];
    var calificacion = 0;

    reservas = await getReservasPropiedad();
    calificacion = Math.round(calcularCalificacion(reservas, 'Calificacion_Propiedad'));
    console.log(calificacion);

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

// Get de todas las reservaciones y push a array de reservas de propiedad
async function getReservasPropiedad() {

    var result = await fetch('https://localhost:44302/api/reservacion', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var allReservas = json['Data'];

    var reservas = [];

    var espaciosPropiedad = await getEspaciosPropiedad();
    console.log(espaciosPropiedad);

    for (i in allReservas) {

        for (j in espaciosPropiedad) {
            if (allReservas[i]['Id_Espacio'] == espaciosPropiedad[j]['Id_Espacio']) {
                reservas.push(allReservas[i]);
            }               
        }
    }
    return reservas;
}

// funcion que obtiene todos los espacios de una propiedad
async function getEspaciosPropiedad() {

    var result = await fetch('https://localhost:44302/api/espacio', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var espacios = json['Data'];

    var espaciosPropiedad = [];

    for (i in espacios) {
        if (espacios[i]['Id_Propiedad'] == idPropiedad)
            espaciosPropiedad.push(espacios[i]);
    }

    return espaciosPropiedad;
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

async function GetEspaciosPropiedad() {

    var espaciosPropiedad = [];

    var result = await fetch('https://localhost:44302/api/espacio', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var espacios = json['Data'];

    for (i in espacios) {
        if (espacios[i]['Id_Propiedad'] == idPropiedad)
            espaciosPropiedad.push(espacios[i])
    }

    return espaciosPropiedad;
}

function perfilEspacio(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idEspacioPerfil", id);
    window.location.href = "vPerfilEspacio";
}

function perfilUsuario(e) {
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idUsuarioPerfil", id);
    window.location.href = "vPerfilUsuarioPublico";
}
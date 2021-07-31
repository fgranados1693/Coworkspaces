
var idUsuario = localStorage.getItem('idUsuario'); 
var idUsuarioConv = localStorage.getItem('idUsuarioConv');

var usuarioConv;
var usuario;

var weekday = new Array(7);
weekday[0] = "Domingo";
weekday[1] = "Lunes";
weekday[2] = "Martes";
weekday[3] = "Miercoles";
weekday[4] = "Jueves";
weekday[5] = "Viernes";
weekday[6] = "Sábado";

var month = new Array();
month[0] = "Enero";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Septiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Diciembre";

function vConversacion() {

    this.ctrlActions = new ControlActions();

    this.Create = async function () {
        try {

            var texto = document.getElementById('texto').value;

            if (texto != "") {

                var currentdate = new Date();
                var time = currentdate.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });
                var datetime = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate() + 'T' + time;

                var mensaje = {
                    "Id_Usuario_Emisor": idUsuario,
                    "Id_Usuario_Receptor": idUsuarioConv,
                    "Texto": texto,
                    "Fecha": datetime
                };

                var result = await fetch('https://localhost:44302/api/mensaje', {
                    method: 'POST',
                    body: JSON.stringify(mensaje),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                } else {

                    reFillTable();
                    document.getElementById('texto').value = "";
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

}

//ON DOCUMENT READY
$(document).ready(async function () {

    usuario = await GetUsuario(idUsuario);

    usuarioConv = await GetUsuario(idUsuarioConv);
    document.getElementById('usuario').innerHTML = usuarioConv['Nombre'] + " " + usuarioConv['Apellidos'];

    var result = await fetch('https://localhost:44302/api/mensaje?idUsuario=' + idUsuario, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    await fillTable(json['Data']);
});

async function reFillTable() {

    $("#tblConv tr").remove(); 

    var result = await fetch('https://localhost:44302/api/mensaje?idUsuario=' + idUsuario, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    await fillTable(json['Data']);

}

async function fillTable(data) {

    var conv = GetConversacion(data);

    for (var i = 0; i < conv.length; i++) {

        var msg = conv[i];
        console.log(msg);

        var tr = document.createElement('tr');
        var td = document.createElement('td');

        var nombre = GetNombreMsg(msg['Id_Usuario_Emisor']) + " ";
        var strong = document.createElement('strong');

        strong.appendChild(document.createTextNode(nombre));

        var date = new Date(msg['Fecha']);
        var time = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
        var datetime = weekday[date.getDay()] + ' ' + date.getDay() + ', ' + month[date.getMonth() + 1] + ' ' + time;

        var small = document.createElement('small');
        small.classList.add('text-muted');
        small.appendChild(document.createTextNode(datetime));

        td.appendChild(strong);
        td.appendChild(small);
        tr.appendChild(td);

        document.getElementById('tblBodyConv').appendChild(tr);

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.colSpan = 2;
        td.appendChild(document.createTextNode(msg['Texto']));
        tr.appendChild(td);

        document.getElementById('tblBodyConv').appendChild(tr);
        
    }

}

function GetNombreMsg(id) {

    if (id == usuario['Id_Usuario'])
        return (usuario['Nombre'] + " " + usuario['Apellidos']);

    if (id == usuarioConv['Id_Usuario'])
        return (usuarioConv['Nombre'] + " " + usuarioConv['Apellidos']);
}

async function GetUsuario(id) {
    try {

        var url = "https://localhost:44302/api/usuario/" + id;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        return json['Data'];


    } catch (err) {
        console.log(err);
    }
}

function GetConversacion(conversaciones) {

    var conv = [];

    for (i in conversaciones) {

        var idE = conversaciones[i][0]['Id_Usuario_Emisor'];
        var idR = conversaciones[i][0]['Id_Usuario_Receptor'];
        if (idE == idUsuarioConv || idR == idUsuarioConv)
            conv = conversaciones[i];

    }

    return conv;
}
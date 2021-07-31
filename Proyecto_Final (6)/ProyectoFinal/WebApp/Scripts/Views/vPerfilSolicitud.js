function load() {

}

var idSolicitud = localStorage.getItem('idSolicitud');
var solicitud;
var emailUsuario = "";
var idUsuarioSolicitud = "";

function vPerfilSolicitud() {

    this.ctrlActions = new ControlActions();

    this.Aceptar = async function () {

        var comision = document.getElementById('Comision').value;

        var data = solicitud;

        data['Revisada'] = 'true';
        data['Resultado'] = 'aceptada';

        var result = await fetch('https://localhost:44302/api/solicitud', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        }

        var membresia = await this.GetMembresia(data['Id_Usuario']);
        membresia['Comision_Admin'] = comision;
        await this.UpdateMembresia(membresia);

    }

    this.UpdateMembresia = async function (data) {

        try {

            var result = await fetch('https://localhost:44302/api/membresia', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } else {
                await this.SendEmail('aceptada');
                this.ctrlActions.ShowMessage('I', "Solicitud resuelta");
                setTimeout(function () { window.location.href = "vListarSolicitudes"; }, 3000);
            }



        } catch (err) {
            console.log(err);
        }

    }

    this.GetMembresia = async function (idUsuario) {
        try {

            var url = "https://localhost:44302/api/membresia?idUsuario=" + idUsuario;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }

            return json['Data'];
        } catch (err) {
            console.log(err);
        }
    }


    this.Rechazar = async function () {

        var data = solicitud;

        data['Revisada'] = 'true';
        data['Resultado'] = 'rechazada';

        var result = await fetch('https://localhost:44302/api/solicitud', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        } else {
            await this.SendEmail('rechazada');
            this.ctrlActions.ShowMessage('I', "Solicitud resuelta");
            setTimeout(function () { window.location.href = "vListarSolicitudes"; }, 3000);
        }


    }

    this.SendEmail = async function (res) {
        try {

            var data = {};

            data['email'] = emailUsuario;
            data['content'] = this.BuildContent(res);
            data["subject"] = "Resultado de su solicitud de registro";

            var result = await fetch('https://localhost:44302/api/email', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } 

        } catch (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    }

    this.BuildContent = function (res) {
        var content = "";

        //content = (
        //    '<!doctype html>' +
        //    '<html lang="en">' +
        //    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
        //    '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
        //    '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
        //    '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px;">' +
        //    '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold;">Coworkspaces</a>' +
        //    '<p style="color: black">Su solicitud de registro fue ' + res + '.</p>' +
        //    '<p style="color: black">Gracias,</p>' +
        //    '<p style="color: black">Equipo de Coworkspaces.</p>' +
        //    '</div>' +
        //    '</body>' +
        //    '</html>'
        //);

        content = (
            '<!doctype html>' +
            '<html lang="en">' +
            '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>' +
            '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">' +
            '<body style = " margin: 0; font-family:  \'Raleway\', sans-serif;">' +
            '<div style="margin: auto;  width: 33.33%; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 20px; border-radius: 10px 20px; text-align: center; border: 2px solid #3498db;">' +
            '<a style="text-decoration: none; color: black; font-size: 30px; font-weight: bold; ">Coworkspaces</a>' +
            '<img src="https://res.cloudinary.com/imgproyecto1/image/upload/v1619658672/ylddosdtpsrcgbczngzj.png" alt="">' +
            '<p style="color: black; text-align: left;">Su solicitud de registro fue ' + res + '.</p>' +
            '<p style="color: black; text-align: left;">Gracias,</p>' +
            '<p style="color: black; text-align: left;">Equipo de Coworkspaces.</p>' +
            '</div>' +
            '</body>' +
            '</html>'
        );

        return content;
    }


}

async function GetSolicitudData() {
    var url = "https://localhost:44302/api/solicitud";
    var result = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    var solicitudes = json['Data'];
    for (i in solicitudes) {
        if (solicitudes[i]['Id_Solicitud'] == idSolicitud) {
            solicitud = solicitudes[i];
        }
    }
}

//ON DOCUMENT READY
$(document).ready(async function () {
    try {

        await GetSolicitudData();
       
        if (solicitud != undefined) {

            await FillUsuario();
            await FillPropiedad();
            
        }

    } catch (err) {
        console.log(err);
    }

});

async function FillUsuario() {

    try {

        var url = "https://localhost:44302/api/usuario/" + solicitud['Id_Usuario'];
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var json = await result.json();
        var fullName = "";
        for (i in json['Data']) {
            if (i != 'Id_Usuario' && i != 'Fecha_Creacion' && i != 'URL_Foto' && i != 'Estado' && i != 'Fecha_Nacimiento')
                document.getElementById(i).innerHTML = json['Data'][i];
            if (i == 'Fecha_Nacimiento') {
                var date = new Date(json['Data'][i]);
                document.getElementById(i).innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            }
            if (i == 'Nombre' || i == 'Apellidos') {
                fullName += (json['Data'][i] + " ");
            }
            if (i == 'Email') {
                emailUsuario = json['Data'][i];
            }
        }

        idUsuarioSolicitud = json['Data']['Id_Usuario'];

        document.getElementById("FullName").innerHTML = fullName;

    } catch (err) {
        console.log(err);
    }
    
}

async function FillPropiedad() {

    try {

        var url = "https://localhost:44302/api/propiedad";
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
        } else {
            var propiedades = json['Data'];
            var propiedad = {};
            for (i in propiedades) {

                if (propiedades[i]['IdUsuario'] == idUsuarioSolicitud) {
                    propiedad = propiedades[i];
                    for (j in propiedad) {
                        if (j != 'IdPropiedad' && j != 'IdUsuario' && j != 'Estado' && j != 'Latitud' && j != 'Longitud')
                            document.getElementById(j + "P").innerHTML = propiedad[j];
                    }
                }
            }

            var dataDocumentosPropiedad = await getDocumentosPropiedad(propiedad['IdPropiedad']);
            await fillTableDocs(dataDocumentosPropiedad);
            $('#tblDocumentos').DataTable();
        }

    } catch (err) {
        console.log(err);
    }
    
}


async function getDocumentosPropiedad(idPropiedad) {

    var documentos = await getDocumentos();
    var documentosPropiedad = [];

    for (i in documentos) {

        if (documentos[i]["Id_Propiedad"] == idPropiedad) {
            documentosPropiedad.push(documentos[i]);
        }
    }

    return documentosPropiedad;

}

async function getDocumentos() {

    var result = await fetch('https://localhost:44302/api/documento', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    var json = await result.json();
    return json['Data'];

}

async function fillTableDocs(data) {
    for (var i = 0; i < data.length; i++) {

        if (data[i]['Tipo'] == 'foto') {
            addImg(data[i]);
        }

        if (data[i]['Tipo'] == 'documento') {
            addDoc(data[i]);
        }
        
    }

}

function addImg(data) {

    var col = document.createElement("div");
    col.classList.add('col');

    var img = document.createElement("img");
    img.src = data['URL'];
    img.style.width = '300px';

    col.appendChild(img);
    document.getElementById("img-cont").appendChild(col);
}

function addDoc(data) {
    var tr = document.createElement("tr");
    var URL = document.createElement("td");

    var a = document.createElement("a");

    var textNombre = document.createTextNode(data['Nombre']);
    a.appendChild(textNombre);
    a.href = data['URL'];
    a.target = "_blank"

    URL.appendChild(a);

    tr.appendChild(URL);

    document.getElementById("tblBodyDocumentos").appendChild(tr);
}
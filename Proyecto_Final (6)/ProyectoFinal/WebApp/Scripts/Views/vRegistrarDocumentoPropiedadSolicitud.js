function load() { }

var arrayURLDocumentosPropiedad = [];

function vRegistrarDocumentoPropiedadSolicitud() {

    this.ctrlActions = new ControlActions();


    this.Cargar = function () {
        widget_cloudinary.open();
    }

    this.RegistrarDocumentos = async function () {

        try {

            if (ValidateForm()) {

                for (i in arrayURLDocumentosPropiedad) {
                    let constructorFoto = {
                        Id_Propiedad: localStorage.getItem('idPropiedadSeleccionada'),
                        URL: arrayURLDocumentosPropiedad[i],
                        Tipo: "documento",
                        Nombre: document.getElementById('nombreDocumento').value
                    };

                    var result = await fetch('https://localhost:44302/api/documento', {
                        method: 'POST',
                        body: JSON.stringify(constructorFoto),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    var response = await result;

                }
                await registrarSolicitud();

            }

        } catch (err) {
            console.log(err);
        }

    }
}

async function registrarSolicitud() {

    var ctrlActions = new ControlActions();

    var solictudData = {
        "Id_Usuario": localStorage.getItem('idUsuarioSolicitud'),
        "Revisada": "false",
        "Resultado": "pendiente"
    };

    var result = await fetch('https://localhost:44302/api/solicitud', {
        method: 'POST',
        body: JSON.stringify(solictudData),
        headers: { 'Content-Type': 'application/json' }
    });
    var response = await result;
    var json = await response.json();

    if (response.status != 200) {
        ctrlActions.ShowMessage('E', json['ExceptionMessage']);
    } else {

        var admin = await isAdmin();
        if (admin) {

            ctrlActions.ShowMessage('I', "Solicitud enviada");
            setTimeout(function () {
                window.location.href = "vListarUsuarios";
            }, 3000);

        } else {

            ctrlActions.ShowMessage('I', "Solicitud enviada");
            setTimeout(function () {
                window.location.href = "Index";
            }, 3000);

        }

    }
}

function ValidateForm() {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var valid = true;
    var validFotos = true;
    var imagen = document.getElementById('img-cnt');

    let nombre = document.getElementById('nombreDocumento').value;

    if (imagen.src == null || imagen.src == "") {
        imagen.classList.add("error");
        validFotos = false;
    } else {
        imagen.classList.remove("error");
    }

    if (nombre == "" || nombre == null) {
        document.getElementById("nombreDocumento").classList.add("error");
        valid = false;
    } else {
        document.getElementById("nombreDocumento").classList.remove("error");
    }

    if (!validFotos || !valid) {
        alertMes += "Complete todos los espacios";
    }

    if (!validFotos) {
        document.getElementById("alert_message_foto").innerHTML = "Debe subir un documento como mínimo de la propiedad";
    } else {
        document.getElementById("alert_message_foto").innerHTML = "";
    }

    if (!validFotos || !valid) {
        ctrlActions.ShowMessage('E', alertMes);
        return false;
    }
    else {
        $('.alert').hide();
        return true;
    }
}

async function isAdmin() {
    var isAdmin = false;
    var idUsuario = localStorage.getItem('idUsuario');
    var ctrlActions = new ControlActions();

    if (idUsuario != "" && idUsuario != undefined) {
        var url = "https://localhost:44302/api/rolusuario?idUsuario=" + idUsuario;
        var result = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        var response = await result;
        var json = await response.json();

        if (response.status != 200) {
            ctrlActions.ShowMessage('E', json['ExceptionMessage']);
        }
        for (i = 0; i < json['Data'].length; i++) {

            var rol = json['Data'][i];

            if (rol['Id_Rol'] == 1) {
                isAdmin = true;
            }

        }
    }
    return isAdmin;
}

//cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'imgproyecto1',
    uploadPreset: 'ImagenesProyecto2'

}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        document.getElementById('img-cnt').src = result.info.secure_url;
        arrayURLDocumentosPropiedad.push(result.info.secure_url);
        console.log(result.info.secure_url);
    }
});



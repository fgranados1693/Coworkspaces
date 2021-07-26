'use strict';

let btn_imagen = document.getElementById('upload_widget');
let imagen = document.getElementById('img-cnt');
let id_propiedad_seleccionada = localStorage.getItem('idPropiedadSeleccionada');
let nombreDocumento = document.querySelector('#nombreDocumento');
let arrayURLFotosPropiedad = [];

//let btn_enviar = document.getElementById('btnEnviar');


function load() {

}

function vRegistrarDocumentoPropiedadSolicitud() {

    var ctrlActions = new ControlActions();
    this.serviceFoto = "documento";

    let nombre = nombreDocumento.value;

    this.Cargar = function () {
        widget_cloudinary.open();
    }

    this.RegistrarFotos = function (idPropiedadFoto) {
        //REGISTRAR EN LA BD CADA FOTO EN DOCUMENTO

        if (ValidateForm()) {

            arrayURLFotosPropiedad.forEach(foto => {
                let constructorFoto = {
                    Id_Propiedad: localStorage.getItem("idPropiedadFoto"),
                    URL: foto,
                    Tipo: "foto",
                    Nombre: nombre
                };
                //console.log(constructorFoto);
                ctrlActions.PostToAPI(this.serviceFoto, constructorFoto, function () {});

            });

            await registrarSolicitud();
        }
    }
}

async function registrarSolicitud(){

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
        this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
    } else {

        var admin = await isAdmin();
        if (admin) {

            this.ctrlActions.ShowMessage('I', "Solicitud enviada");
            setTimeout(function () {
                window.location.href = "vListarUsuarios";
            }, 3000);

        } else {

            this.ctrlActions.ShowMessage('I', "Solicitud enviada");
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

    let nombre = nombreDocumento.value;

    if (imagen.src == null || imagen.src == "") {
        imagen.classList.add("error");
        validFotos = false;
    } else {
        imagen.classList.remove("error");
    }

    if (nombre == "" || nombre == null) {
        document.getElementById("nombreDocumento").classList.add("error");
        valid = false;
    }

    if (!validFotos || !valid) {
        alertMes += "Complete todos los espacios";
    }

    if (!validFotos) {
        document.getElementById("alert_message_foto").innerHTML = "Debe subir una foto como mínimo de la propiedad";
    } else {
        document.getElementById("alert_message_foto").innerHTML = "";
    }

    if (!validFotos ) {
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
        imagen.src = result.info.secure_url;
        arrayURLFotosPropiedad.push(result.info.secure_url);
        console.log(result.info.secure_url);
    }
});



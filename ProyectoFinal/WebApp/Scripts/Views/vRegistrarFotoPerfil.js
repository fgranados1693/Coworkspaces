'use strict';

let btn_imagen = document.getElementById('upload_widget');
let imagen = document.getElementById('img-cnt');
var idUsuario = localStorage.getItem('idUsuario');

var URL_Foto = "";

var usuario = {};

function load() {

}

function vRegistrarFotoPerfil() {

    this.Cargar = function () {
        widget_cloudinary.open();
    }

    this.RegistrarFoto = async function () {

        var ctrlActions = new ControlActions();

        if (ValidateForm()) {

            try {
                
                var data = usuario;
                data['URL_Foto'] = URL_Foto;
                var result = await fetch('https://localhost:44302/api/usuario', {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: { 'Content-Type': 'application/json' }
                });
                var response = await result;
                var json = await response.json();

                if (response.status != 200) {
                    ctrlActions.ShowMessage('E', json['ExceptionMessage']);
                }
                else {
                    ctrlActions.ShowMessage('I', "Imagen subida con éxito");
                    setTimeout(function () {
                        window.location.href = "vPerfilUsuario";
                    }, 3000);
                }

            } catch (err) {
                console.log(err);
            }

        }
    }
}

async function getusuario() {
    try {

        var ctrlActions = new ControlActions();

        if (idUsuario != "" && idUsuario != undefined) {
            var url = "https://localhost:44302/api/usuario/" + idUsuario;
            var result = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            }
            usuario = json['Data'];

        }

    } catch (err) {
        console.log(err);
    }
}

function ValidateForm() {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var validFotos = true;

    if (imagen.src == null || imagen.src == "") {
        imagen.classList.add("error");
        validFotos = false;
    } else {
        imagen.classList.remove("error");
    }

    if (!validFotos) {
        alertMes += "Complete todos los espacios";
    }

    if (!validFotos) {
        document.getElementById("alert_message_foto").innerHTML = "Debe subir la foto de perfil";
    } else {
        document.getElementById("alert_message_foto").innerHTML = "";
    }

    if (!validFotos) {
        ctrlActions.ShowMessage('E', alertMes);
        return false;
    } else {
        $('.alert').hide();
        return true;
    }
}

//cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'imgproyecto1',
    uploadPreset: 'ImagenesProyecto2'

}, (err, result) => {
    if (!err && result && result.event === 'success') {       
        imagen.src = result.info.secure_url;    
        URL_Foto = imagen.src;
    }
});

$(document).ready(async function () {
    try {

        await getusuario();

    } catch (err) {
        console.log(err);
    }

});



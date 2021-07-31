'use strict';

let btn_imagen = document.getElementById('upload_widget');
let imagen = document.getElementById('img-cnt');
let id_propiedad_seleccionada = localStorage.getItem('idPropiedadSeleccionada');

let arrayURLFotosPropiedad = [];

//let btn_enviar = document.getElementById('btnEnviar');


function load() {

}

function vRegistrarFotoPropiedadSolicitud() {

    var ctrlActions = new ControlActions();
    this.serviceFoto = "documento";

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
                    Nombre: "Foto propiedad"
                };

                ctrlActions.PostToAPI(this.serviceFoto, constructorFoto, function () {
                });

            });

            window.location.href = "vRegistrarDocumentoSolicitud";
        }
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
        document.getElementById("alert_message_foto").innerHTML = "Debe subir una foto como mínimo de la propiedad";
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
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
        arrayURLFotosPropiedad.push(result.info.secure_url);
        console.log(result.info.secure_url);
    }
});



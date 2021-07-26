'use strict';

let btn_imagen = document.getElementById('upload_widget');
let imagen = document.getElementById('img-cnt');
let nombreDocumento = document.querySelector('#nombreDocumento');
let arrayURLFotosPropiedad = [];

function load() {

}

function vRegistrarDocumentoPropiedad() {

    var ctrlActions = new ControlActions();
    this.serviceFoto = "documento";

    let nombre = nombreDocumento.value;

    this.Cargar = function () {
        widget_cloudinary.open();
    }

    this.RegistrarFotos = function (idPropiedadFoto) {
 

        if (ValidateForm()) {

            arrayURLFotosPropiedad.forEach(foto => {
                let constructorFoto = {
                    Id_Propiedad: localStorage.getItem("idPropiedadDocumento"),
                    URL: foto,
                    Tipo: "documento",
                    Nombre: nombre
                };

                ctrlActions.PostToAPI(this.serviceFoto, constructorFoto, function () {

                });

                setTimeout(function () {
                    window.location.href = "vMantenimientoPropiedades";
                }, 3000);
            });

            ctrlActions.ShowMessage('I', "Datos correctos");           
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
    } else {
        imagen.classList.remove("error");
    }

    if (!validFotos || !valid) {
        alertMes += "Complete todos los espacios";
    }

    if (!validFotos) {
        document.getElementById("alert_message_foto").innerHTML = "Debe subir un documento como mínimo de la propiedad";
    } else {
        document.getElementById("alert_message_foto").innerHTML = "";
    }

    if (!validFotos || !valid ) {
        ctrlActions.ShowMessage('E', alertMes);
        return false;
    }
    else {
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



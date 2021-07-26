function load() { }

var arrayURLFotosPropiedad = [];

function vRegistrarFotoPropiedadSolicitud() {

    this.ctrlActions = new ControlActions();

    this.Cargar = function () {
        widget_cloudinary.open();
    }

    this.RegistrarFotos = async function () {
        try {

            if (ValidateForm()) {

                for (i in arrayURLFotosPropiedad) {
                    let constructorFoto = {
                        Id_Propiedad: localStorage.getItem('idPropiedadSeleccionada'),
                        URL: arrayURLFotosPropiedad[i],
                        Tipo: "foto",
                        Nombre: "Foto propiedad"
                    };

                    var result = await fetch('https://localhost:44302/api/documento', {
                        method: 'POST',
                        body: JSON.stringify(constructorFoto),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    var response = await result;
                    
                }

                window.location.href = "vRegistrarDocumentoPropiedadSolicitud";
            }

        } catch (err) {
            console.log(err);
        }
        
    }
}

function ValidateForm() {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var validFotos = true;
    var imagen = document.getElementById('img-cnt');
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
        document.getElementById('img-cnt').src = result.info.secure_url;
        arrayURLFotosPropiedad.push(result.info.secure_url);
        console.log(result.info.secure_url);
    }
});



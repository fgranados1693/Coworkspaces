'use strict';

let categoriaEspacio = document.getElementById('Categoria');
let idCategoriaEspacio;
let propiedadEspacio = document.getElementById('Propiedad');
let idPropiedadEspacio;
//console.log(select_propiedades.innerHTML);
let nombre_espacio = document.getElementById('Nombre');
let mensaje_reservacion = document.getElementById('Mensaje_Reservacion');
let precio = document.getElementById('Precio');
let estado = document.getElementById('Estado');
let select_reembolso = document.getElementById('Permite_Reembolso');
let select_cancelacion = document.getElementById('Permite_Cancelacion');

let tiempoCancelacion = document.getElementById('Tiempo_Cancelacion');
let tiempoReserva = document.getElementById('Tiempo_Reserva');

let usuario_logeado = localStorage.getItem('idUsuario');

let btn_enviar = document.getElementById('btnEnviar');

let espacio_data = {};



function load() {
    let ctrlActions = new ControlActions();
    //CARGA EL FORM
    let serviceEspacio = "espacio/" + localStorage.getItem('idEspacioMod');
    let espacio = ctrlActions.GetToApiFuncional(serviceEspacio);
    console.log(espacio);
    //console.log(serviceEspacio, espacio);
    idPropiedadEspacio = espacio.Data.Id_Propiedad;

    //CARGA LA PROPIEDAD
    let servicePropiedad = "propiedad/" + idPropiedadEspacio;
    let nomPropiedad = ctrlActions.GetToApiFuncional(servicePropiedad);
    Array.from(nomPropiedad.Data).forEach(propiedadArray => {
        //console.log(propiedadArray, espacio.Data);
        //console.log(espacio);
        if (propiedadArray.IdPropiedad == espacio.Data.Id_Propiedad) {
            //console.log(propiedadArray.IdPropiedad);
            propiedadEspacio.value = propiedadArray.Nombre;
            propiedadEspacio.disabled = true;
        }
    });
    //CARGA LA CATEGORIA
    let serviceCategoria = "categoria";
    let categorias = ctrlActions.GetToApiFuncional(serviceCategoria);
    Array.from(categorias.Data).forEach(cat => {
        
        if (cat.IdCategoria == espacio.Data.Id_Categoria) {
            idCategoriaEspacio = cat.Id_Categoria;
            //console.log(propiedadArray.IdPropiedad);
            categoriaEspacio.value = cat.Nombre;
            categoriaEspacio.disabled = true;
        } else if (espacio.Data.Id_Categoria == -1) {
            idCategoriaEspacio = null;
            categoriaEspacio.value = "Nula";
            categoriaEspacio.disabled = true;
        }
    });
    

    nombre_espacio.value = espacio.Data.Nombre;
    precio.value = espacio.Data.Precio;
    estado.value = espacio.Data.Estado;
    tiempoCancelacion.value = espacio.Data.Tiempo_Minimo_Previo_Cancelacion;
    tiempoReserva.value = espacio.Data.Tiempo_Minimo_Reservacion;
    mensaje_reservacion.value = espacio.Data.Mensaje_Reservacion;
    select_reembolso.value = espacio.Data.Permite_Reembolso;
    select_cancelacion.value = espacio.Data.Permite_Cancelacion;
}




function vModificarEspacio() {

    this.service = 'espacio';
    this.ctrlActions = new ControlActions();


    this.Modificar = async function () {

        if (ValidateForm() == true) {
            espacio_data["Id_Espacio"] = localStorage.getItem('idEspacioMod');
            espacio_data["Id_Propiedad"] = idPropiedadEspacio;
            espacio_data["Id_Categoria"] = idCategoriaEspacio;
            espacio_data["Nombre"] = nombre_espacio.value;
            espacio_data["Precio"] = precio.value;

            switch (estado.options[estado.selectedIndex].text) {
                case "Activo":
                    espacio_data["Estado"] = "activo";
                    break;
                case "Inactivo":
                    espacio_data["Estado"] = "inactivo";
                    break;
                
                
            }
            //console.log(select_reembolso.options[select_reembolso.selectedIndex].text);
            if (select_reembolso.options[select_reembolso.selectedIndex].text == "Permite reembolso") {
                espacio_data["Permite_Reembolso"] = "true";
                console.log("true");
            } else if (select_reembolso.options[select_reembolso.selectedIndex].text == "No permite reembolso") {
                espacio_data["Permite_Reembolso"] = "false";
                console.log("false");
            }

            if (select_cancelacion.options[select_cancelacion.selectedIndex].text == "Permite cancelar") {
                espacio_data["Permite_Cancelacion"] = "true";
            } else if (select_cancelacion.options[select_cancelacion.selectedIndex].text == "No permite cancelar") {
                espacio_data["Permite_Cancelacion"] = "false";
            }
            espacio_data["Tiempo_Minimo_Previo_Cancelacion"] = tiempoCancelacion.value;
            espacio_data["Tiempo_Minimo_Reservacion"] = tiempoReserva.value;

            espacio_data["Mensaje_Reservacion"] = mensaje_reservacion.value;


            //console.log(espacio_data);
            //this.ctrlActions.PutToAPI(this.service, espacio_data);
            var result = await fetch('https://localhost:44302/api/espacio', {
                method: 'PUT',
                body: JSON.stringify(espacio_data),
                headers: { 'Content-Type': 'application/json' }
            });
            var response = await result;
            var json = await response.json();

            if (response.status != 200) {
                this.ctrlActions.ShowMessage('E', json['ExceptionMessage']);
            } else {
                this.ctrlActions.ShowMessage('I', "Cambios guardados");
                setTimeout(function () {
                    window.location.href = "vMantenimientoEspacios";
                }, 1500);
            }
        }
        
    }

}

function ValidateForm() {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var valid = true;

    //NO SE PUEDE HACER UNA VALIDACION MEDIANTE FOR POR USAR INPUT TYPE RADIO

    //VALIDACIONES MEDIANTE IF PARA CHECKEAR SI SON NULL
    

    if (nombre_espacio.value == null || nombre_espacio.value == "") {
        nombre_espacio.classList.remove("is-valid");
        nombre_espacio.classList.add("is-invalid");
        valid = false;
    } else {
        nombre_espacio.classList.add("is-valid");
        nombre_espacio.classList.remove("is-invalid");
    }
    if (precio.value == null || precio.value == "") {
        precio.classList.remove("is-valid");
        precio.classList.add("is-invalid");
        valid = false;
    } else {
        precio.classList.add("is-valid");
        precio.classList.remove("is-invalid");
    }
    

    //DROPDOWNS
    if (estado.options[estado.selectedIndex].text == "Seleccione una opción") {
        estado.classList.remove("valid");
        estado.classList.add("error");
        valid = false;
    } else {
        estado.classList.add("valid");
        estado.classList.remove("error");
    }
    if (select_cancelacion.options[select_cancelacion.selectedIndex].text == "Seleccione una opción") {
        select_cancelacion.classList.remove("valid");
        select_cancelacion.classList.add("error");
        valid = false;
    } else {
        select_cancelacion.classList.add("valid");
        select_cancelacion.classList.remove("error");
    }
    if (select_reembolso.options[select_reembolso.selectedIndex].text == "Seleccione una opción") {

        select_reembolso.classList.remove("valid");
        select_reembolso.classList.add("error");
        valid = false;
    } else {
        select_reembolso.classList.add("valid");
        select_reembolso.classList.remove("error");
    }


    if (tiempoCancelacion.value == null || tiempoCancelacion.value == "") {
        tiempoCancelacion.classList.remove("is-valid");
        tiempoCancelacion.classList.add("is-invalid");
        valid = false;
    } else {
        tiempoCancelacion.classList.add("is-valid");
        tiempoCancelacion.classList.remove("is-invalid");
    }
    if (tiempoReserva.value == null || tiempoReserva.value == "") {
        tiempoCancelacion.classList.remove("is-valid");
        tiempoCancelacion.classList.add("is-invalid");
        valid = false;
    } else {
        tiempoReserva.classList.add("is-valid");
        tiempoReserva.classList.remove("is-invalid");
    }
    



    if (valid == false) {
        alertMes += "Complete todos los espacios";
    }


    if (valid == false) {
        ctrlActions.ShowMessage('E', alertMes);
        return false;
    } else {
        $('.alert').hide();
        return true;
    }
}

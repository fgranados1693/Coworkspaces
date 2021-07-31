'use strict';


let propiedadesUsuario = [];
let categoriasEspacio = [];

let select_categorias = document.getElementById('select-categorias');
let select_propiedades = document.getElementById('select-propiedades');
//console.log(select_propiedades.innerHTML);
let nombre_espacio = document.getElementById('Nombre');
let precio = document.getElementById('Precio');
//let descripcion = document.querySelector('descripcion');
let arrayURLFotos = [];

let btn_imagen = document.getElementById('upload_widget');
let imagen = document.getElementById('img-cnt');
//console.log(imagen.src);
let usuario_logeado = localStorage.getItem('idUsuario');


//INPUTS
let inp_reembolso1 = document.getElementById('reembolso1');
let inp_reembolso2 = document.getElementById('reembolso2');
let reembolso = null;

let inp_cancelacion1 = document.getElementById('cancelacion1');
let inp_cancelacion2 = document.getElementById('cancelacion2');
let cancelacion = null;

let btn_enviar = document.getElementById('btnEnviar');

let espacio_data = {};



function load() {
    espacio_data["Id_Categoria"] = "";
    espacio_data["Id_Propiedad"] = "";
    espacio_data["Nombre"] = "";
    espacio_data["Precio"] = "";
    espacio_data["Estado"] = "activo";
    espacio_data["Permite_Reembolso"] = "";
    espacio_data["Permite_Cancelacion"] = "";

    loadSelectPropiedades();
    loadSelectCategorias();
}

function vRegistrarEspacio1() {

    this.service = 'usuario';
    this.ctrlActions = new ControlActions();


    this.EnviarDatos = function () {

        
        
        

        //VERIFICAR CUAL RADIO DE REEMBOLSO FUE SELECCIONADO
        if (inp_reembolso1.checked) {
            espacio_data["Permite_Reembolso"] = "true";
            reembolso = "true";
        } else if (inp_reembolso2.checked) {
            espacio_data["Permite_Reembolso"] = "false";
            reembolso = "false";
        }

        //VERIFICAR CUAL RADIO DE CANCELACION FUE SELECCIONADO
        if (inp_cancelacion1.checked) {
            espacio_data["Permite_Cancelacion"] = "true";
            cancelacion = "true";
        } else if (inp_cancelacion2.checked) {
            espacio_data["Permite_Cancelacion"] = "false";
            cancelacion = "false";
        }
        //console.log(espacio_data);
        //console.log(arrayURLFotos);
        //console.log(espacio_data);
        if (ValidateForm(espacio_data) == true) {

            espacio_data["Nombre"] = nombre_espacio.value;
            espacio_data["Precio"] = precio.value;

            //ASIGNAR EL ID DE LA PROPIEDAD SELECCIONADA
            propiedadesUsuario.forEach(prop => {
                
                if (prop.Nombre == select_propiedades.options[select_propiedades.selectedIndex].text) {
                    console.log('Asigna id de propiedad');
                    espacio_data["Id_Propiedad"] = prop.IdPropiedad;
                }
            });

            //ASIGNAR EL ID DE LA CATEGORÍA SELECCIONADA
            categoriasEspacio.forEach(cat => {
                //console.log(select_categorias.options[select_categorias.selectedIndex].text);
                //console.log(cat);
                if (cat.Nombre == select_categorias.options[select_categorias.selectedIndex].text) {
                    console.log('Asigna id de categoria');
                    espacio_data["Id_Categoria"] = cat.IdCategoria;
                }
            });

            //PERMITE GUARDAR ARRAYS Y OBJETOS EN LOCALSTORAGE
            Storage.prototype.setObj = function (key, obj) {

                return this.setItem(key, JSON.stringify(obj))
            }
            Storage.prototype.getObj = function (key) {
                return JSON.parse(this.getItem(key))
            }

            localStorage.setObj('DataEspacio', espacio_data);
            localStorage.setObj('ArrayURLFotos', arrayURLFotos);
            //console.log(arrayURLFotos);
            console.log(espacio_data);
            
            this.ctrlActions.ShowMessage('I', "Datos correctos");

            console.log(localStorage.getObj('DataEspacio'));
            console.log(localStorage.getObj('ArrayURLFotos'));

            //window.location.href = "vRegistrarEspacio2";

            
            setTimeout(function () {
                window.location.href = "vRegistrarEspacio2";
            }, 2000);
            
        } else {
            console.log("Campos vacíos");
        }


    }

    this.Cargar = function () {
        widget_cloudinary.open();
    }

}

function ValidateForm(data) {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var valid = true;
    var validFotos = true;
    var validRadios = true;

    //NO SE PUEDE HACER UNA VALIDACION MEDIANTE FOR POR USAR INPUT TYPE RADIO

    //VALIDACIONES MEDIANTE IF PARA CHECKEAR SI SON NULL
    if (select_propiedades.options[select_propiedades.selectedIndex].text == "Seleccione la propiedad") {
        console.log('select propiedades');
        select_propiedades.classList.remove("valid");
        select_propiedades.classList.add("error");
        valid = false;
    } else {
        select_propiedades.classList.add("valid");
        select_propiedades.classList.remove("error");
    }
    if (select_categorias.options[select_categorias.selectedIndex].text == "Seleccione la categoría") {
        //console.log('select propiedades');
        select_categorias.classList.remove("valid");
        select_categorias.classList.add("error");
        valid = false;
    } else {
        select_categorias.classList.add("valid");
        select_categorias.classList.remove("error");
    }

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
    if (imagen.src == null || imagen.src == "") {
        imagen.classList.add("error");
        valid = false;
    } else {
        imagen.classList.remove("error");
    }
    if (reembolso == null || reembolso == "") {
        document.getElementById("lbl-reembolso").classList.add('error-color');
        valid = false;
    } else {
        document.getElementById("lbl-reembolso").classList.remove('error-color');
    }
    if (cancelacion == null || cancelacion == "") {
        document.getElementById("lbl-cancelacion").classList.add('error-color');
        valid = false;
    } else {
        document.getElementById("lbl-cancelacion").classList.remove('error-color');
    }

    //PROBLEMAS DE VALIDACION

    console.log(imagen.src, arrayURLFotos);
    if (imagen.src == null || imagen.src == "" || arrayURLFotos == null) {
        validFotos = false;
    }


    if (valid == false || !validFotos) {
        alertMes += "Complete todos los espacios";
    }

    if (!validFotos) {
        document.getElementById("alert_message_foto").innerHTML = "Debe subir una foto como mínimo del espacio";
    } else {
        document.getElementById("alert_message_foto").innerHTML = "";
    }

    if (valid == false || !validFotos) {
        ctrlActions.ShowMessage('E', alertMes);
        return false;
    } else {
        $('.alert').hide();
        return true;
    }
}

//CARGA LAS CATEGORIAS DE ESPACIOS DE LA BD
function loadSelectCategorias() {
    let service = "categoria";
    let controlActions = new ControlActions();

    let categorias = controlActions.GetToApiFuncional(service);
    console.log(categorias);

    Array.from(categorias.Data).forEach(cat => {
        categoriasEspacio.push(cat);
        select_categorias.options.add(new Option(cat.Nombre, cat.Nombre));
    });

}

//CARGA LAS PROPIEDADES DEL USUARIO DE LA BD
function loadSelectPropiedades() {
    let service = "propiedad";
    let controlActions = new ControlActions();

    let propiedades = controlActions.GetToApiFuncional(service);
    console.log(propiedades);

    Array.from(propiedades.Data).forEach(prop => {
        console.log(usuario_logeado);
        if (localStorage.getItem('rolUsuario') == 1) {
            propiedadesUsuario.push(prop);
            select_propiedades.options.add(new Option(prop.Nombre, prop.Nombre));
        } else {
            if (prop.IdUsuario == usuario_logeado) {
                console.log('entra en crear propiedades');
                propiedadesUsuario.push(prop);
                select_propiedades.options.add(new Option(prop.Nombre, prop.Nombre));
            }
        }
        

        /*
        var htmlOptions = "";
        htmlOptions += "<option value='" + option.Value + "'>" + option.Description + "</option>";
        */
    });

}


//cloudinary
let widget_cloudinary = cloudinary.createUploadWidget({
    /*
    cloudName: 'coworkspaces',
    uploadPreset: 'ImagenesProyecto2'
*/
    cloudName: 'imgproyecto1',
    uploadPreset: 'ImagenesProyecto2'

}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
        arrayURLFotos.push(result.info.secure_url);
        console.log(result.info.secure_url);
    }
});

/*
btn_imagen.addEventListener('click', () => {
   
}, false);*/


let nombreCaract = document.getElementById("Nombre");
let descCaract = document.getElementById("Descripcion");

let div_inputs = document.getElementById("listado-caracteristicas");

let btn_agregar = document.getElementById("btnAgregar");
let btn_guardar = document.getElementById("btnGuardar");

let idEspacio = localStorage.getItem('idEspacio');
let arrayCaracteristica = [];

let clearx;
let ctrlActions;

function load() {
    ctrlActions = new ControlActions();
}

function vRegistrarEspacio3() {
    this.serviceCaracteristica = "caracteristicaespacio";
    this.ctrlActions = new ControlActions();

    /*
    this.AgregarCaracteristica = function () {
        btn_agregar.click(function () {
            this.AgregarCaracteristicaInput();
        });
    }*/


    this.AgregarCaracteristica = function () {
        //console.log(ValidateForm());
        if (ValidateForm() == true) {
            let seRepite = false;
            for (let i = 0; i < arrayCaracteristica.length; i++) {
                //console.log($('#input-outer input').val());
                if (arrayCaracteristica[i]["Nombre"] == nombreCaract.value) {
                    seRepite = true;
                    ctrlActions.ShowMessage('E', "Característica previamente agregada");
                }
            }
            //VALIDA QUE NO SE REPITA DENTRO DEL ARRAY PARA GUARDAR EN LA BD
            if (seRepite == false) {
                let constructorCaracteristica = {
                    Id_Espacio: idEspacio,
                    Nombre: nombreCaract.value,
                    Descripcion: descCaract.value
                };
                arrayCaracteristica.push(constructorCaracteristica);
                console.log(constructorCaracteristica);
                let input_caract = '<div id="input-outer"><input type = "text" disabled="true" value=' + nombreCaract.value + ' /><div id="clear">X</div></div>';
                let divOuter = document.createElement('div');
                divOuter.id = "input-outer";

                let inp = document.createElement('input');
                inp.type = "text";
                inp.disabled = true;
                inp.value = nombreCaract.value;
                divOuter.appendChild(inp);

                let divX = document.createElement('div');
                divX.innerHTML = "X";
                divX.id = "clear";
                divOuter.appendChild(divX);

                div_inputs.appendChild(divOuter);
                clearx = document.getElementById('clear');
                nombreCaract.value = "";
                descCaract.value = "";
            }
        }
    }

    this.GuardarCaracteristicas = function () {
        
        
        if (arrayCaracteristica.length > 0) {
            arrayCaracteristica.forEach(caract => {
                this.ctrlActions.PostToAPI(this.serviceCaracteristica, caract);
            });
            this.ctrlActions.ShowMessage('I', "Características agregadas");
            localStorage.setItem('idEspacio', '');
        setTimeout(function () {
            window.location.href = "vMantenimientoEspacios";
        }, 2000);
        } else {
            this.ctrlActions.ShowMessage('E', "Debe agregar alguna característica al espacio");
        }
            
        
        
    }

}

$(document).on('click', 'div', function () {
    
    //console.log(arrayCaracteristica);
    if (this.id == "clear") {
        
        for (let i = 0; i < arrayCaracteristica.length; i++) {
            //console.log($('#input-outer input').val());
            if (arrayCaracteristica[i]["Nombre"] == $('#input-outer input').val()) {
                arrayCaracteristica.splice(arrayCaracteristica.indexOf(arrayCaracteristica[i]["Nombre"]), 1);
                //$('#input-outer').classList.add('hide-profile');
                
                this.parentNode.parentNode.removeChild(this.parentNode);
                
            }
        }
    }
    

});


$('#clear').click(function () {
    console.log("Se inicializa aunque sea");
    for (let i = 0; i < arrayCaracteristica.length; i++) {
        console.log($('#input-outer input').val());
        if (arrayCaracteristica[i]["Nombre"] == $('#input-outer input').val() ) {
            arrayCaracteristica.splice(arrayCaracteristica.indexOf(arrayCaracteristica[i]["Nombre"]), 1);
            $('#input-outer input').classList.add('hide-profile');
        }
        
        //$('#input-outer input').val('');
    }
    
});

//VALIDAR CAMPOS VACÍOS
function ValidateForm() {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var valid = true;
    //console.log(nombreCaract, descCaract);
    if (nombreCaract.value == null || nombreCaract.value == "") {
        nombreCaract.classList.remove("is-valid");
        nombreCaract.classList.add("is-invalid");
        valid = false;
    } else {
        nombreCaract.classList.add("is-valid");
        nombreCaract.classList.remove("is-invalid");
    }

    if (descCaract.value == null || descCaract.value == "") {
        descCaract.classList.remove("is-valid");
        descCaract.classList.add('error-color');
        valid = false;
    } else {
        descCaract.classList.add('valid-color');
        descCaract.classList.remove('error-color');
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
'use strict';



let tiempoCancelacion = document.getElementById('TiempoCancelacion');
let tiempoReserva = document.getElementById('TiempoReserva');

let select_dias = document.getElementById('select-dias');
let mensajeReserva = document.getElementById('MensajeReserva');

//PERMITE GUARDAR ARRAYS Y OBJETOS EN LOCALSTORAGE
Storage.prototype.setObj = function (key, obj) {

    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}


let arrayFotos = localStorage.getObj('ArrayURLFotos');
let dataEspacio = localStorage.getObj('DataEspacio');

//CARGA DE OBJETOS HORARIO PARA FACILIDAD
let horarioLunes = {
    Id_Espacio: "",
    Dia_Semana: "Lunes",
    Hora_Inicio: "",
    Hora_Fin: ""
};
let horarioMartes = {
    Id_Espacio: "",
    Dia_Semana: "Martes",
    Hora_Inicio: "",
    Hora_Fin: ""
};
let horarioMiercoles = {
    Id_Espacio: "",
    Dia_Semana: "Miércoles",
    Hora_Inicio: "",
    Hora_Fin: ""
};
let horarioJueves = {
    Id_Espacio: "",
    Dia_Semana: "Jueves",
    Hora_Inicio: "",
    Hora_Fin: ""
};
let horarioViernes = {
    Id_Espacio: "",
    Dia_Semana: "Viernes",
    Hora_Inicio: "",
    Hora_Fin: ""
};
let horarioSabado = {
    Id_Espacio: "",
    Dia_Semana: "Sábado",
    Hora_Inicio: "",
    Hora_Fin: ""
};
let horarioDomingo = {
    Id_Espacio: "",
    Dia_Semana: "Domingo",
    Hora_Inicio: "",
    Hora_Fin: ""
};

//let horarios = [horarioLunes,horarioMartes,horarioMiercoles,horarioJueves,horarioViernes,horarioSabado,horarioDomingo];
let horarios = [];
let idEspacioCreado;

let serviceEspacio = "espacio";
let serviceFoto = "documento";
let serviceHorario = "horario";
let serviceFotoEspacio = "documentoespacio";
let ctrlActions;

function load() {
    $('#inputs-horario').children().hide();
    ctrlActions = new ControlActions();
}

function vRegistroEspacio2() {
    this.serviceEspacio = "espacio";
    this.serviceFoto = "documento";
    this.serviceHorario = "horario";
    this.serviceFotoEspacio = "documentoespacio";
    this.ctrlActions = new ControlActions();
    


    this.Registrar = function () {
        
        
        //console.log(arrayURLFotos);
        if (ValidateForm() == true) {
            //ASIGNA LOS VALORES DE LOS INPUTS A LOS OBJETOS DE CADA DIA DEL HORARIO DEL ESPACIO
            $('input:checkbox').each(function () {
                if (this.checked) {
                    let contL = 0;
                    let contMa = 0;
                    let contMi = 0;
                    let contJ = 0;
                    let contV = 0;
                    let contS = 0;
                    let contD = 0;
                   // console.log(this.value);
                    //console.log(contL, contMa, contMi, contJ, contV, contS, contD);
                    switch (this.value) {
                        case "Lunes":

                            if (contL == 0) {
                                horarioLunes["Hora_Inicio"] = document.getElementById("HoraAperturaLunes").value;
                                horarioLunes["Hora_Fin"] = document.getElementById("HoraCierreLunes").value;
                                horarios.push(horarioLunes);
                                contL += 1;
                            }

                            break;
                        case "Martes":
                            if (contMa == 0) {
                                
                                horarioMartes["Hora_Inicio"] = document.getElementById("HoraAperturaMartes").value;
                                horarioMartes["Hora_Fin"] = document.getElementById("HoraCierreMartes").value;
                                horarios.push(horarioMartes);
                                contMa += 1;
                            }

                            break;
                        case "Miercoles":

                            if (contMi == 0) {
                                horarioMiercoles["Hora_Inicio"] = document.getElementById("HoraAperturaMiercoles").value;
                                horarioMiercoles["Hora_Fin"] = document.getElementById("HoraCierreMiercoles").value;
                                horarios.push(horarioMiercoles);

                                contMi += 1;
                            }
                            break;
                        case "Jueves":

                            if (contJ == 0) {
                                horarioJueves["Hora_Inicio"] = document.getElementById("HoraAperturaJueves").value;
                                horarioJueves["Hora_Fin"] = document.getElementById("HoraCierreJueves").value;
                                horarios.push(horarioJueves);
                                contJ += 1;
                            }

                            break;
                        case "Viernes":

                            if (contV == 0) {
                                horarioViernes["Hora_Inicio"] = document.getElementById("HoraAperturaViernes").value;
                                horarioViernes["Hora_Fin"] = document.getElementById("HoraCierreViernes").value;
                                horarios.push(horarioViernes);
                                contV += 1;
                            }

                            break;
                        case "Sabado":

                            if (contS == 0) {
                                horarioSabado["Hora_Inicio"] = document.getElementById("HoraAperturaSabado").value;
                                horarioSabado["Hora_Fin"] = document.getElementById("HoraCierreSabado").value;
                                horarios.push(horarioSabado);
                                contS += 1;
                            }

                            break;
                        case "Domingo":

                            if (contD == 0) {
                                horarioDomingo["Hora_Inicio"] = document.getElementById("HoraAperturaDomingo").value;
                                horarioDomingo["Hora_Fin"] = document.getElementById("HoraCierreDomingo").value;
                                horarios.push(horarioDomingo);
                                contD += 1;

                            }

                            break;
                        default:
                            console.log('El switch sin valor');
                            break;
                    }
                }
            });

            //ARREGLAR QUE EL ARRAY HORARIOS GUARDE STRINGS

            //console.log(dataEspacio);
            //console.log(arrayFotos);
            
            //ESPACIO
            dataEspacio["Tiempo_Minimo_Previo_Cancelacion"] = tiempoCancelacion.value;
            dataEspacio["Tiempo_Minimo_Reservacion"] = tiempoReserva.value;
            dataEspacio["Mensaje_Reservacion"] = mensajeReserva.value;

            console.log(dataEspacio);
            this.ctrlActions.PostToAPI(this.serviceEspacio, dataEspacio);

           

            this.espacioRegistrado();

            

        } else {
            console.log("Campos vacíos");
        }


    }

    this.espacioRegistrado = function () {
        //do some things
        setTimeout(this.registrarHorarioYFotos, 2000) //wait two seconds before continuing
    }

    this.registrarHorarioYFotos = function () {
        //finish doing things after the pause
        this.serviceEspacio = "espacio";
        this.serviceFoto = "documento";
        this.serviceHorario = "horario";
        this.serviceFotoEspacio = "documentoespacio";
        this.ctrlActions = new ControlActions();

        let espacios = this.ctrlActions.GetToApiFuncional(this.serviceEspacio);
        //console.log(espacios.Data);
        let confirmacionEspacio = false;

        //console.log(contrasenna);

        //BUSCA EL ESPACIO RECIEN CREADO
        Array.from(espacios.Data).forEach(espacio => {
            //console.log(espacio);
            console.log(dataEspacio["Id_Propiedad"], dataEspacio["Nombre"]);
            console.log(espacio.Id_Propiedad, espacio.Nombre);

            if (espacio.Id_Propiedad == dataEspacio["Id_Propiedad"] && espacio.Nombre == dataEspacio["Nombre"]) {
                confirmacionEspacio = true;

                idEspacioCreado = espacio.Id_Espacio;
                console.log(idEspacioCreado);
            }
        });

        //SI SE ENCONTRO EL ID DEL ESPACIO CREADO, SE ASIGNA ESE ID A LOS HORARIOS DEL ESPACIO
        if (confirmacionEspacio == true) {
            horarios.forEach(horario => {
                horario["Id_Espacio"] = idEspacioCreado;
                console.log(horarios);
            })
        }

        RegistrarFotos();

        //console.log(horarios);
        RegistrarHorarios();

        this.ctrlActions.ShowMessage('I', "Datos correctos");
        localStorage.setItem('idEspacio', idEspacioCreado);
        
        setTimeout(function () {
            window.location.href = "vRegistrarEspacio3";
        }, 2000);
    }

    function RegistrarFotos() {
        //REGISTRAR EN LA BD CADA FOTO EN DOCUMENTO
        arrayFotos.forEach(foto => {
            let constructorFoto = {
                Id_Propiedad: dataEspacio["Id_Propiedad"],
                URL: foto,
                Tipo: "foto",
                Nombre: "Foto espacio"
            };
            console.log(constructorFoto);
            ctrlActions.PostToAPI(serviceFoto, constructorFoto, function () {
                //console.log('Foto registrada');
            });

            setTimeout(function () {
                //OBTENER LA FOTO
                let fotos = ctrlActions.GetToApiFuncional(serviceFoto);

                //console.log(fotos);

                //BUSCA LA FOTO RECIEN CREADA
                Array.from(fotos.Data).forEach(foto => {
                    arrayFotos.forEach(fotoURL => {
                        //console.log(foto);
                        //console.log(fotoURL);
                        //console.log(dataEspacio["Id_Propiedad"]);
                        if (foto.Id_Propiedad == dataEspacio["Id_Propiedad"] && foto.Tipo == "foto" && foto.URL == fotoURL) {
                            //console.log("Entra en constructor de foto espacio")
                            let constructorFotoEspacio = {
                                Id_Documento: foto.Id_Documento,
                                Id_Espacio: idEspacioCreado
                            };
                            //console.log(constructorFotoEspacio);

                            ctrlActions.PostToAPI(serviceFotoEspacio, constructorFotoEspacio, function () {
                                console.log('Foto espacio registrada');
                            });

                        }
                    });
                });
            }, 2000);
            
        });
    }

    function RegistrarHorarios() {
        
        //REGISTRAR EN LA BD CADA HORARIO
        horarios.forEach(horario => {
            if (typeof horario === 'object') {
                console.log(horario);
                ctrlActions.PostToAPI(serviceHorario, horario, function () {
                    console.log('Horario registrado');
                })
            } else {
                console.log("Es un string, no objeto");
            }

           
        });

    }

    
}

//VALIDA SI SE LLENAN TODOS LOS DATOS
function ValidateForm() {

    var ctrlActions = new ControlActions();
    var alertMes = "";
    var valid = true;
    var validTiempo = true;
    var validInpDias = true;
    var validHorDias = true;
    var validHorarios = true;

    //NO SE PUEDE HACER UNA VALIDACION MEDIANTE FOR POR USAR INPUT TYPE RADIO

    //VALIDACIONES MEDIANTE IF PARA CHECKEAR SI SON NULL
    
    if (tiempoCancelacion.value == null || tiempoCancelacion.value == "" || tiempoCancelacion.value < 15) {
        tiempoCancelacion.classList.remove("is-valid");
        tiempoCancelacion.classList.add("is-invalid");
        validTiempo = false;
    } else {
        tiempoCancelacion.classList.add("is-valid");
        tiempoCancelacion.classList.remove("is-invalid");
    }
    if (tiempoReserva.value == null || tiempoReserva.value == "" || tiempoReserva.value < 15) {
        tiempoReserva.classList.remove("is-valid");
        tiempoReserva.classList.add("is-invalid");
        validTiempo = false;
    } else {
        tiempoReserva.classList.add("is-valid");
        tiempoReserva.classList.remove("is-invalid");
    }

    if (mensajeReserva.value == null || mensajeReserva.value == "") {
        mensajeReserva.classList.remove("is-valid");
        mensajeReserva.classList.add("is-invalid");
    } else {
        mensajeReserva.classList.add("is-valid");
        mensajeReserva.classList.remove("is-invalid");
    }
    
    //VALIDA SI SE ESCOGIO MINIMO UN DIA DE APERTURA
    $('input:checkbox').each(function () {
        if (this.checked) {
            validInpDias = true;
            document.getElementById('lbl-dias-apertura').classList.remove('error-color');
            return false;
        } else {
            validInpDias = false;
            document.getElementById('lbl-dias-apertura').classList.add('error-color');
        }
    });

    
    //VALIDACIONES DE LOS HORARIOS
    $('input:checkbox').each(function () {
        if (this.checked) {
            let idApertura = "HoraApertura" + this.value;
            let idCierre = "HoraCierre" + this.value;
            //console.log(idApertura, idCierre);
            if (document.getElementById(idApertura).value == null || document.getElementById(idApertura).value == "") {
                //console.log(this.value);
                
                validHorDias = false;
            }
            if (document.getElementById(idCierre).value == null || document.getElementById(idCierre).value == "") {
                
                validHorDias = false;
            }
            /*
            console.log(document.getElementById(idApertura).value);
            console.log(document.getElementById(idCierre).value);
            */
        }
    });
    console.log(validHorDias);

    //VALIDA EL SELECT DE DIAS
    if (select_dias.options[select_dias.selectedIndex].text == "Seleccione el día") {
        console.log('select dias');
        select_dias.classList.add("error");
        valid = false;
    } else {
        select_dias.classList.remove("error");
    }


    var messageHorario = "El tiempo de reserva debe ser uniforme con los horarios de apertura del espacio. No puede sobrar o faltar tiempo durante el día de apertura del espacio. Revisar el siguiente horario: ";


    //VALIDACIONES DE LOS HORARIOS
    $('input:checkbox').each(function () {
        if (this.checked) {
            let idApertura = "HoraApertura" + this.value;
            let idCierre = "HoraCierre" + this.value;

            let horaApertura = document.getElementById(idApertura).value;
            let horaCierre = document.getElementById(idCierre).value;

            let diferenciaTiempo;

            if (document.getElementById(idApertura).value == null || document.getElementById(idApertura).value == "") {
                //console.log(this.value);
                messageHorario = "Horario incompleto de " + this.value;
                validHorarios = false;
            }
            if (document.getElementById(idCierre).value == null || document.getElementById(idCierre).value == "") {
                messageHorario = "Horario incompleto de " + this.value;
                validHorarios = false;
            }


            if (validHorarios == true) {
                //console.log("Entra en calculo de tiempo");
                diferenciaTiempo = calculateTimeDifference(horaApertura, horaCierre);

                if (validarTiempoReserva(diferenciaTiempo, tiempoReserva.value) == false) {

                    document.getElementById(idApertura).classList.remove("is-valid");
                    document.getElementById(idCierre).classList.remove("is-valid");
                    document.getElementById(idApertura).classList.add("is-invalid");
                    document.getElementById(idCierre).classList.add("is-invalid");

                    //console.log("Valido el tiempo como malo");
                    console.log(diferenciaTiempo, tiempoReserva.value);
                    messageHorario += this.value + " ";
                    
                    document.getElementById("alert_message_horario").innerHTML = messageHorario;
                    validHorarios = false;
                    
                    
                } else {
                    document.getElementById(idApertura).classList.add("is-valid");
                    document.getElementById(idCierre).classList.add("is-valid");
                    document.getElementById(idApertura).classList.remove("is-invalid");
                    document.getElementById(idCierre).classList.remove("is-invalid");

                    console.log("Horario correcto " + this.value);
                    validHorarios == true;
                    document.getElementById("alert_message_horario").innerHTML = "";
                    
                }
            }

        }
    });


    //VALIDACIONES PARA ESTABLECER LOS MENSAJES DE ERROR
    if (valid == false || validTiempo == false || validInpDias == false || validHorDias == false || validHorarios == false) {
        alertMes += "Complete todos los espacios";
    }

    if (!validTiempo) {
        document.getElementById("alert_message_tiempo").innerHTML = "El tiempo mínimo es de 15 minutos";
    } else {
        document.getElementById("alert_message_tiempo").innerHTML = "";
    }

    if (!validInpDias) {
        document.getElementById("alert_message_inp_dias").innerHTML = "Debe seleccionar al menos un día de apertura";
    } else {
        document.getElementById("alert_message_inp_dias").innerHTML = "";
    }

    if (!validHorDias) {
        document.getElementById("alert_message_inp_dias2").innerHTML = "Debe rellenar los espacios de horarios de los días de apertura seleccionados";
    } else {
        document.getElementById("alert_message_inp_dias2").innerHTML = "";
    }

    //VALIDACION FINAL
    if (!valid || !validTiempo || !validInpDias || !validHorDias || !validHorarios) {
        ctrlActions.ShowMessage('E', alertMes);
        return false;
    } else {
        $('.alert').hide();
        return true;
    }
}

//CARGA LOS DIAS DINAMICAMENTE EN FUNCION DE LOS INPUTS DE RADIO SELECCIONADOS
function loadDias() {
    //console.log('aunque sea entra');
    $('input:checkbox:checked').each(function () {
        let dia = this.value;
        //console.log(dia);
        let estado = false;//DIA REPETIDO O YA CARGADO
        $("#select-dias option").each(function () {
            //console.log(this.text);
            if (this.text != dia) {
                estado = true;//DIA SIN CARGAR
                //console.log('Dia sin cargar');
            } else {
                estado = false;
                return false;
            }
            //var thisOptionValue = $(this).val();
        });
        if (estado == true) {
            select_dias.options.add(new Option(this.value, this.value));
        } else {
            //console.log("No se agregó el option");
        }
        
    });

}

//VALIDA SI EL TIEMPO DE RESERVA ES UNIFORME CON LOS HORARIOS DEL ESPACIO (SI SE PUEDEN HACER RESERVAS UNIFORMES CON EL TIEMPO DESIGNADO)
//VALIDA SI NO SOBRA O FALTA TIEMPO CON EL TIEMPO DE RESERVA
function validarTiempoReserva(minutosTotales, tiempoReserva) {
    let estado = true;
    

    if (minutosTotales % tiempoReserva != 0) {
        //console.log("entra en false de validacion de tiempo");
        //console.log(minutosTotales, tiempoReserva);
        //console.log(minutosTotales % tiempoReserva);
        estado = false;
    }

    return estado;
}

//CALCULATES THE TIME DIFFERENCE OF TWO INPUTS TYPE TIME
function calculateTimeDifference(time1, time2) {
    

            //create date format          
            var timeStart = new Date("01/01/2021 " + time1);
            var timeEnd = new Date("01/01/2021 " + time2);

            var difference = timeEnd - timeStart;

            difference = difference / 60 / 1000;

    //console.log(difference);
    return difference;
}

$(select_dias).click( function () {
    //console.log("pasa");
    $('#inputs-horario').children().hide();
    var idn = $(this).find(":selected").val();
    //console.log(idn);
    $('#lblHoraApertura' + idn).parent().show();
    $('#HoraApertura' + idn).parent().show();
    $('#lblHoraCierre' + idn).parent().show();
    $('#HoraCierre' + idn).parent().show();
});

select_dias.addEventListener('click', () => {
    loadDias();
});